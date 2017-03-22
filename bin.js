#!/usr/bin/env node

const m2s = require('./');
const GeoJsonStream = require('geojson-stream');


process.stdin
  .pipe(GeoJsonStream.parse())
  .pipe(m2s())
  .pipe(GeoJsonStream.stringify())
  .pipe(process.stdout)
