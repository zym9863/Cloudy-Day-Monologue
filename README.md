# 阴天独白 (Cloudy Day Monologue)

**中文** | [English](README_EN.md)

> *我拉着线 复习你给的温柔，风筝在阴天搁浅，想念还在等待救援*

一个温柔的情感记录应用，为你的记忆回响与搁浅心事提供一个安静的归宿。

## ✨ 项目简介

阴天独白是一个基于Flask的Web应用程序，专为记录和分享个人情感而设计。它提供了两个核心功能：

- **记忆回响** - 记录你的珍贵回忆，配合智能情感分析和标签系统
- **搁浅心事** - 匿名分享内心的想法，与他人产生情感共鸣

## 🌟 主要特性

### 记忆回响模块
- 📝 创建和管理个人记忆
- 🎯 智能情感分析（基于中文NLP）
- 🏷️ 自动关键词提取和标签生成
- 🔍 按关键词和情感类型搜索记忆
- 📊 情感趋势可视化

### 搁浅心事模块
- 💭 匿名发布心事和想法
- 🌈 情感类型分类（积极、平静、消极）
- 👥 浏览他人的匿名心事
- 🔒 完全匿名，保护隐私

### 技术亮点
- 🧠 中文自然语言处理（jieba分词 + SnowNLP情感分析）
- 🎨 响应式界面设计
- 💾 SQLite数据库存储
- 🔄 Flask-Migrate数据库迁移
- 🎭 Bootstrap 5现代UI

## 🚀 快速开始

### 环境要求
- Python 3.12+
- UV包管理器（推荐）或 pip

### 安装步骤

1. **克隆项目**
   ```bash
   git clone https://github.com/zym9863/Cloudy-Day-Monologue.git
   cd "Cloudy Day Monologue"
   ```

2. **安装依赖**
   
   使用UV（推荐）：
   ```bash
   uv sync
   ```
   
   或使用pip：
   ```bash
   pip install -r requirements.txt
   ```

3. **初始化数据库**
   ```bash
   # 如果instance文件夹不存在，请先创建
   mkdir instance
   
   # 初始化数据库迁移
   flask db init
   flask db migrate -m "Initial migration"
   flask db upgrade
   ```

4. **启动应用**
   ```bash
   python main.py
   ```

5. **访问应用**
   打开浏览器访问 `http://localhost:5000`

## 📁 项目结构

```
Cloudy Day Monologue/
├── main.py                 # 应用入口文件
├── pyproject.toml          # 项目配置和依赖
├── uv.lock                 # 依赖锁定文件
├── instance/
│   └── database.db         # SQLite数据库文件
└── app/
    ├── __init__.py         # Flask应用工厂
    ├── models.py           # 数据模型定义
    ├── routes/             # 路由模块
    │   ├── memory.py       # 记忆回响路由
    │   └── thoughts.py     # 搁浅心事路由
    ├── templates/          # Jinja2模板
    │   ├── base.html       # 基础模板
    │   ├── index.html      # 首页模板
    │   ├── memory/         # 记忆相关模板
    │   └── thoughts/       # 心事相关模板
    ├── static/             # 静态资源
    │   ├── css/
    │   ├── js/
    │   └── images/
    └── utils/
        └── nlp_processor.py # 中文NLP处理工具
```

## 🛠️ 核心技术栈

### 后端框架
- **Flask** - 轻量级Web框架
- **Flask-SQLAlchemy** - ORM数据库操作
- **Flask-Migrate** - 数据库迁移管理

### 数据存储
- **SQLite** - 轻量级关系型数据库

### 自然语言处理
- **jieba** - 中文分词库
- **SnowNLP** - 中文文本情感分析

### 前端技术
- **Bootstrap 5** - 现代响应式CSS框架
- **Bootstrap Icons** - 图标库
- **Vanilla JavaScript** - 原生JavaScript交互

## 📊 数据模型

### Memory（记忆回响）
```python
class Memory(db.Model):
    id: int              # 主键
    title: str           # 记忆标题
    content: str         # 记忆内容
    emotion_score: float # 情感分数(-1到1)
    tags: str           # 关键词标签
    created_at: datetime # 创建时间
    updated_at: datetime # 更新时间
```

### Thought（搁浅心事）
```python
class Thought(db.Model):
    id: int              # 主键
    content: str         # 心事内容
    anonymous_id: str    # 匿名用户ID
    emotion_type: str    # 情感类型
    created_at: datetime # 创建时间
```

## 🎨 界面预览

应用采用温柔的阴天主题设计：
- 🌫️ 柔和的灰蓝色调
- ☁️ 云朵和雨滴图标元素
- 📱 完全响应式设计
- 🎭 优雅的动画过渡效果

## 🔧 开发指南

### 添加新功能
1. 在 `app/models.py` 中定义数据模型
2. 在 `app/routes/` 中创建路由文件
3. 在 `app/templates/` 中添加模板文件
4. 在 `app/__init__.py` 中注册新的蓝图

### 数据库迁移
```bash
flask db migrate -m "迁移描述"
flask db upgrade
```

### 自定义NLP处理
编辑 `app/utils/nlp_processor.py` 来调整情感分析和关键词提取算法。

## 🤝 贡献指南

欢迎提交Issue和Pull Request！

1. Fork本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开Pull Request

## 📝 许可证

本项目采用MIT许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 💭 设计理念

> 在这个快节奏的时代，我们需要一个安静的角落来存放内心的声音。阴天独白不仅仅是一个应用，更是一个情感的避风港。

- **温柔** - 用最温柔的方式对待每一份情感
- **安全** - 保护用户隐私，提供安全的表达空间
- **共鸣** - 让相似的情感找到彼此，产生共鸣
- **成长** - 通过记录和回顾，见证内心的成长

## 📞 联系方式

如果你有任何问题或建议，欢迎通过以下方式联系：

- 🐛 Issues: [GitHub Issues页面]

---

*愿每一个阴天都有温柔的独白，愿每一份搁浅的心事都能找到归宿。*
