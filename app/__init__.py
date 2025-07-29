from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import os

# 修复第三方库警告
from .utils.fix_warnings import fix_jieba_warnings
fix_jieba_warnings()

db = SQLAlchemy()
migrate = Migrate()

def create_app(config_name=None):
    app = Flask(__name__)
    
    # 配置数据库
    basedir = os.path.abspath(os.path.dirname(__file__))
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.join(os.path.dirname(basedir), "instance", "database.db")}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'cloudy-day-monologue-2025'
    
    # 初始化扩展
    db.init_app(app)
    migrate.init_app(app, db)
    
    # 导入模型
    from . import models
    
    # 注册蓝图
    from .routes.memory import memory_bp
    from .routes.thoughts import thoughts_bp
    
    app.register_blueprint(memory_bp, url_prefix='/memory')
    app.register_blueprint(thoughts_bp, url_prefix='/thoughts')
    
    # 主页路由
    @app.route('/')
    def index():
        from flask import render_template
        return render_template('index.html')
    
    return app