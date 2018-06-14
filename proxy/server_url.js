/**
 * @author yangliu at 2018-1-15
 *
 * @desc 服务器地址接口方法调用
 *
 */

'use strict'

const m = require('../models')

const ServerUrlModel = m.ServerUrl

exports.newAndSave = function (project, projSaveName, name, url, transmitUrl) {
  const serverUrl = new ServerUrlModel()
  serverUrl.project = project
  serverUrl.projSaveName = projSaveName
  serverUrl.name = name
  serverUrl.url = url
  serverUrl.transmitUrl = transmitUrl
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
  return ServerUrlModel.remove({ _id: id })
}
exports.updateById = function (serverUrl) {
  return ServerUrlModel.update({
    _id: serverUrl.id
  }, {
    $set: {
      project: serverUrl.project,
      projSaveName: serverUrl.projSaveName,
      name: serverUrl.name,
      url: serverUrl.url,
      transmitUrl: serverUrl.transmitUrl,
      switchUrl: serverUrl.switchUrl
    }
  })
}
