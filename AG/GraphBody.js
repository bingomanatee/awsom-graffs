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