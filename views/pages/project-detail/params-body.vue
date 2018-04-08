<template>
  <div class='params-table-wrapper'>
    <Table :columns='columns' :data='resultData' :show-header='false' class='params-table'></Table>
  </div>
</template>

<script>

export default {
  name: 'ParamsBody',
  props: {
    initParams: [Array, Object]
  },
  data () {
    return {
      originData: [],
      paramsType: [
        { label: 'string', value: 'string' },
        { label: 'number', value: 'number' },
        { label: 'integer', value: 'integer' },
        { label: 'boolean', value: 'boolean' },
        { label: 'array', value: 'array' },
        { label: 'object', value: 'object' }
      ],
      requiredType: [
        { label: '必须', value: 'true' },
        { label: '非必须', value: 'false' }
      ],
      columns: [
        {
          key: 'name',
          width: 100,
          render: (h, params) => {
            return this.renderName(h, params)
          }
        }, {
          key: 'others',
          render: (h, params) => {
            return <div>
              {this.renderType(h, params)}
              {this.renderRequired(h, params)}
              {this.renderDescription(h, params)}
              {this.renderSub(h, params)}
            </div>
          }
        }, {
          key: 'operate',
          width: 65,
          align: 'center',
          render: (h, params) => {
            // 按钮是需要根据条件来渲染的
            const { row = {} } = params
            const type = row.type || (row.schema && row.schema.type)
            // type或schema.type是object或array，显示“子级”按钮
            let hasChild = type === 'object' || type === 'array'
            const schema = row.schema
            // 如果有schema中已有“子级”，不显示“子级”按钮
            if (schema && schema.type === 'object' && schema.properties && Object.keys(schema.properties).length > 0) {
              hasChild = false
            }
            if (schema && schema.type === 'array' && schema.items) {
              if (schema.items.properties && Object.keys(schema.items.properties).length > 0) {
                hasChild = false
              } else if (schema.items.type && ['object', 'array'].indexOf(schema.items.type) === -1) {
                hasChild = false
              }
            }

            return <Button-group size="small" vertical>
              <i-button type="ghost"
                icon="ivu-icon ivu-icon-plus"
                onClick={this.addSibling.bind(this, params.index, params.row.name)}>
                同级
              </i-button>
              {
                hasChild
                  ? <i-button type="ghost" icon="ivu-icon ivu-icon-plus"
                    onClick={this.addChild.bind(this, params.index, params.row.name)}>
                    子级
                  </i-button>
                  : null
              }
              <i-button type="ghost" small
                icon="ivu-icon ivu-icon-trash-b"
                onClick={this.deleteParam.bind(this, params.index, params.row.name)}>
                删除
              </i-button>
            </Button-group>
          }
        }
      ]
    }
  },
  computed: {
    resultData () {
      // 如果收到的类型是对象，需要把数据处理为数组才能展示
      const params = this.initParams
      if (!params) {
        return []
      }
      this.originData = JSON.parse(JSON.stringify(this.initParams))

      if (params instanceof Array) {
        return params.map((d) => {
          return { ...d }
        })
      } else {
        let { properties, items, required } = params
        if (!properties && items) {
          properties = items.properties
          required = items.required
        }
        const arr = []
        for (let k in properties) {
          arr.push({ name: k, ...properties[k], required: (required && required.length > 0 && required.indexOf(k) > -1) })
        }
        return arr
      }
    }
  },
  methods: {
    // 删除参数，要考虑required的值
    deleteParam (index, key) {
      const originData = this.originData
      if (originData instanceof Array) {
        originData.splice(index, 1)
      } else if (originData.type === 'object' || originData.type === 'array') {
        let { properties, required, items } = originData
        if (originData.type === 'array') {
          properties = items.properties
          required = items.required
        }
        delete properties[key]
        const idx = required.indexOf(key)
        if (idx > -1) {
          required.splice(idx, 1)
        }
      }
      this.$emit('update', originData)
    },
    // 加同级
    addSibling (index) {
      // 定义常量
      const name = `参数${Math.random().toString(36).substring(4)}`
      const type = 'string'
      const required = false

      const originData = this.originData
      if (originData instanceof Array) {
        originData.splice(index + 1, 0, { name, type, required })
      } else if (originData.properties) {
        !originData.properties && (originData.properties = {})
        originData.properties[name] = { type }
      } else if (originData.items) {
        !originData.items.properties && (originData.items.properties = {})
        originData.items.properties[name] = { type }
      }
      this.$emit('update', originData)
    },
    // 加子级
    // type = array && arrType = object/array可以加子级
    addChild (index, key) {
      const name = `param_${Math.random().toString(36).substring(4)}`
      const type = 'string'

      const originData = this.originData

      if (originData instanceof Array) {
        const prefixKey = originData[index]
        if (prefixKey.type === 'array') {
          delete prefixKey.items
          prefixKey.schema = { type: 'array', items: { type } }
        }
        if (prefixKey.schema && prefixKey.schema.type === 'array') {
          if (!prefixKey.schema.items) {
            prefixKey.schema.items = {}
          }
          if (!prefixKey.schema.items.properties) {
            prefixKey.schema.items.properties = {}
          }
          prefixKey.schema.items.properties[name] = { type }
        }
        if (prefixKey.schema && prefixKey.schema.type === 'object') {
          if (!prefixKey.schema.properties) {
            prefixKey.schema.properties = {}
          }
          prefixKey.schema.properties[name] = {type}
        }
      } else if (originData.type === 'object' || originData.type === 'array') {
        let prefixKey = originData
        if (originData.type === 'array') {
          prefixKey = originData.items
        }
        if (!prefixKey.properties[key].schema) {
          prefixKey.properties[key].schema = {}
        }
        if (!prefixKey.properties[key].schema.properties) {
          prefixKey.properties[key].schema.properties = {}
        }
        prefixKey.properties[key].schema.properties[name] = { type }
      }
      this.$emit('update', originData)
    },
    // oldVal: 旧值, propKey: schema中的properties的key
    paramChange (index, key, value, { oldVal, propKey }) {
      const originData = this.originData
      let newVal = value
      if (key === 'required') {
        newVal = value === 'true'
      }
      if (originData instanceof Array) {
        const prefixKey = originData[index]
        if (key === 'type') {
          if (newVal === 'object') {
            prefixKey.schema = { type: newVal }
            delete prefixKey.type
          } else if (newVal === 'array') {
            prefixKey.schema = { type: newVal, items: { type: 'string' } }
            delete prefixKey.type
          } else {
            prefixKey[key] = newVal
            delete prefixKey.schema
            delete prefixKey.items
          }
        } else if (key === 'arrType') { // 说明是数组里的type
          prefixKey.type === 'array' && (prefixKey.items.type = newVal)
          prefixKey.schema && (prefixKey.schema.type === 'array') && (prefixKey.schema.items = {type: newVal})
        } else {
          prefixKey[key] = newVal
        }
      } else if (originData.properties || originData.items) {
        let prefixKey = originData
        if (originData.items) {
          prefixKey = originData.items
        }
        if (key === 'name') {
          prefixKey.properties[newVal] = { ...prefixKey.properties[oldVal] }
          delete prefixKey.properties[oldVal]
          // 如果旧key在required中，从required中移除旧key，加入新key
          const { required = [] } = prefixKey
          const idx = required.indexOf(oldVal)
          if (idx > -1) {
            required.splice(idx, 1, newVal)
          }
        } else if (key === 'required') {
          prefixKey.required = prefixKey.required || []
          const required = prefixKey.required
          const idx = required.indexOf(propKey)
          if (newVal && idx === -1) {
            prefixKey.required.push(propKey)
          }
          if (!newVal && idx > -1) {
            prefixKey.required.splice(idx, 1)
          }
        } else if (key === 'type' && newVal === 'array') {
          delete prefixKey.properties[propKey].schema
          prefixKey.properties[propKey][key] = newVal
          prefixKey.properties[propKey].items = { type: 'string' }
        } else if (key === 'type' && newVal === 'object') {
          delete prefixKey.properties[propKey].items
          delete prefixKey.properties[propKey].type
          prefixKey.properties[propKey].schema = {type: newVal, properties: {}}
        } else if (key === 'arrType') { // 说明是数组里的type
          prefixKey.properties[propKey].type === 'array' && (prefixKey.properties[propKey].items = { type: newVal })
          if (prefixKey.properties[propKey].schema && (prefixKey.properties[propKey].schema.type === 'array')) {
            prefixKey.properties[propKey].schema.items = { type: newVal }
          }
        } else {
          prefixKey.properties[propKey][key] = newVal
        }
      }
      this.$emit('update', originData)
    },
    renderName (h, params) {
      return h('Input', {
        props: {
          type: 'text',
          value: params.row.name
        },
        on: {
          'on-blur': (e) => {
            const newValue = e.target.value || ''
            const oldValue = params.row.name || ''
            if (newValue !== params.row.name) {
              this.paramChange(params.index, 'name', newValue, { oldVal: oldValue })
            }
          }
        }
      })
    },
    renderType (h, params) {
      const row = params.row
      const { type, schema, items } = row
      const inType = type || (schema && schema.type) || (items && items.type)
      let arrType = ''
      if (type === 'array' && items) {
        arrType = items.type
      }
      if (schema && schema.type === 'array' && schema.items) {
        arrType = schema.items.type
      }
      return <div class='inline-select'>
        <div class='select-btn'>
          <span>{this.$t('p.detail.expand.columnsRequest[3]')}</span>
        </div>
        <i-select
          size='small'
          value={inType}
          onChange={(value) => this.paramChange(params.index, 'type', value, { propKey: params.row.name })}
          onInput={(value) => this.paramChange(params.index, 'type', value, { propKey: params.row.name })} >
          {
            this.paramsType.map((t) => {
              return <i-option key={t.value} label={t.label} value={t.value} />
            })
          }
        </i-select>
        {
          inType === 'array'
            ? <i-select
              size='small'
              value={arrType}
              onChange={(value) => this.paramChange(params.index, 'arrType', value, { propKey: params.row.name })}
              onInput={(value) => this.paramChange(params.index, 'arrType', value, { propKey: params.row.name })}>
              {
                this.paramsType.map((t) => {
                  return <i-option key={t.value} label={t.label} value={t.value} />
                })
              }
            </i-select>
            : null
        }
      </div>
    },
    renderRequired (h, params) {
      return <div class='inline-select'>
        <div class='select-btn'>
          <span>{this.$t('p.detail.expand.columnsRequest[4]')}</span>
        </div>
        <i-select
          size='small'
          value={
            params.row.required ? 'true' : 'false'
          }
          onChange={(value) => this.paramChange(params.index, 'required', value, { propKey: params.row.name })}
          onInput={(value) => this.paramChange(params.index, 'required', value, { propKey: params.row.name })}>
          {
            this.requiredType.map((t) => {
              return <i-option key={t.value} label={t.label} value={t.value} />
            })
          }
        </i-select>
      </div>
    },
    renderDescription (h, params) {
      return h('Input', {
        props: {
          type: 'text',
          size: 'small',
          value: params.row.description
        },
        on: {
          'on-blur': (e) => {
            const newValue = e.target.value || ''
            const oldValue = params.row.description || ''
            if (newValue !== oldValue) {
              this.paramChange(params.index, 'description', newValue, { propKey: params.row.name })
            }
          }
        }
      }, [
        h('span', {slot: 'prepend', props: {}}, this.$t('p.detail.expand.columnsRequest[1]'))
      ])
    },
    renderSub (h, params) {
      const row = params.row
      const {schema} = row
      if (schema && (
        (schema.properties && Object.keys(schema.properties).length > 0) ||
        (schema.items && schema.items.properties && Object.keys(schema.items.properties).length > 0)
      )) {
        return h('ParamsBody', {
          props: {
            initParams: { ...schema }
          },
          on: {
            update: (newParams) => {
              this.paramChange(params.index, 'schema', newParams, { oldVal: schema, propKey: params.row.name })
            }
          }
        })
      }
    }
  }
}
</script>
