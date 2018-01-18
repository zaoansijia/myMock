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
  name: String,
  url: String
})

schema.index({ name: 1, url: 1 }, { unique: true })
module.exports = mongoose.model('ServerUrl', schema)
