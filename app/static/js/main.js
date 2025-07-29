// 阴天独白 - 主要JavaScript功能

document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initScrollEffects();
    initFormEnhancements();
    initTooltips();
    initAnimations();
});

// 滚动效果
function initScrollEffects() {
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 返回顶部按钮
    createBackToTopButton();
}

// 表单增强
function initFormEnhancements() {
    // 字数统计
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        addCharacterCounter(textarea);
    });

    // 表单提交增强
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        enhanceFormSubmission(form);
    });

    // 实时保存草稿（本地存储）
    initDraftSystem();
}

// 字数统计功能
function addCharacterCounter(textarea) {
    const maxLength = textarea.getAttribute('maxlength') || null;
    const counter = document.createElement('div');
    counter.className = 'character-counter text-muted small mt-1';
    textarea.parentNode.insertBefore(counter, textarea.nextSibling);

    function updateCounter() {
        const length = textarea.value.length;
        let text = `已输入 ${length} 字`;
        
        if (maxLength) {
            text += ` / ${maxLength}`;
            if (length > maxLength * 0.9) {
                counter.className = 'character-counter text-warning small mt-1';
            } else {
                counter.className = 'character-counter text-muted small mt-1';
            }
        }
        
        counter.textContent = text;
    }

    textarea.addEventListener('input', updateCounter);
    updateCounter();
}

// 表单提交增强
function enhanceFormSubmission(form) {
    form.addEventListener('submit', function(e) {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="loading"></span> 提交中...';
            submitBtn.disabled = true;
            
            // 如果提交失败，恢复按钮状态
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 3000);
        }
    });
}

// 草稿系统
function initDraftSystem() {
    const draftKey = 'cloudy_day_draft_';
    const textareas = document.querySelectorAll('textarea[name="content"]');
    
    textareas.forEach(textarea => {
        const formName = textarea.closest('form').action || window.location.pathname;
        const key = draftKey + btoa(formName);
        
        // 加载草稿
        const draft = localStorage.getItem(key);
        if (draft && !textarea.value) {
            textarea.value = draft;
            showDraftNotification();
        }
        
        // 自动保存草稿
        let saveTimeout;
        textarea.addEventListener('input', function() {
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(() => {
                if (this.value.trim()) {
                    localStorage.setItem(key, this.value);
                } else {
                    localStorage.removeItem(key);
                }
            }, 1000);
        });
        
        // 提交后清除草稿
        textarea.closest('form').addEventListener('submit', function() {
            localStorage.removeItem(key);
        });
    });
}

// 显示草稿通知
function showDraftNotification() {
    const notification = document.createElement('div');
    notification.className = 'alert alert-info alert-dismissible fade show';
    notification.innerHTML = `
        <i class="bi bi-info-circle"></i>
        已为您恢复上次编辑的草稿
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const container = document.querySelector('.container');
    if (container) {
        container.insertBefore(notification, container.firstChild);
        
        // 3秒后自动关闭
        setTimeout(() => {
            if (notification.parentNode) {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 150);
            }
        }, 3000);
    }
}

// 返回顶部按钮
function createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="bi bi-arrow-up"></i>';
    button.className = 'btn btn-primary btn-floating back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: none;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(button);
    
    // 滚动显示/隐藏
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });
    
    // 点击返回顶部
    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 初始化工具提示
function initTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// 初始化动画
function initAnimations() {
    // 淡入动画观察器
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 观察卡片元素
    document.querySelectorAll('.card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// 情感分析结果动画
function animateEmotionScore(element, targetScore) {
    const duration = 1000;
    const start = performance.now();
    const startValue = 0;
    
    function animate(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentValue = startValue + (targetScore - startValue) * progress;
        element.textContent = currentValue.toFixed(3);
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

// 搜索功能增强
function initSearchEnhancements() {
    const searchInputs = document.querySelectorAll('input[type="search"], input[name="q"]');
    
    searchInputs.forEach(input => {
        // 搜索历史
        const historyKey = 'cloudy_search_history';
        let searchHistory = JSON.parse(localStorage.getItem(historyKey) || '[]');
        
        // 创建下拉历史
        const datalist = document.createElement('datalist');
        datalist.id = 'search-history';
        input.setAttribute('list', 'search-history');
        input.parentNode.appendChild(datalist);
        
        // 更新历史选项
        function updateHistoryOptions() {
            datalist.innerHTML = '';
            searchHistory.slice(0, 5).forEach(term => {
                const option = document.createElement('option');
                option.value = term;
                datalist.appendChild(option);
            });
        }
        
        updateHistoryOptions();
        
        // 搜索时保存历史
        input.closest('form').addEventListener('submit', function() {
            const term = input.value.trim();
            if (term && !searchHistory.includes(term)) {
                searchHistory.unshift(term);
                searchHistory = searchHistory.slice(0, 10); // 保留最近10次
                localStorage.setItem(historyKey, JSON.stringify(searchHistory));
                updateHistoryOptions();
            }
        });
    });
}

// 夜间模式切换（可选功能）
function initDarkModeToggle() {
    const toggle = document.createElement('button');
    toggle.innerHTML = '<i class="bi bi-moon"></i>';
    toggle.className = 'btn btn-outline-secondary btn-sm';
    toggle.title = '切换夜间模式';
    
    // 检查当前模式
    const isDark = localStorage.getItem('dark-mode') === 'true';
    if (isDark) {
        document.body.classList.add('dark-mode');
        toggle.innerHTML = '<i class="bi bi-sun"></i>';
    }
    
    toggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        
        localStorage.setItem('dark-mode', isDarkMode);
        toggle.innerHTML = isDarkMode ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon"></i>';
    });
    
    // 添加到导航栏
    const navbar = document.querySelector('.navbar .container');
    if (navbar) {
        navbar.appendChild(toggle);
    }
}

// 错误处理
window.addEventListener('error', function(e) {
    console.error('JavaScript错误:', e.error);
    // 可以在这里添加错误上报逻辑
});

// 导出主要函数供其他脚本使用
window.CloudyDay = {
    animateEmotionScore,
    initSearchEnhancements,
    initDarkModeToggle
};