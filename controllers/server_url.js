/**
 * @author yangliu at 2018-1-15
 *
 * @desc 服务器地址接口控制器
 *
 */
'use strict'
const _ = require('lodash')
const config = require('config')

const p = require('../proxy')
const ft = require('../models/fields_table')

const serverProxy = p.ServerUrl

exports.list = function* () {
  const pageSize = this.checkQuery('page_size').empty().toInt().gt(0)
    .default(config.get('pageSize')).value

  const pageIndex = this.checkQuery('page_index').empty().toInt().gt(0)
    .default(1).value

  const keywords = this.checkQuery('keywords').value

  if (this.errors) {
    this.body = this.util.refail(null, 10001, this.errors)
    return
  }

  const opt = {
    skip: (pageIndex - 1) * pageSize,
    limit: pageSize,
    sort: 'projSaveName'
  }

  const where = {}

  if (keywords) {
    const keyExp = new RegExp(keywords)
    where.$or = [{
      name: keyExp
    }, {
      url: keyExp
    }, {
      project: keyExp
    }]
  }

  let mocks = yield serverProxy.find(where, opt)
  mocks = mocks.map(o => _.pick(o, ft.server))
  this.body = this.util.resuccess(mocks)
}

exports.update = function* () {
  const id = this.checkBody('id').notEmpty().value
  const project = this.checkBody('project').notEmpty().value
  const projSaveName = this.checkBody('projSaveName').notEmpty().value
  const name = this.checkBody('name').notEmpty().value
  const url = this.checkBody('url').notEmpty().value
  const transmitUrl = this.checkBody('transmitUrl').value
  // const switchUrl = this.checkBody('switchUrl').notEmpty().value

  if (this.errors) {
    this.body = this.util.refail(null, 10001, this.errors)
    return
  }

  // 获取该服务器地址
  const sUrl = yield serverProxy.getById(id)

  if (!sUrl) {
    this.body = this.util.refail('更新失败，此服务器 不存在')
    return
  }

  // 更新属性
  sUrl.project = project || sUrl.project
  sUrl.projSaveName = projSaveName || sUrl.projSaveName
  sUrl.name = name || sUrl.name
  sUrl.url = url || sUrl.url
  sUrl.transmitUrl = transmitUrl || sUrl.transmitUrl
  // sUrl.switchUrl = switchUrl
  // 更新属性后查重
  const existQuery = {
    _id: { $ne: id },
    $or: [{
      name: sUrl.name
    }, {
      url: sUrl.url
    }, {
      projSaveName: projSaveName
    }, {
      project: project
    }]
  }
  // 查重
  const existURL = yield serverProxy.findOne(existQuery)

  if (existURL) {
    debugger
    if (existURL.project === project && existURL.projSaveName !== projSaveName) {
      this.body = this.util.refail('更新失败，该项目保存名为' + existURL.projSaveName)
      return
    }
    if (existURL.project !== project && existURL.projSaveName === projSaveName) {
      this.body = this.util.refail('更新失败，该项目显示名为' + existURL.project)
      return
    }
    if (existURL.name === name && existURL.project === project) {
      this.body = this.util.refail('更新失败，该团队已有此服务器名')
      return
    } else if (existURL.url === url) {
      this.body = this.util.refail('更新失败，已有该服务器地址')
      return
    }
  }

  yield serverProxy.updateById(sUrl)

  this.body = this.util.resuccess()
}

exports.add = function* () {
  const project = this.checkBody('project').notEmpty().value
  const projSaveName = this.checkBody('projSaveName').notEmpty().value
  const name = this.checkBody('name').notEmpty().value
  const url = this.checkBody('url').notEmpty().value
  const transmitUrl = this.checkBody('transmitUrl').value
  if (this.errors) {
    this.body = this.util.refail(null, 10001, this.errors)
    return
  }
  // 更新属性后查重
  const existQuery = {
    $or: [{
      project: project
    }, {
      projSaveName: projSaveName
    }, {
      name: name
    }, {
      url: url
    }]
  }
  let user = yield serverProxy.findOne(existQuery)
  if (user) {
    if (user.project === project && user.projSaveName !== projSaveName) {
      this.body = this.util.refail('新增失败，该项目保存名为' + user.projSaveName)
      return
    }
    if (user.project !== project && user.projSaveName === projSaveName) {
      this.body = this.util.refail('新增失败，该项目显示名为' + user.project)
      return
    }
    if (user.project === project && user.name === name) {
      this.body = this.util.refail('新增失败，该项目已有此服务器名')
      return
    }
    if (user.url === url) {
      this.body = this.util.refail('新增失败，已有该服务器地址')
      return
    }
  }

  yield serverProxy.newAndSave(
    project,
    projSaveName,
    name,
    url,
    transmitUrl
  )
  this.body = this.util.resuccess()
}
exports.delete = function* () {
  const id = this.checkBody('id').notEmpty().value

  if (this.errors) {
    this.body = this.util.refail(null, 10001, this.errors)
    return
  }

  yield serverProxy.delById(id)

  this.body = this.util.resuccess()
}
