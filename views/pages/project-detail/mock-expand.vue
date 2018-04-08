<template>
  <div class="em-mock-expand">
    <h2>Method</h2>
    <p>{{mock.method}}</p>
    <h2>URL</h2>
    <p>{{mock.url}}</p>
    <h2>{{$t('p.detail.expand.description')}}</h2>
    <p>{{mock.description}}</p>
    <Tabs value="request" v-if="mock.parameters || mock.response_model">
      <Tab-pane :label="$t('p.detail.expand.tab[0]')" name="request" v-if="mock.parameters">
        <Table :columns="columnsRequest" :data="request"></Table>
      </Tab-pane>
      <Tab-pane :label="$t('p.detail.expand.tab[1]')" name="response" v-if="mock.response_model">
        <Table :columns="columnsResponse" :data="response"></Table>
      </Tab-pane>
      <Tab-pane label="Class Model" name="class" v-if="mock.response_model && entities.js.length">
        <Collapse>
          <Panel>
            JavaScript
            <div slot="content">
              <p v-for="(item, i) in entities.js" :key="i">
                <pre>{{item}}</pre>
              </p>
            </div>
          </Panel>
          <Panel>
            Objective-C
            <div slot="content">
              <p v-for="(item, i) in entities.oc" :key="i">
                <pre>{{item}}</pre>
              </p>
            </div>
          </Panel>
        </Collapse>
      </Tab-pane>
    </Tabs>
  </div>
</template>

<script>
import {
  getJavaScriptEntities,
  getObjectiveCEntities
} from 'swagger-parser-mock/lib/entity'
import jsBeautify from 'js-beautify/js/lib/beautify'
import DataTypeExpand from './data-type-expand'

export default {
  props: {
    mock: {}
  },
  data () {
    return {
      columnsRequest: [
        {
          type: 'expand',
          width: 50,
          render: (h, params) => h(DataTypeExpand, { props: { data: params.row.parameter } })
        },
        { title: this.$t('p.detail.expand.columnsRequest[0]'), key: 'name' },
        { title: this.$t('p.detail.expand.columnsRequest[6]'), key: 'parentKey' },
        { title: this.$t('p.detail.expand.columnsRequest[3]'), key: 'dataType' },
        // { title: this.$t('p.detail.expand.columnsRequest[2]'), key: 'paramType' },
        { title: this.$t('p.detail.expand.columnsRequest[4]'), key: 'required' },
        { title: this.$t('p.detail.expand.columnsRequest[1]'), key: 'description' }
      ],
      columnsResponse: [
        {
          type: 'expand',
          width: 50,
          render: (h, params) => h(DataTypeExpand, { props: { data: params.row.response } })
        },
        { title: this.$t('p.detail.expand.columnsResponse[0]'), key: 'code' },
        { title: this.$t('p.detail.expand.columnsResponse[1]'), key: 'message' }
      ]
    }
  },
  computed: {
    request () {
      const parameters = this.mock.parameters ? JSON.parse(this.mock.parameters) : []
      const resultData = []
      parameters.map((param) => {
        resultData.push({
          name: param.name,
          parentKey: 'data',
          // description: param.description || this.$t('p.detail.expand.defaultDescription'),
          description: param.description || '-',
          // paramType: param.in,
          dataType: this.getParamDataType(param),
          required: param.required === true ? '必须' : '非必须',
          parameter: param
        })
        // 判断是否有子级，第一个参数是parentKey
        const recursionChild = (parentKey, param) => {
          if (param.schema && Object.keys(param.schema).length > 0) {
            let { properties, required } = param.schema
            const { type, items } = param.schema

            if (type === 'array') {
              properties = items.properties
              required = items.required
            }
            for (const key in properties) {
              resultData.push({
                name: key,
                parentKey: parentKey,
                description: properties[key].description || '-',
                // paramType: parameter.in,
                dataType: this.getParamDataType(properties[key]),
                required: required && required.length > 0 && required.indexOf(key) > -1 ? '必须' : '非必须',
                parameter: { ...param.schema }
              })
              recursionChild(key, properties[key])
            }
          }
        }
        recursionChild(param.name, param)
      })
      return resultData
    },
    response () {
      const responseModel = this.mock.response_model ? JSON.parse(this.mock.response_model) : {}
      return Object.keys(responseModel).map(code => {
        const response = responseModel[code]
        return {
          code: code,
          message: response.message || response.description || this.$t('p.detail.expand.defaultDescription'),
          response: response
        }
      })
    },
    entities () {
      const res = this.response.filter(o => {
        const code = o.code.toString()
        return code === '200' || code === 'default'
      })[0]
      const response = res ? res.response : {}

      return {
        js: getJavaScriptEntities(response).map(o => jsBeautify.js_beautify(o, { indent_size: 2 })),
        oc: getObjectiveCEntities(response)
      }
    }
  },
  methods: {
    getParamDataType (parameter) {
      const { type, schema } = parameter
      if (type) return type
      if (schema && schema.type) {
        // return schema.type === 'array' ? schema.items.type : schema.type
        return schema.type
      }
    }
  }
}
</script>
