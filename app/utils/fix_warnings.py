"""
修复jieba库的正则表达式语法警告
在应用启动时运行此模块来修复第三方库的警告
"""
import warnings
import re

def fix_jieba_warnings():
    """修复jieba库的正则表达式警告"""
    # 过滤jieba相关的SyntaxWarning
    warnings.filterwarnings("ignore", category=SyntaxWarning, module="jieba")
    warnings.filterwarnings("ignore", category=SyntaxWarning, module="jieba.finalseg")
    warnings.filterwarnings("ignore", category=SyntaxWarning, module="jieba.posseg")
    
    try:
        # 尝试修复jieba内部的正则表达式
        import jieba
        
        # 如果jieba已经初始化，重新编译正则表达式
        if hasattr(jieba, 're_han_default'):
            jieba.re_han_default = re.compile(r"([\u4E00-\u9FD5a-zA-Z0-9+#&\._%\-]+)", re.U)
        
        if hasattr(jieba, 're_skip_default'):
            jieba.re_skip_default = re.compile(r"(\r\n|\s)", re.U)
            
        # 修复finalseg模块
        try:
            from jieba import finalseg
            if hasattr(finalseg, 're_skip'):
                finalseg.re_skip = re.compile(r"([a-zA-Z0-9]+(?:\.\d+)?%?)")
        except ImportError:
            pass
            
        # 修复posseg模块
        try:
            from jieba import posseg
            if hasattr(posseg, 're_skip_detail'):
                posseg.re_skip_detail = re.compile(r"([\.0-9]+|[a-zA-Z0-9]+)")
            if hasattr(posseg, 're_han_internal'):
                posseg.re_han_internal = re.compile(r"([\u4E00-\u9FD5a-zA-Z0-9+#&\._]+)")
            if hasattr(posseg, 're_skip_internal'):
                posseg.re_skip_internal = re.compile(r"(\r\n|\s)")
            if hasattr(posseg, 're_num'):
                posseg.re_num = re.compile(r"[\.0-9]+")
        except ImportError:
            pass
            
    except Exception as e:
        print(f"修复jieba警告时出错: {e}")

# 启动时自动运行
fix_jieba_warnings()