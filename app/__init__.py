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
    db_path = os.path.join(os.path.dirname(basedir), "instance", "database.db")
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'cloudy-day-monologue-2025'
    
    # 确保instance目录存在
    instance_dir = os.path.dirname(db_path)
    os.makedirs(instance_dir, exist_ok=True)
    
    # 初始化扩展
    db.init_app(app)
    migrate.init_app(app, db)
    
    # 导入模型
    from . import models
    
    # 确保数据库表存在
    with app.app_context():
        try:
            db.create_all()
            print("数据库表检查/创建完成")
        except Exception as e:
            print(f"数据库初始化错误: {e}")
    
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