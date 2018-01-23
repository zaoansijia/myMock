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

exports.list = function * () {
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
    sort: '-create_at'
  }

  const where = {}

  if (keywords) {
    const keyExp = new RegExp(keywords)
    where.$or = [{
      name: keyExp
    }, {
      url: keyExp
    }, {
      team: keyExp
    }]
  }

  let mocks = yield serverProxy.find(where, opt)
  mocks = mocks.map(o => _.pick(o, ft.server))
  this.body = this.util.resuccess(mocks)
}

exports.update = function * () {
  const id = this.checkBody('id').notEmpty().value
  const name = this.checkBody('name').notEmpty().value
  const url = this.checkBody('url').notEmpty().value
  const team = this.checkBody('team').notEmpty().value

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
  sUrl.name = name || sUrl.name
  sUrl.url = url || sUrl.url
  sUrl.team = team || sUrl.team

  // 更新属性后查重
  const existQuery = {
    _id: { $ne: id },
    $or: [{
      name: sUrl.name
    }, {
      url: sUrl.url
    }, {
      team: team
    }]
  }
  // 查重
  const existURL = yield serverProxy.findOne(existQuery)

  if (existURL) {
    if (existURL.name === name && existURL.team === team) {
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

exports.add = function * () {
  const name = this.checkBody('name').notEmpty().len(1, 20).value
  const url = this.checkBody('url').notEmpty().len(6, 40).value
  const team = this.checkBody('team').notEmpty().len(1, 40).value

  if (this.errors) {
    this.body = this.util.refail(null, 10001, this.errors)
    return
  }
  // 更新属性后查重
  const existQuery = {
    $or: [{
      name: name
    }, {
      url: url
    }, {
      team: team
    }]
  }
  let user = yield serverProxy.findOne(existQuery)
  if (user) {
    if (user.team === team && user.name === name) {
      this.body = this.util.refail('新增失败，该团队已有此服务器名')
      return
    }
    if (user.url === url) {
      this.body = this.util.refail('新增失败，已有该服务器地址')
      return
    }
  }

  yield serverProxy.newAndSave(
    name,
    url,
    team
  )
  this.body = this.util.resuccess()
}
exports.delete = function * () {
  const id = this.checkBody('id').notEmpty().value

  if (this.errors) {
    this.body = this.util.refail(null, 10001, this.errors)
    return
  }

  yield serverProxy.delById(id)

  this.body = this.util.resuccess()
}
