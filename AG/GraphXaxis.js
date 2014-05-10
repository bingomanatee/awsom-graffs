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