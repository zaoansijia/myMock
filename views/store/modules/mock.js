import * as api from '../../api'

export default {
  namespaced: true,
  mutations: {
    SET_VALUE (state, payload) {
      state.list = state.pageIndex === 1
        ? payload.mocks
        : state.list.concat(payload.mocks)
      state.project = payload.project
    },
    INIT_REQUEST (state) {
      state.keywords = ''
      state.pageIndex = 1
      state.project = {}
      state.list = []
    },
    SET_REQUEST_PARAMS (state, payload) {
      state.keywords = payload.keywords || state.keywords
      state.pageIndex = payload.pageIndex || state.pageIndex
    }
  },
  actions: {
    FETCH ({commit, state, rootState}, route) {
      return api.mock.getList({
        params: {
          project_id: route.params.id,
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
    CREATE ({commit, dispatch}, {route, mode, classify, description, url, method, parameters}) {
      return api.mock.create({
        data: {
          mode,
          url,
          method,
          classify,
          description,
          parameters,
          project_id: route.params.id
        }
      }).then((res) => {
        if (res.data.success) {
          commit('SET_REQUEST_PARAMS', {pageIndex: 1})
          dispatch('FETCH', route)
        }
        return res
      })
    },
    UPDATE ({commit, dispatch}, {route, mode, id, classify, description, url, method, parameters}) {
      return api.mock.update({
        data: {
          mode,
          id,
          url,
          method,
          classify,
          description,
          parameters,
          project_id: route.params.id
        }
      }).then((res) => {
        if (res.data.success) {
          commit('SET_REQUEST_PARAMS', {pageIndex: 1})
          dispatch('FETCH', route)
        }
        return res
      })
    }
  }
}
