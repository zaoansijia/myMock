
/**
 * @author yangliu at 2018-1-15
 * @last update time: 2018-6-13
 * @desc 服务器地址
 *
 */
<template>
  <div class='em-server-url'>
    <em-header
      icon='cube'
      :title='pageName'
      :description="$t('p.server.title[1]')"
      :nav='nav'
      v-model='pageName'>
    </em-header>
    <Back-top>
      <em-add icon='arrow-up-c' :bottom='90'></em-add>
    </Back-top>
    <transition name='fade' mode='out-in'>
      <div class='em-server-url__form' v-if="pageName === $t('p.server.nav[1]')" key='a'>
        <div class='em-server-url__form__content'>
          <Form :model='form' ref='form' :rules='ruleValidate' label-position="top">
              <Form-item :label="$t('p.server.form.project[0]')" class='project'>
                <Row>
                  <Col span='12'>
                    <Form-item prop='project'>
                      <i-input size='large' :placeholder="$t('p.server.form.project[1]')" v-model='form.project'/>
                    </Form-item>
                  </Col>
                  <Col span='1' class-name='icon'>&</Col>
                  <Col span='11'>
                    <Form-item prop='projSaveName'>
                      <i-input size='large' :placeholder="$t('p.server.form.projSaveName[1]')" v-model='form.projSaveName'/>
                    </Form-item>
                  </Col>
                </Row>
                <p class='desc'>{{$t('p.server.form.project[2]')}}</p>
              </Form-item>
              <Form-item :label="$t('p.server.form.name[0]')" prop='name'>
                <i-input size='large' :placeholder="$t('p.server.form.name[1]')" v-model='form.name' />
                <p class='desc'>{{$t('p.server.form.name[2]')}}</p>
              </Form-item>
              <Form-item :label="$t('p.server.form.url[0]')"  prop='url'>
                <i-input size='large' :placeholder="$t('p.server.form.url[1]')" v-model='form.url'/>
                <p class='desc'>{{$t('p.server.form.url[2]')}}</p>
              </Form-item>
              <Form-item :label="$t('p.server.form.transmitUrl[0]')"  prop='transmitUrl'>
                <i-input size='large' type='textarea' :autosize='{minRows: 2,maxRows: 5}'
                  :placeholder="$t('p.server.form.transmitUrl[1]')" v-model='form.transmitUrl' />
                <p class='desc'>{{$t('p.server.form.transmitUrl[2]')}}</p>
              </Form-item>
              <Form-item :label="$t('p.server.form.select[0]')">
                  <i-switch v-model='form.switchUrl' size='large'>
                      <span slot='open'>是</span>
                      <span slot='close'>否</span>
                  </i-switch>
              </Form-item>
              <Button type='primary' long @click="operate('add')" v-if="type==='add'"> {{$t('p.server.add.btnTxt')}} </Button>
              <Button type='primary' long @click="operate('edit')" v-if="type==='edit'"> {{$t('p.server.edit.btnTxt')}} </Button>
          </Form>
        </div>
      </div>
      <div class='em-server-url__table' v-if="pageName === $t('p.server.nav[0]')" key='b'>
          <i-input v-model='keywords' placeholder='Search URL / Name / project' class='search' />
          <Table
            border
            :columns='columns'
            :data='list'
            :highlight-row='true'>
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
        url: '',
        project: '',
        projSaveName: '',
        transmitUrl: '',
        switchUrl: false
      },
      ruleValidate: {
        project: [{ required: true, message: this.$t('p.server.formErr.project.empty'), trigger: 'blur' }],
        projSaveName: [
          { required: true, message: this.$t('p.server.formErr.projSaveName.empty'), trigger: 'blur' },
          {pattern: /^[a-zA-z]+$/, message: this.$t('p.server.formErr.projSaveName.format'), trigger: 'blur'}
        ],
        name: [{ required: true, message: this.$t('p.server.formErr.name.empty'), trigger: 'blur' }],
        url: [{ required: true, message: this.$t('p.server.formErr.url.empty'), trigger: 'blur' }],
        transmitUrl: [{
          pattern: /^(\/\w+)+(,(\/\w+)+)*$/,
          message: this.$t('p.server.formErr.transmitUrl.format'),
          trigger: 'blur'
        }]
      },
      keywords: '',
      columns: [
        {
          title: this.$t('p.server.column[0]'),
          width: 120,
          sortable: false,
          key: 'project'
        },
        {
          title: this.$t('p.server.column[1]'),
          width: 140,
          sortable: false,
          key: 'projSaveName'
        },
        {
          title: this.$t('p.server.column[2]'),
          width: 120,
          ellipsis: true,
          sortable: false,
          key: 'name'
        },
        {
          title: this.$t('p.server.column[3]'),
          width: 200,
          sortable: false,
          key: 'url'
        },
        {
          title: this.$t('p.server.column[4]'),
          sortable: false,
          key: 'transmitUrl'
        },
        {
          title: this.$t('p.server.column[5]'),
          width: 90,
          ellipsis: true,
          sortable: false,
          key: 'switchUrl',
          render: (h, params) => {
            const projSelected = this.$store.state.user.selectedUrl && this.$store.state.user.selectedUrl[params.row.projSaveName]
            if (projSelected && params.row.url === projSelected.serverurl) {
              return <span>是</span>
            } else {
              return <span>否</span>
            }
          }
        },
        {
          title: this.$t('p.server.column[6]'),
          key: 'action',
          width: 90,
          align: 'center',
          render: (h, params) => {
            return (
              <div>
                <Button-group>
                  <i-button size='small' title={this.$t('p.server.edit.action')} onClick={this.editRow.bind(this, params.row)} >
                    <icon type='edit' />
                  </i-button>
                  <i-button size='small' title={this.$t('p.server.remove.action')} onClick={this.delete.bind(this, params.row)} >
                    <icon type='trash-b' />
                  </i-button>
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
        this.form.project = ''
        this.form.projSaveName = ''
        this.form.transmitUrl = ''
        this.form.switchUrl = false
        this.type = 'add'
      }
    }
  },
  mounted () {
    this.$on('query',debounce(keywords => {
      this.keywords = keywords
    }, 500)
    )
  },
  computed: {
    list () {
      const list = this.$store.state.serverurl.list
      const reg = this.keywords && new RegExp(this.keywords, 'i')
      return reg
        ? list.filter(
          item =>
            reg.test(item.name) || reg.test(item.url) || reg.test(item.project)
        )
        : list
    }
  },
  methods: {
    operate (type) {
      let operateFun = {}
      let text = ''

      this.$refs['form'].validate((valid) => {
        if (valid) {
          switch (type) {
            case 'add': operateFun = api.serverUrl.add({data: this.form}); text = this.$t('p.server.add.success'); break
            default: operateFun = api.serverUrl.update({data: this.form}); text = this.$t('p.server.edit.success'); break
          }
          Promise.all([operateFun, this.updateUser(type)]).then(res => {
            if (res[0].data.success) {
              this.$Message.success(text)
              this.$store.commit('serverurl/INIT_REQUEST')
              this.$store.dispatch('serverurl/FETCH')
            }
          })
        }
      })
    },
    updateUser (type) {
      let data = this.$store.state.user
      const projectSeleted = data.selectedUrl[this.form.projSaveName]
      if (this.form.switchUrl) {
        data.selectedUrl[this.form.projSaveName] = {
          hasSelected: this.form.switchUrl,
          serverurl: this.form.url,
          transmitUrl: this.form.transmitUrl
        }
      } else if (projectSeleted && projectSeleted.hasSelected && this.form.url === projectSeleted.serverurl) {
        data.selectedUrl[this.form.projSaveName] = undefined
      }
      api.u.update({ data }).then(res => {
        this.$ls.set('user', data)
      })
    },
    editRow (row) {
      this.type = 'edit'
      this.form.id = row._id
      this.form.project = row.project
      this.form.projSaveName = row.projSaveName
      this.form.name = row.name
      this.form.url = row.url
      this.form.transmitUrl = row.transmitUrl
      const projectSeleted = this.$store.state.user.selectedUrl && this.$store.state.user.selectedUrl[row.projSaveName]
      this.form.switchUrl = projectSeleted && projectSeleted.hasSelected && this.form.url === projectSeleted.serverurl
      this.pageName = this.$t('p.server.nav[1]')
    },
    delete (row) {
      this.$Modal.confirm({
        title: this.$t('confirm.title'),
        content: this.$t('p.server.remove.confirm'),
        onOk: () => {
          api.serverUrl.delete({data: { id: row._id }}).then(res => {
            if (res.data.success) {
              if (row.switchUrl) {
                let data = this.$store.state.user
                data.selectedUrl[row.projSaveName] = {}
                api.u.update({ data }).then(res => {
                  this.$ls.set('user', data)
                })
              }
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
