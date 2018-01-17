'use strict'
// created at 2018/1/15 by yangliu

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const schema = new Schema({
  name: String,
  url: String
})

schema.index({ name: 1, url: 1 }, { unique: true })
module.exports = mongoose.model('ServerUrl', schema)
