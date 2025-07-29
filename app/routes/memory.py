from flask import Blueprint, render_template, request, redirect, url_for, flash, jsonify
from ..models import Memory, db
from ..utils.nlp_processor import analyze_emotion, extract_keywords
from datetime import datetime

memory_bp = Blueprint('memory', __name__)

@memory_bp.route('/')
def index():
    memories = Memory.query.order_by(Memory.created_at.desc()).all()
    return render_template('memory/index.html', memories=memories)

@memory_bp.route('/add', methods=['GET', 'POST'])
def add_memory():
    if request.method == 'POST':
        title = request.form.get('title')
        content = request.form.get('content')
        
        if not title or not content:
            flash('标题和内容不能为空', 'error')
            return redirect(url_for('memory.add_memory'))
        
        # 使用NLP处理文本
        emotion_score = analyze_emotion(content)
        keywords = extract_keywords(content)
        
        memory = Memory(
            title=title,
            content=content,
            emotion_score=emotion_score,
            tags=','.join(keywords),
            created_at=datetime.now()
        )
        
        db.session.add(memory)
        db.session.commit()
        
        flash('记忆已保存', 'success')
        return redirect(url_for('memory.index'))
    
    return render_template('memory/add.html')

@memory_bp.route('/detail/<int:memory_id>')
def detail(memory_id):
    memory = Memory.query.get_or_404(memory_id)
    return render_template('memory/detail.html', memory=memory)

@memory_bp.route('/search')
def search():
    query = request.args.get('q', '')
    if query:
        memories = Memory.query.filter(
            (Memory.title.contains(query)) | 
            (Memory.content.contains(query)) |
            (Memory.tags.contains(query))
        ).order_by(Memory.created_at.desc()).all()
    else:
        memories = []
    
    return render_template('memory/search.html', memories=memories, query=query)