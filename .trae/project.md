---
name: "react-portfolio"
description: "创建 React 18 暗黑风格作品集网站 vexrune-portfolio，包含 Framer Motion 动画和 tsparticles 粒子背景。用户请求构建个人作品集网站时调用此技能。"
---

# React 作品集网站生成器

## 项目信息

- **项目名称**：vexrune-portfolio
- **域名**：vexrune.top / wiki.vexrune.top
- **技术栈**：React 18 + Framer Motion + tsparticles + react-tsparticles + styled-components + react-icons
- **部署**：阿里云 OSS 静态部署

## 项目说明

基于 React 18 + Framer Motion + tsparticles + react-tsparticles + styled-components + react-icons，开发极简暗黑风个人作品集单页网站，对标 simonaking.com。

包含模块：首页Hero、关于我、作品、Wiki知识库，Wiki主链接：http://wiki.vexrune.top/

复刻同款鼠标交互流体粒子背景、滚动入场动画、卡片hover上浮；响应式；适配阿里云OSS静态部署。

输出完整可运行代码 + npm安装命令，Create React App 结构。

## 技术要求

1. **Create React App** 项目结构，纯前端静态 SPA
2. **tsparticles** 粒子背景效果：
   - 深色背景 + 淡紫蓝色粒子（#a5b4fc）
   - 粒子缓慢流动
   - 鼠标悬停牵引粒子
   - 粒子连线透明度 0.18-0.35
   - 60fps 流畅渲染
3. **styled-components** 处理所有样式（无全局 CSS 污染）
4. **Framer Motion** 实现所有动画：
   - 滚动视差渐入
   - 上浮动画
   - 卡片悬停上浮 + 阴影
   - 文字淡入
5. **响应式** 移动端适配

## 页面结构（单页滚动）

### 1. Hero 首屏区
- 全屏居中布局
- 大标题 + 个人简介
- GitHub/社交图标
- 图标悬停放大效果

### 2. 关于我区
- 左侧标题 + 正文布局
- 技术栈介绍：Java、Python、React、Flutter、向量数据库、提示词工程、静态站部署

### 3. 作品区
- 网格卡片布局
- 卡片悬停上浮效果
- 展示 3 个项目：
  - 个人 Wiki 知识库
  - AI Agent 项目
  - 自动化脚本工具集

### 4. Wiki 知识库区
- 列表布局
- **主入口直接链接 http://wiki.vexrune.top/**
- 悬停：轻微右移 + 背景变色

## 视觉与配色规范

| 元素 | 颜色/值 |
|------|---------|
| 主背景 | #08080c（深黑） |
| 主文字 | #f0f0f0 |
| 高亮色 | #a5b4fc / #6366f1（淡紫蓝） |
| 卡片背景 | rgba(255,255,255,0.05)（磨砂玻璃） |
| 字体 | Inter 无衬线字体 |
| 粒子颜色 | #a5b4fc |
| 连线透明度 | 0.18-0.35 |

## 交互细节

- 平滑滚动：`html { scroll-behavior: smooth }`
- 所有区块进入视口时触发渐入动画
- 粒子背景固定在底层，不遮挡内容
- Wiki 模块主入口链接到 http://wiki.vexrune.top/
- **favicon.svg** 作为网站图标/logo

## 输出要求

生成完整可运行代码：
- `App.js` - 主 React 组件
- `index.css` - 最小化 CSS（粒子配置）
- NPM 安装命令
- 代码规范清晰、注释完整
- 直接 `npm start` 运行支持
- `npm run build` 兼容阿里云 OSS 部署

## 调用场景

当用户请求以下内容时调用此技能：
- 构建 vexrune-portfolio 项目
- 创建带粒子效果的 React 作品集
- 暗黑风格开发者作品集
- simonaking.com 风格网站
- 带 Framer Motion 动画的作品集
- 带 Wiki 集成的 React 单页作品集

## 使用方法

```bash
# 创建 React 项目
npx create-react-app vexrune-portfolio
cd vexrune-portfolio

# 安装依赖
npm install framer-motion tsparticles styled-components react-icons react-tsparticles

# 将生成的代码复制到 src/
# 运行开发服务器
npm start

# 生产环境构建（阿里云 OSS）
npm run build
```