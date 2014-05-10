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