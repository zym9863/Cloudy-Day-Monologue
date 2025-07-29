from flask import Blueprint, render_template, request, redirect, url_for, flash, session
from ..models import Thought, db
from ..utils.nlp_processor import analyze_emotion, classify_emotion_type
from datetime import datetime
import uuid

thoughts_bp = Blueprint('thoughts', __name__)

@thoughts_bp.route('/')
def index():
    emotion_filter = request.args.get('emotion', '')
    
    if emotion_filter:
        thoughts = Thought.query.filter_by(emotion_type=emotion_filter, is_public=True).order_by(Thought.created_at.desc()).all()
    else:
        thoughts = Thought.query.filter_by(is_public=True).order_by(Thought.created_at.desc()).all()
    
    return render_template('thoughts/index.html', thoughts=thoughts, current_filter=emotion_filter)

@thoughts_bp.route('/add', methods=['GET', 'POST'])
def add_thought():
    if request.method == 'POST':
        content = request.form.get('content')
        is_public = request.form.get('is_public') == 'on'
        
        if not content:
            flash('心事内容不能为空', 'error')
            return redirect(url_for('thoughts.add_thought'))
        
        # 生成匿名标识
        if 'anonymous_id' not in session:
            session['anonymous_id'] = str(uuid.uuid4())
        
        # 使用NLP分析情感类型
        emotion_score = analyze_emotion(content)
        emotion_type = classify_emotion_type(content)
        
        thought = Thought(
            content=content,
            anonymous_id=session['anonymous_id'],
            emotion_type=emotion_type,
            is_public=is_public,
            created_at=datetime.now()
        )
        
        db.session.add(thought)
        db.session.commit()
        
        flash('心事已投递', 'success')
        return redirect(url_for('thoughts.index'))
    
    return render_template('thoughts/add.html')

@thoughts_bp.route('/my')
def my_thoughts():
    if 'anonymous_id' not in session:
        flash('您还没有投递过心事', 'info')
        return redirect(url_for('thoughts.index'))
    
    thoughts = Thought.query.filter_by(anonymous_id=session['anonymous_id']).order_by(Thought.created_at.desc()).all()
    return render_template('thoughts/my.html', thoughts=thoughts)

@thoughts_bp.route('/detail/<int:thought_id>')
def detail(thought_id):
    thought = Thought.query.get_or_404(thought_id)
    if not thought.is_public:
        flash('此心事不公开显示', 'error')
        return redirect(url_for('thoughts.index'))
    
    return render_template('thoughts/detail.html', thought=thought)