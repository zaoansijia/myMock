## 简介

内部调用mock数据

## 快速开始

> 在开始之前，假设你已经成功安装了 [Node.js](https://nodejs.org)（**v7.4** 以上）和 [MongoDB](https://www.mongodb.com)（**v3.4** 以上）。


## 使用和说明

* 默认使用**vscode**作为开发工具，统一插件和配置
* `yarn install`或者`yarn` 安装所有依赖，如果没有yarn，请先安装 `npm install -g yarn`
* `npm run dev` 启动开发模式
* 代码目前只有**master**分支,提交远程到**master**分支，如果开发新功能，请pull新分支开发,功能成熟再合并
* 提交前请保证代码不会出现`eslint`报错
* 项目结构和命令请查看[文档](http://gitlab.gome.inc/yangliu/easy-mock)

### 配置数据库文件

找到 **config/default.json**，或者创建一个 **config/local.json** 文件，将如下需要替换的字段换成自己的配置。

```js
{
  "db": "mongodb://localhost/{数据库名}",
  "unsplashClientId": "可空。背景图配置，见下面说明。",
  "jwt": {
    "secret": "shared-secret"
  },
  "fe": {
    "publicPath": "/dist/",
    "APIPrefix": "http://127.0.0.1:7300/api",
    "storageNamespace": "cookies & localStorage 的命名空间。"
  }
}
```
### 配置 APIPrefix 

当在服务器上部署时，我们应该将 `APIPrefix` 配置成服务器的地址。文件地址在view/config.json

例如服务地址为 http://example.com 时，`APIPrefix` 应配置为 http://example.com/api。