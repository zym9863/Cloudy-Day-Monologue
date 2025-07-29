import re
import gc
from functools import lru_cache

# 延迟导入，减少内存占用
jieba = None
jieba_analyse = None
SnowNLP = None

def _init_jieba():
    """延迟初始化jieba"""
    global jieba, jieba_analyse
    if jieba is None:
        import jieba as _jieba
        import jieba.analyse as _jieba_analyse
        jieba = _jieba
        jieba_analyse = _jieba_analyse
        # 设置jieba使用更少的内存
        jieba.dt.FREQ = {}
        jieba.dt.total = 0

def _init_snownlp():
    """延迟初始化SnowNLP"""
    global SnowNLP
    if SnowNLP is None:
        from snownlp import SnowNLP as _SnowNLP
        SnowNLP = _SnowNLP

@lru_cache(maxsize=128)
def analyze_emotion(text):
    """
    分析文本情感分数
    返回值: -1到1之间，负数表示负面情感，正数表示正面情感
    """
    try:
        _init_snownlp()
        s = SnowNLP(text)
        # SnowNLP返回0-1之间的值，0.5为中性，转换为-1到1
        score = (s.sentiments - 0.5) * 2
        # 清理内存
        del s
        gc.collect()
        return round(score, 3)
    except Exception:
        return 0.0

@lru_cache(maxsize=128)
def extract_keywords(text, topK=5):
    """
    提取文本关键词
    """
    try:
        _init_jieba()
        # 清理文本
        clean_content = clean_text(text)
        keywords = jieba_analyse.extract_tags(clean_content, topK=topK, withWeight=False)
        # 清理内存
        gc.collect()
        return keywords
    except Exception:
        return []

@lru_cache(maxsize=256)
def classify_emotion_type(text):
    """
    分类情感类型
    """
    # 简化版本，减少内存使用
    emotion_score = analyze_emotion(text)
    
    # 精简情感关键词，只保留最重要的
    emotion_keywords = {
        '悲伤': ['伤心', '难过', '痛苦', '失落', '孤独'],
        '快乐': ['开心', '快乐', '幸福', '高兴', '喜悦'],
        '愤怒': ['愤怒', '生气', '恼火', '烦躁'],
        '焦虑': ['焦虑', '担心', '紧张', '害怕'],
        '怀念': ['怀念', '想念', '回忆', '过去']
    }
    
    # 检查关键词
    for emotion, keywords in emotion_keywords.items():
        if any(keyword in text for keyword in keywords):
            return emotion
    
    # 基于情感分数分类
    if emotion_score > 0.3:
        return '积极'
    elif emotion_score < -0.3:
        return '消极'
    else:
        return '平静'

@lru_cache(maxsize=512)
def clean_text(text):
    """
    清理文本，去掉特殊字符
    """
    # 使用原始字符串避免语法警告
    text = re.sub(r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+', '', text)
    text = re.sub(r'\S+@\S+\.\S+', '', text)
    text = re.sub(r'\s+', ' ', text)
    
    return text.strip()