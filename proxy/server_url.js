/**
 * @author yangliu at 2018-1-15
 *
 * @desc 服务器地址接口方法调用
 *
 */

'use strict'

const m = require('../models')

const ServerUrlModel = m.ServerUrl

exports.newAndSave = function (name, url, team) {
  const serverUrl = new ServerUrlModel()

  serverUrl.name = name
  serverUrl.url = url
  serverUrl.team = team

  return serverUrl.save()
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
exports.updateById = function (serverUrl) {
  return ServerUrlModel.update({
    _id: serverUrl.id
  }, {
    $set: {
      name: serverUrl.name,
      url: serverUrl.url,
      team: serverUrl.team
    }
  })
}
