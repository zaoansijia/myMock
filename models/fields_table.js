'use strict'

module.exports = {
  group: ['_id', 'name'],
  mock: ['_id', 'url', 'method', 'classify', 'description', 'mode', 'parameters', 'response_model'],
  server: ['_id', 'url', 'name', 'project', 'projSaveName', 'transmitUrl'],
  user: ['_id', 'name', 'nick_name', 'head_img', 'token', 'selectedUrl'],
  project: ['_id', 'name', 'url', 'description', 'swagger_url', 'members', 'extend', 'group'],
  projectExtend: ['_id', 'is_workbench']
}
