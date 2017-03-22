var test = require('tape');
var m2sfac = require('./');

test('should work', t=>{
  var m2s = m2sfac();
  var expected = [
    {
      type: 'Feature',
      properties: {
        a: 'b',
        c: 1
      },
      geometry: {
        type: 'Point',
        coordinates: [0, 0]
      }
    },
    {
      type: 'Feature',
      properties: {
        a: 'b',
        c: 1
      },
      geometry: {
        type: 'Point',
        coordinates: [1, 0]
      }
    },
    {
      type: 'Feature',
      properties: {
        a: 'b',
        c: 1
      },
      geometry: {
        type: 'Point',
        coordinates: [2, 0]
      }
    },
    {
      type: 'Feature',
      properties: {
        a: 'c',
        c: 1
      },
      geometry: {
        type: 'Point',
        coordinates: [2, 2]
      }
    },
    {
      type: 'Feature',
      properties: {
        a: '3',
        c: 1
      },
      geometry: {
        type: 'LineString',
        coordinates: [[0, 0],[1, 0],[2, 0]]
      }
    },
    {
      type: 'Feature',
      properties: {
        a: '3',
        c: 9
      },
      geometry: {
        type: 'LineString',
        coordinates: [[0, 0],[1, 0],[2, 0]]
      }
    },
    {
      type: 'Feature',
      properties: {
        a: '3',
        c: 9
      },
      geometry: {
        type: 'LineString',
        coordinates: [[0, 1],[1, 1],[2, 1]]
      }
    },
    {
      type: 'Feature',
      properties: {
        a: 'h',
        c: 9
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[[0, 0],[1, 0],[2, 0], [0,0]], [[0, 1],[1, 1],[2, 1], [0, 1]]]
      }
    },
    {
      type: 'Feature',
      properties: {
        a: 'mh',
        c: 9
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[[0, 0],[1, 0],[2, 0], [0,0]]]
      }
    },
    {
      type: 'Feature',
      properties: {
        a: 'mh',
        c: 9
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[[0, 1],[1, 1],[2, 1], [0, 1]]]
      }
    }
  ];
  t.plan(expected.length + 1);
  m2s.on('data', d=>{
    t.deepEqual(d, expected.shift());
  });
  m2s.on('finish', ()=>{
    t.ok(true, 'done');
  });
  m2s.write({
    type: 'feature',
    properties: {
      a: 'b',
      c: 1
    },
    geometry: {
      type: 'MultiPoint',
      coordinates: [[0, 0],[1, 0],[2, 0]]
    }
  });
  m2s.write({
    type: 'Feature',
    properties: {
      a: 'c',
      c: 1
    },
    geometry: {
      type: 'Point',
      coordinates: [2, 2]
    }
  });
  m2s.write({
    type: 'Feature',
    properties: {
      a: '3',
      c: 1
    },
    geometry: {
      type: 'LineString',
      coordinates: [[0, 0],[1, 0],[2, 0]]
    }
  });
  m2s.write({
    type: 'Feature',
    properties: {
      a: '3',
      c: 9
    },
    geometry: {
      type: 'MultiLineString',
      coordinates: [[[0, 0],[1, 0],[2, 0]], [[0, 1],[1, 1],[2, 1]]]
    }
  });
  m2s.write({
    type: 'Feature',
    properties: {
      a: 'h',
      c: 9
    },
    geometry: {
      type: 'Polygon',
      coordinates: [[[0, 0],[1, 0],[2, 0], [0,0]], [[0, 1],[1, 1],[2, 1], [0, 1]]]
    }
  });
  m2s.end({
    type: 'Feature',
    properties: {
      a: 'mh',
      c: 9
    },
    geometry: {
      type: 'MultiPolygon',
      coordinates: [[[[0, 0],[1, 0],[2, 0], [0,0]]], [[[0, 1],[1, 1],[2, 1], [0, 1]]]]
    }
  });
});
