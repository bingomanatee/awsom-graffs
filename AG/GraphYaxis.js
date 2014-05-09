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

GraphYaxis.prototype = _.extend(Object.create(View.prototype), {

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