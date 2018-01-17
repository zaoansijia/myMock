
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

exports.findOne = function (query) {
  return ServerUrlModel.findOne(query)
}

exports.getById = function (serverUrlId) {
  return ServerUrlModel.findById(serverUrlId)
}

exports.find = function (query, opt) {
  return ServerUrlModel.find(query, {}, opt)
}

exports.delById = function (id) {
  return ServerUrlModel.remove({_id: id})
}
exports.updateById = function (mock) {
  return ServerUrlModel.update({
    _id: mock.id
  }, {
    $set: {
      url: mock.url,
      name: mock.name
    }
  })
}
