/**
 * @author yangliu at 2018-1-15
 *
 * @desc 服务器地址接口model定义
 *
 */
'use strict'

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const schema = new Schema({
  project: String,
  projSaveName: String,
  name: String,
  url: String,
  transmitUrl: Object,
  switchUrl: Boolean,
  create_at: {
    type: Date,
    default: Date.now
  }
})
schema.index({ url: 1, create_at: -1 })
module.exports = mongoose.model('ServerUrl', schema)
