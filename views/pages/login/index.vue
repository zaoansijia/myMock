<template>
  <div class="em-index">
    <transition name="zoom">
      <div class="em-index__login" v-if="page === 0">
        <img src="/public/images/gome-mock.png">
        <!-- <p class='title'>Gome Mock</p> -->
        <p>{{$tc('p.login.description', 1)}}</p>
        <p>{{$tc('p.login.description', 2)}}</p>
        <transition name="fadeUp" mode="out-in">
          <i-button type="primary" long @click.stop="start" v-if="!isLogin" key="start">{{$tc('p.login.form.button', 1)}}</i-button>
          <i-button type="success" long @click.stop="login" v-else key="login">{{$tc('p.login.form.button', 2)}}</i-button>
        </transition>
        <transition name="fadeLeft">
          <div v-if="isLogin" v-click-outside="onClickOutside">
            <i-input size="large"
              :placeholder="$tc('p.login.form.placeholder', 1)"
              ref="user" v-model="userName" @on-enter="login"></i-input>
            <i-input size="large"
              :placeholder="$tc('p.login.form.placeholder', 2)"
              type="password" v-model="password" @on-enter="login"></i-input>
          </div>
        </transition>
      </div>
    </transition>

    <div class="em-index__section em-index__section--login" style="z-index: 6"
      :class="{'is-old': page > 0}">
      <transition name="fade">
        <div
          class="fullscreen"
          :class="{'is-login': isLogin}"
          ref="wallpaper"
          v-show="wallpaperVisible"></div>
      </transition>
    </div>
  </div>
</template>

<style>
@import './index.css';
</style>

<script>
import config from 'config'
import cookie from 'react-cookie'
import * as api from '../../api'
let resizeTimer

export default {
  name: 'index',
  data () {
    return {
      isLogin: true,
      page: 0,
      userName: this.$ls.get('last-user'),
      password: '',
      copyright: config.copyright,
      featureVisible: false,
      wallpaperVisible: false
    }
  },
  asyncData ({ store }) {
    return store.dispatch('wallpaper/FETCH')
  },
  mounted () {
    const img = new Image()
    img.src = this.$store.state.wallpaper.url
    img.onload = () => {
      this.wallpaperVisible = true
      this.$nextTick(() => {
        this.$refs.wallpaper.style.background = `url(${img.src})`
        this.$refs.wallpaper.style.backgroundSize = 'cover'
        this.$refs.wallpaper.style.backgroundPosition = '50% 50%'
      })
    }
  },
  computed: {
    wallpaperCopyright () {
      return this.$store.state.wallpaper.copyright
    }
  },
  watch: {
    page: function (current) {
      clearTimeout(resizeTimer)
      if (current === 1) {
        resizeTimer = setTimeout(() => {
          this.featureVisible = true
        }, 3000)
      } else {
        this.featureVisible = false
      }
    }
  },
  methods: {
    onClickOutside () {
      if (!this.userName && !this.password) {
        this.isLogin = false
      }
    },
    start () {
      this.isLogin = true
      this.$nextTick(() => {
        this.$refs.user.focus()
      })
    },
    login () {
      api.u.login({
        messageUnless: ['用户不存在'],
        data: {
          name: this.userName,
          password: this.password
        }
      }).then(res => {
        const body = res.data
        if (body.success) {
          this.$store.commit('user/SET_VALUE', body.data)
          this.$ls.set('user', body.data)
          this.$ls.set('last-user', this.userName)
          cookie.save(
            config.storageNamespace + 'token',
            body.data.token,
            {
              path: '/',
              maxAge: 60 * 60 * 24 * 31
            }
          )
          this.$router.push('/')
        }
      }).catch((res) => {
        if (res.data.message === '用户不存在') {
          this.$Modal.confirm({
            title: this.$t('confirm.title'),
            content: this.$t('p.login.confirm.register.content'),
            onOk: () => {
              this.register()
            }
          })
        }
      })
    },
    register () {
      api.u.register({
        data: {
          name: this.userName,
          password: this.password
        }
      }).then((res) => {
        if (res.data.success) {
          this.$Message.success(this.$t('p.login.confirm.register.success'))
          this.login()
        }
      })
    }
  }
}
</script>
