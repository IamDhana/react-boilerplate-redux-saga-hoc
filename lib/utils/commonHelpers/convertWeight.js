"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertWeight = void 0;

var convertWeight = function convertWeight(value, convertTo) {
  return value ? (convertTo === 'lbs' ? value * 2.205 : value / 2.205).toFixed(2) : '';
};

exports.convertWeight = convertWeight;