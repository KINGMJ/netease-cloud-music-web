# 网易云音乐 web 端歌单助手

![image-20211009163339839](http://image.maplejoyous.cn/post/2021/10/09/2021100916334141.png)

![](https://img.shields.io/badge/node-%3E%3D%2012.18.1-brightgreen) ![](https://img.shields.io/badge/npm-v6.14.7-blue) ![](https://img.shields.io/badge/license-MIT-informational)

该项目是基于 [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi) 研发的 web 端，初衷是实现在 mac 上可以上传歌曲到云盘。

## 安装

```
git clone git@github.com:KINGMJ/netease-cloud-music-web.git
cd netease-cloud-music-web
yarn
```

## 运行

该项目跟 [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)是完全独立的，并没有集成。首先保证运行 [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi) 项目

然后，以 serve 模式运行该项目

```
cd netease-cloud-music-web
yarn serve
```

运行成功后，访问 http://localhost:8080/

## 功能特性

1. 支持手机号和密码登录
2. 歌单歌曲上传功能，上传完后歌单中该歌曲会替换为云盘中的歌曲
3. 歌单展示，对于用户自建的歌单可以显示歌单中歌曲是否上传到云盘、大小、类型字段
4. 云盘展示，云盘中的歌曲会显示所在的歌单
5. 云盘歌曲过滤功能，能过滤出不在歌单中的歌曲
6. 歌单歌曲过滤功能，能过滤出不在云盘中的歌曲
7. 各种排序功能
