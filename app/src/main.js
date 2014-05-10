/* globals define */
define(function (require, exports, module) {
    'use strict';
    // import dependencies
    var Engine = require('famous/core/Engine');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Transform = require('famous/core/Transform');
    var Easing = require('famous/transitions/Easing');
    var AG = require('AG');

    // create the main context
    var mainContext = Engine.createContext();
    mainContext.setPerspective(500);

    // your app here
    var graphSize = [window.innerWidth / 4, window.innerHeight / 3];
    var O_LEFT = 0.05;
    var O_MIDDLE = 0.5;
    var O_RIGHT = 1 - O_LEFT;

    var O_ROW_1 = 0.05;
    var O_ROW_2 = 0.95;

    /* ---------- GRAPH ONE -------------- */
    var graphMod = new StateModifier({
        origin: [O_LEFT, O_ROW_1],
        size: graphSize,
        transform: Transform.translate(0, 0, -10000)
    });

    mainContext.add(graphMod).add(new AG.Graph({size: graphSize},
        [
            {time: 1, value: 10},
            {time: 5, value: 15}
        ]).title('X Axis Graph').xAxis(new AG.GraphXaxis({
            tickStep: 1
        })));

    graphMod.setTransform(Transform.translate(0, 0, 0), {duration: 1200, curve: Easing.inQuint});

    /* ---------- GRAPH 2 -------------- */

    var graphMod2 = new StateModifier({
        origin: [O_MIDDLE, O_ROW_1],
        size: graphSize,
        transform: Transform.translate(0, 0, -10000)
    });

    mainContext.add(graphMod2).add(new AG.Graph({size: graphSize}).title('No Axis Graph'));

    graphMod2.setTransform(Transform.translate(0, 0, 0), {duration: 700, curve: Easing.inQuint});

    /* ---------- GRAPH THREE -------------- */

    var graphMod3 = new StateModifier({
        origin: [O_RIGHT, O_ROW_1],
        size: graphSize,
        transform: Transform.translate(0, 0, -10000)
    });

    mainContext.add(graphMod3).add(new AG.Graph({
        size: graphSize
    })
        .title('X axis Graph')
        .xAxis(new AG.GraphXaxis({at: AG.GraphXaxis.AT_TOP, height: 20})));

    graphMod3.setTransform(Transform.translate(0, 0, 0), {duration: 700, curve: Easing.inQuint});

    /* ---------- GRAPH 4 -------------- */

    var graphMod4 = new StateModifier({
        origin: [O_LEFT, O_ROW_2],
        size: graphSize,
        transform: Transform.translate(0, 0, -10000)
    });

    mainContext.add(graphMod4).add(new AG.Graph({size: graphSize}, [
        {time: 1, value: 2},
        {time: 3, value: 6},
        {time: 10, value: 18}
    ])
        .title('TWO x axis')
        .xAxis(new AG.GraphXaxis({at: AG.GraphXaxis.AT_BOTTOM, height: 50, tickCount: 4, key: 'time'}))
        .xAxis(new AG.GraphXaxis({at: AG.GraphXaxis.AT_TOP, height: 50, tickDistance: 0.5, key: 'time'})));

    graphMod4.setTransform(Transform.translate(0, 0, 0), {duration: 1200, curve: Easing.inQuint});

    /* ---------- GRAPH FIVE -------------- */

    var graphMod = new StateModifier({
        origin: [O_MIDDLE, O_ROW_2],
        size: graphSize,
        transform: Transform.translate(0, 0, -10000)
    });

    mainContext.add(graphMod).add(new AG.Graph({size: graphSize})
        .title('X Axis Graph')
        .yAxis(new AG.GraphYaxis()));

    graphMod.setTransform(Transform.translate(0, 0, 0), {duration: 1200, curve: Easing.inQuint});

    /* ---------- GRAPH SIX -------------- */

    var graphMod = new StateModifier({
        origin: [O_RIGHT, O_ROW_2],
        size: graphSize,
        transform: Transform.translate(0, 0, -10000)
    });

    mainContext.add(graphMod).add(new AG.Graph({size: graphSize})
        .title('X and Y Axis Graph')
        .xAxis(new AG.GraphXaxis({at: AG.GraphXaxis.AT_TOP, height: 20}))
        .yAxis(new AG.GraphYaxis()));

    graphMod.setTransform(Transform.translate(0, 0, 0), {duration: 1200, curve: Easing.inQuint});
});
