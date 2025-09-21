# SearchHub - 多引擎智能搜索聚合平台

![SearchHub界面演示](https://via.placeholder.com/800x400?text=SearchHub+Screenshot)

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/your-username/SearchHub)](https://github.com/your-username/SearchHub/issues)
[![GitHub stars](https://img.shields.io/github/stars/your-username/SearchHub)](https://github.com/your-username/SearchHub/stargazers)

## 🌟 项目简介

SearchHub 是一款基于 Web 的智能搜索聚合工具，支持用户**一次输入关键词，即可同时在多个自定义搜索引擎中进行搜索**。无论是日常搜索、学术研究、代码查询还是媒体内容，SearchHub 都能帮助您高效获取全方位的信息。

## ✨ 核心特性

- 🔍 **多引擎同时搜索** - 一次输入，多平台同步搜索
- 🧩 **自定义搜索分组** - 按需创建和管理搜索分类
- 🎨 **美观的交互界面** - 现代化毛玻璃设计，流畅动画效果
- 💾 **本地化配置存储** - 所有设置保存在本地，保护隐私安全
- 📱 **响应式设计** - 完美适配桌面和移动设备
- ⚡ **纯前端实现** - 无需后端，单HTML文件即可运行

## 🚀 快速开始

### 直接使用

1. 访问 [SearchHub在线版](https://your-username.github.io/SearchHub)
2. 或下载 `SearchHub.html` 并在浏览器中打开

### 本地开发

```bash
# 克隆项目
git clone https://github.com/your-username/SearchHub.git

# 进入目录
cd SearchHub

# 在浏览器中打开
open SearchHub.html
# 或使用Live Server等工具
```

## 🛠️ 使用方法

### 基本搜索

1. 在输入框中输入关键词
2. 选择搜索分组（如：通用搜索、代码搜索等）
3. 点击搜索按钮或按回车键
4. 系统会在所选分组的所有搜索引擎中打开搜索结果

### 管理搜索分组

1. 点击右上角的"配置"按钮
2. 展开"新建分组"表单，添加新分组
3. 为分组设置名称和颜色
4. 在各分组中添加搜索引擎（需包含`{keyword}`占位符）

### 管理搜索引擎

- **添加引擎**：在分组配置中填写引擎信息
- **删除引擎**：长按引擎图标即可删除
- **单独搜索**：点击单个引擎图标可在该引擎中搜索

## 📁 项目结构

```
SearchHub/
├── SearchHub.html          # 主页面文件
├── README.md               # 项目说明文档
├── LICENSE                 # 开源许可证
└── assets/                 # 资源文件目录（可选）
    ├── images/             # 图片资源
    └── screenshots/        # 截图
```

## 🛠️ 技术栈

- **前端**: HTML5, CSS3, JavaScript (ES6+)
- **样式**: 自定义CSS，毛玻璃效果设计
- **图标**: Font Awesome 6
- **存储**: LocalStorage (本地存储)
- **兼容性**: 所有现代浏览器

## 🤝 参与贡献

我们欢迎任何形式的贡献！以下是参与方式：

1. Fork 本项目
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

### 待开发功能

- [ ] 导入/导出配置功能
- [ ] 搜索引擎拖拽排序
- [ ] 云同步功能
- [ ] 浏览器插件版本
- [ ] 更多搜索引擎模板

## 📝 更新日志

### v1.0.0 (2025-09-21)
- 初始版本发布
- 支持多引擎同步搜索
- 支持自定义搜索分组
- 本地配置存储功能
- 响应式界面设计

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 👥 作者

- **Your Name** - [@JianDan](https://github.com/your-username)

## 🙏 致谢

- 感谢 [Font Awesome](https://fontawesome.com/) 提供精美图标
- 感谢所有贡献者和用户的支持

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 提交 [Issue](https://github.com/your-username/SearchHub/issues)
- 发送邮件至: zhangdeyuan963@gmail.com
---

⭐ 如果这个项目对您有帮助，请给它一个星标！
