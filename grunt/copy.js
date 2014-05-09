// Copies remaining files to places other tasks can use
module.exports = {
    dist: {
        files: [
            {
                expand: true,
                dot: true,
                cwd: '<%= config.app %>',
                dest: '<%= config.dist %>',
                src: [
                    '**/**.{ico,png,txt,jpg,svg,wof,ttf}',
                    '.htaccess',
                    'images/{,*/}*.webp',
                    // '{,*/}*.html',
                    'styles/fonts/{,*/}*.*',
                    'lib/famous/**/**.css'
                ]
            }
        ]
    },
    ag: {
        files: [
            {
                src: 'AG/AG.min.js',
                dest: 'app/src/AG.js'
            },
            {
                src: 'AG/util/easeljs.r.js',
                dest: 'app/src/util/easeljs.r.js'
            },
            {
                src: 'AG/util/lodash.r.js',
                dest: 'app/src/util/lodash.r.js'
            }
        ]
    }
};
