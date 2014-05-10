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
    width: 50,
    tickWidth: 8
};

GraphYaxis.prototype = _.extend(Object.create(View.prototype),
    _axisMixin,
    {
        _tickSize: function () {
            var size = this.getSize();
            if (!size[1]) {
                return;
            }
            size[0] = this.options.tickWidth;
            return size;
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

        getSize: function (abs) {
            if (!this._graph) {
                return [undefined, undefined];
            }
            var width = this.options.width;
            var body = this._graph.getElement('body');
            var height = !(abs || ((body) ? body.getSize()[1] : undefined));
            return [width, height]
        },

        getTransform: function () {
            if (!this._graph) {
                return Transform.identity;
            }
            var out;
            var yOffset = 0;
            var body = this._graph.getElement('body');

            if (body) {
                var stats = body._stats();
                yOffset += stats.topMargin + stats.xAxisHeights;
            }

            out = Transform.translate(0, yOffset, 0);

            return out;
        }

    });

AG.GraphYaxis = GraphYaxis;