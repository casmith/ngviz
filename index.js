'use strict';

var d3 = require('d3');
var jsdom = require('jsdom');

jsdom.env({
	html:'',
	features: { 
		QuerySelector:true 
	},
	done: function(errors, window) {
		var width = 960,
			height = 500,
			color = d3.scale.category20c();

		var treemap = d3.layout.treemap()
			.padding(4)
			.size([width, height])
			.value(function(d) { return d.size; });

		var svg = d3.select(window.document.body).append("svg")
			.attr("width", width)
			.attr("height", height)
			.append("g")
			.attr("transform", "translate(-.5,-.5)");

		var json = require('./test.json');
		var cell = svg.data([json]).selectAll("g")
			.data(treemap.nodes)
			.enter().append("g")
			.attr("class", "cell")
			.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

		cell.append("rect")
			.attr("width", function(d) { return d.dx; })
			.attr("height", function(d) { return d.dy; })
			.style("fill", function(d) { return d.children ? color(d.name) : null; });

		cell.append("text")
			.attr("x", function(d) { return d.dx / 2; })
			.attr("y", function(d) { return d.dy / 2; })
			.attr("dy", ".35em")
			.attr("text-anchor", "middle")
			.text(function(d) { return d.children ? null : d.name; });

		console.log('<!DOCTYPE html><meta charset="utf-8"><style>rect {fill: none;stroke: #fff;}text {font: 10px sans-serif;}</style><body>' 
			+ d3.select(window.document.body).html() 
			+ '</body>');
	}
});