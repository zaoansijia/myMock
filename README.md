## 简介

内部试用mock数据，基于大搜车的[easy-mock](https://github.com/easy-mock/easy-mock)

## 快速开始

> 在开始之前，假设你已经成功安装了 [Node.js](https://nodejs.org)（**v7.4** 以上）和 [MongoDB](https://www.mongodb.com)（**v3.4** 以上）。


## 使用和说明

* 默认使用**vscode**作为开发工具，统一插件和配置
* `yarn install`或者`yarn` 安装所有依赖，如果没有yarn，请先安装 `npm install -g yarn`
* `npm run dev` 启动开发模式
* 代码提交远程到**develop**分支，而不是**master**
* 提交前请保证代码不会出现`eslint`报错
* 具体详细项目文档请查看[文档](https://github.com/easy-mock/easy-mock/blob/dev/README.zh-CN.md)

### 配置文件

找到 **config/default.json**，或者创建一个 **config/local.json** 文件，将如下需要替换的字段换成自己的配置即可。

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
### 正确配置 APIPrefix

当在服务器上部署时，我们应该将 `APIPrefix` 配置成服务器的地址。

例如服务地址为 http://example.com 时，`APIPrefix` 应配置为 http://example.com/api。