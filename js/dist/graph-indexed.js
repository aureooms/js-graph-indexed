"use strict";

(function () {

	'use strict';

	var definition = function definition(exports, undefined) {

		/* js/src/Indexed.js */
		/**
   * Wrapper allowing
   * direct index reference for vertices (like in an adjacency matrix).
   *
   */

		var Indexed = function Indexed(G, V, indices) {

			this.G = G;
			this.V = V;
			this.indices = indices;
		};

		Indexed.prototype.vadd = function () {

			var ref = this.G.vadd();

			this.indices.set(ref, this.V.length);

			this.V.push(ref);

			return ref;
		};

		Indexed.prototype.vdel = function (v) {

			// id to delete
			var i = this.indices.get(v);

			var len = this.V.length;

			// last id
			var j = len - 1;

			if (i < j) {

				// swap deleted vertex
				// with last vertex

				// move vertex reference
				this.V[i] = this.V[j];

				// change vertex id
				this.indices.set(this.V[i], i);
			}

			// remove last vertex
			this.V.splice(j, 1);

			// remove vertex from underlying data structure
			this.G.vdel(v);
		};

		Indexed.prototype.eadd = function (u, v) {

			return this.G.eadd(u, v);
		};

		Indexed.prototype.edel = function (e) {

			return this.G.edel(e);
		};

		Indexed.prototype.vitr = function () {

			return this.G.vitr();
		};

		Indexed.prototype.iitr = function (v) {

			return this.G.iitr(v);
		};

		Indexed.prototype.nitr = function (w) {

			return this.G.nitr(w);
		};

		Indexed.prototype.eitr = function () {

			return this.G.eitr();
		};

		Indexed.prototype.edges = function () {

			return this.G.edges();
		};

		Indexed.prototype.incident = function (v) {

			return this.G.incident(v);
		};

		Indexed.prototype.endpoints = function (e) {

			return this.G.endpoints(e);
		};

		exports.Indexed = Indexed;

		/* js/src/_index.js */

		var index = function index(Graph) {

			return function () {

				return new Indexed(new Graph(), [], new WeakMap());
			};
		};

		exports.index = index;

		return exports;
	};
	if (typeof exports === "object") {
		definition(exports);
	} else if (typeof define === "function" && define.amd) {
		define("@aureooms/js-graph-indexed", [], function () {
			return definition({});
		});
	} else if (typeof window === "object" && typeof window.document === "object") {
		definition(window["graphindexed"] = {});
	} else console.error("unable to detect type of module to define for @aureooms/js-graph-indexed");
})();