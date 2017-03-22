const Transform = require('readable-stream').Transform;

const single = new Set([
  'Point', 'LineString', 'Polygon'
]);
const multi = new Set([
  'MultiPoint', 'MultiLineString', 'MultiPolygon'
]);
const col = new Set(['GeometryCollection']);
const m2s = ()=> new Transform({
  objectMode: true,
  transform (feature, _, next) {
    const type = feature.geometry.type;
    if (single.has(type)) {
      this.push(feature);
      return next();
    }
    if (col.has(type)) {
      return next(new Error('invalid type'));
    }
    if (!multi.has(type)) {
      console.log('wtf?');
      console.log(JSON.stringify(feature));
      return next(new Error('should not get here'));
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
    next();
  }
});

module.exports = m2s;
