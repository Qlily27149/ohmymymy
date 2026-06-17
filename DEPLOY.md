# 洛阳风物网站 - 部署指南

## 📦 打包步骤

### 方法一：使用文件管理器
1. 进入 `f:\trae_item\03_luoyang` 文件夹
2. 选中以下所有文件和文件夹：
   - `index.html`
   - `main.js`
   - `style.css`
   - `data/` 文件夹
   - `images/` 文件夹
   - `README.md`
   - `.gitignore`
   - `DEPLOY.md`
3. 右键 → 发送到 → 压缩（zipped）文件夹
4. 重命名为 `luoyang_deploy.zip`

### 方法二：使用 PowerShell
```powershell
cd f:\trae_item\03_luoyang
Compress-Archive -Path "index.html","main.js","style.css","data","images","README.md",".gitignore","DEPLOY.md" -DestinationPath "luoyang_deploy.zip" -Force
```

## 🚀 部署到 GitHub Pages

### 方式一：通过 GitHub 网页上传

1. **创建仓库**
   - 访问 https://github.com/new
   - 仓库名：`ohmymymy`
   - 设置为 Public
   - 勾选 "Add a README file"
   - 点击 "Create repository"

2. **上传文件**
   - 在仓库页面点击 "uploading an existing file"
   - 拖拽以下文件到上传区域：
     - `index.html`
     - `main.js`
     - `style.css`
     - `data/` 文件夹（包含所有 .js 文件）
     - `images/` 文件夹（包含所有图片）
     - `README.md`
     - `.gitignore`
     - `DEPLOY.md`
   - 在底部提交信息中输入：`Initial commit: 洛阳风物网站`
   - 点击 "Commit changes"

3. **启用 GitHub Pages**
   - 进入仓库设置：Settings → Pages
   - 在 "Source" 下选择：`Deploy from a branch`
   - Branch 选择：`main` (或 `master`)
   - Folder 选择：`/(root)`
   - 点击 "Save"
   - 等待 1-2 分钟，页面会显示访问链接

4. **访问网站**
   - 访问：`https://qlily27149.github.io/ohmymymy/`

### 方式二：使用 Git 命令行

```bash
# 1. 进入项目目录
cd f:\trae_item\03_luoyang

# 2. 初始化 Git
git init

# 3. 添加所有文件
git add .

# 4. 提交
git commit -m "Initial commit: 洛阳风物网站"

# 5. 添加远程仓库
git remote add origin https://github.com/Qlily27149/ohmymymy.git

# 6. 推送到 GitHub
git branch -M main
git push -u origin main
```

然后按照方式一的步骤 3-4 启用 GitHub Pages。

## 💾 保存自定义图片（重要）

### 问题说明
用户在网页中上传的自定义图片保存在浏览器的 localStorage 中，不会自动保存到项目文件里。部署到 GitHub Pages 后，新用户看不到之前上传的图片。

### 解决方案：导出并嵌入自定义数据

**步骤 1：导出当前数据**
1. 在本地打开网站
2. 点击右下角的"开发者模式"按钮
3. 在开发者面板中点击"导出所有数据"
4. 保存下载的 JSON 文件

**步骤 2：更新初始数据文件**
1. 打开 `data/initialData.js` 文件
2. 将导出的 JSON 数据复制到对应的变量中：
   - `initialCustomImages`: 自定义图片数据
   - `initialCustomTexts`: 自定义文本数据
   - `initialFavorites`: 收藏夹数据
   - `initialMarkerData`: 地图标记数据
   - `initialCustomSlides`: 自定义轮播图数据

**步骤 3：重新部署**
1. 将更新后的 `data/initialData.js` 文件上传到 GitHub
2. 提交更改

**示例：更新图片数据**
```javascript
const initialCustomImages = {
    "archive18": "data:image/png;base64,iVBORw0KGgo...",
    "archive19": "data:image/png;base64,iVBORw0KGgo...",
    // 更多图片...
};
```

## 🌐 其他部署平台

### Vercel
1. 访问 https://vercel.com/new
2. 导入 GitHub 仓库 `Qlily27149/ohmymymy`
3. 点击 "Deploy"
4. 几秒后即可访问

### Netlify
1. 访问 https://app.netlify.com/drop
2. 拖拽 `luoyang_deploy.zip` 文件到页面
3. 等待部署完成

## 📝 部署检查清单

- [ ] 所有文件都已上传
- [ ] `data/initialData.js` 已包含自定义数据
- [ ] GitHub Pages 已启用
- [ ] 网站可以正常访问
- [ ] 图片资源加载正常
- [ ] 交互功能正常工作
- [ ] 移动端显示正常

## 🔧 常见问题

### 网站显示 404
- 检查 GitHub Pages 设置中的分支是否正确
- 等待 1-2 分钟让 GitHub 完成部署

### 图片无法加载
- 检查 images 文件夹是否已上传
- 确认图片文件名大小写正确（Linux 区分大小写）
- 确认自定义图片已导出并更新到 `data/initialData.js`

### 功能异常
- 打开浏览器控制台（F12）查看错误信息
- 确保所有 .js 文件都已上传

### 自定义图片部署后丢失
- 按照"保存自定义图片"章节的步骤操作
- 确保已导出数据并更新 `data/initialData.js`

---

**部署完成后，你的网站将可以通过以下地址访问：**
`https://qlily27149.github.io/ohmymymy/`