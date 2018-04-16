webpackJsonp([8],{197:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default={name:"dashboard",computed:{total:function(){return this.$store.state.dashboard.total},today:function(){return this.$store.state.dashboard.today},users:function(){return this.$store.state.dashboard.users}},asyncData:function(t){return t.store.dispatch("dashboard/FETCH")}}},209:function(t,a,e){var s=e(210);"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);e(152)("bcca7936",s,!0)},210:function(t,a,e){a=t.exports=e(151)(),a.push([t.i,".em-dashboard .em-dashboard__item,.em-dashboard .em-dashboard__users{width:100%;background:#fff;-webkit-box-shadow:0 2px 3px #eee;box-shadow:0 2px 3px #eee;border-radius:4px;margin-bottom:20px}.em-dashboard .em-dashboard__item--key{background-image:linear-gradient(45deg,#2d8cf0,rgba(45,140,240,.6));color:#fff;-webkit-box-shadow:0 2px 3px rgba(45,140,240,.4);box-shadow:0 2px 3px rgba(45,140,240,.4)}.em-dashboard__content{margin:20px auto}.em-dashboard__item{padding:20px;position:relative}.em-dashboard__item h2{font-weight:500;font-size:16px}.em-dashboard__item h2 i{font-size:26px;vertical-align:bottom;margin-right:6px}.em-dashboard__item .number{font-size:32px}.em-dashboard__item .number span:last-child{font-size:22px;margin-left:10px}.em-dashboard__users{position:relative}.em-dashboard__users img{display:block;width:50px;height:50px;border-radius:4px;margin-top:10px}.em-dashboard__users__title{height:190px;border-top-left-radius:4px;border-bottom-left-radius:4px;color:#495060;font-size:36px;text-align:center;line-height:190px}",""])},211:function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"em-dashboard"},[e("em-header",{attrs:{spots:6,icon:"ios-speedometer",title:t.$t("p.dashboard.header.title"),description:t.$t("p.dashboard.header.description")}}),e("em-keyboard-short"),e("div",{staticClass:"em-container em-dashboard__content"},[e("Row",{attrs:{gutter:20}},[e("Col",{attrs:{span:"12"}},[e("transition",{attrs:{name:"fadeLeft"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.pageAnimated,expression:"pageAnimated"}],staticClass:"em-dashboard__item em-dashboard__item--key"},[e("h2",[e("Icon",{attrs:{type:"stats-bars"}}),t._v(" "+t._s(t.$tc("p.dashboard.total.mockUse",1)))],1),e("p",{staticClass:"number"},[e("em-animated-integer",{attrs:{value:t.total.mockUseCount}}),e("span",[t._v(t._s(t.$tc("p.dashboard.total.mockUse",2)))])],1)])])],1),e("Col",{attrs:{span:"6"}},[e("transition",{attrs:{name:"fadeRight"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.pageAnimated,expression:"pageAnimated"}],staticClass:"em-dashboard__item"},[e("h2",[e("Icon",{attrs:{type:"cube"}}),t._v(" "+t._s(t.$tc("p.dashboard.total.project",1)))],1),e("p",{staticClass:"number"},[e("em-animated-integer",{attrs:{value:t.total.projectCount}}),e("span",[t._v(t._s(t.$tc("p.dashboard.total.project",2)))])],1)])])],1),e("Col",{attrs:{span:"6"}},[e("transition",{attrs:{name:"fadeRight"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.pageAnimated,expression:"pageAnimated"}],staticClass:"em-dashboard__item"},[e("h2",[e("Icon",{attrs:{type:"link"}}),t._v(" "+t._s(t.$tc("p.dashboard.total.mock",1)))],1),e("p",{staticClass:"number"},[e("em-animated-integer",{attrs:{value:t.total.mockCount}}),e("span",[t._v(t._s(t.$tc("p.dashboard.total.mock",2)))])],1)])])],1)],1),e("Row",{attrs:{gutter:20}},[e("Col",{attrs:{span:"12"}},[e("transition",{attrs:{name:"fadeLeft"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.pageAnimated,expression:"pageAnimated"}],staticClass:"em-dashboard__item em-dashboard__item--key"},[e("em-spots",{attrs:{size:6}}),e("h2",[e("Icon",{attrs:{type:"person"}}),t._v(" "+t._s(t.$tc("p.dashboard.total.user",1)))],1),e("p",{staticClass:"number"},[e("em-animated-integer",{attrs:{value:t.total.userCount}}),e("span",[t._v(t._s(t.$tc("p.dashboard.total.user",2)))])],1)],1)])],1),e("Col",{attrs:{span:"12"}},[e("transition",{attrs:{name:"fadeRight"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.pageAnimated,expression:"pageAnimated"}],staticClass:"em-dashboard__item"},[e("em-spots",{attrs:{size:6}}),e("h2",[e("Icon",{attrs:{type:"person-add"}}),t._v(" "+t._s(t.$tc("p.dashboard.today.user",1)))],1),e("p",{staticClass:"number"},[e("em-animated-integer",{attrs:{value:t.today.userCount}}),e("span",[t._v(t._s(t.$tc("p.dashboard.today.user",2)))])],1)],1)])],1)],1),e("Row",{attrs:{gutter:20}},[e("Col",{attrs:{span:"12"}},[e("transition",{attrs:{name:"fadeLeft"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.pageAnimated,expression:"pageAnimated"}],staticClass:"em-dashboard__item em-dashboard__item--key"},[e("h2",[e("Icon",{attrs:{type:"stats-bars"}}),t._v(" "+t._s(t.$tc("p.dashboard.today.mockUse",1)))],1),e("p",{staticClass:"number"},[e("em-animated-integer",{attrs:{value:t.today.mockUseCount}}),e("span",[t._v(t._s(t.$tc("p.dashboard.today.mockUse",2)))])],1)])])],1),e("Col",{attrs:{span:"6"}},[e("transition",{attrs:{name:"fadeRight"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.pageAnimated,expression:"pageAnimated"}],staticClass:"em-dashboard__item"},[e("h2",[e("Icon",{attrs:{type:"cube"}}),t._v(" "+t._s(t.$tc("p.dashboard.today.project",1)))],1),e("p",{staticClass:"number"},[e("em-animated-integer",{attrs:{value:t.today.projectCount}}),e("span",[t._v(t._s(t.$tc("p.dashboard.today.project",2)))])],1)])])],1),e("Col",{attrs:{span:"6"}},[e("transition",{attrs:{name:"fadeRight"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.pageAnimated,expression:"pageAnimated"}],staticClass:"em-dashboard__item"},[e("h2",[e("Icon",{attrs:{type:"link"}}),t._v(" "+t._s(t.$tc("p.dashboard.today.mock",1)))],1),e("p",{staticClass:"number"},[e("em-animated-integer",{attrs:{value:t.today.mockCount}}),e("span",[t._v(t._s(t.$tc("p.dashboard.today.mock",2)))])],1)])])],1)],1),e("transition",{attrs:{name:"fadeUp"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.pageAnimated,expression:"pageAnimated"}],staticClass:"em-dashboard__users"},[e("Row",[e("i-col",{attrs:{span:"6"}},[e("em-spots",{attrs:{size:6}}),e("div",{staticClass:"em-dashboard__users__title"},[e("Icon",{attrs:{type:"quote"}})],1)],1),e("i-col",{attrs:{span:"18"}},[e("Row",{staticStyle:{padding:"0 10px"},attrs:{gutter:10}},t._l(t.users,function(t,a){return e("i-col",{key:a,attrs:{span:"2"}},[e("img",{attrs:{src:t.head_img,title:t.nick_name}})])}))],1)],1)],1)])],1)],1)},r=[],o={render:s,staticRenderFns:r};a.a=o},8:function(t,a,e){"use strict";function s(t){e(209)}Object.defineProperty(a,"__esModule",{value:!0});var r=e(197),o=e.n(r);for(var i in r)"default"!==i&&function(t){e.d(a,t,function(){return r[t]})}(i);var d=e(211),n=e(1),m=s,p=n(o.a,d.a,!1,m,null,null);a.default=p.exports}});