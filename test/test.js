"use strict"

var findCircuits = require("../johnson.js");

var test = require('tape');

test("find elementarty circuits in a directed graph", function(t) {
  t.test('simple directed graph', function(t) {
      var g = [
        [4], // 0
        [0,2], // 1
        [1,3], // 2
        [2], // 3
        [1], // 4
        [4,6], // 5
        [5,2], // 6
        [7,6,3], // 7
      ]

      var circuits = findCircuits(g);
      t.equal(circuits.length, 4);
      t.end();
  })

  t.test('another simple directed graph', function(t) {
    //   V4      V2
    // +-<---o---<---o---<--+
    // |             |      |
    // V0 o             ^      o V3
    // |           V1|      |
    // +------>------o--->--+
    var g = [
      [1],
      [2, 3],
      [4],
      [2],
      [0]
    ]

    var circuits = findCircuits(g);
    t.deepEqual(circuits, [[0, 1, 2, 4, 0], [0, 1, 3, 2, 4, 0]]);
    t.end();
  });

  t.test('it handles large number of nodes and edges', function(t) {
    var N = 100;
    var L = 10;
    var g = []
    for (var i = 0; i < N; i++) {
      g[i] = [];
      for (var j = 0; j < L; j++) {
        var target = Math.floor(Math.random() * N);
        if (i === target) continue; // no self-link
        if (g[i].indexOf(target) === -1) g[i].push(target); // no duplicate links
      }
    }

    var circuits = findCircuits(g);
    console.log(circuits);
    t.end();
  })



  t.end()
})
