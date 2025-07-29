# Cloudy Day Monologue (阴天独白)

[中文](README.md) | **English**

> *I pull the string, reviewing the tenderness you gave me, the kite runs aground on a cloudy day, and missing you is still waiting for rescue*

A gentle emotional recording application that provides a quiet haven for your memory echoes and stranded thoughts.

## ✨ Project Introduction

Cloudy Day Monologue is a Flask-based web application designed for recording and sharing personal emotions. It provides two core features:

- **Memory Echo** - Record your precious memories with intelligent emotional analysis and tagging system
- **Stranded Thoughts** - Anonymously share inner thoughts and create emotional resonance with others

## 🌟 Key Features

### Memory Echo Module
- 📝 Create and manage personal memories
- 🎯 Intelligent emotional analysis (based on Chinese NLP)
- 🏷️ Automatic keyword extraction and tag generation
- 🔍 Search memories by keywords and emotion types
- 📊 Emotional trend visualization

### Stranded Thoughts Module
- 💭 Anonymously publish thoughts and ideas
- 🌈 Emotion type classification (positive, calm, negative)
- 👥 Browse anonymous thoughts from others
- 🔒 Completely anonymous, privacy protected

### Technical Highlights
- 🧠 Chinese Natural Language Processing (jieba segmentation + SnowNLP sentiment analysis)
- 🎨 Responsive interface design
- 💾 SQLite database storage
- 🔄 Flask-Migrate database migration
- 🎭 Bootstrap 5 modern UI

## 🚀 Quick Start

### Requirements
- Python 3.12+
- UV package manager (recommended) or pip

### Installation Steps

1. **Clone the project**
   ```bash
   git clone https://github.com/zym9863/Cloudy-Day-Monologue.git
   cd "Cloudy Day Monologue"
   ```

2. **Install dependencies**
   
   Using UV (recommended):
   ```bash
   uv sync
   ```
   
   Or using pip:
   ```bash
   pip install -r requirements.txt
   ```

3. **Initialize database**
   ```bash
   # Create instance folder if it doesn't exist
   mkdir instance
   
   # Initialize database migration
   flask db init
   flask db migrate -m "Initial migration"
   flask db upgrade
   ```

4. **Start the application**
   ```bash
   python main.py
   ```

5. **Access the application**
   Open your browser and visit `http://localhost:5000`

## 📁 Project Structure

```
Cloudy Day Monologue/
├── main.py                 # Application entry point
├── pyproject.toml          # Project configuration and dependencies
├── uv.lock                 # Dependency lock file
├── instance/
│   └── database.db         # SQLite database file
└── app/
    ├── __init__.py         # Flask application factory
    ├── models.py           # Data model definitions
    ├── routes/             # Route modules
    │   ├── memory.py       # Memory echo routes
    │   └── thoughts.py     # Stranded thoughts routes
    ├── templates/          # Jinja2 templates
    │   ├── base.html       # Base template
    │   ├── index.html      # Homepage template
    │   ├── memory/         # Memory-related templates
    │   └── thoughts/       # Thoughts-related templates
    ├── static/             # Static resources
    │   ├── css/
    │   ├── js/
    │   └── images/
    └── utils/
        └── nlp_processor.py # Chinese NLP processing tools
```

## 🛠️ Core Technology Stack

### Backend Framework
- **Flask** - Lightweight web framework
- **Flask-SQLAlchemy** - ORM database operations
- **Flask-Migrate** - Database migration management

### Data Storage
- **SQLite** - Lightweight relational database

### Natural Language Processing
- **jieba** - Chinese word segmentation library
- **SnowNLP** - Chinese text sentiment analysis

### Frontend Technology
- **Bootstrap 5** - Modern responsive CSS framework
- **Bootstrap Icons** - Icon library
- **Vanilla JavaScript** - Native JavaScript interactions

## 📊 Data Models

### Memory (Memory Echo)
```python
class Memory(db.Model):
    id: int              # Primary key
    title: str           # Memory title
    content: str         # Memory content
    emotion_score: float # Emotion score (-1 to 1)
    tags: str           # Keyword tags
    created_at: datetime # Creation time
    updated_at: datetime # Update time
```

### Thought (Stranded Thoughts)
```python
class Thought(db.Model):
    id: int              # Primary key
    content: str         # Thought content
    anonymous_id: str    # Anonymous user ID
    emotion_type: str    # Emotion type
    created_at: datetime # Creation time
```

## 🎨 Interface Preview

The application features a gentle cloudy day theme design:
- 🌫️ Soft gray-blue tones
- ☁️ Cloud and raindrop icon elements
- 📱 Fully responsive design
- 🎭 Elegant animation transitions

## 🔧 Development Guide

### Adding New Features
1. Define data models in `app/models.py`
2. Create route files in `app/routes/`
3. Add template files in `app/templates/`
4. Register new blueprints in `app/__init__.py`

### Database Migration
```bash
flask db migrate -m "Migration description"
flask db upgrade
```

### Custom NLP Processing
Edit `app/utils/nlp_processor.py` to adjust sentiment analysis and keyword extraction algorithms.

## 🤝 Contributing

Issues and Pull Requests are welcome!

1. Fork this project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💭 Design Philosophy

> In this fast-paced era, we need a quiet corner to store the voice of our hearts. Cloudy Day Monologue is not just an application, but an emotional haven.

- **Gentleness** - Treat every emotion with the gentlest approach
- **Safety** - Protect user privacy and provide a safe space for expression
- **Resonance** - Let similar emotions find each other and create resonance
- **Growth** - Witness inner growth through recording and reflection

## 📞 Contact

If you have any questions or suggestions, feel free to contact us through:

- 🐛 Issues: [GitHub Issues page]

---

*May every cloudy day have a gentle monologue, and may every stranded thought find its home.*