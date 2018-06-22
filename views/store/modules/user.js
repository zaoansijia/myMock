export default {
  namespaced: true,
  mutations: {
    SET_VALUE (state, payload) {
      state.id = payload._id || payload.id
      state.name = payload.name || payload.name
      state.nickName = payload.nick_name || payload.nickName
      state.headImg = payload.head_img || payload.headImg
      state.token = payload.token
      state.selectedUrl = payload.selectedUrl || payload.selectedUrl
    }
  }
}
