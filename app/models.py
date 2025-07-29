from . import db
from datetime import datetime

class Memory(db.Model):
    """记忆回响数据模型"""
    __tablename__ = 'memories'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False, comment='记忆标题')
    content = db.Column(db.Text, nullable=False, comment='记忆内容')
    emotion_score = db.Column(db.Float, default=0.0, comment='情感分数(-1到1)')
    tags = db.Column(db.String(500), comment='关键词标签，逗号分隔')
    created_at = db.Column(db.DateTime, default=datetime.now, comment='创建时间')
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now, comment='更新时间')
    
    def __repr__(self):
        return f'<Memory {self.title}>'
    
    def get_tags_list(self):
        """获取标签列表"""
        if self.tags:
            return [tag.strip() for tag in self.tags.split(',') if tag.strip()]
        return []
    
    def get_emotion_text(self):
        """获取情感描述"""
        if self.emotion_score > 0.3:
            return '积极'
        elif self.emotion_score < -0.3:
            return '消极'
        else:
            return '平静'
    
    def get_emotion_color(self):
        """获取情感对应颜色"""
        if self.emotion_score > 0.3:
            return 'text-success'
        elif self.emotion_score < -0.3:
            return 'text-danger'
        else:
            return 'text-secondary'

class Thought(db.Model):
    """搁浅心事数据模型"""
    __tablename__ = 'thoughts'
    
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False, comment='心事内容')
    anonymous_id = db.Column(db.String(36), nullable=False, comment='匿名用户ID')
    emotion_type = db.Column(db.String(20), default='平静', comment='情感类型')
    is_public = db.Column(db.Boolean, default=True, comment='是否公开显示')
    created_at = db.Column(db.DateTime, default=datetime.now, comment='创建时间')
    
    def __repr__(self):
        return f'<Thought {self.id}>'
    
    def get_emotion_color(self):
        """获取情感类型对应的颜色"""
        emotion_colors = {
            '悲伤': 'text-primary',
            '快乐': 'text-warning',
            '愤怒': 'text-danger',
            '焦虑': 'text-info',
            '怀念': 'text-secondary',
            '积极': 'text-success',
            '消极': 'text-danger',
            '平静': 'text-muted'
        }
        return emotion_colors.get(self.emotion_type, 'text-muted')
    
    def get_anonymous_name(self):
        """获取匿名用户名"""
        # 基于anonymous_id生成一个固定的匿名名称
        names = ['路人甲', '漂流者', '风筝', '云朵', '雨滴', '阴天', '独白者', '搁浅人', '等待者', '救援者']
        hash_value = hash(self.anonymous_id) % len(names)
        return names[hash_value]