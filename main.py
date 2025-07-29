import os
import gc
from app import create_app

# 内存优化
gc.set_threshold(700, 10, 10)

app = create_app()

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
else:
    # 生产环境下的内存优化
    gc.collect()
