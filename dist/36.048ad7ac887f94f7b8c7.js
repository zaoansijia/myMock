webpackJsonp([36],{160:function(n,t){n.exports='# Prototype\r\nsnippet proto\r\n\t${1:class_name}.prototype.${2:method_name} = function(${3:first_argument}) {\r\n\t\t${4:// body...}\r\n\t};\r\n# Function\r\nsnippet fun\r\n\tfunction ${1?:function_name}(${2:argument}) {\r\n\t\t${3:// body...}\r\n\t}\r\n# Anonymous Function\r\nregex /((=)\\s*|(:)\\s*|(\\()|\\b)/f/(\\))?/\r\nsnippet f\r\n\tfunction${M1?: ${1:functionName}}($2) {\r\n\t\t${0:$TM_SELECTED_TEXT}\r\n\t}${M2?;}${M3?,}${M4?)}\r\n# Immediate function\r\ntrigger \\(?f\\(\r\nendTrigger \\)?\r\nsnippet f(\r\n\t(function(${1}) {\r\n\t\t${0:${TM_SELECTED_TEXT:/* code */}}\r\n\t}(${1}));\r\n# if\r\nsnippet if\r\n\tif (${1:true}) {\r\n\t\t${0}\r\n\t}\r\n# if ... else\r\nsnippet ife\r\n\tif (${1:true}) {\r\n\t\t${2}\r\n\t} else {\r\n\t\t${0}\r\n\t}\r\n# tertiary conditional\r\nsnippet ter\r\n\t${1:/* condition */} ? ${2:a} : ${3:b}\r\n# switch\r\nsnippet switch\r\n\tswitch (${1:expression}) {\r\n\t\tcase \'${3:case}\':\r\n\t\t\t${4:// code}\r\n\t\t\tbreak;\r\n\t\t${5}\r\n\t\tdefault:\r\n\t\t\t${2:// code}\r\n\t}\r\n# case\r\nsnippet case\r\n\tcase \'${1:case}\':\r\n\t\t${2:// code}\r\n\t\tbreak;\r\n\t${3}\r\n\r\n# while (...) {...}\r\nsnippet wh\r\n\twhile (${1:/* condition */}) {\r\n\t\t${0:/* code */}\r\n\t}\r\n# try\r\nsnippet try\r\n\ttry {\r\n\t\t${0:/* code */}\r\n\t} catch (e) {}\r\n# do...while\r\nsnippet do\r\n\tdo {\r\n\t\t${2:/* code */}\r\n\t} while (${1:/* condition */});\r\n# Object Method\r\nsnippet :f\r\nregex /([,{[])|^\\s*/:f/\r\n\t${1:method_name}: function(${2:attribute}) {\r\n\t\t${0}\r\n\t}${3:,}\r\n# setTimeout function\r\nsnippet setTimeout\r\nregex /\\b/st|timeout|setTimeo?u?t?/\r\n\tsetTimeout(function() {${3:$TM_SELECTED_TEXT}}, ${1:10});\r\n# Get Elements\r\nsnippet gett\r\n\tgetElementsBy${1:TagName}(\'${2}\')${3}\r\n# Get Element\r\nsnippet get\r\n\tgetElementBy${1:Id}(\'${2}\')${3}\r\n# console.log (Firebug)\r\nsnippet cl\r\n\tconsole.log(${1});\r\n# return\r\nsnippet ret\r\n\treturn ${1:result}\r\n# for (property in object ) { ... }\r\nsnippet fori\r\n\tfor (var ${1:prop} in ${2:Things}) {\r\n\t\t${0:$2[$1]}\r\n\t}\r\n# hasOwnProperty\r\nsnippet has\r\n\thasOwnProperty(${1})\r\n# docstring\r\nsnippet /**\r\n\t/**\r\n\t * ${1:description}\r\n\t *\r\n\t */\r\nsnippet @par\r\nregex /^\\s*\\*\\s*/@(para?m?)?/\r\n\t@param {${1:type}} ${2:name} ${3:description}\r\nsnippet @ret\r\n\t@return {${1:type}} ${2:description}\r\n# JSON.parse\r\nsnippet jsonp\r\n\tJSON.parse(${1:jstr});\r\n# JSON.stringify\r\nsnippet jsons\r\n\tJSON.stringify(${1:object});\r\n# self-defining function\r\nsnippet sdf\r\n\tvar ${1:function_name} = function(${2:argument}) {\r\n\t\t${3:// initial code ...}\r\n\r\n\t\t$1 = function($2) {\r\n\t\t\t${4:// main code}\r\n\t\t};\r\n\t}\r\n# singleton\r\nsnippet sing\r\n\tfunction ${1:Singleton} (${2:argument}) {\r\n\t\t// the cached instance\r\n\t\tvar instance;\r\n\r\n\t\t// rewrite the constructor\r\n\t\t$1 = function $1($2) {\r\n\t\t\treturn instance;\r\n\t\t};\r\n\r\n\t\t// carry over the prototype properties\r\n\t\t$1.prototype = this;\r\n\r\n\t\t// the instance\r\n\t\tinstance = new $1();\r\n\r\n\t\t// reset the constructor pointer\r\n\t\tinstance.constructor = $1;\r\n\r\n\t\t${3:// code ...}\r\n\r\n\t\treturn instance;\r\n\t}\r\n# class\r\nsnippet class\r\nregex /^\\s*/clas{0,2}/\r\n\tvar ${1:class} = function(${20}) {\r\n\t\t$40$0\r\n\t};\r\n\r\n\t(function() {\r\n\t\t${60:this.prop = ""}\r\n\t}).call(${1:class}.prototype);\r\n\r\n\texports.${1:class} = ${1:class};\r\n#\r\nsnippet for-\r\n\tfor (var ${1:i} = ${2:Things}.length; ${1:i}--; ) {\r\n\t\t${0:${2:Things}[${1:i}];}\r\n\t}\r\n# for (...) {...}\r\nsnippet for\r\n\tfor (var ${1:i} = 0; $1 < ${2:Things}.length; $1++) {\r\n\t\t${3:$2[$1]}$0\r\n\t}\r\n# for (...) {...} (Improved Native For-Loop)\r\nsnippet forr\r\n\tfor (var ${1:i} = ${2:Things}.length - 1; $1 >= 0; $1--) {\r\n\t\t${3:$2[$1]}$0\r\n\t}\r\n\r\n\r\n#modules\r\nsnippet def\r\n\tdefine(function(require, exports, module) {\r\n\t"use strict";\r\n\tvar ${1/.*\\///} = require("${1}");\r\n\r\n\t$TM_SELECTED_TEXT\r\n\t});\r\nsnippet req\r\nguard ^\\s*\r\n\tvar ${1/.*\\///} = require("${1}");\r\n\t$0\r\nsnippet requ\r\nguard ^\\s*\r\n\tvar ${1/.*\\/(.)/\\u$1/} = require("${1}").${1/.*\\/(.)/\\u$1/};\r\n\t$0\r\n'}});