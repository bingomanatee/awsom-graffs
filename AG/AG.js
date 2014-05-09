var createjs = require('util/easeljs.r');
var _ = require('util/lodash.r');
var View = require('famous/core/View');
var StateModifier = require('famous/modifiers/StateModifier');
var ContainerSurface = require('famous/surfaces/ContainerSurface');
var Surface = require('famous/core/Surface');
var Transform = require('famous/core/Transform');

var AG = {
    Graph: Graph,

    _bindElements: function(ele){

        var setGraph = (ele.setGraph || ele.updateGraph || _.identity).bind(ele);
        var updateGraph = (ele.updateGraph || _.identity).bind(ele);
        var updateFromData = (ele.updateFromData || _.identity).bind(ele);

        ele._eventInput.on('added to graph', setGraph);
        ele._eventInput.on('update graph', updateGraph);
        ele._eventInput.on('element added', updateGraph);
        ele._eventInput.on('data', updateFromData);
    }
}; // the sandbox singleton for Awesomm-graffs
