#!/usr/bin/env python3
"""
数据库初始化脚本
用于在Render等云平台部署时创建SQLite数据库和表结构
"""
import os
import sys
from pathlib import Path

def init_database():
    """初始化数据库"""
    try:
        print("开始初始化数据库...")
        
        # 导入应用和数据库
        from app import create_app, db
        
        app = create_app()
        
        with app.app_context():
            # 确保instance目录存在
            instance_dir = Path(app.instance_path)
            instance_dir.mkdir(exist_ok=True)
            print(f"确保instance目录存在: {instance_dir}")
            
            # 创建所有数据库表
            db.create_all()
            print("数据库表创建成功!")
            
            # 验证数据库文件是否存在
            db_path = Path(app.config['SQLALCHEMY_DATABASE_URI'].replace('sqlite:///', ''))
            if db_path.exists():
                print(f"数据库文件已创建: {db_path}")
                print(f"数据库文件大小: {db_path.stat().st_size} bytes")
            else:
                print("警告: 数据库文件未找到!")
                return False
            
            # 检查表是否存在
            from app.models import Memory, Thought
            try:
                memory_count = Memory.query.count()
                thought_count = Thought.query.count()
                print(f"Memory表记录数: {memory_count}")
                print(f"Thought表记录数: {thought_count}")
            except Exception as e:
                print(f"查询表时出错: {e}")
                return False
            
        print("数据库初始化完成!")
        return True
        
    except ImportError as e:
        print(f"导入错误: {e}")
        print("请确保已安装所有依赖项")
        return False
    except Exception as e:
        print(f"数据库初始化失败: {e}")
        return False

if __name__ == "__main__":
    success = init_database()
    sys.exit(0 if success else 1)