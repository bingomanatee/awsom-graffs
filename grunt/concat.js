// Empties folders to start fresh
module.exports = {
    lodash: {
        options: {
            banner: "define(function(require, exports, module) { \n" +
                "\n",
            footer: "\n" +
                "module.exports = _;\n" +
                "\n});"
        },
        src: 'AG/lodash.custom.min.js',
        dest: 'AG/util/lodash.r.js'
    },

    easel: {
        options: {
            banner: "",
            footer: "\n\ndefine(function(require, exports, module) {\n" +
                "module.exports = createjs;\n" +
                "\n});"
        },
        src: 'AG/easeljs-0.7.1.min.js',
        dest: 'AG/util/easeljs.r.js'
    },

    ag: {
        options: {
            banner: "define(function(require, exports, module) {\n",
            footer: "\nmodule.exports = AG;\n" +
                "});"
        },
        src: [
            'AG/AG.js', 'AG/Graph.js', 'AG/GraphBody.js',
            'AG/_axisMixin.js', 'AG/GraphXaxis.js', 'AG/GraphYaxis.js',
            'AG/Title.js'
        ],
        dest: 'AG/AG.min.js'
    }
};
