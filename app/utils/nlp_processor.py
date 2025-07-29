import jieba
import jieba.analyse
from snownlp import SnowNLP
import re

def analyze_emotion(text):
    """
    分析文本情感分数
    返回值: -1到1之间，负数表示负面情感，正数表示正面情感
    """
    try:
        s = SnowNLP(text)
        # SnowNLP返回0-1之间的值，0.5为中性，转换为-1到1
        score = (s.sentiments - 0.5) * 2
        return round(score, 3)
    except:
        return 0.0

def extract_keywords(text, topK=5):
    """
    提取文本关键词
    """
    try:
        # 清理文本
        text = clean_text(text)
        keywords = jieba.analyse.extract_tags(text, topK=topK, withWeight=False)
        return keywords
    except:
        return []

def classify_emotion_type(text):
    """
    分类情感类型
    """
    emotion_score = analyze_emotion(text)
    
    # 定义情感关键词
    sad_keywords = ['伤心', '难过', '痛苦', '失落', '孤独', '绝望', '痛哭', '眼泪']
    happy_keywords = ['开心', '快乐', '幸福', '高兴', '喜悦', '兴奋', '满足']
    angry_keywords = ['愤怒', '生气', '恼火', '烦躁', '讨厌', '厌恶']
    anxious_keywords = ['焦虑', '担心', '紧张', '害怕', '恐惧', '不安', '压力']
    nostalgic_keywords = ['怀念', '想念', '回忆', '过去', '曾经', '以前']
    
    text_lower = text.lower()
    
    # 检查关键词
    if any(keyword in text for keyword in sad_keywords):
        return '悲伤'
    elif any(keyword in text for keyword in happy_keywords):
        return '快乐'
    elif any(keyword in text for keyword in angry_keywords):
        return '愤怒'
    elif any(keyword in text for keyword in anxious_keywords):
        return '焦虑'
    elif any(keyword in text for keyword in nostalgic_keywords):
        return '怀念'
    else:
        # 基于情感分数分类
        if emotion_score > 0.3:
            return '积极'
        elif emotion_score < -0.3:
            return '消极'
        else:
            return '平静'

def clean_text(text):
    """
    清理文本，去掉特殊字符
    """
    # 去掉网址、邮箱等
    text = re.sub(r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+', '', text)
    text = re.sub(r'\S+@\S+\.\S+', '', text)
    
    # 去掉多余的空白字符
    text = re.sub(r'\s+', ' ', text)
    
    return text.strip()