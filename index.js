#!/usr/bin/env node --harmony

/**
 * Copyright (C) 2016 Swift Navigation Inc.
 * Contact: Joshua Gross <josh@swift-nav.com>
 * This source is subject to the license found in the file 'LICENSE' which must
 * be distributed together with this source. All other rights reserved.
 *
 * THIS CODE AND INFORMATION IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND,
 * EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A PARTICULAR PURPOSE.
 */

"use strict";

var SerialPort = require('serialport');
var commander = require('commander');
var pkg = require('./package.json');

var serial, baudrate;

commander.version(pkg.version).arguments('<serial> <baudrate>').action(function (s, b) {
  serial = s;
  baudrate = parseInt(b, 10);
}).parse(process.argv);

if (!serial || !baudrate) {
  console.error('no serial or baudrate given');
  process.exit(1);
}

var device = new SerialPort(serial, {
  baudrate: baudrate
});

device.on('open', function () {
  device.on('data', function (data) {
    process.stdout.write(data);
  });
});
