<template>
  <div class="em-params-manage">
    <Table :columns='columns' :data='resultData' class='params-table'></Table>
  </div>
</template>

<script>
export default {
  props: {
    initdata: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      columns: [
        {
          title: '序号',
          key: 'index',
          width: '30px',
          align: 'center',
          render: (h, param) => {
            return `${param.index + 1}`
          }
        },
        {
          title: '是否有子级',
          type: 'expand',
          key: 'expand',
          width: '30px',
          align: 'center',
          render: (h, param) => {
            return `${param.index + 1}`
          }
        },
        {
          title: this.$t('p.detail.expand.columnsRequest[0]'),
          key: 'name',
          render: (h, params) => {
            return (
              <i-input
                type='text'
                size='small'
                value={params.row.name}
                onChange={this.paramChange.bind(this, params.index, 'name')}
                onInput={this.paramChange.bind(this, params.index, 'name')}
              />
            )
          }
        },
        {
          title: this.$t('p.detail.expand.columnsRequest[2]'),
          key: 'type',
          render: (h, params) => {
            return (
              <i-select
                size='small'
                value={params.row.type}
                onChange={this.paramChange.bind(this, params.index, 'type')}
                onInput={this.paramChange.bind(this, params.index, 'type')}
              >
                <i-option key='string' label='string' value='string' />
                <i-option key='number' label='number' value='number' />
                <i-option key='integer' label='integer' value='integer' />
                <i-option key='boolean' label='boolean' value='boolean' />
                <i-option key='array' label='array' value='array' />
                <i-option key='object' label='object' value='object' />
              </i-select>
            )
          }
        },
        {
          title: this.$t('p.detail.expand.columnsRequest[4]'),
          key: 'required',
          render: (h, params) => {
            return (
              <i-select
                size='small'
                value={
                  params.row.required && params.row.required !== 'N' ? 'Y' : 'N'
                }
                onChange={this.paramChange.bind(this, params.index, 'required')}
                onInput={this.paramChange.bind(this, params.index, 'required')}
              >
                <i-option key='Y' label='必须' value='Y' />
                <i-option key='N' label='非必须' value='N' />
              </i-select>
            )
          }
        },
        {
          title: this.$t('p.detail.expand.columnsRequest[1]'),
          key: 'description',
          render: (h, params) => {
            return (
              <i-input
                type='textarea'
                autosize
                value={params.row.description}
                onChange={this.paramChange.bind(
                  this,
                  params.index,
                  'description'
                )}
                onInput={this.paramChange.bind(
                  this,
                  params.index,
                  'description'
                )}
              />
            )
          }
        },
        {
          title: this.$t('p.detail.expand.columnsRequest[5]'),
          key: 'operate',
          width: '60px',
          align: 'center',
          render: (h, params) => {
            return (
              <Button-group>
                {/* <i-button
                  size='small'
                  title='加同级'
                  icon='ivu-icon ivu-icon-plus-round'
                  onClick={this.deleteParam.bind(this, params.index)}
                /> */}
                <i-button
                  size='small'
                  title={this.$t('p.detail.action[0]')}
                  icon='ivu-icon ivu-icon-trash-b'
                  onClick={this.deleteParam.bind(this, params.index)}
                />
              </Button-group>
            )
          }
        }
      ]
    }
  },
  computed: {
    resultData () {
      const initdata = this.initdata || []
      return initdata.map((d) => {
        return {...d}
      })
    }
  },
  methods: {
    deleteParam (index) {
      this.$emit('delete', index)
    },
    paramChange (index, key, value) {
      const param = {}
      param[key] = value
      this.$emit('update', index, param)
    }
  }
}
</script>
