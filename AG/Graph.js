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