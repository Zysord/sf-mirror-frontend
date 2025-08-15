# SourceForge 加速器

一个基于 Next.js 和 CloudFlare Workers 的 SourceForge 反向代理加速服务，专为中国开发者提供高速访问体验。

## ✨ 功能特性

- 🚀 **高速访问** - 通过 CloudFlare 边缘网络加速 SourceForge 资源访问
- 🌍 **多镜像支持** - 支持多个 SourceForge 镜像站选择
- 📊 **实时监控** - 提供详细的性能监控和统计数据
- 🎨 **现代界面** - 基于 shadcn/ui 的精美用户界面
- 📱 **响应式设计** - 完美适配桌面和移动设备
- ⚡ **边缘计算** - 基于 CloudFlare Workers 的无服务器架构

## 🛠️ 技术栈

### 前端
- **Next.js 14** - React 全栈框架 (App Router)
- **TypeScript** - 类型安全的 JavaScript
- **Tailwind CSS** - 原子化 CSS 框架
- **shadcn/ui** - 现代 UI 组件库
- **Recharts** - 数据可视化图表

### 后端
- **CloudFlare Workers** - 边缘计算服务
- **KV 存储** - 统计数据持久化

## 🚀 快速开始

### 环境要求

- Node.js 18+ 
- npm 或 yarn 或 pnpm

### 本地开发

1. **克隆项目**
\`\`\`bash
git clone https://github.com/Zysord/sf-mirror-frontend.git
cd sf-mirror-frontend
\`\`\`

2. **安装依赖**
\`\`\`bash
npm install
# 或
yarn install
# 或
pnpm install
\`\`\`

3. **启动开发服务器**
\`\`\`bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
\`\`\`

4. **访问应用**
打开 [http://localhost:3000](http://localhost:3000) 查看应用

## 📦 部署指南

### Vercel 部署 (推荐)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Zysord/sf-mirror-frontend)

1. **一键部署**
   - 点击上方按钮或访问 [Vercel](https://vercel.com)
   - 导入 GitHub 仓库
   - 自动检测 Next.js 项目并部署

2. **手动部署**
\`\`\`bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel

# 生产环境部署
vercel --prod
\`\`\`

### CloudFlare Pages 部署

1. **登录 CloudFlare Dashboard**
   - 访问 [CloudFlare Pages](https://pages.cloudflare.com)
   - 连接 GitHub 仓库

2. **构建配置**
   - **框架预设**: Next.js
   - **构建命令**: `npm run build`
   - **构建输出目录**: `.next`
   - **Node.js 版本**: 18

3. **环境变量**
\`\`\`bash
NEXT_PUBLIC_SITE_URL=https://your-domain.pages.dev
\`\`\`

### Netlify 部署

1. **连接仓库**
   - 访问 [Netlify](https://netlify.com)
   - 从 Git 导入项目

2. **构建设置**
   - **构建命令**: `npm run build`
   - **发布目录**: `.next`
   - **Node.js 版本**: 18

3. **添加 netlify.toml**
\`\`\`toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
\`\`\`

## 📝 使用说明

### URL 转换

1. 在首页输入 SourceForge 下载链接
2. 选择合适的镜像站
3. 点击转换获取加速链接
4. 使用生成的链接进行高速下载

### 支持的链接格式

\`\`\`
https://sourceforge.net/projects/PROJECT/files/PATH/FILE/download
\`\`\`

### 镜像站选择

- **CloudFlare** - CF-Workers镜像站 (推荐)
- **LiquidTelecom** - 非洲/欧洲优化 (SourceForge官方)
- **Netactuate** - 美洲优化 (SourceForge官方)
- **Netix** - 亚洲优化 (SourceForge官方)

## 📊 监控面板

访问 `/dashboard` 查看详细的性能统计：

- 实时请求统计
- 响应时间分析
- 缓存命中率
- 热门下载项目
- 流量分析图表

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 开发规范

- 使用 TypeScript 进行类型检查
- 遵循 ESLint 代码规范
- 提交前运行测试
- 保持代码简洁和文档完整

## 📄 许可证

本项目基于 [MIT 许可证](LICENSE) 开源。

\`\`\`
MIT License

Copyright (c) 2025 Sf-Mirror-Frontend

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
\`\`\`

## 🔗 相关链接

- [SourceForge 官网](https://sourceforge.net)
- [CloudFlare Workers 文档](https://developers.cloudflare.com/workers/)
- [Next.js 文档](https://nextjs.org/docs)
- [shadcn/ui 组件库](https://ui.shadcn.com)

## 📞 支持

如果您遇到问题或有建议，请：

- 提交 [Issue](https://github.com/Zysord/sf-mirror-frontend/issues)
- 发起 [Discussion](https://github.com/Zysord/sf-mirror-frontend/discussions)
- 联系维护者

---

**⭐ 如果这个项目对您有帮助，请给我们一个 Star！**
