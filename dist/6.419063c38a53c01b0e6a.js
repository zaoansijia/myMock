webpackJsonp([6],{11:function(e,t,i){"use strict";function n(e){i(224)}Object.defineProperty(t,"__esModule",{value:!0});var o=i(200),s=i.n(o);for(var a in o)"default"!==a&&function(e){i.d(t,e,function(){return o[e]})}(a);var r=i(226),l=i(1),c=n,p=l(s.a,r.a,!1,c,null,null);t.default=p.exports},200:function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=i(20),s=n(o),a=i(21),r=n(a),l=i(2),c=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t.default=e,t}(l),p=void 0;t.default={name:"index",data:function(){return{isLogin:!0,page:0,userName:this.$ls.get("last-user"),password:"",copyright:s.default.copyright,featureVisible:!1,wallpaperVisible:!1}},asyncData:function(e){return e.store.dispatch("wallpaper/FETCH")},mounted:function(){var e=this,t=new Image;t.src=this.$store.state.wallpaper.url,t.onload=function(){e.wallpaperVisible=!0,e.$nextTick(function(){e.$refs.wallpaper.style.background="url("+t.src+")",e.$refs.wallpaper.style.backgroundSize="cover",e.$refs.wallpaper.style.backgroundPosition="50% 50%"})}},computed:{wallpaperCopyright:function(){return this.$store.state.wallpaper.copyright}},watch:{page:function(e){var t=this;clearTimeout(p),1===e?p=setTimeout(function(){t.featureVisible=!0},3e3):this.featureVisible=!1}},methods:{onClickOutside:function(){this.userName||this.password||(this.isLogin=!1)},start:function(){var e=this;this.isLogin=!0,this.$nextTick(function(){e.$refs.user.focus()})},login:function(){var e=this;c.u.login({messageUnless:["用户不存在"],data:{name:this.userName,password:this.password}}).then(function(t){var i=t.data;i.success&&(e.$store.commit("user/SET_VALUE",i.data),e.$ls.set("user",i.data),e.$ls.set("last-user",e.userName),r.default.save(s.default.storageNamespace+"token",i.data.token,{path:"/",maxAge:2678400}),e.$router.push("/"))}).catch(function(t){"用户不存在"===t.data.message&&e.$Modal.confirm({title:e.$t("confirm.title"),content:e.$t("p.login.confirm.register.content"),onOk:function(){e.register()}})})},register:function(){var e=this;c.u.register({data:{name:this.userName,password:this.password}}).then(function(t){t.data.success&&(e.$Message.success(e.$t("p.login.confirm.register.success")),e.login())})}}}},224:function(e,t,i){var n=i(225);"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);i(152)("97f987ca",n,!0)},225:function(e,t,i){t=e.exports=i(151)(),t.push([e.i,'.em-index__login .title{font-size:44px}.em-index{color:#fff}.em-index .section-about{text-align:left}.em-index .section-about .section-title{font-size:38px;font-weight:700}.em-index .section-about .section-description{font-size:18px;margin-bottom:100px}.em-index .section-about .feature-list{width:70%;height:570px;position:absolute;top:50%;left:50%;margin-top:-285px;margin-left:-35%;font-size:13px}.em-index .section-about .ivu-col{min-height:200px;margin-bottom:20px}.em-index .section-about .feature-icon{width:60px;height:60px;border-radius:50%;background:#fff;margin:auto;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;margin-bottom:10px;font-size:22px;color:#2d8cf0;-webkit-box-shadow:0 1px 3px rgba(0,0,0,.2);box-shadow:0 1px 3px rgba(0,0,0,.2)}.em-index .section-about .feature-icon img{width:25px}.em-index .section-about .feature-icon i{font-size:32px}.em-index .section-about h2{font-size:22px;font-weight:700;margin-bottom:10px;text-align:center}.em-index__pagination{left:40px;position:absolute;top:50%;z-index:2147483643;-webkit-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%)}.em-index__pagination .dot{border-radius:50%;-webkit-box-shadow:inset 0 0 0 3px #fff;box-shadow:inset 0 0 0 3px #fff;cursor:pointer;height:16px;margin-bottom:10px;opacity:.4;position:relative;width:16px;-webkit-box-sizing:border-box;box-sizing:border-box}.em-index__pagination .dot.active{background:#fff;-webkit-box-shadow:none;box-shadow:none}.em-index__pagination .dot.active,.em-index__pagination .dot:hover{opacity:1}.em-index__login{display:block;left:50%;margin-top:-165px;margin-left:-150px;position:absolute;top:50%;width:300px;-webkit-box-sizing:border-box;box-sizing:border-box;z-index:7;text-align:center;font-size:17px;font-weight:700}.em-index__login img{width:230px;margin-bottom:15px}.em-index__login button{height:45px;margin:30px 0 20px}.em-index__login input{margin-bottom:10px;font-weight:400}.em-index__login input,.em-index__login input:focus,.em-index__login input:hover{border-color:#fff;-webkit-box-shadow:none;box-shadow:none}.em-index__section{background:#56bc8a;color:#fff;height:100%;left:0;overflow:hidden;position:absolute;top:0;text-align:center;width:100%;-webkit-transform:translateY(0);-ms-transform:translateY(0);transform:translateY(0);-webkit-transition:-webkit-transform .7s cubic-bezier(.825,0,.5,1);transition:-webkit-transform .7s cubic-bezier(.825,0,.5,1);transition:transform .7s cubic-bezier(.825,0,.5,1);transition:transform .7s cubic-bezier(.825,0,.5,1),-webkit-transform .7s cubic-bezier(.825,0,.5,1)}.em-index__section.is-old{-webkit-transform:translateY(-100%);-ms-transform:translateY(-100%);transform:translateY(-100%)}.em-index__section--login a{color:#fff}.em-index__section--login .fullscreen{position:fixed;top:0;right:0;left:0;bottom:0}.em-index__section--login .fullscreen:before{content:"";position:fixed;top:0;right:0;bottom:0;left:0;opacity:.6;background-color:rgba(0,0,0,.3);-webkit-transition:all .5s;transition:all .5s}.em-index__section--login .fullscreen.is-login:before{background-color:#000}.em-index__section--login .about-btn{background:#56bc8a;-webkit-box-shadow:inset 0 3px 0 rgba(0,0,0,.1);box-shadow:inset 0 3px 0 rgba(0,0,0,.1);bottom:-45px;color:#fff;cursor:pointer;height:45px;font-weight:700;left:0;line-height:45px;position:absolute;text-align:center;width:100%;z-index:2;-webkit-transition:bottom .3s ease-out 1.7s;transition:bottom .3s ease-out 1.7s;bottom:0}.em-index__section--login .fullscreen-by,.em-index__section--login .links{position:absolute;bottom:45px;padding:0 12px;margin:0 0 13px;line-height:25px;z-index:90210;-webkit-transition:opacity .2s linear;transition:opacity .2s linear;text-align:left}.em-index__section--login .fullscreen-by{right:0}.em-index__section--login .fullscreen-by .avatar{display:inline-block;border-radius:2px;vertical-align:-8px;margin:0;padding:0;height:24px;width:24px;background-size:cover;background-position:50% 50%;background-size:24px;-webkit-box-shadow:0 1px 1px rgba(0,0,0,.3);box-shadow:0 1px 1px rgba(0,0,0,.3);margin-left:10px}.em-index__section--login .fullscreen-by img{display:block;width:24px;height:24px}.em-index__section--login .link{display:inline-block;color:#fff;text-decoration:none;font-size:14px;padding-right:5px;padding-left:5px;margin-left:-5px;margin-right:12px;font-weight:400}',""])},226:function(e,t,i){"use strict";var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"em-index"},[i("transition",{attrs:{name:"zoom"}},[0===e.page?i("div",{staticClass:"em-index__login"},[i("img",{attrs:{src:"/public/images/gome-mock.png"}}),i("p",[e._v(e._s(e.$tc("p.login.description",1)))]),i("p",[e._v(e._s(e.$tc("p.login.description",2)))]),i("transition",{attrs:{name:"fadeUp",mode:"out-in"}},[e.isLogin?i("i-button",{key:"login",attrs:{type:"success",long:""},on:{click:function(t){t.stopPropagation(),e.login(t)}}},[e._v(e._s(e.$tc("p.login.form.button",2)))]):i("i-button",{key:"start",attrs:{type:"primary",long:""},on:{click:function(t){t.stopPropagation(),e.start(t)}}},[e._v(e._s(e.$tc("p.login.form.button",1)))])],1),i("transition",{attrs:{name:"fadeLeft"}},[e.isLogin?i("div",{directives:[{name:"click-outside",rawName:"v-click-outside",value:e.onClickOutside,expression:"onClickOutside"}]},[i("i-input",{ref:"user",attrs:{size:"large",placeholder:e.$tc("p.login.form.placeholder",1)},on:{"on-enter":e.login},model:{value:e.userName,callback:function(t){e.userName=t},expression:"userName"}}),i("i-input",{attrs:{size:"large",placeholder:e.$tc("p.login.form.placeholder",2),type:"password"},on:{"on-enter":e.login},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}})],1):e._e()])],1):e._e()]),i("div",{staticClass:"em-index__section em-index__section--login",class:{"is-old":e.page>0},staticStyle:{"z-index":"6"}},[i("transition",{attrs:{name:"fade"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:e.wallpaperVisible,expression:"wallpaperVisible"}],ref:"wallpaper",staticClass:"fullscreen",class:{"is-login":e.isLogin}})])],1)],1)},o=[],s={render:n,staticRenderFns:o};t.a=s}});