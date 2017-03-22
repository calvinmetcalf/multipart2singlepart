const syncthrough = require('syncthrough')
const single = new Set([
  'Point', 'LineString', 'Polygon'
]);
const multi = new Set([
  'MultiPoint', 'MultiLineString', 'MultiPolygon'
]);
const col = new Set(['GeometryCollection']);
const m2s = ()=> syncthrough(function (feature) {
  if (!feature.geometry || !feature.geometry.type) {
    throw new Error('invalid feature');
  }
  const type = feature.geometry.type;

  if (single.has(type)) {
    return feature;
  }
  if (col.has(type)) {
    throw new Error('invalid type');
  }
  if (!multi.has(type)) {
    throw new Error('unknown type');
  }
  const newType = type.slice(5);
  const properties = feature.properties;
  for (let item of feature.geometry.coordinates) {
    this.push({
      type: 'Feature',
      properties: Object.assign({}, properties),
      geometry:{
        type: newType,
        coordinates: item
      }
    });
  }
});

module.exports = m2s;
