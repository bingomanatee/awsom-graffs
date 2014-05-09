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