define(function(require, exports, module) {
var createjs = require('util/easeljs.r');
var _ = require('util/lodash.r');
var View = require('famous/core/View');
var StateModifier = require('famous/modifiers/StateModifier');
var ContainerSurface = require('famous/surfaces/ContainerSurface');
var Surface = require('famous/core/Surface');
var Transform = require('famous/core/Transform');
var CanvasSurface = require('famous/surfaces/CanvasSurface');

var AG = {
    Graph: Graph,

    _bindElements: function(ele){

        var setGraph = (ele.setGraph || ele.updateGraph || _.identity).bind(ele);
        var updateGraph = (ele.updateGraph || _.identity).bind(ele);
        var updateFromData = (ele.updateFromData || _.identity).bind(ele);

        ele._eventInput.on('added to graph', setGraph);
        ele._eventInput.on('update graph', updateGraph);
        ele._eventInput.on('element added', updateGraph);
        ele._eventInput.on('data', updateFromData);
    }
}; // the sandbox singleton for Awesomm-graffs

/**
 * An abstract collection of data and configurations
 *
 * @param config
 * @param data
 * @constructor
 */

function Graph(config, data) {
    if (!data && config && config.data) {
        data = config.data;
    }

    this.elements = [];

    View.call(this, _.defaults({}, config, Graph.DEFAULTS));

    this.bg = new ContainerSurface({
        size: this.options.size,
        classes: ['famous-graph'],
        properties: {
            backgroundColor: this.options.backgroundColor,
            fontFamily: this.options.fontFamily,
            border: this.border ? (this.border + 'px solid ' + this.borderColor) : 'none'
        }
    });
    this._node.add(this.bg);
    this.addElement('body', new GraphBody(this));
    if (data){
        this.data(data);
    }
}

Graph.GT_LINE = 0;
Graph.GT_BAR = 1;
Graph.GT_PLOT = 2;
Graph.DEFAULTS = {
    data: [],
    size: [500, 300],
    border: 2,
    padding: 15,
    title: false,
    fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
    type: Graph.GT_LINE,
    backgroundColor: 'rgb(225,245, 235)',
    borderColor: 'rgb(200,215, 145)'
};

Graph.prototype = _.extend(Object.create(View.prototype), {

    title: function (title, tConfig) {
        if (arguments.length == 0){
            var title = this.getElement('title');
            return title ? title.label() : '';
        }
        var titleView = new Title(title, tConfig);
        this.addElement('title', titleView, true);
        return this;
    },

    xAxis: function (axis) {
        this.addElement('xaxis', axis);
        return this;
    },

    yAxis: function (axis) {
        this.addElement('yaxis', axis);
        return this;
    },

    data: function(data){
        if (arguments.length == 0){
            return this._data;
        }

        this._data = data;
        this._eventOutput.emit('data', data);
    },

    addElement: function (eType, view, unique) {
        view.setGraph(this);
        view.$elementType = eType;
        view.$unique = unique;

        if (unique) {
            //@TODO: purge old version
        }

        this.elements.push(view);
        var mod = (view.linkMod && view.linkMod()) ? view.linkMod() : (function () {
            view._linkMod = new StateModifier({origin: [0, 0]});
            if (!view.linkMod) { // there is no FUNCTION linkmod
                view.linkMod = function () {
                    return this._linkMod
                };
            }
            return view.linkMod();
        })();

        this.bg.add(mod).add(view);

        this._eventOutput.emit('element added', {
            type: eType,
            view: view,
            unique: unique
        });

        view._eventInput.emit('added to graph', this);
        this._eventOutput.on('element added', function (info) {
            view._eventInput.emit('element added', info);
        });

        this._eventOutput.on('update graph', function () {
            view._eventInput.emit('update graph');
        });

        this._eventOutput.on('data', function(data){
            view._eventInput.emit('data', data);
        });

        if (this.data()){
            view._eventInput.emit('data', this.data());
        }
    },

    titleHeight: function () {
        var height = 0;

        var title = this.getElements('title')[0];
        if (title) {
            var titleSize = title.getSize();
            height = titleSize[1];
        }

        return height;
    },

    /**
     * returns all elements added of a given type
     * @param eType {string}
     * @returns {[View]}
     */
    getElements: function (eType) {
        return _.filter(this.elements, function (e) {
            return e.$elementType == eType
        });
    },

    /**
     * returns the first (hopefully, only element of a type
     * @param eType {string}
     * @returns {View}
     */
    getElement: function(eType){
      return this.getElements(eType)[0]
    },

    setSize: function (w, h) {
        this.bg.setSize([w, h]);
        this._eventOutput.emit('update graph');
    }

});

AG.Graph = Graph;
function GraphBody(graph, config) {
    this._graph = graph;
    View.call(this, _.defaults({}, config, Title.DEFAULTS));
    this.mod = new StateModifier({
        origin: [0, 0]
    });
    this.surface = new Surface({
        content: 'data',
        properties: {
            backgroundColor: 'yellow'
        },
        classes: ['data-surface']
    });

    this._node.add(this.mod).add(this.surface);

    AG._bindElements(this);
}

GraphBody.prototype = _.extend(Object.create(View.prototype), {

    setGraph: function (graph) {
        this._graph = graph;
        this._eventInput.emit('update graph', graph);
        return this;
    },

    updateGraph: function () {
        this.mod.setTransform(this.getTransform());
        this.surface.setSize(this.getSize());

    },

    _stats: function () {
        var topMargin = this._graph.titleHeight();
        var height = this._graph.bg.getSize()[1];
        var width = this._graph.bg.getSize()[0];
        var xAxisHeights = 0;
        var xAxisTopMargin = 0;

        var yAxisleftMargin = 0;

        var yAxisWidths = 0;

        _.each(this._graph.getElements('xaxis'), function (xAxis) {
            var size = xAxis.getSize()[1];
            xAxisHeights += size;
            if (xAxis.options.at == AG.GraphXaxis.AT_TOP) {
                xAxisTopMargin += size;
            }
        });

        _.each(this._graph.getElements('yaxis'), function (yaxis) {
            var size = yaxis.getSize(true)[0];
            yAxisWidths += size;
            if (yaxis.options.at == AG.GraphYaxis.AT_LEFT) {
                yAxisleftMargin += size;
            }
        });

        height -= topMargin;
        height -= xAxisHeights;
        width -= yAxisWidths;

        return {
            height: height,
            width: width,
            xAxisHeights: xAxisHeights,
            xAxisTopMargin: xAxisTopMargin,
            topMargin: topMargin,
            yAxisleftMargin: yAxisleftMargin
        };
    },

    getTop: function () {
        var stats = this._stats();
        return  stats.topMargin + stats.xAxisTopMargin;
    },

    getTransform: function () {
        var stats = this._stats();
        console.log('body transform stats: ', stats, this._graph? this._graph.title() : '?');
        return Transform.translate(stats.yAxisleftMargin, stats.topMargin + stats.xAxisTopMargin, 0)
    },

    getSize: function () {
        var stats = this._stats();

        return [stats.width, stats.height];
    }

});
var _axisMixin = {

    setGraph: function (graph) {
        this._graph = graph;
        this._eventInput.emit('update graph', graph);
    },

    _initTickCanvasSurface: function () {
        if (this._tickState != 'none') {
            return;
        }
        var size = this._tickSize();
        this._tickState = 'loading';
        this._tickSurface = new CanvasSurface({
            canvasSize: size,
            size: size,
            properties: {
                opacity: this.options.tickOpacity
            }
        });
        this._tickMod = new StateModifier({
            transform: this._tickModTransform(),
            size: size
        });
        this.modRN.add(this._tickMod).add(this._tickSurface);

        var self = this;

        function listener() {
            if (self._tickState == 'loading' && self._tickSurface._currTarget) {
                var size = self._tickSize();
                self._tickSurface.setSize(size, size);
                self._tickStage = new createjs.Stage(self._tickSurface._currTarget);
                self._tickSurface.removeListener('deploy', _listener);
                self._tickState = 'loaded';
                self.updateTicks();
            }
        }

        var _listener = listener.bind(this);
        this._tickSurface.on('deploy', _listener);

    },

    min: function () {
        if (this.hasOwnProperty('dataMin')) {
            if (this.options.min) {
                return Math.min(this.dataMin, this.options.min);
            } else {
                return this.dataMin;
            }
        } else {
            return this.options.min || 0;
        }
    },

    max: function () {
        if (this.hasOwnProperty('dataMax')) {
            if (this.options.max) {
                return Math.max(this.dataMax, this.options.max);
            } else {
                return this.dataMax;
            }
        } else {
            return this.options.max || 0;
        }
    },

    updateGraph: function () {
        this.mod.setSize(this.getSize());
        this.mod.setOrigin(this.getOrigin());
        this.mod.setTransform(this.getTransform());
        if (this._tickSurface) {
            this._tickSurface.setSize(this._tickSize());
        }
        this.updateTicks();
    },

    updateTicks: function () {

        switch (this._tickState) {
            case 'none':
                this._initTickCanvasSurface();
                break;

            case 'loading':
                break;

            case 'loaded':
                this._drawTicks();
                this._tickState = 'drawn';
                break;
        }

    },

};
/**
 * this surface represents a horizontal(x) axis.
 * it includes labels at the minimum and maximum extreme
 * and tick marks.
 *
 * One (set of) important properties are tickDistance and tickStep.
 * They control how many ticks are drawn. Only one of these should be step.
 *  -- tickStep will define the number of ticks, ignoring the min/max.
 *  -- tickDistance will determine how many units between values will have a tick.
 *
 * @param config
 * @constructor
 */

function GraphXaxis(config) {

    View.call(this, _.defaults({}, config, GraphXaxis.DEFAULTS));

    this.mod = new StateModifier({
        size: this.getSize(),
        origin: this.getOrigin()
    });

    this.surface = new Surface({
        content: 'xaxis',
        classes: ['x-axis', 'x-axis-' + this.options.at, this.options.tickDistance || this.options.tickCount ? 'with-ticks' : 'without-ticks'],
        properties: {
            // backgroundColor: 'green'
            fontSize: this.options.fontSize + this.options.fontUnit
        }
    });

    this.modRN = this._node.add(this.mod);
    this.modRN.add(this.surface);

    AG._bindElements(this);
    this._tickState = 'none';
    this.updateTicks();
}

GraphXaxis.AT_BOTTOM = 'bottom';
GraphXaxis.AT_TOP = 'top';
tickID = 1;

GraphXaxis.DEFAULTS = {
    fontSize: 9,
    fontUnit: 'pt',
    at: GraphXaxis.AT_BOTTOM,
    height: 50,
    key: 'time',
    tickDistance: 1,
    tickOpacity: 0.5,
    tickHeight: 8
};

var _xaxisvalues = _.template('<div class="label min-label"><%= min %></div>' +
    '<div class="label max-label"><%= max %></div>' +
    '<div class="tick-canvas"></div>');

var _tickCanvas = _.template('<canvas id="tick-canvas-<%= id %>" width="<%= width %>" height="<%= height %>"></canvas>');

GraphXaxis.prototype = _.extend(Object.create(View.prototype),
    _axisMixin,
    {
        _tickSize: function () {
            var size = this.getSize();
            if (!size[0]) {
                return;
            }
            size[1] = this.options.tickHeight;
            return size;
        },

        /**
         * this is the transform that links the tick CanvasSurdace to the x-axis
         * @returns {Array}
         * @private
         */
        _tickModTransform: function () {
            var out = Transform.identity;
            switch (this.options.at) {
                case GraphXaxis.AT_TOP:
                    var height = this.getSize()[1] - (this.options.tickHeight);
                    out = Transform.translate(0, height, 0);
                    break;

                case GraphXaxis.AT_BOTTOM:
                    break;
            }

            return out;
        },

        _drawTicks: function () {
            var size = this.getSize();
            this._tickStage.clear();
            var shape = new createjs.Shape();
            var step;
            if (this.options.tickCount) {
                step = size[0] / this.options.tickCount;
            } else if (this.options.tickDistance) {
                var range = this.max() - this.min();
                step = this.options.tickDistance * size[0] / range;
            } else {
                this._tickStage.update();
                return;
            }

            for (var x = 0; x < size[0]; x += step) {
                shape.graphics.mt(x, 0).s('black').ss(1).lt(x, 10).es();
            }
            this._tickStage.addChild(shape);
            this._tickStage.update();
        },

        updateFromData: function (data) {
            console.log('gxa: data ', data);
            if (!data) {
                return;
            }

            var validData = _.filter(data, function (item) {
                return item.hasOwnProperty(this.options.key);
            }, this);

            var min = validData.length ? validData[0][this.options.key] : 0;
            var max = validData.length ? validData[0][this.options.key] : 10;

            _.each(validData, function (data) {
                var value = data[this.options.key];

                if (value < min) {
                    min = value;
                } else if (value > max) {
                    max = value;
                }
            }, this);

            this.dataMin = min;
            this.dataMax = max;
            console.log('range: ', this.min(), '...', this.max());
            var nodes = _xaxisvalues({min: this.min(), max: this.max()});
            this.surface.setContent(nodes);
        },

        getOrigin: function () {
            var out;
            switch (this.options.at) {
                case GraphXaxis.AT_TOP:
                    out = [0, 0];
                    break;

                case GraphXaxis.AT_BOTTOM:
                    out = [0, 1];
                    break;

                default:
                    out = [0, 1];
            }

            return out;
        },

        getSize: function () {
            var out = [undefined, this.options.height];
            if (!this._graph) {
                return out;
            }

            out[0] = this._graph.getSize()[0];

            _.each(this._graph.getElements('yaxis'), function (yaxis) {
                out[0] -= yaxis.options.width;
            });

            return out;
        },

        getTransform: function () {
            var out = Transform.identity;

            if (!this._graph) {
                return out;
            }

            var body = this._graph.getElement('body');
            if (!body) {
                return out;
            }
            var stats = body._stats();

            switch (this.options.at) {
                case GraphXaxis.AT_TOP:
                    out = Transform.translate(stats.yAxisleftMargin, stats.topMargin, 0);
                    break;

                case GraphXaxis.AT_BOTTOM:
                    out = Transform.translate(stats.yAxisleftMargin, 0, 0);
                    break;

            }

            return out;
        }

    });

AG.GraphXaxis = GraphXaxis;
function GraphYaxis(config) {

    View.call(this, _.defaults({}, config, GraphYaxis.DEFAULTS));

    this.mod = new StateModifier({
        size: this.getSize(),
        origin: this.getOrigin()
    });

    this.surface = new Surface({
        content: 'Y axis',
        properties: {
            backgroundColor: 'yellow'
        }
    });

    this._node.add(this.mod).add(this.surface);

    AG._bindElements(this);
}

GraphYaxis.AT_LEFT = 'l';
GraphYaxis.AT_RIGHT = 'r';

GraphYaxis.DEFAULTS = {
    fontSize: 12,
    at: GraphYaxis.AT_LEFT,
    width: 50
};

GraphYaxis.prototype = _.extend(Object.create(View.prototype),
    _axisMixin,
    {

    setGraph: function (graph) {
        this._graph = graph;
        this._eventInput.emit('update graph', graph);
    },

    getOrigin: function () {
        var out;
        switch (this.options.at) {
            case GraphYaxis.AT_LEFT:
                out = [0, 0];
                break;

            case GraphYaxis.AT_RIGHT:
                out = [1, 0];
                break;

            default:
                out = [0, 0];
        }

        return out;
    },

    getSize: function (abs) {
        if (!this._graph) {
            return [undefined, undefined];
        }
        var width = this.options.width;
        var body = this._graph.getElement('body');
        var height = abs || (!body) ? undefined : body.getSize()[1];
        return [width, height]
    },

    updateGraph: function () {
        this.mod.setSize(this.getSize());
        this.mod.setOrigin(this.getOrigin());
        this.mod.setTransform(this.getTransform());
    },

    getTransform: function () {
        if (!this._graph) {
            return Transform.identity;
        }
        var out;
        var yOffset = 0;
        var body = this._graph.getElement('body');

        if (body){
            var stats = body._stats();
            yOffset += stats.topMargin + stats.xAxisHeights;
        }

        out = Transform.translate(0, yOffset, 0);

        return out;
    }

});

AG.GraphYaxis = GraphYaxis;
function Title(label, config){
    View.call(this, _.defaults({}, config, Title.DEFAULTS));
    this.surface = new Surface({
        size: [undefined, this.options.height],
        properties: {
            fontSize: this.options.fontSize,
            fontWeight: this.options.bold ? 'bold' : 'normal',
            fontFamily: this.options.fontFamily,
            margin: this.options.margin ? this.options.margin + 'px' :0,
            padding: this.options.padding ? this.options.padding + 'px' :0,
            textAlign: this.options.textAlign,
            backgroundColor: 'red'
        }
    });

    this._node.add(this.surface);
    this.label(label);
    AG._bindElements(this);
}

Title.DEFAULTS = {
    fontSize: 24,
    bold: true,
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    margin: 0,
    padding: 5,
    textAlign: 'center',
    height: 30
};

Title.prototype = _.extend(Object.create(View.prototype), {

    setGraph: function(graph){
        this._graph = graph;
        this._eventInput.emit('update graph', graph);
    },

    label: function(label){
        if (arguments.length == 0) {
            return this._label || '?';
        }
        this._label = label;

        this.surface.setContent(this._label);
        return this;
    },

    updateGraph: function(){
        this.surface.setSize([this._graph.bg.getSize()[0], this.options.height]);
    }
});

AG.Title = Title;
module.exports = AG;
});