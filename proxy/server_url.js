'use strict'
// created at 2018/1/15 by yangliu

const m = require('../models')

const ServerUrlModel = m.ServerUrl

exports.newAndSave = function (name, url) {
  const serverUrl = new ServerUrlModel()

  serverUrl.name = name
  serverUrl.url = url

  return serverUrl.save()
}

exports.update = function (serverUrl) {
  return ServerUrlModel.update({
    _id: serverUrl.id
  }, {
    $set: {
      name: serverUrl.name,
      url: serverUrl.url
    }
  })
}

exports.getByName = function (serverUrlName) {
  return ServerUrlModel.findOne({ name: serverUrlName })
}

exports.getById = function (serverUrlId) {
  return ServerUrlModel.findById(serverUrlId)
}

exports.find = function (query, opt) {
  console.log(query, 'query')
  return ServerUrlModel.find(query, {}, opt)
}
