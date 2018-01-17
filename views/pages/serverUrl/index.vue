<template>
  <div class="em-index">
    <em-header
      icon="cube"
      :title="$t('p.server.title[0]')"
      :description="$t('p.server.title[1]')"
      :nav="nav"
      v-model="pageName">
    </em-header>
    <Form v-if="pageName === $t('p.server.nav[1]')" label-position="top" :model="form" ref="formValidate">
        <Form-item :label="$tc('p.new.form.description', 1)"  class="em-new__form-hr">
      <i-input size="large"
        :placeholder="$tc('p.login.form.placeholder', 1)"
        ref="name" v-model="form.name" ></i-input>
        </Form-item>
      <i-input size="large"
        :placeholder="$tc('p.login.form.placeholder', 1)"
        v-model="form.url" ></i-input>
        <Button type="error" long @click="add" >新增地址</Button>
    </Form>
    <div
        class="em-container"
        v-if="pageName === $t('p.server.nav[0]')"
        key="b">
        <Table
          border
          :columns="columns"
          :data="list"
          :highlight-row="true"></Table>
    </div>
  </div>
</template>

<style>
@import './index.css';
</style>

<script>
// import config from 'config'
// import cookie from 'react-cookie'
import * as api from '../../api'
import debounce from 'lodash/debounce'
// let resizeTimer

export default {
  name: 'addServer',
  data () {
    return {
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
                  <i-button size="small" title={this.$t('p.server.action[0]')} ><icon type="edit"></icon></i-button>
                  <i-button size="small" title={this.$t('p.server.action[1]')} ><icon type="trash-b"></icon></i-button>
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
    // onClickOutside () {
    //   if (!this.name && !this.url) {
    //     this.isLogin = false
    //   }
    // },
    add () {
      api.serverUrl.createUrl({
        data: {
          name: this.form.name,
          url: this.form.url
        }
      }).then((res) => {
        if (res.data.success) {
          // this.$Message.success(this.$t('p.login.confirm.register.success'))
          // this.login()
          alert('hello')
        }
      })
    }
    // eidt () {
    //   console.log('编辑')
    // },
    // delete () {
    //   console.log('删除')
    // }
  }
}
</script>
