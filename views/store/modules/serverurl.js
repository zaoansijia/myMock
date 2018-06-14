import * as api from '../../api'

export default {
  namespaced: true,
  mutations: {
    SET_VALUE (state, payload) {
      state.list = state.pageIndex === 1
        ? payload
        : state.list.concat(payload)
    },
    INIT_REQUEST (state) {
      state.keywords = ''
      state.pageIndex = 1
      state.list = []
    },
    SET_REQUEST_PARAMS (state, payload) {
      state.keywords = payload.keywords || state.keywords
      state.pageIndex = payload.pageIndex || state.pageIndex
    }
  },
  actions: {
    FETCH ({commit, state}) {
      return api.serverUrl.getList({
        params: {
          page_size: 2000, // 不考虑接口分页
          page_index: state.pageIndex,
          keywords: state.keywords
        }
      }).then((res) => {
        if (res.data.success) {
          commit('SET_VALUE', res.data.data)
          state.pageIndex += 1
          commit('SET_REQUEST_PARAMS', { pageIndex: state.pageIndex })
          return res.data.data
        }
      })
    },
    CREATE ({commit, dispatch}, {name, url, project}) {
      return api.serverUrl.createUrl({
        data: {
          name,
          url,
          project
        }
      }).then((res) => {
        if (res.data.success) {
          commit('SET_REQUEST_PARAMS', {pageIndex: 1})
          dispatch('FETCH')
        }
        return res
      })
    }
  }
}
