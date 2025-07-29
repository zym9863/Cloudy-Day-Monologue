// 阴天独白 - 主要JavaScript功能

document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initScrollEffects();
    initFormEnhancements();
    initTooltips();
    initAnimations();
    initPageTransitions();
    initParticleSystem();
    initAdvancedInteractions();
});

// 页面过渡动画
function initPageTransitions() {
    // 页面加载动画
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.classList.add('page-transition');
        setTimeout(() => {
            mainContent.classList.add('fade-in');
        }, 100);
    }

    // 导航链接点击效果
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 添加点击动画
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// 粒子系统
function initParticleSystem() {
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        createParticles(heroSection, 20);
    }
}

function createParticles(container, count) {
    const particles = document.createElement('div');
    particles.className = 'particles';
    container.appendChild(particles);

    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            createParticle(particles);
        }, i * 300);
    }

    // 持续创建粒子
    setInterval(() => {
        createParticle(particles);
    }, 2000);
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // 随机位置和大小
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 15 + 's';
    particle.style.animationDuration = (15 + Math.random() * 10) + 's';
    
    const size = 2 + Math.random() * 4;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    container.appendChild(particle);
    
    // 清理完成的粒子
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
        }
    }, 25000);
}

// 高级交互效果
function initAdvancedInteractions() {
    // 鼠标追踪效果
    initMouseTracker();
    
    // 卡片倾斜效果
    initCardTilt();
    
    // 搜索框增强
    initAdvancedSearch();
    
    // 情感标签动画
    initEmotionTags();
}

// 鼠标追踪效果
function initMouseTracker() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `
                translateY(-8px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg)
                scale(1.02)
            `;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// 卡片倾斜效果
function initCardTilt() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transformOrigin = 'center center';
            this.style.willChange = 'transform';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.willChange = 'auto';
        });
    });
}

// 高级搜索功能
function initAdvancedSearch() {
    const searchInputs = document.querySelectorAll('input[type="search"], input[name="q"]');
    
    searchInputs.forEach(input => {
        // 创建搜索容器
        if (!input.parentElement.classList.contains('search-container')) {
            const wrapper = document.createElement('div');
            wrapper.className = 'search-container';
            input.parentNode.insertBefore(wrapper, input);
            wrapper.appendChild(input);
        }
        
        // 搜索建议功能
        let suggestionTimeout;
        input.addEventListener('input', function() {
            clearTimeout(suggestionTimeout);
            suggestionTimeout = setTimeout(() => {
                showSearchSuggestions(this);
            }, 300);
        });
    });
}

function showSearchSuggestions(input) {
    // 这里可以添加搜索建议逻辑
    const query = input.value.trim();
    if (query.length > 2) {
        // 创建搜索建议下拉菜单
        console.log('搜索建议:', query);
    }
}

// 情感标签动画
function initEmotionTags() {
    const emotionTags = document.querySelectorAll('.emotion-positive, .emotion-negative, .emotion-neutral');
    
    emotionTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(2deg)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

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

// 情感分析结果动画 - 增强版
function animateEmotionScore(element, targetScore) {
    const duration = 2000;
    const start = performance.now();
    const startValue = 0;
    
    // 创建动画效果
    element.style.fontSize = '1.2em';
    element.style.fontWeight = 'bold';
    element.style.color = getEmotionColor(targetScore);
    
    function animate(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        // 使用缓动函数
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = startValue + (targetScore - startValue) * easedProgress;
        
        element.textContent = currentValue.toFixed(3);
        
        // 添加脉冲效果
        const pulse = Math.sin(progress * Math.PI * 4) * 0.1 + 1;
        element.style.transform = `scale(${pulse})`;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // 动画完成后的效果
            element.style.transform = 'scale(1)';
            addEmotionParticles(element, targetScore);
        }
    }
    
    requestAnimationFrame(animate);
}

// 根据情感分数获取颜色
function getEmotionColor(score) {
    if (score > 0.6) return '#28a745';
    if (score < -0.6) return '#dc3545';
    return '#6c757d';
}

// 添加情感粒子效果
function addEmotionParticles(element, score) {
    const color = getEmotionColor(score);
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createEmotionParticle(rect, color);
        }, i * 100);
    }
}

function createEmotionParticle(rect, color) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        left: ${rect.left + rect.width / 2}px;
        top: ${rect.top + rect.height / 2}px;
        width: 6px;
        height: 6px;
        background: ${color};
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        animation: emotionParticle 1s ease-out forwards;
    `;
    
    document.body.appendChild(particle);
    
    // 添加动画样式
    if (!document.getElementById('emotion-particle-style')) {
        const style = document.createElement('style');
        style.id = 'emotion-particle-style';
        style.textContent = `
            @keyframes emotionParticle {
                0% {
                    transform: scale(0) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: scale(1) rotate(360deg) translateY(-20px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => particle.remove(), 1000);
}

// 增强情感显示卡片
function enhanceEmotionDisplay() {
    const emotionCards = document.querySelectorAll('.emotion-card');
    
    emotionCards.forEach(card => {
        // 添加悬停效果
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
            this.style.boxShadow = '0 15px 35px rgba(0,0,0,0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
        
        // 添加点击涟漪效果
        card.addEventListener('click', function(e) {
            createClickRipple(e, this);
        });
    });
}

function createClickRipple(event, element) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    if (!document.getElementById('ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => ripple.remove(), 600);
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
    initDarkModeToggle,
    enhanceEmotionDisplay,
    createParticles,
    initAdvancedInteractions
};

// 性能优化：使用 requestIdleCallback 进行非关键任务
function initWithIdleCallback() {
    if (window.requestIdleCallback) {
        requestIdleCallback(() => {
            initSearchEnhancements();
            if (window.matchMedia('(min-width: 768px)').matches) {
                // 仅在桌面端启用高级交互
                initAdvancedInteractions();
            }
        });
    } else {
        // 回退方案
        setTimeout(() => {
            initSearchEnhancements();
            initAdvancedInteractions();
        }, 1000);
    }
}

// 在DOM加载完成后调用性能优化的初始化
document.addEventListener('DOMContentLoaded', function() {
    initWithIdleCallback();
});

// 窗口调整大小时重新计算效果
window.addEventListener('resize', debounce(function() {
    // 重新计算粒子系统
    const particles = document.querySelectorAll('.particles');
    particles.forEach(p => p.remove());
    
    // 重新初始化粒子系统
    setTimeout(() => {
        initParticleSystem();
    }, 300);
}, 250));

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}