'use strict'

const _ = require('lodash')
const config = require('config')

const p = require('../proxy')
const util = require('../util')
// const mock = require('../util/mock')
const ft = require('../models/fields_table')

const serverProxy = p.ServerUrl

exports.list = function * () {
  // const projectId = this.checkQuery('id').notEmpty().value

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

  const where = {
    // project: projectId
  }

  if (keywords) {
    const keyExp = new RegExp(keywords)
    where.$or = [{
      url: keyExp
    }, {
      name: keyExp
    }]
  }

  let mocks = yield serverProxy.find(where, opt)
  mocks = mocks.map(o => _.pick(o, ft.server))
  this.body = this.util.resuccess(mocks)
}

exports.update = function * () {
  const password = this.checkBody('password').empty().len(6, 20).value
  const nickName = this.checkBody('nick_name').empty().len(2, 20).value
  const headImg = this.checkBody('head_img').empty().value

  if (this.errors) {
    this.body = this.util.refail(null, 10001, this.errors)
    return
  }

  const user = yield serverProxy.getById(this.state.user.id)

  // 修改资料
  user.nick_name = nickName || user.nick_name
  user.head_img = headImg || user.head_img
  user.password = password ? yield util.bhash(password) : user.password

  yield serverProxy.update(user)

  this.body = this.util.resuccess()
}

exports.createUrl = function * () {
  const name = this.checkBody('name').notEmpty().len(1, 20).value
  const url = this.checkBody('url').notEmpty().len(6, 20).value

  if (this.errors) {
    this.body = this.util.refail(null, 10001, this.errors)
    return
  }

  let user = yield serverProxy.getByName(name)

  if (!_.isEmpty(user)) {
    this.body = this.util.refail('注册失败，该用户已存在')
    return
  }

  yield serverProxy.newAndSave(
    name,
    url
  )

  //   user = yield serverProxy.getByName(name)

  //   yield mock.createExample(user.id)

  this.body = this.util.resuccess()
}
