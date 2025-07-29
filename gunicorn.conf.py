# Gunicorn配置文件 - 针对512MB内存限制优化
import multiprocessing
import os

# 绑定地址和端口
bind = f"0.0.0.0:{os.getenv('PORT', '5000')}"

# 工作进程数 - 在512MB内存限制下使用单进程
workers = 1

# 工作进程类型
worker_class = "sync"

# 每个工作进程的最大请求数
max_requests = 100
max_requests_jitter = 10

# 超时设置
timeout = 30
keepalive = 2

# 内存管理
preload_app = True  # 预加载应用以节省内存
max_worker_connections = 50

# 日志配置
loglevel = "info"
access_log_format = '%(h)s %(l)s %(u)s %(t)s "%(r)s" %(s)s %(b)s "%(f)s" "%(a)s"'

# 进程名称
proc_name = "cloudy-day-monologue"

# 启用自动重启机制
worker_tmp_dir = "/dev/shm"  # 使用内存文件系统
tmp_upload_dir = "/tmp"

# 内存优化设置
def on_starting(server):
    """服务器启动时的钩子 - 初始化数据库"""
    server.log.info("正在初始化数据库...")
    try:
        # 初始化数据库
        import sys
        import os
        sys.path.insert(0, os.getcwd())
        from init_db import init_database
        
        if init_database():
            server.log.info("数据库初始化成功")
        else:
            server.log.error("数据库初始化失败")
            raise Exception("Database initialization failed")
    except Exception as e:
        server.log.error(f"数据库初始化异常: {e}")
        raise

def when_ready(server):
    """服务器准备就绪时的钩子"""
    import gc
    gc.collect()
    server.log.info("Server is ready. Memory optimized.")

def worker_int(worker):
    """工作进程中断时的钩子"""
    import gc
    gc.collect()
    worker.log.info("Worker shutting down. Memory cleaned.")