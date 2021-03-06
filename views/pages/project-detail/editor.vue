<template>
  <transition name="fade">
    <div class="em-editor" v-show="value.show">
      <div class="em-editor__editor">
        <div ref="codeEditor"></div>
      </div>
      <div class="panel-info panel-wrapper">
        <em-spots :size="10"></em-spots>
        <div class="wrapper">
          <h2>{{isEdit ? $t('p.detail.editor.title[0]') : $t('p.detail.editor.title[1]')}}</h2>
          <div class="em-editor__form">
            <Form label-position="top">
              <Form-item label="Method">
                <i-select v-model="temp.method">
                  <Option v-for="item in methods" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </i-select>
              </Form-item>
              <Form-item label="URL">
                <i-input v-model="temp.url">
                  <span slot="prepend">/</span>
                </i-input>
              </Form-item>
              <Form-item :label="$t('p.detail.columns[3]')">
                <i-input v-model="temp.classify"></i-input>
              </Form-item>
              <Form-item :label="$t('p.detail.columns[0]')">
                <i-input v-model="temp.description"></i-input>
              </Form-item>
              <Form-item v-if="temp.method.toLowerCase() === 'post'" label="请求参数的Content-type">
                <i-select v-model="temp.reqContentType">
                  <Option v-for="item in contentTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </i-select>
              </Form-item>
              <Form-item :label="$t('p.detail.columns[2]')">
                <div class="ivu-row" justify="end">
                  <div class="ivu-col ivu-col-span-24">
                    <Button type="text" @click="addParam" class="add-param">{{$t('p.detail.editor.action[2]')}}</Button>
                  </div>
                </div>
                <div class="ivu-row" style="">
                  <params-body :initParams="temp.parameters" @update="updateParam" />
                </div>
              </Form-item>
              <Form-item :label="$t('p.detail.editor.autoClose')" v-if="isEdit">
                <i-switch v-model="autoClose"></i-switch>
              </Form-item>
              <Form-item>
                <Button type="primary" long @click="submit">{{isEdit ? $t('p.detail.editor.action[0]') : $t('p.detail.editor.action[1]')}}</Button>
              </Form-item>
            </Form>
          </div>
          <div class="em-editor__control">
            <div class="em-proj-detail__switcher">
              <ul>
                <li @click="format">{{$t('p.detail.editor.control[0]')}}</li>
                <li @click="preview" v-if="isEdit">{{$t('p.detail.editor.control[1]')}}</li>
                <li @click="close">{{$t('p.detail.editor.control[2]')}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Vue from 'vue'
import jsBeautify from 'js-beautify/js/lib/beautify'
import ParamsBody from './params-body.vue'
let ace

if (typeof window !== 'undefined') {
  ace = require('brace')
  require('brace/mode/javascript')
  require('brace/theme/monokai')
  require('brace/ext/language_tools')
  require('brace/ext/searchbox')
  require('./snippets')
}

Vue.component('ParamsBody', ParamsBody)

export default {
  props: {
    value: {}
  },
  data () {
    return {
      codeEditor: null,
      autoClose: true,
      methods: [
        { label: 'get', value: 'get' },
        { label: 'post', value: 'post' },
        { label: 'put', value: 'put' },
        { label: 'delete', value: 'delete' },
        { label: 'patch', value: 'patch' }
      ],
      contentTypes: [
        { label: 'application/json', value: 'body' },
        { label: 'application/x-www-form-urlencoded', value: 'formData' }
      ],
      temp: {
        url: '',
        mode: '',
        method: '',
        description: '',
        parameters: [],
        classify: '',
        reqContentType: 'formData'
      }
    }
  },
  computed: {
    isEdit () {
      return !!this.value._id
    }
  },
  mounted () {
    this.codeEditor = ace.edit(this.$refs.codeEditor)
    this.codeEditor.getSession().setMode('ace/mode/javascript')
    this.codeEditor.setTheme('ace/theme/monokai')
    this.codeEditor.setOption('tabSize', 2)
    this.codeEditor.setOption('fontSize', 15)
    this.codeEditor.setOption('enableLiveAutocompletion', true)
    this.codeEditor.setOption('enableSnippets', true)
    this.codeEditor.clearSelection()
    this.codeEditor.getSession().setUseWorker(false)
    this.codeEditor.on('change', this.onChange)
  },
  watch: {
    'value.show': function (show) {
      document.body.style.overflow = show ? 'hidden' : 'auto'
      if (show) {
        if (this.isEdit) {
          this.autoClose = true
          this.temp.url = this.value.url.slice(1) // remove /
          this.temp.mode = this.value.mode
          this.temp.method = this.value.method
          this.temp.description = this.value.description
          this.temp.parameters = this.value.parameters ? JSON.parse(this.value.parameters) : []
          this.temp.classify = this.value.classify || ''
          this.temp.reqContentType = (this.temp.parameters[0] && this.temp.parameters[0].in) || 'formData'
          this.codeEditor.setValue(this.temp.mode)
        } else {
          this.temp.url = ''
          this.temp.mode = '{"data": {}}'
          this.temp.method = 'get'
          this.temp.description = ''
          this.temp.parameters = []
          this.temp.classify = ''
          this.temp.reqContentType = 'formData'
          this.codeEditor.setValue(this.temp.mode)
        }
        this.format()
      }
    }
  },
  methods: {
    convertUrl (url) {
      const newUrl = '/' + url
      return newUrl === '/'
        ? '/'
        : newUrl.replace(/\/\//g, '/').replace(/\/$/, '')
    },
    format () {
      const context = this.codeEditor.getValue()
      let code = /^http(s)?/.test(context)
        ? context
        : jsBeautify.js_beautify(context, { indent_size: 2 })
      this.codeEditor.setValue(code)
    },
    onChange () {
      this.temp.mode = this.codeEditor.getValue()
    },
    close () {
      this.value.show = false
      this.$emit('input', this.value)
    },
    addParam () {
      let obj = { name: `参数${Math.random().toString(36).substring(4)}`, type: 'string', required: false }
      if (typeof this.temp.parameters !== 'object') {
        this.temp.parameters = JSON.parse(this.temp.parameters)
      }
      this.temp.parameters.push(obj)
    },
    updateParam (newParams) {
      this.temp.parameters = newParams
    },
    submit () {
      const mockUrl = this.convertUrl(this.temp.url)

      // this.temp.parameters[0] && this.temp.parameters[0].in
      if (this.temp.parameters[0]) {
        this.temp.parameters[0].in = this.temp.reqContentType
      } else {
        this.temp.parameters = [{in: this.temp.reqContentType}]
      }

      try {
        const value = (new Function(`return ${this.temp.mode}`))() // eslint-disable-line
        if (!value) {
          this.$Message.error(this.$t('p.detail.editor.submit.error[0]'))
          return
        } else if (typeof value !== 'object') {
          throw new Error()
        }
      } catch (error) {
        if (!/^http(s)?:\/\//.test(this.temp.mode)) {
          this.$Message.error(error.message || this.$t('p.detail.editor.submit.error[1]'))
          return
        }
      }

      if (this.isEdit) {
        this.$store.dispatch('mock/UPDATE', {
          route: this.$route,
          ...this.temp,
          parameters: JSON.stringify(this.temp.parameters) || '',
          id: this.value._id,
          url: mockUrl
        }).then((res) => {
          if (res.data.success) {
            this.$Message.success(this.$t('p.detail.editor.submit.updateSuccess'))
          }
        })
      } else {
        this.$store.dispatch('mock/CREATE', {
          route: this.$route,
          ...this.temp,
          parameters: JSON.stringify(this.temp.parameters) || '',
          url: mockUrl
        }).then((res) => {
          if (res.data.success) {
            this.$Message.success(this.$t('p.detail.create.success'))
            this.close()
          }
        })
      }
    },
    preview () {
      window.open(this.$parent.baseUrl + this.value.url + '#!method=' + this.value.method)
    }
  },
  components: {
    ParamsBody
  }
}
</script>
