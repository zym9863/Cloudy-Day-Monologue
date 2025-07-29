#!/usr/bin/env python3
"""
应用启动脚本 - 适用于Render等云平台部署
"""
import os
import sys
import subprocess
from pathlib import Path

def main():
    """主启动函数"""
    print("=== Cloudy Day Monologue 应用启动 ===")
    
    # 1. 初始化数据库
    print("步骤1: 初始化数据库...")
    try:
        from init_db import init_database
        if not init_database():
            print("数据库初始化失败!")
            sys.exit(1)
    except Exception as e:
        print(f"数据库初始化异常: {e}")
        sys.exit(1)
    
    # 2. 启动应用服务器
    print("步骤2: 启动应用服务器...")
    
    # 检查是否在Render等生产环境
    if os.getenv('RENDER') or os.getenv('PYTHON_VERSION'):
        # 生产环境使用gunicorn
        print("检测到生产环境，使用gunicorn启动...")
        try:
            cmd = ['gunicorn', '--config', 'gunicorn.conf.py', 'main:app']
            subprocess.run(cmd, check=True)
        except subprocess.CalledProcessError as e:
            print(f"gunicorn启动失败: {e}")
            sys.exit(1)
        except FileNotFoundError:
            print("gunicorn未找到，尝试直接运行应用...")
            # 如果gunicorn不可用，回退到Flask开发服务器
            from main import app
            app.run(host='0.0.0.0', port=int(os.getenv('PORT', 5000)))
    else:
        # 开发环境直接运行
        print("开发环境，直接运行应用...")
        from main import app
        app.run(debug=True, host='0.0.0.0', port=5000)

if __name__ == "__main__":
    main()