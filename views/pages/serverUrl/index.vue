
/**
 * @author yangliu at 2018-1-15
 *
 * @desc 服务器地址
 *
 */
<template>
  <div class="em-server-wrapper">
    <em-header
      icon="cube"
      :title="pageName"
      :description="$t('p.server.title[1]')"
      :nav="nav"
      v-model="pageName">
    </em-header>
    <Back-top>
      <em-add icon="arrow-up-c" :bottom="90"></em-add>
    </Back-top>
    <transition name="fade" mode="out-in">
      <div class="em-container-form" v-if="pageName === $t('p.server.nav[1]')" key="a">
        <div class="em-server-content">
          <Form :model="form" ref="formValidate">
              <Form-item :label="$tc('p.server.form.name[0]', 1)"  class="em-new__form-hr">
                <i-input size="large"
                  :placeholder="$tc('p.server.form.name[1]', 1)"
                  ref="name" v-model="form.name" ></i-input>
                  <p class='desc'>{{$t('p.server.form.name[2]')}}</p>
              </Form-item>
              <Form-item :label="$tc('p.server.form.url[0]', 1)"  class="em-new__form-hr">
                <i-input size="large"
                  :placeholder="$tc('p.server.form.url[1]', 1)"
                  v-model="form.url" ></i-input>
                <p class='desc'>{{$t('p.server.form.url[2]')}}</p>
              </Form-item>
              <Button type="primary" long @click="add" v-if="type==='add'"> {{$t('p.server.add.btnTxt')}} </Button>
              <Button type="primary" long @click="edit" v-if="type==='edit'"> {{$t('p.server.edit.btnTxt')}} </Button>
          </Form>
        </div>
      </div>
      <div class="em-container-url" v-if="pageName === $t('p.server.nav[0]')" key="b">
          <i-input v-model="keywords" placeholder="Search URL / Name" class='search'></i-input>
          <Table
            border
            :columns="columns"
            :data="list"
            :highlight-row="true">
          </Table>
      </div>
    </transition>
  </div>
</template>

<style>
@import './index.css';
</style>

<script>

import * as api from '../../api'
import debounce from 'lodash/debounce'

export default {
  name: 'serverurl',
  data () {
    return {
      type: 'add',
      pageName: this.$t('p.server.nav[0]'),
      nav: [
        { title: this.$t('p.server.nav[0]'), icon: 'android-list' },
        { title: this.$t('p.server.nav[1]'), icon: 'gear-a' }
      ],
      form: {
        name: '',
        url: ''
      },
      keywords: '',
      columns: [
        { title: this.$t('p.server.column[0]'), width: 420, ellipsis: true, sortable: false, key: 'name' },
        { title: this.$t('p.server.column[1]'), width: 420, ellipsis: true, sortable: false, key: 'url' },
        {
          title: this.$t('p.server.column[2]'),
          key: 'action',
          width: 160,
          align: 'center',
          render: (h, params) => {
            return (
              <div>
                <Button-group>
                  <i-button size="small" title={this.$t('p.server.edit.action')} onClick={this.editRow.bind(this, params.row)}><icon type="edit"></icon></i-button>
                  <i-button size="small" title={this.$t('p.server.remove.action')} onClick={this.delete.bind(this, params.row._id)}><icon type="trash-b"></icon></i-button>
                </Button-group>
              </div>
            )
          }
        }
      ]
    }
  },
  asyncData ({ store, route }) {
    store.commit('serverurl/INIT_REQUEST')
    return store.dispatch('serverurl/FETCH', route)
  },
  watch: {
    pageName: function (name) {
      if (name === this.$t('p.server.nav[0]')) {
        this.form.name = ''
        this.form.url = ''
        this.type = 'add'
      }
    }
  },
  mounted () {
    this.$on('query', debounce((keywords) => {
      this.keywords = keywords
    }, 500))
  },
  computed: {
    list () {
      const list = this.$store.state.serverurl.list
      const reg = this.keywords && new RegExp(this.keywords, 'i')
      return reg
        ? list.filter(item => (
          reg.test(item.name) || reg.test(item.url)
        ))
        : list
    }
  },
  methods: {
    add () {
      api.serverUrl.add({
        data: {
          name: this.form.name,
          url: this.form.url
        }
      }).then((res) => {
        if (res.data.success) {
          this.$Message.success(this.$t('p.server.add.success'))
          this.$store.commit('serverurl/INIT_REQUEST')
          this.$store.dispatch('serverurl/FETCH', this.$route)
        }
      })
    },
    edit () {
      api.serverUrl.update({
        data: this.form
      }).then((res) => {
        if (res.data.success) {
          this.$Message.success(this.$t('p.server.edit.success'))
          this.$store.commit('serverurl/INIT_REQUEST')
          this.$store.dispatch('serverurl/FETCH', this.$route)
        }
      })
    },
    editRow (row) {
      this.type = 'edit'
      this.form.name = row.name
      this.form.url = row.url
      this.form.id = row._id
      this.pageName = this.$t('p.server.nav[1]')
    },
    delete (id) {
      this.$Modal.confirm({
        title: this.$t('confirm.title'),
        content: this.$t('p.server.remove.confirm'),
        onOk: () => {
          api.serverUrl.delete({
            data: { id }
          }).then((res) => {
            if (res.data.success) {
              this.$Message.success(this.$t('p.server.remove.success'))
              this.$store.commit('serverurl/INIT_REQUEST', { pageIndex: 1 })
              this.$store.dispatch('serverurl/FETCH', this.$route)
            }
          })
        }
      })
    }
  }
}
</script>
