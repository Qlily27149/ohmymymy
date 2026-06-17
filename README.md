# 洛阳风物网站

一个展示洛阳文化、美食、非遗和景点的现代化网站。

## 功能特点

- 🏛️ **文化展示** - 展示洛阳丰富的历史文化
- 🍜 **美食推荐** - 介绍洛阳特色美食
- 🎨 **非遗传承** - 展示洛阳非物质文化遗产
- 🏔️ **景点介绍** - 详细介绍洛阳著名景点
- 🗺️ **互动地图** - 可交互的地图标记点
- ❤️ **收藏功能** - 用户可以收藏喜欢的内容
- 📱 **响应式设计** - 支持桌面和移动设备
- 🎨 **现代化UI** - 采用暗色主题和金色点缀

## 技术栈

- 纯 HTML5 + CSS3 + JavaScript
- 无框架依赖，轻量级
- 响应式设计
- 本地存储（localStorage）

## 快速开始

### 本地运行

1. 克隆或下载项目
2. 使用本地服务器运行：

```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js
npx http-server

# 使用 PHP
php -S localhost:8000
```

3. 在浏览器中访问 `http://localhost:8000`

### 部署到 GitHub Pages

1. 将项目推送到 GitHub 仓库
2. 进入仓库设置 → Pages
3. 选择分支（通常是 main 或 master）
4. 保存后等待部署完成
5. 访问 `https://yourusername.github.io/ohmymymy/`

## 项目结构

```
03_luoyang/
├── index.html          # 主页面
├── main.js            # 主要逻辑
├── style.css          # 样式文件
├── data/              # 数据文件
│   ├── archiveData.js # 风物档案数据
│   ├── cultureData.js # 文化数据
│   ├── heroSlidesData.js # 轮播图数据
│   └── journalData.js # 游记数据
├── images/            # 图片资源
└── .gitignore         # Git 忽略文件
```

## 主要功能

### 风物档案
- 美食、非遗、景点三个分类
- 支持自定义图片和文本
- 收藏功能
- 网站链接跳转

### 互动地图
- 可拖拽、缩放的地图
- 自定义标记点
- 点击标记查看详情
- 支持自定义标记图片

### 收藏夹
- 右侧隐藏式收藏夹
- 支持收藏所有类型的内容
- 点击收藏项跳转到原内容
- 导出/导入收藏数据

### 开发者模式
- 内联编辑功能
- 图片上传和压缩
- 文本内容编辑
- 数据导出/导入

## 浏览器支持

- Chrome/Edge (推荐)
- Firefox
- Safari
- 移动端浏览器

## 许可证

MIT License

## 作者

Qlily27149

---

**注意**: 本项目使用 localStorage 存储用户数据，清除浏览器缓存会导致数据丢失。