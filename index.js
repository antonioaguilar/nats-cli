#!/usr/bin/env node

const pkg = require('./package');
const NATS = require('nats');

console.log(pkg.description);
console.log('NATS version:', NATS.version);