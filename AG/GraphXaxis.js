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
            backgroundColor: 'green'
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
    fontSize: 12,
    at: GraphXaxis.AT_BOTTOM,
    height: 50,
    key: 'time'
};

var _xaxisvalues = _.template('<div class="label min-label"><%= min %></div>' +
    '<div class="label max-label"><%= max %></div>' +
    '<div class="tick-canvas"></div>');

var _tickCanvas = _.template('<canvas id="tick-canvas-<%= id %>" width="<%= width %>" height="<%= height %>"></canvas>');
GraphXaxis.prototype = _.extend(Object.create(View.prototype), {

    setGraph: function (graph) {
        this._graph = graph;
        this._eventInput.emit('update graph', graph);
    },

    _initTickCanvasSurface: function () {
        if (this._tickState != 'none') {
            return;
        }
        var size = this.getSize();
        if (!size[0]){
            return;
        }
        this._tickState = 'loading';
        this._tickSurface = new Surface({
            size: [size[0], 10],
            properties: {
                backgroundColor: 'rgba(0,0,255,0.5)'
            }
        });
        this._tickMod = new StateModifier({
            transform: this._tickModTransform()
        });
        this.modRN.add(this._tickMod).add(this._tickSurface);

        this._tickID = ++tickID;
        this._tickSurface.setContent(_tickCanvas({width: size[0], id: this._tickID, height: 10}));
        function listener() {
            if(this._tickState == 'loading'){
                this._tickCanvas = document.getElementById('tick-canvas-' + this._tickID);
                this._tickStage = new createjs.Stage(this._tickCanvas);
                this._tickSurface.removeListener('deploy', _listener);
                this._tickState = 'loaded';
                this.updateTicks();
            }
        }

        var _listener = listener.bind(this);
        this._tickSurface.on('deploy', _listener);

    },

    _tickModTransform: function () {
        var out = Transform.identity;
        switch (this.options.at) {
            case GraphXaxis.AT_TOP:
                var height = this.getSize()[1] - 10;
                out = Transform.translate(0, height, 0);
                break;

            case GraphXaxis.AT_BOTTOM:
                break;

        }
        return out;
    },

    updateTicks: function () {

        switch (this._tickState){
            case 'none':
                 this._initTickCanvasSurface();
                break;

            case 'loading':
                break;

            case 'loaded':
                this._tickState = 'drawn';
                var size = this.getSize();
                this._tickStage.clear();
                var shape = new createjs.Shape();
                shape.graphics.f('white').dr(0, 0, 500, 10);
                for (var x = 0; x < 500; x += 10) {
                    shape.graphics.mt(x, 0).s('black').ss(1).lt(x, 10).es();
                }
                this._tickStage.addChild(shape);
                this._tickStage.update();
                break;
        }

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
            console.log('value:', value);

            if (value < min) {
                min = value;
            } else if (value > max) {
                max = value;
            }
        }, this);

        var nodes = _xaxisvalues({min: min, max: max});
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

    updateGraph: function () {
        this.mod.setSize(this.getSize());
        this.mod.setOrigin(this.getOrigin());
        this.mod.setTransform(this.getTransform());
        if (this._tickSurface) {
            this._tickSurface.setSize([this.getSize()[0], 10]);
        }
        this.updateTicks();
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