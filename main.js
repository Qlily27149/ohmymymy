// 开场动画变量
let introTimeline = null;

function initIntro() {
    const intro = document.getElementById('intro');
    const paths = document.querySelectorAll('.intro-path');
    const lines = document.querySelectorAll('.intro-line');
    const arrival = document.getElementById('arrival');

    if (!intro) return;

    gsap.set(intro, { clearProps: 'all' });
    gsap.set(intro, { opacity: 1 });
    gsap.set(arrival, { opacity: 0 });
    arrival.classList.remove('show');

    paths.forEach(p => {
        const len = p.getTotalLength ? p.getTotalLength() : 1000;
        p.style.strokeDasharray = len;
        p.style.strokeDashoffset = len;
    });

    introTimeline = gsap.timeline({
        onComplete: () => {
            arrival.textContent = '已抵达 · 神都洛阳';
            arrival.classList.add('show');
            intro.classList.add('hidden');
        }
    });

    introTimeline
        .to(paths, { strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut', stagger: 0.05 })
        .to(lines, { opacity: 1, y: 0, duration: 0.4, stagger: 0.2, ease: 'power2.out' }, '-=0.3')
        .to({}, { duration: 0.5 })
        .to(intro, { opacity: 0, duration: 0.5, ease: 'power2.inOut' });
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOMContentLoaded 触发');
    setTimeout(initIntro, 200);
    
    try {
        initNavbar();
        console.log('✅ initNavbar 完成');
    } catch(e) { console.error('❌ initNavbar 失败:', e); }
    
    try {
        initHeroSlider();
        console.log('✅ initHeroSlider 完成');
    } catch(e) { console.error('❌ initHeroSlider 失败:', e); }
    
    // 页面加载时自动清理冗余数据
    try {
        cleanupHeroData();
        console.log('✅ cleanupHeroData 完成');
    } catch(e) { console.error('❌ cleanupHeroData 失败:', e); }
    
    try {
        initCultureSection();
        console.log('✅ initCultureSection 完成');
    } catch(e) { console.error('❌ initCultureSection 失败:', e); }
    
    try {
        initJournalSection();
        console.log('✅ initJournalSection 完成');
    } catch(e) { console.error('❌ initJournalSection 失败:', e); }
    
    try {
        initArchiveSection();
        console.log('✅ initArchiveSection 完成');
    } catch(e) { console.error('❌ initArchiveSection 失败:', e); }
    
    try {
        initFavorites();
        console.log('✅ initFavorites 完成');
    } catch(e) { console.error('❌ initFavorites 失败:', e); }
    
    try {
        initScrollAnimation();
        console.log('✅ initScrollAnimation 完成');
    } catch(e) { console.error('❌ initScrollAnimation 失败:', e); }
    
    setTimeout(() => {
        try {
            initMapSection();
            console.log('✅ initMapSection 完成');
        } catch(e) { console.error('❌ initMapSection 失败:', e); }
        
        try {
            initMapControls();
            console.log('✅ initMapControls 完成');
        } catch(e) { console.error('❌ initMapControls 失败:', e); }
        
        try {
            loadCustomImages();
            console.log('✅ loadCustomImages 完成');
        } catch(e) { console.error('❌ loadCustomImages 失败:', e); }
        
        try {
            loadFengHuaWebsites();
            console.log('✅ loadFengHuaWebsites 完成');
        } catch(e) { console.error('❌ loadFengHuaWebsites 失败:', e); }
        
        try {
            loadCustomTexts();
            console.log('✅ loadCustomTexts 完成');
        } catch(e) { console.error('❌ loadCustomTexts 失败:', e); }
        
        // 检查存储空间使用情况
        try {
            const info = getStorageInfo();
            if (info) {
                console.log('📊 存储空间使用情况:', {
                    图片: (info.imagesSize / 1024).toFixed(1) + ' KB',
                    文字: (info.textsSize / 1024).toFixed(1) + ' KB',
                    轮播: (info.slidesSize / 1024).toFixed(1) + ' KB',
                    总计: (info.totalSize / 1024).toFixed(1) + ' KB',
                    使用率: info.usagePercent + '%',
                    剩余: (info.freeSpace / 1024).toFixed(1) + ' KB'
                });
                
                // 如果存储空间使用超过80%，显示警告
                if (parseFloat(info.usagePercent) > 80) {
                    console.warn('⚠️ 存储空间使用率较高，建议清理不需要的图片');
                }
            }
        } catch(e) { console.error('❌ getStorageInfo 失败:', e); }
    }, 100);
});

function initNavbar() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    const navbar = document.querySelector('.navbar');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
            const targetPage = document.querySelector(targetId);
            if (targetPage) {
                targetPage.classList.add('active');
                console.log(`✅ 页面 ${targetId} 已激活`);
            } else {
                console.error(`❌ 页面 ${targetId} 不存在`);
            }
            
            window.location.hash = targetId;
            
            navbarMenu.classList.remove('active');
        });
    });

    navbarToggle.addEventListener('click', function() {
        navbarMenu.classList.toggle('active');
        navbarToggle.classList.toggle('active');
    });

    const bookmarkBtn = document.getElementById('bookmarkBtn');
    
    function initTitleEditor() {
        const editTitleBtn = document.getElementById('editTitleBtn');
        const siteTitle = document.getElementById('siteTitle');
        
        if (editTitleBtn && siteTitle) {
            editTitleBtn.addEventListener('click', function() {
                const currentTitle = siteTitle.textContent;
                const newTitle = prompt('请输入新的网站标题：', currentTitle);
                
                if (newTitle !== null && newTitle.trim() !== '') {
                    siteTitle.textContent = newTitle.trim();
                    localStorage.setItem('luoyang_site_title', newTitle.trim());
                    alert('✅ 网站标题已更新！');
                    console.log('✅ 网站标题已更新为:', newTitle);
                }
            });
        }
        
        const savedTitle = localStorage.getItem('luoyang_site_title');
        if (savedTitle && siteTitle) {
            siteTitle.textContent = savedTitle;
        }
    }
    
    function initFengHuaModalEvents() {
        const overlay = document.getElementById('fengHuaOverlay');
        const closeBtn = document.getElementById('fengHuaClose');
        
        if (overlay) {
            overlay.addEventListener('click', closeFengHuaModal);
        }
        
        if (closeBtn) {
            closeBtn.addEventListener('click', closeFengHuaModal);
        }
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeFengHuaModal();
            }
        });
        
        console.log('✅ 洛阳风华弹窗事件已绑定');
    }
    
    initTitleEditor();
    initFengHuaModalEvents();
    
    bookmarkBtn.addEventListener('click', function() {
        if (isDeveloperMode()) {
            if (confirm('确定要关闭开发者模式吗？')) {
                setDeveloperMode(false);
                alert('✅ 开发者模式已关闭！');
            }
        } else {
            const password = prompt('请输入访问密码：');
            if (password === '27149') {
                setDeveloperMode(true);
                alert('✅ 开发者模式已开启！\n\n再次点击书签按钮可关闭开发者模式');
            } else if (password !== null) {
                alert('❌ 密码错误，请重试');
            }
        }
    });
    
    // 页面初始化时恢复开发者模式状态
    if (isDeveloperMode()) {
        setDeveloperMode(true);
        console.log('✅ 已恢复开发者模式状态');
    } else {
        // 默认显示管理按钮
        if (document.getElementById('editTitleBtn')) {
            document.getElementById('editTitleBtn').classList.remove('hidden');
            document.getElementById('editTitleBtn').classList.add('visible');
        }
    }

    window.addEventListener('hashchange', function() {
        const hash = window.location.hash || '#home';
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === hash) {
                link.classList.add('active');
            }
        });
        document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
        document.querySelector(hash).classList.add('active');
        
        if (hash === '#map') {
            setTimeout(() => {
                if (!mapInstance) {
                    initMapSection();
                } else if (mapInstance.invalidateSize) {
                    mapInstance.invalidateSize();
                }
            }, 100);
        }
        
        // 确保文化解码页面内容可见
        if (hash === '#culture') {
            setTimeout(() => {
                const cultureCards = document.querySelectorAll('.culture-card');
                cultureCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, index * 100);
                });
                console.log(`✅ 文化解码卡片已显示，共 ${cultureCards.length} 张`);
            }, 100);
        }
        
        // 页面切换后恢复编辑按钮状态和自定义数据
        setTimeout(() => {
            refreshEditButtons();
            reloadCustomData();
        }, 150);
    });
    
    function reloadCustomData() {
        console.log('🔄 页面切换，重新加载自定义数据');
        loadCustomImages();
        loadCustomTexts();
    }
    
    function refreshEditButtons() {
        if (isDeveloperMode()) {
            document.querySelectorAll('.inline-edit-btn').forEach(btn => {
                btn.style.display = 'flex';
            });
            console.log('✅ 编辑按钮状态已刷新');
        }
    }
    
    // 使用MutationObserver监听DOM变化，自动刷新编辑按钮状态
    const observer = new MutationObserver((mutations) => {
        if (isDeveloperMode()) {
            let needsRefresh = false;
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            if (node.classList && node.classList.contains('inline-edit-btn')) {
                                needsRefresh = true;
                            } else if (node.querySelector) {
                                const editBtns = node.querySelectorAll('.inline-edit-btn');
                                if (editBtns.length > 0) {
                                    needsRefresh = true;
                                }
                            }
                        }
                    });
                }
            });
            
            if (needsRefresh) {
                setTimeout(refreshEditButtons, 50);
            }
        }
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: false,
        characterData: false
    });
    
    console.log('✅ 编辑按钮状态观察者已启动');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// 轮播图状态管理 - 提升到全局作用域以保持状态
let heroSliderState = {
    currentSlide: 0,
    autoplayTimer: null,
    isInitialized: false,
    slides: [],
    dots: [],
    isAnimating: false
};

async function initHeroSlider() {
    const heroSlidesContainer = document.querySelector('.hero-slides');
    const heroDotsContainer = document.querySelector('.hero-dots');
    
    if (!heroSlidesContainer || !heroDotsContainer) {
        console.error('❌ 轮播图容器不存在');
        return;
    }
    
    const customSlides = JSON.parse(localStorage.getItem('luoyang_custom_slides') || '[]');
    const savedImages = JSON.parse(localStorage.getItem('luoyang_custom_images') || '{}');
    const savedTexts = JSON.parse(localStorage.getItem('luoyang_custom_texts') || '{}');
    const disabledSlides = JSON.parse(localStorage.getItem('luoyang_disabled_slides') || '[]');
    const heroStyles = JSON.parse(localStorage.getItem('luoyang_hero_styles') || '{}');
    
    // 检测性能模式（带超时保护，默认高性能模式）
    let isLowPerformance = false;
    try {
        isLowPerformance = await Promise.race([
            detectLowPerformance(),
            new Promise(resolve => setTimeout(() => resolve(false), 1500))
        ]);
    } catch (e) {
        console.warn('⚠️ 性能检测失败，使用默认模式:', e.message);
    }
    console.log(isLowPerformance ? '⚠️ 检测到低性能环境，启用降级模式' : '✅ 高性能环境，启用完整动画');
    
    // 获取所有轮播图数据
    const allSlidesData = heroSlidesData.map((slide, index) => {
        const imageKey = `hero${index}`;
        const customImage = savedImages[imageKey];
        const customTitle = savedTexts[`heroTitle${index}`];
        const customSubtitle = savedTexts[`heroSubtitle${index}`];
        
        return {
            image: customImage || slide.image,
            title: customTitle || slide.title,
            subtitle: customSubtitle || slide.subtitle,
            isCustom: false,
            globalIndex: index
        };
    });
    
    customSlides.forEach((slide, index) => {
        const globalIndex = heroSlidesData.length + index;
        if (!disabledSlides.includes(globalIndex)) {
            const customImage = savedImages[`hero${globalIndex}`] || slide.image;
            const customTitle = savedTexts[`heroTitle${globalIndex}`] || slide.title;
            const customSubtitle = savedTexts[`heroSubtitle${globalIndex}`] || slide.subtitle;
            
            if (customImage && isValidImageUrl(customImage)) {
                allSlidesData.push({
                    image: customImage,
                    title: customTitle,
                    subtitle: customSubtitle,
                    isCustom: true,
                    globalIndex: globalIndex
                });
            }
        }
    });
    
    if (allSlidesData.length === 0) {
        console.warn('⚠️ 没有轮播图可显示');
        return;
    }
    
    // 图片预加载（带超时保护）
    try {
        await Promise.race([
            preloadImages(allSlidesData.map(s => s.image)),
            new Promise(resolve => setTimeout(() => resolve(), 3000))
        ]);
        console.log('✅ 所有轮播图图片预加载完成');
    } catch (e) {
        console.warn('⚠️ 图片预加载部分失败:', e.message);
    }
    
    // 保存当前状态（如果已初始化）
    const previousCurrentSlide = heroSliderState.isInitialized ? heroSliderState.currentSlide : 0;
    const previousTotalSlides = heroSliderState.slides.length;
    const slidesDataChanged = previousTotalSlides !== allSlidesData.length;
    
    // 清空现有的轮播图和指示器（确保动态更新时不会重复）
    heroSlidesContainer.innerHTML = '';
    heroDotsContainer.innerHTML = '';
    
    // 渲染轮播图
    renderSlides(allSlidesData, heroStyles, isLowPerformance);
    
    function renderSlides(slidesData, styles, lowPerformance) {
        slidesData.forEach((slide, index) => {
            const slideStyle = styles[`slide${slide.globalIndex || index}`] || {};
            
            const slideDiv = document.createElement('div');
            slideDiv.className = 'hero-slide';
            slideDiv.style.backgroundImage = `url('${slide.image}')`;
            slideDiv.dataset.slideIndex = index;
            
            // 根据性能模式设置样式
            if (lowPerformance) {
                slideDiv.style.transition = 'opacity 0.3s ease';
                slideDiv.style.transform = 'none';
            }
            
            const textAlign = styles.textPosition === 'left' ? 'left' : styles.textPosition === 'right' ? 'right' : 'center';
            const titleSize = slideStyle.titleSize || styles.titleSize || 48;
            const subtitleSize = slideStyle.subtitleSize || styles.subtitleSize || 20;
            const titleColor = slideStyle.titleColor || styles.titleColor || '#ffffff';
            const subtitleColor = slideStyle.subtitleColor || styles.subtitleColor || '#e5e5e5';
            const fontFamily = styles.fontFamily || 'Songti SC';
            
            slideDiv.innerHTML = `
                <div class="hero-overlay"></div>
                <div class="hero-content" style="text-align: ${textAlign};">
                    <h1 style="font-family: ${fontFamily}; font-size: ${titleSize}px; color: ${titleColor}; will-change: transform, opacity;">${slide.title}</h1>
                    <p style="font-family: ${fontFamily}; font-size: ${subtitleSize}px; color: ${subtitleColor}; will-change: transform, opacity;">${slide.subtitle}</p>
                </div>
            `;
            heroSlidesContainer.appendChild(slideDiv);
            
            const dot = document.createElement('span');
            dot.className = 'dot';
            dot.dataset.slide = index;
            heroDotsContainer.appendChild(dot);
        });
        
        initSliderControls(lowPerformance, slidesDataChanged, previousCurrentSlide);
    }
    
    function initSliderControls(lowPerformance, slidesDataChanged, previousCurrentSlide) {
        const slides = document.querySelectorAll('.hero-slide');
        const dots = document.querySelectorAll('.dot');
        const transitionDuration = lowPerformance ? 300 : 400;
        
        // 如果幻灯片数量发生变化，重置到第一张；否则保持之前的状态
        const initialSlide = slidesDataChanged ? 0 : Math.min(previousCurrentSlide, slides.length - 1);
        
        // 更新全局状态
        heroSliderState.slides = slides;
        heroSliderState.dots = dots;
        heroSliderState.isAnimating = false;
        
        // 初始化显示的幻灯片
        slides[initialSlide]?.classList.add('active');
        dots[initialSlide]?.classList.add('active');
        heroSliderState.currentSlide = initialSlide;
        
        function showSlide(index) {
            if (heroSliderState.isAnimating) return;
            if (index < 0 || index >= slides.length) return;
            
            heroSliderState.isAnimating = true;
            
            // 隐藏当前幻灯片
            slides[heroSliderState.currentSlide].classList.remove('active');
            dots[heroSliderState.currentSlide].classList.remove('active');
            
            // 显示新幻灯片
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            heroSliderState.currentSlide = index;
            
            // 动画完成后重置状态
            setTimeout(() => {
                heroSliderState.isAnimating = false;
            }, transitionDuration);
        }
        
        function nextSlide() {
            heroSliderState.currentSlide = (heroSliderState.currentSlide + 1) % slides.length;
            showSlide(heroSliderState.currentSlide);
        }
        
        // 点击圆点切换
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                if (index !== heroSliderState.currentSlide) {
                    showSlide(index);
                    resetAutoplay();
                }
            });
        });
        
        // 自动轮播
        function startAutoplay() {
            if (heroSliderState.autoplayTimer) {
                clearInterval(heroSliderState.autoplayTimer);
            }
            heroSliderState.autoplayTimer = setInterval(nextSlide, 5000);
        }
        
        function resetAutoplay() {
            if (heroSliderState.autoplayTimer) {
                clearInterval(heroSliderState.autoplayTimer);
            }
            startAutoplay();
        }
        
        startAutoplay();
        
        // 鼠标悬停暂停自动轮播
        heroSlidesContainer.addEventListener('mouseenter', () => {
            if (heroSliderState.autoplayTimer) {
                clearInterval(heroSliderState.autoplayTimer);
            }
        });
        
        heroSlidesContainer.addEventListener('mouseleave', () => {
            startAutoplay();
        });
        
        // 标记为已初始化
        heroSliderState.isInitialized = true;
        
        console.log(`✅ 轮播图初始化完成，共 ${slides.length} 张图片，当前: 第${heroSliderState.currentSlide + 1}张，${lowPerformance ? '降级模式' : '正常模式'}`);
    }
}

// 图片预加载函数
function preloadImages(imageUrls) {
    return new Promise((resolve, reject) => {
        let loadedCount = 0;
        const totalCount = imageUrls.length;
        const errors = [];
        
        if (totalCount === 0) {
            resolve();
            return;
        }
        
        imageUrls.forEach((url) => {
            const img = new Image();
            img.onload = () => {
                loadedCount++;
                if (loadedCount === totalCount) {
                    resolve();
                }
            };
            img.onerror = () => {
                errors.push(url);
                loadedCount++;
                if (loadedCount === totalCount) {
                    if (errors.length === totalCount) {
                        reject(new Error(`所有图片加载失败`));
                    } else {
                        resolve();
                    }
                }
            };
            img.src = url;
        });
    });
}

// 刷新轮播图函数
let refreshHeroTimer = null;
function refreshHeroSlider() {
    // 防抖: 避免短时间内多次刷新
    if (refreshHeroTimer) {
        clearTimeout(refreshHeroTimer);
    }
    refreshHeroTimer = setTimeout(() => {
        const heroSlidesContainer = document.querySelector('.hero-slides');
        const heroDotsContainer = document.querySelector('.hero-dots');
        
        if (!heroSlidesContainer || !heroDotsContainer) {
            console.error('❌ 轮播图容器不存在');
            return;
        }
        
        // 清空容器
        heroSlidesContainer.innerHTML = '';
        heroDotsContainer.innerHTML = '';
        
        // 重新初始化
        initHeroSlider();
    }, 100);
}

// 数据清理函数 - 删除不再使用的冗余数据
function cleanupHeroData() {
    const customSlides = JSON.parse(localStorage.getItem('luoyang_custom_slides') || '[]');
    const savedImages = JSON.parse(localStorage.getItem('luoyang_custom_images') || '{}');
    const savedTexts = JSON.parse(localStorage.getItem('luoyang_custom_texts') || '{}');
    const disabledSlides = JSON.parse(localStorage.getItem('luoyang_disabled_slides') || '[]');
    
    const totalSlides = heroSlidesData.length + customSlides.length;
    let cleaned = false;
    
    // 清理无效的图片数据
    Object.keys(savedImages).forEach(key => {
        const match = key.match(/^hero(\d+)$/);
        if (match) {
            const index = parseInt(match[1]);
            if (index >= totalSlides) {
                delete savedImages[key];
                cleaned = true;
                console.log(`🗑️ 清理无效图片数据: ${key}`);
            }
        }
    });
    
    // 清理无效的文字数据
    Object.keys(savedTexts).forEach(key => {
        const match = key.match(/^hero(Title|Subtitle)(\d+)$/);
        if (match) {
            const index = parseInt(match[2]);
            if (index >= totalSlides) {
                delete savedTexts[key];
                cleaned = true;
                console.log(`🗑️ 清理无效文字数据: ${key}`);
            }
        }
    });
    
    // 清理无效的禁用状态
    const validDisabledSlides = disabledSlides.filter(index => index < totalSlides);
    if (validDisabledSlides.length !== disabledSlides.length) {
        cleaned = true;
        console.log(`🗑️ 清理无效禁用状态: ${disabledSlides.length - validDisabledSlides.length} 项`);
        localStorage.setItem('luoyang_disabled_slides', JSON.stringify(validDisabledSlides));
    }
    
    // 保存清理后的数据
    if (cleaned) {
        localStorage.setItem('luoyang_custom_images', JSON.stringify(savedImages));
        localStorage.setItem('luoyang_custom_texts', JSON.stringify(savedTexts));
        console.log('✅ 数据清理完成');
    } else {
        console.log('ℹ️ 数据已干净，无需清理');
    }
    
    return cleaned;
}

// 性能检测函数
function detectLowPerformance() {
    // 检测设备性能
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const hasSlowConnection = navigator.connection?.effectiveType === 'slow-2g' || navigator.connection?.effectiveType === '2g';
    const hasLowEndDevice = navigator.hardwareConcurrency <= 2;
    
    // 使用 PerformanceObserver 检测帧率
    let frameCount = 0;
    let lastTime = performance.now();
    
    return new Promise(resolve => {
        const observer = new PerformanceObserver((entries) => {
            entries.forEach(entry => {
                if (entry.entryType === 'frame') {
                    frameCount++;
                    const currentTime = performance.now();
                    const elapsed = currentTime - lastTime;
                    
                    if (elapsed >= 1000) {
                        const fps = frameCount * 1000 / elapsed;
                        observer.disconnect();
                        
                        // 如果帧率低于55fps，认为是低性能环境
                        resolve(isMobile || hasSlowConnection || hasLowEndDevice || fps < 55);
                    }
                }
            });
        });
        
        try {
            observer.observe({ entryTypes: ['frame'] });
            
            // 设置超时，避免长时间等待
            setTimeout(() => {
                observer.disconnect();
                resolve(isMobile || hasSlowConnection || hasLowEndDevice);
            }, 2000);
        } catch (e) {
            // 不支持 PerformanceObserver，使用简单检测
            resolve(isMobile || hasSlowConnection || hasLowEndDevice);
        }
    });
}

function initScrollAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, observerOptions);

    observeAnimatedElements(observer);
}

function observeAnimatedElements(observer) {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => {
        observer.observe(el);
        // 检查元素是否已经在视口中
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add('visible');
        }
    });
}

function initCultureSection() {
    const cultureGrid = document.getElementById('cultureGrid');
    const savedImages = JSON.parse(localStorage.getItem('luoyang_custom_images') || '{}');
    const savedTexts = JSON.parse(localStorage.getItem('luoyang_custom_texts') || '{}');
    
    if (!cultureGrid) {
        console.error('❌ cultureGrid 元素不存在');
        return;
    }
    
    if (!cultureData || !Array.isArray(cultureData)) {
        console.error('❌ cultureData 未定义或不是数组');
        cultureGrid.innerHTML = '<p style="color: #c9a227; text-align: center; padding: 2rem;">数据加载失败，请刷新页面重试</p>';
        return;
    }
    
    console.log('✅ cultureData 加载成功，共', cultureData.length, '条数据');
    
    // 清空现有内容
    cultureGrid.innerHTML = '';
    
    cultureData.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'culture-card animate-on-scroll visible';
        card.style.animationDelay = `${index * 150}ms`;
        
        // 使用自定义数据或原始数据
        const customImage = savedImages[`culture${index}`] || item.image;
        const customTitle = savedTexts[`cultureTitle${index}`] || item.title;
        const customDesc = savedTexts[`cultureDesc${index}`] || item.summary;
        const customFullText = savedTexts[`cultureFullText${index}`] || item.fullText;
        
        card.innerHTML = `
            <div class="culture-card-inner">
                <img src="${customImage}" alt="${customTitle}" class="culture-card-image">
                <div class="culture-card-overlay"></div>
                <div class="culture-card-content">
                    <h3 class="culture-card-title">${customTitle}</h3>
                    <p class="culture-card-summary">${customDesc}</p>
                    <div style="display: flex; gap: 8px;">
                        <button class="culture-card-expand">
                            <span>展开阅读</span>
                            <svg class="expand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </button>
                        <button class="inline-edit-btn" data-type="culture" data-index="${index}" style="display: ${isDeveloperMode() ? 'flex' : 'none'}; align-items: center; gap: 4px; background: #c9a227; color: #0d0d0d; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 600;">
                            ✏️ 编辑
                        </button>
                    </div>
                </div>
                <div class="culture-card-detail">
                    <div class="detail-header">
                        <h4>${customTitle}</h4>
                        <button class="detail-close">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                    <p class="culture-card-fulltext">${customFullText}</p>
                    <p class="culture-card-source">${item.source}</p>
                </div>
            </div>
        `;
        
        const expandBtn = card.querySelector('.culture-card-expand');
        const detail = card.querySelector('.culture-card-detail');
        const detailClose = card.querySelector('.detail-close');
        const title = card.querySelector('.culture-card-title');
        const expandIcon = card.querySelector('.expand-icon');
        
        function toggleDetail() {
            detail.classList.toggle('active');
            expandBtn.classList.toggle('expanded');
            expandIcon.style.transform = detail.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
            expandBtn.querySelector('span').textContent = detail.classList.contains('active') ? '收起' : '展开阅读';
        }
        
        expandBtn.addEventListener('click', toggleDetail);
        title.addEventListener('click', toggleDetail);
        detailClose.addEventListener('click', toggleDetail);
        
        const editBtn = card.querySelector('.inline-edit-btn');
        if (editBtn) {
            editBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openInlineEditor('culture', index);
            });
        }
        
        cultureGrid.appendChild(card);
        
        // 检查卡片是否在视口中，如果是则显示
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 150);
        }
    });
}

function initJournalSection() {
    const journalGrid = document.getElementById('journalGrid');
    const tabBtns = document.querySelectorAll('.journal-tabs .tab-btn');
    
    function renderJournalItems(type) {
        journalGrid.innerHTML = '';
        const items = journalData[type];
        const savedImages = JSON.parse(localStorage.getItem('luoyang_custom_images') || '{}');
        const savedTexts = JSON.parse(localStorage.getItem('luoyang_custom_texts') || '{}');
        
        items.forEach((item, index) => {
            const globalIndex = type === 'official' ? index : journalData.official.length + index;
            
            const customImage = savedImages[`journal${globalIndex}`] || item.image;
            const customTitle = savedTexts[`journalTitle${globalIndex}`] || item.title;
            const customDesc = savedTexts[`journalDesc${globalIndex}`] || item.description;
            const customVideoUrl = savedTexts[`journalVideoUrl${globalIndex}`] || item.videoUrl;
            const customType = savedTexts[`journalType${globalIndex}`] || item.type;
            
            const displayItem = {
                ...item,
                image: customImage,
                title: customTitle,
                description: customDesc,
                videoUrl: customVideoUrl,
                type: customType
            };
            
            const card = document.createElement('div');
            card.className = 'journal-card';
            card.innerHTML = `
                <img src="${customImage}" alt="${customTitle}" class="journal-card-image">
                <div class="journal-card-content">
                    <h3 class="journal-card-title">${customTitle}</h3>
                    <p class="journal-card-date">${item.date}</p>
                    <p class="journal-card-desc">${customDesc}</p>
                    <span class="journal-card-type">${customType === 'video' ? '📹 视频' : '📝 文章'}</span>
                    <button class="inline-edit-btn" data-type="journal" data-subtype="${type}" data-index="${globalIndex}" style="display: ${isDeveloperMode() ? 'flex' : 'none'}; align-items: center; gap: 4px; background: #c9a227; color: #0d0d0d; border: none; padding: 6px 10px; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 600; margin-top: 8px;">
                        ✏️ 编辑
                    </button>
                </div>
            `;
            
            card.addEventListener('click', () => openJournalModal(displayItem));
            
            const editBtn = card.querySelector('.inline-edit-btn');
            if (editBtn) {
                editBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    openInlineEditor('journal', globalIndex, type);
                });
            }
            
            journalGrid.appendChild(card);
        });
    }
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            renderJournalItems(this.getAttribute('data-tab'));
        });
    });
    
    renderJournalItems('official');
}

function openJournalModal(item) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    
    let overlay = document.getElementById('modalOverlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'modalOverlay';
        overlay.className = 'journal-modal-overlay';
        document.body.appendChild(overlay);
    }
    
    let content = `
        <h3>${item.title}</h3>
        <img src="${item.image}" alt="${item.title}">
        <p>${item.description}</p>
    `;
    
    if (item.type === 'video' && item.videoUrl) {
        // 从URL中提取视频ID，处理末尾可能的斜杠
        const url = item.videoUrl.trim().replace(/\/$/, '');
        const videoId = url.split('/').pop();
        
        // 验证视频ID格式（B站BV号）
        const bvidPattern = /^BV[a-zA-Z0-9]+$/;
        if (bvidPattern.test(videoId)) {
            content += `<iframe src="https://player.bilibili.com/player.html?bvid=${videoId}&page=1" frameborder="0" allowfullscreen width="100%" height="400px" style="max-width: 800px; display: block; margin: 16px 0;"></iframe>`;
        } else {
            // 如果视频ID格式不正确，尝试从URL中提取
            const match = url.match(/\/video\/(BV[a-zA-Z0-9]+)/);
            if (match) {
                content += `<iframe src="https://player.bilibili.com/player.html?bvid=${match[1]}&page=1" frameborder="0" allowfullscreen width="100%" height="400px" style="max-width: 800px; display: block; margin: 16px 0;"></iframe>`;
            } else {
                content += `<p style="color: #ef4444;">⚠️ 无法解析视频链接</p>`;
            }
        }
    } else if (item.content) {
        content += `<p>${item.content}</p>`;
    }
    
    modalBody.innerHTML = content;
    overlay.classList.add('active');
    modal.classList.add('active');
    
    function closeModal() {
        modal.classList.remove('active');
        overlay.classList.remove('active');
        document.removeEventListener('keydown', handleKeydown);
    }
    
    function handleKeydown(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    }
    
    document.getElementById('modalClose').addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    document.addEventListener('keydown', handleKeydown);
}

function getTagConfig(tagType, tagId) {
    const customTags = JSON.parse(localStorage.getItem('luoyang_custom_tags') || '{}');
    if (customTags[tagType] && customTags[tagType][tagId]) {
        return customTags[tagType][tagId];
    }
    if (tagTypes[tagType]) {
        return tagTypes[tagType].find(t => t.id === tagId);
    }
    return null;
}

function renderTag(tag) {
    const config = getTagConfig(tag.type, tag.tagId);
    if (!config) return '';
    return `<span class="archive-tag" style="background: ${config.bgColor}; color: ${config.color};">${config.name}</span>`;
}

function initArchiveSection() {
    const archiveGrid = document.getElementById('archiveGrid');
    const tabBtns = document.querySelectorAll('.archive-tabs .archive-tab');
    
    function renderArchiveItems(type) {
        archiveGrid.innerHTML = '';
        const items = archiveData[type];
        const favorites = getFavorites();
        const savedImages = JSON.parse(localStorage.getItem('luoyang_custom_images') || '{}');
        const savedTexts = JSON.parse(localStorage.getItem('luoyang_custom_texts') || '{}');
        
        items.forEach((item, index) => {
            const isFavorited = favorites.some(f => f.id === item.id);
            
            let globalIndex = index;
            if (type === 'craft') {
                globalIndex = (archiveData.food ? archiveData.food.length : 0) + index;
            } else if (type === 'fengHua') {
                globalIndex = (archiveData.food ? archiveData.food.length : 0) + 
                              (archiveData.craft ? archiveData.craft.length : 0) + index;
            }
            
            const customImage = savedImages[`archive${globalIndex}`] || item.image;
            const customName = savedTexts[`archiveName${globalIndex}`] || item.name;
            const customDesc = savedTexts[`archiveDesc${globalIndex}`] || item.description;
            const customWebsite = savedTexts[`archiveWebsite${globalIndex}`] || item.website;
            const hasWebsite = customWebsite && customWebsite.trim() !== '';
            
            const tagsHtml = item.tags ? item.tags.map(renderTag).join('') : '';
            
            const card = document.createElement('div');
            card.className = type === 'fengHua' ? 'archive-card fengHua-card' : 'archive-card';
            card.innerHTML = `
                <img src="${customImage}" alt="${customName}" class="archive-card-image">
                <div class="archive-card-content">
                    <div class="archive-card-tags">${tagsHtml}</div>
                    <h3 class="archive-card-title">${customName}</h3>
                    <p class="archive-card-desc">${customDesc}</p>
                    <div class="archive-card-actions">
                        <button class="archive-card-btn ${isFavorited ? 'favorited' : ''}" data-id="${item.id}" data-type="${type}" data-name="${customName}">
                            ❤️ ${isFavorited ? '已收藏' : '收藏'}
                        </button>
                        ${hasWebsite ? `<button class="archive-card-btn website-btn" onclick="openWebsite('${customWebsite}')">🌐 官方网站</button>` : ''}
                        <button class="inline-edit-btn" data-type="archive" data-subtype="${type}" data-index="${index}" style="display: ${isDeveloperMode() ? 'flex' : 'none'}; align-items: center; gap: 4px; background: #c9a227; color: #0d0d0d; border: none; padding: 6px 10px; border-radius: 6px; cursor: pointer; font-size: 11px; font-weight: 600;">
                            ✏️ 编辑
                        </button>
                    </div>
                </div>
            `;
            
            const favBtn = card.querySelector('.archive-card-btn');
            favBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleFavorite(item, type);
                this.classList.toggle('favorited');
                this.textContent = this.classList.contains('favorited') ? '❤️ 已收藏' : '❤️ 收藏';
                renderFavorites();
            });
            
            const editBtn = card.querySelector('.inline-edit-btn');
            if (editBtn) {
                editBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openInlineEditor('archive', index, type);
                });
            }
            
            if (type === 'fengHua') {
                card.addEventListener('click', () => {
                    openFengHuaModal(item);
                });
            }
            
            archiveGrid.appendChild(card);
        });
        
        updateFavoritesCount();
    }
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            renderArchiveItems(this.getAttribute('data-tab'));
        });
    });
    
    renderArchiveItems('food');
}

function getFavorites() {
    try {
        const stored = localStorage.getItem('luoyang_favorites');
        if (!stored) {
            return tryRestoreFavorites();
        }
        const parsed = JSON.parse(stored);
        if (!Array.isArray(parsed)) {
            console.warn('⚠️ 收藏夹数据格式错误，尝试恢复');
            return tryRestoreFavorites();
        }
        return parsed;
    } catch (e) {
        console.error('❌ 读取收藏夹数据失败:', e);
        return tryRestoreFavorites();
    }
}

function saveFavorites(favorites) {
    try {
        localStorage.setItem('luoyang_favorites', JSON.stringify(favorites));
        backupFavorites(favorites);
    } catch (e) {
        console.error('❌ 保存收藏夹数据失败:', e);
    }
}

function backupFavorites(favorites) {
    try {
        const backup = {
            data: favorites,
            timestamp: Date.now(),
            version: '1.0'
        };
        localStorage.setItem('luoyang_favorites_backup', JSON.stringify(backup));
    } catch (e) {
        console.warn('⚠️ 备份收藏夹数据失败:', e);
    }
}

function tryRestoreFavorites() {
    try {
        const backup = localStorage.getItem('luoyang_favorites_backup');
        if (backup) {
            const parsed = JSON.parse(backup);
            if (parsed.data && Array.isArray(parsed.data)) {
                console.log('✅ 从备份恢复收藏夹数据');
                saveFavorites(parsed.data);
                return parsed.data;
            }
        }
    } catch (e) {
        console.warn('⚠️ 从备份恢复收藏夹数据失败:', e);
    }
    return [];
}

function exportFavorites() {
    const favorites = getFavorites();
    const dataStr = JSON.stringify(favorites, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `luoyang_favorites_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert('✅ 收藏夹数据已导出！');
}

function importFavorites(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const imported = JSON.parse(e.target.result);
            if (Array.isArray(imported)) {
                saveFavorites(imported);
                renderFavorites();
                alert('✅ 收藏夹数据已导入！');
            } else {
                alert('❌ 导入失败：无效的数据格式');
            }
        } catch (e) {
            alert('❌ 导入失败：文件格式错误');
        }
    };
    reader.readAsText(file);
}

function toggleFavorite(item, type) {
    const favorites = getFavorites();
    const index = favorites.findIndex(f => f.id === item.id);
    
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push({ ...item, category: type });
    }
    
    saveFavorites(favorites);
}

function initFavorites() {
    const toggle = document.getElementById('favoritesToggle');
    const panel = document.getElementById('favoritesPanel');
    const closeBtn = document.getElementById('favoritesClose');
    
    if (!toggle || !panel) {
        console.error('❌ 收藏夹元素不存在');
        return;
    }
    
    toggle.addEventListener('click', () => {
        panel.classList.toggle('active');
        renderFavorites();
        console.log('✅ 收藏夹状态已切换');
    });
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            panel.classList.remove('active');
        });
    }
    
    document.addEventListener('click', (e) => {
        if (!panel.contains(e.target) && !toggle.contains(e.target)) {
            panel.classList.remove('active');
        }
    });
    
    renderFavorites();
}

function toggleFavoritesPanel() {
    const panel = document.getElementById('favoritesPanel');
    if (panel) {
        panel.classList.toggle('active');
        renderFavorites();
        console.log('✅ 收藏面板已切换');
    } else {
        console.error('❌ 收藏面板元素不存在');
    }
}

function updateFavoritesCount() {
    const countEl = document.getElementById('favoritesCount');
    if (countEl) {
        countEl.textContent = getFavorites().length;
    }
}

function renderFavorites() {
    const favoritesList = document.getElementById('favoritesList');
    const favorites = getFavorites();
    
    updateFavoritesCount();
    
    if (favorites.length === 0) {
        favoritesList.innerHTML = `
            <div class="empty-favorites">暂无收藏，快去发现洛阳的精彩吧！</div>
            <div style="display: flex; gap: 12px; margin-top: 16px;">
                <button onclick="exportFavorites()" style="flex: 1; background: #333; color: #f5f5f5; border: none; padding: 8px; border-radius: 6px; cursor: pointer; font-size: 12px;">📤 导出收藏</button>
                <label style="flex: 1; background: #333; color: #f5f5f5; border: none; padding: 8px; border-radius: 6px; cursor: pointer; font-size: 12px; display: flex; align-items: center; justify-content: center;">
                    📥 导入收藏
                    <input type="file" accept=".json" onchange="importFavorites(event)" style="display: none;">
                </label>
            </div>
        `;
        return;
    }
    
    favoritesList.innerHTML = `
        <div style="display: flex; gap: 12px; margin-bottom: 16px;">
            <button onclick="exportFavorites()" style="flex: 1; background: #c9a227; color: #0d0d0d; border: none; padding: 8px; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 600;">📤 导出收藏</button>
            <label style="flex: 1; background: #333; color: #f5f5f5; border: none; padding: 8px; border-radius: 6px; cursor: pointer; font-size: 12px; display: flex; align-items: center; justify-content: center;">
                📥 导入收藏
                <input type="file" accept=".json" onchange="importFavorites(event)" style="display: none;">
            </label>
        </div>
        ${favorites.map(item => {
            const categoryNames = {
                food: '美食',
                craft: '非遗',
                fengHua: '景点'
            };
            return `
                <div class="favorites-item" data-id="${item.id}" data-category="${item.category}">
                    <img src="${item.image}" alt="${item.name}" class="favorites-item-img">
                    <div class="favorites-item-info">
                        <p class="favorites-item-name">${item.name}</p>
                        <p class="favorites-item-type">${categoryNames[item.category] || item.category}</p>
                    </div>
                    <button class="favorites-item-remove" onclick="removeFavorite(${item.id})">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
            `;
        }).join('')}
    `;
    
    document.querySelectorAll('.favorites-item').forEach(item => {
        item.addEventListener('click', (e) => {
            if (!e.target.closest('.favorites-item-remove')) {
                const id = parseInt(item.dataset.id);
                const category = item.dataset.category;
                document.getElementById('favoritesPanel').classList.remove('active');
                
                if (category === 'fengHua') {
                    const fengHuaItem = archiveData.fengHua.find(f => f.id === id);
                    if (fengHuaItem) {
                        setTimeout(() => openFengHuaModal(fengHuaItem), 300);
                    }
                } else if (category === 'food' || category === 'craft') {
                    scrollToArchiveSection(category, id);
                }
            }
        });
    });
}

function removeFavorite(id) {
    const favorites = getFavorites().filter(f => f.id !== id);
    saveFavorites(favorites);
    renderFavorites();
    
    const favBtn = document.querySelector(`.archive-card-btn[data-id="${id}"]`);
    if (favBtn) {
        favBtn.classList.remove('favorited');
        favBtn.textContent = '❤️ 收藏';
    }
}

function scrollToArchiveSection(category, itemId) {
    const archiveSection = document.getElementById('archive');
    if (!archiveSection) return;
    
    archiveSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    setTimeout(() => {
        const tabBtns = document.querySelectorAll('.archive-tabs .archive-tab');
        tabBtns.forEach(btn => {
            if (btn.getAttribute('data-tab') === category) {
                btn.click();
            }
        });
        
        setTimeout(() => {
            const cards = document.querySelectorAll('.archive-card');
            cards.forEach(card => {
                card.classList.remove('highlighted');
                const cardImg = card.querySelector('.archive-card-image');
                if (cardImg) {
                    const item = archiveData[category]?.find(i => i.image === cardImg.src);
                    if (item && item.id === itemId) {
                        card.classList.add('highlighted');
                        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }
            });
        }, 200);
    }, 400);
}

function openFengHuaModal(item) {
    const overlay = document.getElementById('fengHuaOverlay');
    const modal = document.getElementById('fengHuaModal');
    const image = document.getElementById('fengHuaImage');
    const title = document.getElementById('fengHuaTitle');
    const location = document.getElementById('fengHuaLocation');
    const description = document.getElementById('fengHuaDescription');
    const locateBtn = document.getElementById('fengHuaLocate');
    const websiteBtn = document.getElementById('fengHuaWebsite');
    
    if (!overlay || !modal || !image || !title || !location || !description || !locateBtn || !websiteBtn) {
        console.error('❌ 洛阳风华弹窗元素未找到');
        return;
    }
    
    const savedImages = JSON.parse(localStorage.getItem('luoyang_custom_images') || '{}');
    const savedTexts = JSON.parse(localStorage.getItem('luoyang_custom_texts') || '{}');
    const globalIndex = getFengHuaGlobalIndex(item.id);
    
    const customImage = savedImages[`archive${globalIndex}`] || item.image;
    const customName = savedTexts[`archiveName${globalIndex}`] || item.name;
    const customDesc = savedTexts[`archiveDesc${globalIndex}`] || item.description;
    
    image.src = customImage;
    image.alt = customName;
    title.textContent = customName;
    location.textContent = item.locationName || '洛阳市';
    description.textContent = customDesc;
    
    if (item.website && item.website.trim()) {
        websiteBtn.style.display = 'inline-flex';
        websiteBtn.onclick = () => openWebsite(item.website);
    } else {
        websiteBtn.style.display = 'none';
    }
    
    locateBtn.onclick = () => {
        closeFengHuaModal();
        locateOnMap(item.location.lat, item.location.lng, item.mapPointName || item.name);
    };
    
    overlay.classList.add('active');
    modal.classList.add('active');
    
    document.body.style.overflow = 'hidden';
    console.log(`✅ 已打开洛阳风华弹窗: ${item.name}`);
}

function closeFengHuaModal() {
    const overlay = document.getElementById('fengHuaOverlay');
    const modal = document.getElementById('fengHuaModal');
    
    if (overlay) overlay.classList.remove('active');
    if (modal) modal.classList.remove('active');
    
    document.body.style.overflow = '';
}

function getFengHuaGlobalIndex(itemId) {
    let index = 0;
    if (archiveData.food) {
        index += archiveData.food.length;
    }
    if (archiveData.craft) {
        index += archiveData.craft.length;
    }
    if (archiveData.fengHua) {
        const fengHuaIndex = archiveData.fengHua.findIndex(f => f.id === itemId);
        if (fengHuaIndex !== -1) {
            index += fengHuaIndex;
        }
    }
    return index;
}

function locateOnMap(lat, lng, name) {
    window.location.hash = '#map';
    setTimeout(() => {
        const markersContainer = document.getElementById('mapMarkers');
        if (markersContainer) {
            const marker = markersContainer.querySelector(`[data-name="${name}"]`);
            if (marker) {
                marker.click();
                marker.style.boxShadow = '0 0 20px #c9a227';
                setTimeout(() => {
                    marker.style.boxShadow = '';
                }, 2000);
                console.log(`✅ 已定位到地图上的 "${name}" 标记点`);
            } else {
                console.log(`⚠️ 未找到 "${name}" 的标记点，将创建临时标记`);
                const mapInner = document.getElementById('mapInner');
                if (mapInner) {
                    const positions = currentMarkerPositions[name] || defaultMarkerPositions[name];
                    if (positions) {
                        const tempMarker = document.createElement('div');
                        tempMarker.className = 'map-marker';
                        tempMarker.dataset.name = name;
                        tempMarker.style.position = 'absolute';
                        tempMarker.style.left = `${positions.x}%`;
                        tempMarker.style.top = `${positions.y}%`;
                        tempMarker.style.transform = 'translate(-50%, -50%)';
                        tempMarker.innerHTML = `
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="#c9a227">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                <circle cx="12" cy="10" r="3" fill="#0d0d0d"/>
                            </svg>
                        `;
                        tempMarker.style.zIndex = '20';
                        tempMarker.style.pointerEvents = 'auto';
                        tempMarker.style.boxShadow = '0 0 20px #c9a227';
                        markersContainer.appendChild(tempMarker);
                        
                        setTimeout(() => {
                            tempMarker.remove();
                        }, 5000);
                        
                        tempMarker.click();
                    }
                }
            }
        }
    }, 300);
}

function openWebsite(url) {
    if (url && url.trim() !== '') {
        const fullUrl = url.startsWith('http') ? url : `https://${url}`;
        window.open(fullUrl, '_blank');
    }
}

function saveFengHuaWebsite(index, url) {
    archiveData.fengHua[index].website = url.trim();
    localStorage.setItem('luoyang_fengHua_websites', JSON.stringify(archiveData.fengHua.map(item => ({ id: item.id, website: item.website }))));
    alert('✅ 官网地址已保存！页面将自动刷新以显示更新');
    console.log(`✅ 已保存 ${archiveData.fengHua[index].name} 的官网地址: ${url}`);
    setTimeout(() => {
        window.location.reload();
    }, 100);
}

function loadFengHuaWebsites() {
    try {
        const saved = localStorage.getItem('luoyang_fengHua_websites');
        if (saved) {
            const websites = JSON.parse(saved);
            websites.forEach(web => {
                const item = archiveData.fengHua.find(f => f.id === web.id);
                if (item) {
                    item.website = web.website;
                }
            });
            console.log('✅ 已加载保存的洛阳风华官网地址');
        }
    } catch (e) {
        console.error('❌ 加载洛阳风华官网地址失败:', e);
    }
}

let mapInstance = null;
let isDragMode = false;
let draggedMarker = null;
let dragOffset = { x: 0, y: 0 };

const defaultMarkerPositions = {
    '龙门石窟': { x: 35, y: 45 },
    '白马寺': { x: 42, y: 30 },
    '应天门': { x: 45, y: 42 },
    '洛阳博物馆': { x: 46, y: 44 },
    '王城公园': { x: 44, y: 45 },
    '关林庙': { x: 42, y: 47 },
    '白云山': { x: 25, y: 55 },
    '老君山': { x: 30, y: 70 },
    '洛邑古城': { x: 44, y: 43 },
    '隋唐大运河博物馆': { x: 43, y: 44 }
};

let currentMarkerPositions = loadMarkerPositions();

function saveMarkerPositions() {
    try {
        localStorage.setItem('luoyang_marker_positions', JSON.stringify(currentMarkerPositions));
        console.log('✅ 标记点位置已保存');
    } catch (e) {
        console.error('❌ 保存标记点位置失败:', e);
    }
}

function loadMarkerPositions() {
    try {
        const saved = localStorage.getItem('luoyang_marker_positions');
        if (saved) {
            const parsed = JSON.parse(saved);
            console.log('✅ 已加载保存的标记点位置:', parsed);
            return { ...defaultMarkerPositions, ...parsed };
        }
    } catch (e) {
        console.error('❌ 加载标记点位置失败:', e);
    }
    return { ...defaultMarkerPositions };
}

function saveMarkerData() {
    try {
        localStorage.setItem('luoyang_marker_data', JSON.stringify(mapPoints));
        console.log('✅ 标记点数据已保存');
    } catch (e) {
        console.error('❌ 保存标记点数据失败:', e);
    }
}

function loadMarkerData() {
    try {
        const saved = localStorage.getItem('luoyang_marker_data');
        if (saved) {
            const parsed = JSON.parse(saved);
            console.log('✅ 已加载保存的标记点数据:', parsed);
            return parsed;
        }
    } catch (e) {
        console.error('❌ 加载标记点数据失败:', e);
    }
    return null;
}

function initMapSection() {
    const mapContainer = document.getElementById('mapContainer');
    
    if (!mapContainer) {
        console.error('错误：地图容器元素不存在');
        return;
    }
    
    const savedMapPoints = loadMarkerData();
    const savedPositions = loadMarkerPositions();
    
    if (savedMapPoints && savedMapPoints.length > 0 && savedPositions) {
        mapPoints.length = 0;
        savedMapPoints.forEach(point => {
            mapPoints.push({ ...point });
        });
        currentMarkerPositions = { ...savedPositions };
        console.log('✅ 已从本地存储加载标记点数据:', mapPoints.length, '个');
    }
    
    mapContainer.innerHTML = `
        <div id="mapInner" style="position: relative; width: 100%; height: 100%; overflow: hidden; background: #0d0d0d;">
            <div id="mapContent" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
                <img src="images/洛阳市_HD.png" alt="洛阳市地图" class="map-main-image" style="width: 100%; height: 100%; object-fit: contain;">
            </div>
            <div id="mapMarkers" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;"></div>
            <div id="mapModeIndicator" style="position: absolute; top: 15px; left: 15px; padding: 8px 16px; background: rgba(36, 36, 36, 0.9); border-radius: 8px; color: #b3b3b3; font-size: 12px; display: none; z-index: 100;">
                <span id="modeText">拖拽模式</span>
            </div>
        </div>
    `;
    
    const mapInner = document.getElementById('mapInner');
    const mapContent = document.getElementById('mapContent');
    const mapImage = mapContainer.querySelector('.map-main-image');
    const modeIndicator = document.getElementById('mapModeIndicator');
    const modeText = document.getElementById('modeText');
    
    let currentScale = 1;
    mapInner.style.cursor = 'default';
    
    mapInner.addEventListener('wheel', (e) => {
        e.preventDefault();
        e.stopPropagation();
    }, { passive: false });
    
    const markersContainer = document.getElementById('mapMarkers');
    
    mapPoints.forEach(point => {
        const pos = currentMarkerPositions[point.name];
        if (pos) {
            createMarker(point, pos, markersContainer);
        }
    });
    
    mapInner.addEventListener('click', (e) => {
        if (!window.mapMarkerModeActive) return;
        
        const target = e.target;
        if (target.closest('.map-marker')) return;
        if (target.closest('#mapZoomControls')) return;
        
        const rect = markersContainer.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        const newMarkerName = `新标记点 ${Date.now()}`;
        
        const newPoint = {
            name: newMarkerName,
            description: '自定义标记点',
            image: 'https://via.placeholder.com/220x110',
            imageBase64: ''
        };
        
        mapPoints.push(newPoint);
        currentMarkerPositions[newMarkerName] = { x, y };
        
        saveMarkerPositions();
        saveMarkerData();
        
        createMarker(newPoint, { x, y }, markersContainer);
        
        alert(`✅ 已创建新标记点！\n\n名称: ${newMarkerName}\n位置: ${x.toFixed(1)}%, ${y.toFixed(1)}%`);
    });
    
    initDragModeControls(modeIndicator, modeText);
    
    window.mapInstance = { 
        container: mapContainer,
        zoom: (delta) => {
            currentScale = Math.min(maxScale, Math.max(minScale, currentScale + delta));
            updateMapTransform();
        },
        getMarkerPositions: () => currentMarkerPositions,
        setMarkerPositions: (positions) => {
            currentMarkerPositions = positions;
        }
    };
    console.log('地图初始化完成');
}

function createMarker(point, pos, container) {
    const marker = document.createElement('div');
    marker.className = 'map-marker';
    marker.dataset.name = point.name;
    marker.style.position = 'absolute';
    marker.style.left = `${pos.x}%`;
    marker.style.top = `${pos.y}%`;
    marker.style.transform = 'translate(-50%, -50%)';
    marker.innerHTML = `
        <svg width="32" height="32" viewBox="0 0 24 24" fill="#c9a227">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3" fill="#0d0d0d"/>
        </svg>
    `;
    marker.style.cursor = isDragMode ? 'move' : 'pointer';
    marker.style.zIndex = '10';
    marker.style.transition = 'transform 0.3s ease, filter 0.3s ease, box-shadow 0.3s ease, cursor 0.3s ease';
    marker.style.pointerEvents = 'auto';
    
    const popup = document.createElement('div');
    popup.className = 'map-popup';
    popup.dataset.markerName = point.name;
    popup.style.position = 'fixed';
    popup.style.background = '#242424';
    popup.style.border = '1px solid #333';
    popup.style.padding = '15px';
    popup.style.borderRadius = '12px';
    popup.style.boxShadow = '0 8px 32px rgba(0,0,0,0.5)';
    popup.style.width = '240px';
    popup.style.display = 'none';
    popup.style.opacity = '0';
    popup.style.transition = 'all 0.3s ease';
    popup.style.zIndex = '9999';
    popup.style.pointerEvents = 'auto';
    popup.style.maxHeight = '80vh';
    popup.style.overflowY = 'auto';
    
    // 获取图片源 - 支持自定义图片存储
    let imageSrc;
    if (point.image && point.image.startsWith('custom:')) {
        const storageKey = point.image.replace('custom:', '');
        imageSrc = getCustomImage(storageKey, 'https://via.placeholder.com/220x110');
    } else if (point.imageBase64) {
        imageSrc = point.imageBase64;
    } else {
        imageSrc = point.image || 'https://via.placeholder.com/220x110';
    }
    
    popup.innerHTML = `
        <img src="${imageSrc}" style="width: 100%; height: 110px; object-fit: cover; border-radius: 8px; margin-bottom: 12px;">
        <h4 style="color: #c9a227; margin: 0 0 8px 0; font-size: 16px; font-family: 'Songti SC', serif;">${point.name}</h4>
        <p style="color: #b3b3b3; font-size: 12px; margin: 0 0 12px 0; line-height: 1.6; min-height: 40px;">${point.description}</p>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <span style="color: #666; font-size: 11px;">📍 坐标: ${pos.x.toFixed(1)}%, ${pos.y.toFixed(1)}%</span>
        </div>
        <div style="display: flex; gap: 8px;">
            <button class="popup-btn-detail" style="flex: 1; background: #c9a227; color: #0d0d0d; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 600; transition: background 0.3s ease;">查看详情</button>
            <button class="popup-btn-edit" style="flex: 1; background: #333; color: #f5f5f5; border: 1px solid #444; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 12px; transition: all 0.3s ease;">编辑</button>
            <button class="popup-btn-delete" style="width: 32px; background: #8b0000; color: #fff; border: none; padding: 8px; border-radius: 6px; cursor: pointer; font-size: 12px; transition: background 0.3s ease;">🗑️</button>
        </div>
    `;
    document.body.appendChild(popup);
    
    const detailBtn = popup.querySelector('.popup-btn-detail');
    const editBtn = popup.querySelector('.popup-btn-edit');
    const deleteBtn = popup.querySelector('.popup-btn-delete');
    
    detailBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openDetailModal(point, pos);
    });
    
    editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openEditModal(point, pos, marker);
    });
    
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        
        if (confirm(`确定要删除标记点 "${point.name}" 吗？\n\n此操作不可撤销。`)) {
            const index = mapPoints.findIndex(p => p.name === point.name);
            if (index !== -1) {
                mapPoints.splice(index, 1);
                delete currentMarkerPositions[point.name];
                
                marker.remove();
                popup.remove();
                
                saveMarkerPositions();
                saveMarkerData();
                
                alert(`✅ 标记点 "${point.name}" 已成功删除！`);
                console.log('✅ 标记点已删除:', point.name);
            }
        }
    });
    
    marker.addEventListener('mouseenter', (e) => {
        if (!window.isDragModeActive && !window.mapDragModeActive && !window.mapMarkerModeActive) {
            
            marker.style.transform = 'translate(-50%, -50%) scale(1.2)';
            marker.style.filter = 'drop-shadow(0 0 8px rgba(201, 162, 39, 0.8))';
            
            const markerRect = marker.getBoundingClientRect();
            const popupHeight = 180;
            const popupWidth = 240;
            
            let popupX = markerRect.left + markerRect.width / 2 - popupWidth / 2;
            let popupY = markerRect.top - popupHeight - 10;
            
            if (popupY < 20) {
                popupY = markerRect.bottom + 10;
            }
            
            if (popupX < 20) {
                popupX = 20;
            } else if (popupX + popupWidth > window.innerWidth - 20) {
                popupX = window.innerWidth - popupWidth - 20;
            }
            
            popup.style.left = `${popupX}px`;
            popup.style.top = `${popupY}px`;
            popup.style.transform = 'none';
            popup.style.borderRadius = '12px';
            
            popup.style.display = 'block';
            requestAnimationFrame(() => {
                popup.style.opacity = '1';
            });
        }
    });
    
    let isHovering = false;
    
    marker.addEventListener('mouseleave', () => {
        if (!window.isDragModeActive && !window.mapDragModeActive && !window.mapMarkerModeActive && draggedMarker !== marker) {
            setTimeout(() => {
                if (!isHovering) {
                    marker.style.transform = 'translate(-50%, -50%) scale(1)';
                    marker.style.filter = 'none';
                    popup.style.opacity = '0';
                    setTimeout(() => { 
                        if (!isHovering && popup.style.opacity === '0') {
                            popup.style.display = 'none';
                        }
                    }, 200);
                }
            }, 50);
        }
    });
    
    popup.addEventListener('mouseenter', () => {
        isHovering = true;
        popup.style.display = 'block';
        popup.style.opacity = '1';
        marker.style.transform = 'translate(-50%, -50%) scale(1.2)';
        marker.style.filter = 'drop-shadow(0 0 8px rgba(201, 162, 39, 0.8))';
    });
    
    popup.addEventListener('mouseleave', () => {
        isHovering = false;
        marker.style.transform = 'translate(-50%, -50%) scale(1)';
        marker.style.filter = 'none';
        popup.style.opacity = '0';
        setTimeout(() => { 
            if (!isHovering && popup.style.opacity === '0') {
                popup.style.display = 'none';
            }
        }, 200);
    });
    
    marker.addEventListener('mousedown', (e) => {
        if (!window.mapDragModeActive) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        console.log('标记点开始拖拽:', marker.dataset.name);
        
        draggedMarker = marker;
        const rect = container.getBoundingClientRect();
        const currentLeft = parseFloat(marker.style.left);
        const currentTop = parseFloat(marker.style.top);
        dragOffset.x = e.clientX - rect.left - (currentLeft / 100 * rect.width);
        dragOffset.y = e.clientY - rect.top - (currentTop / 100 * rect.height);
        
        marker.style.zIndex = '100';
        marker.style.transform = 'translate(-50%, -50%) scale(1.3)';
        marker.style.boxShadow = '0 0 20px rgba(201, 162, 39, 0.8)';
        
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
    
    container.appendChild(marker);
}

function onMouseMove(e) {
    if (!draggedMarker || !window.mapDragModeActive) return;
    
    const rect = draggedMarker.parentElement.getBoundingClientRect();
    let newX = ((e.clientX - rect.left - dragOffset.x) / rect.width) * 100;
    let newY = ((e.clientY - rect.top - dragOffset.y) / rect.height) * 100;
    
    newX = Math.max(2, Math.min(98, newX));
    newY = Math.max(2, Math.min(98, newY));
    
    draggedMarker.style.left = `${newX}%`;
    draggedMarker.style.top = `${newY}%`;
    
    const popup = document.querySelector(`.map-popup[data-marker-name="${draggedMarker.dataset.name}"]`);
    if (popup) {
        const markerRect = draggedMarker.getBoundingClientRect();
        const popupWidth = 240;
        const popupHeight = 180;
        
        let popupX = markerRect.left + markerRect.width / 2 - popupWidth / 2;
        let popupY = markerRect.top - popupHeight - 10;
        
        if (popupY < 20) {
            popupY = markerRect.bottom + 10;
        }
        
        if (popupX < 20) {
            popupX = 20;
        } else if (popupX + popupWidth > window.innerWidth - 20) {
            popupX = window.innerWidth - popupWidth - 20;
        }
        
        popup.style.left = `${popupX}px`;
        popup.style.top = `${popupY}px`;
    }
    
    currentMarkerPositions[draggedMarker.dataset.name] = { x: newX, y: newY };
    saveMarkerPositions();
    
    console.log('标记点位置更新:', draggedMarker.dataset.name, newX.toFixed(1) + '%', newY.toFixed(1) + '%');
}

function onMouseUp() {
    if (draggedMarker) {
        draggedMarker.style.zIndex = '10';
        draggedMarker.style.transform = 'translate(-50%, -50%) scale(1)';
        draggedMarker.style.boxShadow = 'none';
        
        saveMarkerPositions();
        saveMarkerData();
        console.log('✅ 拖拽位置已自动保存');
        
        draggedMarker = null;
    }
    
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
}

function initDragModeControls(indicator, textElement) {
    console.log('正在初始化地图控制按钮...');
    
    const toggleDragModeBtn = document.getElementById('toggleDragMode');
    const resetMarkersBtn = document.getElementById('resetMarkersBtn');
    const toggleMarkerModeBtn = document.getElementById('toggleMarkerMode');
    
    console.log('toggleDragModeBtn:', toggleDragModeBtn);
    console.log('resetMarkersBtn:', resetMarkersBtn);
    console.log('toggleMarkerModeBtn:', toggleMarkerModeBtn);
    
    if (resetMarkersBtn) {
        resetMarkersBtn.addEventListener('click', function() {
            console.log('重置标记按钮被点击');
            
            const defaultMapPoints = [
                { name: '龙门石窟', description: '中国四大石窟之一，世界文化遗产', image: 'https://via.placeholder.com/220x110' },
                { name: '白马寺', description: '中国第一座官办寺院', image: 'https://via.placeholder.com/220x110' },
                { name: '应天门', description: '隋唐洛阳城宫城正南门', image: 'https://via.placeholder.com/220x110' },
                { name: '洛阳博物馆', description: '综合性历史博物馆', image: 'https://via.placeholder.com/220x110' },
                { name: '王城公园', description: '洛阳市最大的综合性公园', image: 'https://via.placeholder.com/220x110' },
                { name: '关林庙', description: '三国名将关羽的葬首之所', image: 'https://via.placeholder.com/220x110' },
                { name: '老君山', description: '道教名山，国家5A级景区', image: 'https://via.placeholder.com/220x110' }
            ];
            
            mapPoints.length = 0;
            defaultMapPoints.forEach(point => {
                mapPoints.push({ ...point });
            });
            
            currentMarkerPositions = { ...defaultMarkerPositions };
            
            const markersContainer = document.getElementById('mapMarkers');
            if (markersContainer) {
                markersContainer.innerHTML = '';
                
                mapPoints.forEach(point => {
                    const pos = currentMarkerPositions[point.name];
                    if (pos) {
                        createMarker(point, pos, markersContainer);
                    }
                });
                
                saveMarkerPositions();
                saveMarkerData();
                
                alert('✅ 已完成全部重置！\n\n- 所有标记点位置已恢复默认\n- 所有自定义标记点已清除\n- 所有编辑内容已恢复初始状态');
            }
        });
    }
    // 如果按钮不存在，不报错，只是静默处理
    
    console.log('地图控制按钮初始化完成');
}

function initMapControls() {
    console.log('=== initMapControls 被调用 ===');
    
    const toggleDragModeBtn = document.getElementById('toggleDragMode');
    const resetMarkersBtn = document.getElementById('resetMarkersBtn');
    const toggleMarkerModeBtn = document.getElementById('toggleMarkerMode');
    
    console.log('toggleDragModeBtn:', toggleDragModeBtn);
    console.log('resetMarkersBtn:', resetMarkersBtn);
    console.log('toggleMarkerModeBtn:', toggleMarkerModeBtn);
    
    window.mapDragModeActive = false;
    window.mapMarkerModeActive = false;
    
    console.log('=== 地图控制按钮绑定完成 ===');
}

function handleToggleDragMode() {
    console.log('✋ handleToggleDragMode 被调用');
    
    const toggleDragModeBtn = document.getElementById('toggleDragMode');
    const toggleMarkerModeBtn = document.getElementById('toggleMarkerMode');
    const modeIndicator = document.getElementById('mapModeIndicator');
    const modeText = document.getElementById('modeText');
    
    window.mapDragModeActive = !window.mapDragModeActive;
    window.isDragModeActive = window.mapDragModeActive;
    
    if (window.mapDragModeActive) {
        toggleDragModeBtn.classList.add('active');
        
        if (toggleMarkerModeBtn) {
            toggleMarkerModeBtn.classList.remove('active');
            window.mapMarkerModeActive = false;
        }
        
        const markers = document.querySelectorAll('.map-marker');
        markers.forEach(marker => {
            marker.style.cursor = 'move';
            marker.style.border = '2px solid #c9a227';
        });
        
        modeIndicator.style.display = 'block';
        modeText.textContent = '拖拽模式 - 点击拖动标记点';
        
        alert('✅ 拖拽模式已启用！\n\n现在您可以拖动地图上的标记点来调整位置。');
    } else {
        toggleDragModeBtn.classList.remove('active');
        
        const markers = document.querySelectorAll('.map-marker');
        markers.forEach(marker => {
            marker.style.cursor = 'pointer';
            marker.style.border = 'none';
        });
        
        if (!window.mapMarkerModeActive) {
            modeIndicator.style.display = 'none';
        }
        
        alert('❌ 拖拽模式已关闭！');
    }
    
    console.log('拖拽模式状态:', window.mapDragModeActive);
}



function handleToggleMarkerMode() {
    console.log('📍 handleToggleMarkerMode 被调用');
    
    const toggleMarkerModeBtn = document.getElementById('toggleMarkerMode');
    const toggleDragModeBtn = document.getElementById('toggleDragMode');
    const modeIndicator = document.getElementById('mapModeIndicator');
    const modeText = document.getElementById('modeText');
    
    window.mapMarkerModeActive = !window.mapMarkerModeActive;
    
    if (window.mapMarkerModeActive) {
        toggleMarkerModeBtn.classList.add('active');
        
        if (toggleDragModeBtn) {
            toggleDragModeBtn.classList.remove('active');
            window.mapDragModeActive = false;
            window.isDragModeActive = false;
            
            const markers = document.querySelectorAll('.map-marker');
            markers.forEach(marker => {
                marker.style.cursor = 'pointer';
                marker.style.border = 'none';
            });
        }
        
        modeIndicator.style.display = 'block';
        modeText.textContent = '标记模式 - 点击创建新标记点';
        
        alert('✅ 标记模式已启用！\n\n🖱️ 点击地图上的任意位置即可创建新标记点。\n\n创建后可以在拖拽模式下调整位置。');
    } else {
        toggleMarkerModeBtn.classList.remove('active');
        
        if (!window.mapDragModeActive) {
            modeIndicator.style.display = 'none';
        }
        
        alert('❌ 标记模式已关闭！');
    }
    
    console.log('标记模式状态:', window.mapMarkerModeActive);
}

function handleDeleteCustomMarkers() {
    const defaultMarkerNames = Object.keys(defaultMarkerPositions);
    const customMarkers = mapPoints.filter(point => !defaultMarkerNames.includes(point.name));
    
    if (customMarkers.length === 0) {
        alert('ℹ️ 当前没有自定义标记点需要删除。');
        return;
    }
    
    const confirmMessage = `⚠️ 确认删除所有自定义标记点？

即将删除 ${customMarkers.length} 个自定义标记点：
${customMarkers.map((p, i) => `${i + 1}. ${p.name}`).join('\n')}

系统将自动备份被删除的数据，您可以在30分钟内撤销此操作。

确定要继续吗？`;
    
    if (!confirm(confirmMessage)) {
        console.log('用户取消了删除操作');
        return;
    }
    
    const backupData = {
        points: JSON.parse(JSON.stringify(customMarkers)),
        positions: {},
        deletedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString()
    };
    
    customMarkers.forEach(point => {
        if (currentMarkerPositions[point.name]) {
            backupData.positions[point.name] = { ...currentMarkerPositions[point.name] };
        }
    });
    
    localStorage.setItem('luoyang_deleted_backup', JSON.stringify(backupData));
    console.log('✅ 已备份自定义标记点数据');
    
    const markersContainer = document.getElementById('mapMarkers');
    let deletedCount = 0;
    
    for (let i = mapPoints.length - 1; i >= 0; i--) {
        const point = mapPoints[i];
        if (!defaultMarkerNames.includes(point.name)) {
            delete currentMarkerPositions[point.name];
            mapPoints.splice(i, 1);
            deletedCount++;
        }
    }
    
    markersContainer.innerHTML = '';
    
    mapPoints.forEach(point => {
        const pos = currentMarkerPositions[point.name] || defaultMarkerPositions[point.name];
        if (pos) {
            createMarker(point, pos, markersContainer);
        }
    });
    
    saveMarkerPositions();
    saveMarkerData();
    
    const undoBtn = document.getElementById('undoDeleteBtn');
    undoBtn.style.display = 'inline-flex';
    
    alert(`✅ 删除完成！\n\n• 成功删除：${deletedCount} 个自定义标记点\n• 保留的初始标记点：${mapPoints.length} 个\n\n您可以在30分钟内点击"↩️ 撤销删除"按钮恢复数据。`);
    
    setTimeout(() => {
        const backup = localStorage.getItem('luoyang_deleted_backup');
        if (backup) {
            const data = JSON.parse(backup);
            if (new Date(data.expiresAt) < new Date()) {
                localStorage.removeItem('luoyang_deleted_backup');
                document.getElementById('undoDeleteBtn').style.display = 'none';
                console.log('⏰ 备份已过期并自动删除');
            }
        }
    }, 30 * 60 * 1000);
}

function handleUndoDelete() {
    const backupData = localStorage.getItem('luoyang_deleted_backup');
    
    if (!backupData) {
        alert('❌ 没有可恢复的备份数据，或者备份已过期（超过30分钟）。');
        return;
    }
    
    try {
        const data = JSON.parse(backupData);
        
        if (new Date(data.expiresAt) < new Date()) {
            localStorage.removeItem('luoyang_deleted_backup');
            document.getElementById('undoDeleteBtn').style.display = 'none';
            alert('❌ 备份已过期（超过30分钟），无法恢复。');
            return;
        }
        
        const markersContainer = document.getElementById('mapMarkers');
        
        data.points.forEach(point => {
            mapPoints.push({ ...point });
            if (data.positions[point.name]) {
                currentMarkerPositions[point.name] = { ...data.positions[point.name] };
            }
        });
        
        markersContainer.innerHTML = '';
        
        mapPoints.forEach(point => {
            const pos = currentMarkerPositions[point.name] || defaultMarkerPositions[point.name];
            if (pos) {
                createMarker(point, pos, markersContainer);
            }
        });
        
        saveMarkerPositions();
        saveMarkerData();
        localStorage.removeItem('luoyang_deleted_backup');
        
        document.getElementById('undoDeleteBtn').style.display = 'none';
        
        alert(`✅ 已成功恢复 ${data.points.length} 个标记点！`);
        console.log('✅ 已从备份恢复自定义标记点');
        
    } catch (e) {
        console.error('❌ 恢复备份失败:', e);
        alert('❌ 恢复失败，请重试。');
    }
}


function openDetailModal(point, pos) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
        background: #1a1a1a;
        border: 1px solid #333;
        border-radius: 16px;
        padding: 24px;
        max-width: 450px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        transform: scale(0.9);
        transition: transform 0.3s ease;
    `;
    
    content.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;">
            <h2 style="color: #c9a227; font-family: 'Songti SC', serif; font-size: 24px; margin: 0;">${point.name}</h2>
            <button class="modal-close-btn" style="width: 32px; height: 32px; border: none; background: #333; color: #fff; border-radius: 50%; cursor: pointer; font-size: 18px; display: flex; align-items: center; justify-content: center; transition: background 0.3s ease;">&times;</button>
        </div>
        
        <img src="${point.imageBase64 || point.image || 'https://via.placeholder.com/400x200'}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 12px; margin-bottom: 20px;">
        
        <div style="margin-bottom: 16px;">
            <h3 style="color: #f5f5f5; font-size: 14px; margin: 0 0 8px 0; font-weight: 600;">📍 坐标位置</h3>
            <p style="color: #b3b3b3; font-size: 14px; margin: 0;">${pos.x.toFixed(2)}%, ${pos.y.toFixed(2)}%</p>
        </div>
        
        <div style="margin-bottom: 20px;">
            <h3 style="color: #f5f5f5; font-size: 14px; margin: 0 0 8px 0; font-weight: 600;">📝 详细描述</h3>
            <p style="color: #b3b3b3; font-size: 14px; margin: 0; line-height: 1.7;">${point.description}</p>
        </div>
        
        <div style="display: flex; gap: 12px;">
            <button class="modal-edit-btn" style="flex: 1; background: #c9a227; color: #0d0d0d; border: none; padding: 12px 20px; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 600; transition: background 0.3s ease;">编辑信息</button>
            <button class="modal-close-btn-2" style="flex: 1; background: #333; color: #f5f5f5; border: 1px solid #444; padding: 12px 20px; border-radius: 8px; cursor: pointer; font-size: 14px; transition: all 0.3s ease;">关闭</button>
        </div>
    `;
    
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.style.opacity = '1';
        content.style.transform = 'scale(1)';
    }, 10);
    
    const closeBtn = content.querySelector('.modal-close-btn');
    const closeBtn2 = content.querySelector('.modal-close-btn-2');
    const editBtn = content.querySelector('.modal-edit-btn');
    
    function closeModal() {
        modal.style.opacity = '0';
        content.style.transform = 'scale(0.9)';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
    
    closeBtn.addEventListener('click', closeModal);
    closeBtn2.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    editBtn.addEventListener('click', () => {
        closeModal();
        setTimeout(() => {
            const markers = document.querySelectorAll('.map-marker');
            let markerElement = null;
            markers.forEach(m => {
                if (m.dataset.name === point.name) {
                    markerElement = m;
                }
            });
            openEditModal(point, pos, markerElement);
        }, 350);
    });
}

function openEditModal(point, pos, marker) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
        background: #1a1a1a;
        border: 1px solid #333;
        border-radius: 16px;
        padding: 24px;
        max-width: 450px;
        width: 90%;
        max-height: 85vh;
        overflow-y: auto;
        transform: scale(0.9);
        transition: transform 0.3s ease;
        z-index: 10000;
    `;
    
    content.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px;">
            <h2 style="color: #c9a227; font-family: 'Songti SC', serif; font-size: 24px; margin: 0;">编辑标记点</h2>
            <button class="modal-close-btn" style="width: 32px; height: 32px; border: none; background: #333; color: #fff; border-radius: 50%; cursor: pointer; font-size: 18px; display: flex; align-items: center; justify-content: center; transition: background 0.3s ease;">&times;</button>
        </div>
        
        <div style="margin-bottom: 20px;">
            <label style="display: block; color: #f5f5f5; font-size: 14px; margin: 0 0 8px 0; font-weight: 600;">名称</label>
            <input type="text" id="edit-name" value="${escapeHtml(point.name)}" style="width: 100%; padding: 12px; background: #242424; border: 1px solid #333; border-radius: 8px; color: #f5f5f5; font-size: 14px; outline: none; transition: border-color 0.3s ease;" placeholder="输入名称">
        </div>
        
        <div style="margin-bottom: 20px;">
            <label style="display: block; color: #f5f5f5; font-size: 14px; margin: 0 0 8px 0; font-weight: 600;">上传图片</label>
            <div id="image-upload-area" style="border: 2px dashed #444; border-radius: 8px; padding: 20px; text-align: center; cursor: pointer; transition: border-color 0.3s ease;" onclick="document.getElementById('image-file-input').click();">
                <input type="file" id="image-file-input" accept="image/jpeg,image/png,image/gif,image/webp" style="display: none;">
                <div style="font-size: 24px; margin-bottom: 8px;">📷</div>
                <div style="color: #b3b3b3; font-size: 14px; margin-bottom: 4px;">点击或拖拽上传图片</div>
                <div style="color: #666; font-size: 12px;">支持 JPG、PNG、GIF、WebP 格式</div>
            </div>
            <div id="upload-progress" style="display: none; margin-top: 10px;">
                <div style="display: flex; justify-content: space-between; color: #b3b3b3; font-size: 12px; margin-bottom: 4px;">
                    <span>上传进度</span>
                    <span id="progress-percent">0%</span>
                </div>
                <div style="height: 4px; background: #333; border-radius: 2px; overflow: hidden;">
                    <div id="progress-bar" style="height: 100%; background: #c9a227; width: 0%; transition: width 0.3s ease;"></div>
                </div>
            </div>
            <div id="upload-error" style="display: none; margin-top: 10px; padding: 10px; background: rgba(255, 68, 68, 0.1); border: 1px solid #ff4444; border-radius: 6px; color: #ff4444; font-size: 12px;"></div>
            <input type="hidden" id="edit-image-base64" value="${point.imageBase64 || ''}">
        </div>
        <div style="margin-bottom: 20px;">
            <label style="display: block; color: #f5f5f5; font-size: 14px; margin: 0 0 8px 0; font-weight: 600;">图片URL（备用）</label>
            <input type="text" id="edit-image-url" value="${escapeHtml(point.image || '')}" style="width: 100%; padding: 12px; background: #242424; border: 1px solid #333; border-radius: 8px; color: #f5f5f5; font-size: 14px; outline: none; transition: border-color 0.3s ease;" placeholder="输入图片URL（上传图片优先）">
        </div>
        
        <div style="margin-bottom: 20px;">
            <label style="display: block; color: #f5f5f5; font-size: 14px; margin: 0 0 8px 0; font-weight: 600;">描述</label>
            <textarea id="edit-description" rows="4" style="width: 100%; padding: 12px; background: #242424; border: 1px solid #333; border-radius: 8px; color: #f5f5f5; font-size: 14px; outline: none; transition: border-color 0.3s ease; resize: none;" placeholder="输入描述">${escapeHtml(point.description)}</textarea>
        </div>
        
        <div style="margin-bottom: 20px; padding: 15px; background: #242424; border-radius: 8px;">
            <label style="display: block; color: #f5f5f5; font-size: 14px; margin: 0 0 8px 0; font-weight: 600;">📍 当前坐标</label>
            <div style="display: flex; gap: 12px;">
                <div>
                    <label style="color: #666; font-size: 12px; display: block; margin-bottom: 4px;">X 轴</label>
                    <input type="number" id="edit-x" value="${pos.x.toFixed(2)}" step="0.1" min="0" max="100" style="width: 100px; padding: 8px; background: #1a1a1a; border: 1px solid #333; border-radius: 6px; color: #f5f5f5; font-size: 13px; outline: none;">
                </div>
                <div>
                    <label style="color: #666; font-size: 12px; display: block; margin-bottom: 4px;">Y 轴</label>
                    <input type="number" id="edit-y" value="${pos.y.toFixed(2)}" step="0.1" min="0" max="100" style="width: 100px; padding: 8px; background: #1a1a1a; border: 1px solid #333; border-radius: 6px; color: #f5f5f5; font-size: 13px; outline: none;">
                </div>
            </div>
        </div>
        
        <div style="display: flex; gap: 12px;">
            <button class="modal-save-btn" style="flex: 1; background: #c9a227; color: #0d0d0d; border: none; padding: 12px 20px; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 600; transition: background 0.3s ease;">保存修改</button>
            <button class="modal-close-btn-2" style="flex: 1; background: #333; color: #f5f5f5; border: 1px solid #444; padding: 12px 20px; border-radius: 8px; cursor: pointer; font-size: 14px; transition: all 0.3s ease;">取消</button>
        </div>
    `;
    
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.style.opacity = '1';
        content.style.transform = 'scale(1)';
    }, 10);
    
    const closeBtn = content.querySelector('.modal-close-btn');
    const closeBtn2 = content.querySelector('.modal-close-btn-2');
    const saveBtn = content.querySelector('.modal-save-btn');
    
    function closeModal() {
        modal.style.opacity = '0';
        content.style.transform = 'scale(0.9)';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
    
    closeBtn.addEventListener('click', closeModal);
    closeBtn2.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    const uploadArea = content.querySelector('#image-upload-area');
    const fileInput = content.querySelector('#image-file-input');
    const progressDiv = content.querySelector('#upload-progress');
    const progressPercent = content.querySelector('#progress-percent');
    const progressBar = content.querySelector('#progress-bar');
    const errorDiv = content.querySelector('#upload-error');
    
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleFileUpload(file);
        }
    });
    
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#c9a227';
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = '#444';
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#444';
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleFileUpload(file);
        } else {
            showUploadError('请上传有效的图片文件！');
        }
    });
    
    function handleFileUpload(file) {
        const maxSize = 10 * 1024 * 1024; // 10MB 最大文件大小
        if (file.size > maxSize) {
            showUploadError('图片大小不能超过 10MB！');
            return;
        }
        
        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            showUploadError('不支持的图片格式！');
            return;
        }
        
        hideUploadError();
        showProgress();
        
        // 显示开始状态
        progressPercent.textContent = '读取文件中...';
        progressBar.style.width = '10%';
        
        const reader = new FileReader();
        reader.onload = function(e) {
            progressPercent.textContent = '压缩中...';
            progressBar.style.width = '30%';
            
            const img = new Image();
            img.onload = function() {
                progressPercent.textContent = '处理中...';
                progressBar.style.width = '60%';
                
                // 压缩到适当大小
                const compressed = compressImage(img, 1600, 1200, 0.75);
                
                progressPercent.textContent = '准备保存...';
                progressBar.style.width = '90%';
                
                document.getElementById('edit-image-base64').value = compressed;
                progressPercent.textContent = '100%';
                progressBar.style.width = '100%';
                
                setTimeout(() => {
                    hideProgress();
                    uploadArea.innerHTML = `
                        <div style="font-size: 24px; margin-bottom: 8px;">✅</div>
                        <div style="color: #4CAF50; font-size: 14px; margin-bottom: 4px;">图片上传成功！</div>
                        <div style="color: #666; font-size: 12px;">文件名: ${file.name}</div>
                        <div style="color: #999; font-size: 11px;">大小: ${(compressed.length / 1024).toFixed(1)} KB</div>
                        <button id="clear-image-btn" style="margin-top: 10px; padding: 6px 12px; background: #333; color: #f5f5f5; border: 1px solid #444; border-radius: 4px; cursor: pointer; font-size: 12px;">清除图片</button>
                    `;
                    document.getElementById('clear-image-btn').addEventListener('click', () => {
                        document.getElementById('edit-image-base64').value = '';
                        uploadArea.innerHTML = `
                            <input type="file" id="image-file-input" accept="image/jpeg,image/png,image/gif,image/webp" style="display: none;">
                            <div style="font-size: 24px; margin-bottom: 8px;">📷</div>
                            <div style="color: #b3b3b3; font-size: 14px; margin-bottom: 4px;">点击或拖拽上传图片</div>
                            <div style="color: #666; font-size: 12px;">支持 JPG、PNG、GIF、WebP 格式</div>
                        `;
                        const newFileInput = uploadArea.querySelector('#image-file-input');
                        newFileInput.addEventListener('change', (e) => {
                            const newFile = e.target.files[0];
                            if (newFile) {
                                handleFileUpload(newFile);
                            }
                        });
                    });
                }, 200);
            };
            img.onerror = function() {
                hideProgress();
                showUploadError('图片加载失败，请尝试其他图片');
            };
            img.src = e.target.result;
        };
        reader.onerror = function() {
            hideProgress();
            showUploadError('文件读取失败！');
        };
        reader.readAsDataURL(file);
    }
    
async function saveCustomImage(key, base64Data) {
    try {
        const savedImages = JSON.parse(localStorage.getItem('luoyang_custom_images') || '{}');
        
        // 检查localStorage容量
        const currentSize = JSON.stringify(savedImages).length;
        const newSize = currentSize + base64Data.length + key.length + 20; // 估算新增数据大小
        
        // localStorage通常限制为5MB = 5 * 1024 * 1024 = 5242880字节
        const MAX_SIZE = 5 * 1024 * 1024;
        
        console.log('📊 存储空间检查:', {
            当前使用: (currentSize / 1024).toFixed(1) + ' KB',
            新增数据: (base64Data.length / 1024).toFixed(1) + ' KB',
            预计总计: (newSize / 1024).toFixed(1) + ' KB',
            最大限制: (MAX_SIZE / 1024).toFixed(1) + ' KB'
        });
        
        // 如果空间不足，尝试清理孤立图片
        if (newSize > MAX_SIZE * 0.9) {
            console.log('🔍 存储空间接近上限，尝试清理孤立图片...');
            const cleanupResult = cleanupOrphanedImages();
            if (cleanupResult.count > 0) {
                // 重新计算大小
                const updatedImages = JSON.parse(localStorage.getItem('luoyang_custom_images') || '{}');
                const updatedSize = JSON.stringify(updatedImages).length;
                const retryNewSize = updatedSize + base64Data.length + key.length + 20;
                
                if (retryNewSize <= MAX_SIZE) {
                    console.log('✅ 清理后空间充足，继续保存');
                    updatedImages[key] = base64Data;
                    localStorage.setItem('luoyang_custom_images', JSON.stringify(updatedImages));
                    console.log(`✅ 图片已保存: ${key}, 大小: ${(base64Data.length / 1024).toFixed(1)} KB`);
                    return true;
                }
            }
        }
        
        if (newSize > MAX_SIZE) {
            const freeSpace = MAX_SIZE - currentSize;
            
            // 提供清理选项
            const cleanupChoice = confirm(
                `❌ localStorage存储空间不足！\n\n` +
                `当前已使用: ${(currentSize / 1024).toFixed(1)} KB\n` +
                `剩余空间: ${(freeSpace / 1024).toFixed(1)} KB\n` +
                `需要空间: ${(base64Data.length / 1024).toFixed(1)} KB\n\n` +
                `点击"确定"尝试自动清理孤立图片并压缩现有图片\n` +
                `点击"取消"放弃保存`
            );
            
            if (cleanupChoice) {
                // 先清理孤立图片
                cleanupOrphanedImages();
                
                // 再次检查空间
                const cleanedImages = JSON.parse(localStorage.getItem('luoyang_custom_images') || '{}');
                const cleanedSize = JSON.stringify(cleanedImages).length;
                
                if (cleanedSize + base64Data.length + key.length + 20 <= MAX_SIZE) {
                    cleanedImages[key] = base64Data;
                    localStorage.setItem('luoyang_custom_images', JSON.stringify(cleanedImages));
                    console.log(`✅ 清理后图片已保存: ${key}`);
                    return true;
                }
                
                // 如果还不够，进行重压缩
                if (confirm('孤立图片清理后空间仍不足，是否对所有图片进行更激进的压缩？\n（可能会降低图片质量）')) {
                    const result = await recompressAllImages(0.35, 800, 600);
                    const recompressedImages = JSON.parse(localStorage.getItem('luoyang_custom_images') || '{}');
                    const recompressedSize = JSON.stringify(recompressedImages).length;
                    
                    if (recompressedSize + base64Data.length + key.length + 20 <= MAX_SIZE) {
                        recompressedImages[key] = base64Data;
                        localStorage.setItem('luoyang_custom_images', JSON.stringify(recompressedImages));
                        alert(`✅ 图片已保存！\n已压缩 ${result.processed} 张图片，节省 ${(result.saved / 1024).toFixed(1)} KB`);
                        return true;
                    } else {
                        alert('❌ 即使压缩后空间仍不足，请删除部分图片后再试');
                        return false;
                    }
                }
            }
            
            console.error('❌ localStorage容量不足:', { currentSize, newSize, freeSpace });
            return false;
        }
        
        savedImages[key] = base64Data;
        localStorage.setItem('luoyang_custom_images', JSON.stringify(savedImages));
        console.log(`✅ 图片已保存: ${key}, 大小: ${(base64Data.length / 1024).toFixed(1)} KB`);
        return true;
    } catch (e) {
        console.error('❌ 保存图片失败:', e);
        if (e.name === 'QuotaExceededError') {
            alert('❌ 存储空间已满！\n\n请使用开发者面板清理不需要的图片数据');
        } else {
            alert('❌ 保存图片失败，请重试');
        }
        return false;
    }
}

function checkStorageSpace() {
    try {
        const savedImages = JSON.parse(localStorage.getItem('luoyang_custom_images') || '{}');
        const savedTexts = JSON.parse(localStorage.getItem('luoyang_custom_texts') || '{}');
        const customSlides = JSON.parse(localStorage.getItem('luoyang_custom_slides') || '[]');
        
        const imagesSize = JSON.stringify(savedImages).length;
        const textsSize = JSON.stringify(savedTexts).length;
        const slidesSize = JSON.stringify(customSlides).length;
        const totalSize = imagesSize + textsSize + slidesSize;
        const MAX_SIZE = 5 * 1024 * 1024;
        const freeSpace = MAX_SIZE - totalSize;
        const usagePercent = ((totalSize / MAX_SIZE) * 100).toFixed(1);
        
        const imageCount = Object.keys(savedImages).length;
        const textCount = Object.keys(savedTexts).length;
        
        console.log('📊 存储空间使用情况:', {
            图片数据: (imagesSize / 1024).toFixed(1) + ' KB (' + imageCount + ' 张)',
            文字数据: (textsSize / 1024).toFixed(1) + ' KB (' + textCount + ' 条)',
            轮播数据: (slidesSize / 1024).toFixed(1) + ' KB',
            总计: (totalSize / 1024).toFixed(1) + ' KB',
            使用率: usagePercent + '%',
            剩余空间: (freeSpace / 1024).toFixed(1) + ' KB'
        });
        
        return {
            imagesSize,
            textsSize,
            slidesSize,
            totalSize,
            freeSpace,
            usagePercent,
            imageCount,
            textCount
        };
    } catch (e) {
        console.error('❌ 检查存储空间失败:', e);
        return null;
    }
}
    
    function showProgress() {
        progressDiv.style.display = 'block';
        progressBar.style.width = '0%';
        progressPercent.textContent = '0%';
    }
    
    function hideProgress() {
        progressDiv.style.display = 'none';
    }
    
    function showUploadError(message) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }
    
    function hideUploadError() {
        errorDiv.style.display = 'none';
    }
    
    saveBtn.addEventListener('click', async () => {
        const newName = document.getElementById('edit-name').value.trim();
        const newImageBase64 = document.getElementById('edit-image-base64').value;
        const newImageUrl = document.getElementById('edit-image-url').value.trim();
        const newDescription = document.getElementById('edit-description').value.trim();
        const newX = parseFloat(document.getElementById('edit-x').value);
        const newY = parseFloat(document.getElementById('edit-y').value);
        
        if (!newName) {
            alert('请输入名称！');
            return;
        }
        
        if (isNaN(newX) || isNaN(newY) || newX < 0 || newX > 100 || newY < 0 || newY > 100) {
            alert('坐标值必须在 0-100 之间！');
            return;
        }
        
        const oldName = point.name;
        
        point.name = newName;
        
        // 如果有新上传的图片，使用 saveCustomImage 保存
        if (newImageBase64) {
            const storageKey = `map_${newName}`;
            const success = await saveCustomImage(storageKey, newImageBase64);
            if (success) {
                point.imageBase64 = '';
                point.image = `custom:${storageKey}`;
                console.log(`✅ 地图标记点图片已保存: ${storageKey}`);
            } else {
                alert('❌ 图片保存失败，请检查存储空间');
                return;
            }
        } else {
            point.imageBase64 = '';
            point.image = newImageUrl || point.image;
        }
        
        point.description = newDescription || point.description;
        
        currentMarkerPositions[newName] = { x: newX, y: newY };
        if (oldName !== newName) {
            delete currentMarkerPositions[oldName];
        }
        
        saveMarkerPositions();
        saveMarkerData();
        
        // 重新渲染地图标记点
        const markersContainer = document.getElementById('mapMarkers');
        if (markersContainer) {
            markersContainer.innerHTML = '';
            mapPoints.forEach(p => {
                const pos = currentMarkerPositions[p.name];
                if (pos) {
                    createMarker(p, pos, markersContainer);
                }
            });
        }
        
        // 关闭编辑弹窗
        const modal = document.querySelector('.modal-overlay');
        if (modal) {
            modal.style.opacity = '0';
            setTimeout(() => {
                if (modal.parentNode) {
                    modal.parentNode.removeChild(modal);
                }
            }, 300);
        }
        
        alert('✅ 修改已保存！');
    });
}

function getCustomImage(key, defaultUrl) {
    try {
        const savedImages = JSON.parse(localStorage.getItem('luoyang_custom_images') || '{}');
        return savedImages[key] || defaultUrl;
    } catch (e) {
        console.error('❌ 读取图片失败:', e);
        return defaultUrl;
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function openEditor(type) {
    const savedImages = JSON.parse(localStorage.getItem('luoyang_custom_images') || '{}');
    const savedTexts = JSON.parse(localStorage.getItem('luoyang_custom_texts') || '{}');
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        overflow-y: auto;
        padding: 20px;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
        background: #1a1a1a;
        border: 1px solid #333;
        border-radius: 16px;
        padding: 24px;
        max-width: 900px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
    `;
    
    let title = '';
    let editorContent = '';
    
    switch(type) {
        case 'hero':
            title = '🏠 首页编辑';
            editorContent = getHeroEditor(savedImages, savedTexts);
            break;
        case 'culture':
            title = '📜 文化解码编辑';
            editorContent = getCultureEditor(savedImages, savedTexts);
            break;
        case 'journal':
            title = '📝 探访实录编辑';
            editorContent = getJournalEditor(savedImages, savedTexts);
            break;
        case 'archive':
            title = '🏺 风物档案编辑';
            editorContent = getArchiveEditor(savedImages, savedTexts);
            break;
    }
    
    content.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
            <h2 style="color: #c9a227; font-size: 24px; margin: 0;">${title}</h2>
            <button id="closeEditorBtn" style="background: #333; color: #f5f5f5; border: none; padding: 8px 16px; border-radius: 8px; cursor: pointer;">关闭</button>
        </div>
        ${editorContent}
        <div style="margin-top: 24px; text-align: right;">
            <button id="saveAllEditsBtn" style="background: #c9a227; color: #0d0d0d; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600;">保存所有修改</button>
        </div>
    `;
    
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    document.getElementById('closeEditorBtn').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    document.getElementById('saveAllEditsBtn').addEventListener('click', () => {
        saveAllEdits(type);
        alert('✅ 所有修改已保存！');
        document.body.removeChild(modal);
        
        // 刷新对应区域
        if (type === 'culture') {
            const grid = document.getElementById('cultureGrid');
            if (grid) { grid.innerHTML = ''; initCultureSection(); }
        } else if (type === 'journal') {
            const grid = document.querySelector('.journal-grid');
            if (grid) { grid.innerHTML = ''; initJournalSection(); }
        } else if (type === 'archive') {
            const section = document.querySelector('.archive-section');
            if (section) { section.innerHTML = ''; initArchiveSection(); }
        } else if (type === 'hero') {
            refreshHeroSlider();
        }
    });
    
    bindEditorEvents();
}

function bindEditorEvents() {
    document.querySelectorAll('.editor-image-upload-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const inputId = this.dataset.inputId;
            document.getElementById(inputId).click();
        });
    });
    
    document.querySelectorAll('.editor-image-input').forEach(input => {
        input.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const previewId = this.dataset.previewId;
                const preview = document.getElementById(previewId);
                
                // 从 previewId 提取正确的存储键名
                // previewId 格式: heroPreview0, culturePreview1, journalPreview2, archivePreview3
                // 存储键名格式: hero0, culture1, journal2, archive3
                const storageKey = previewId.replace('Preview', '');
                
                const reader = new FileReader();
                reader.onload = function(event) {
                    const img = new Image();
                    img.onload = function() {
                        const compressed = compressImage(img, 800, 600);
                        preview.src = compressed;
                        preview.style.display = 'block';
                        
                        const savedImages = JSON.parse(localStorage.getItem('luoyang_custom_images') || '{}');
                        savedImages[storageKey] = compressed;
                        localStorage.setItem('luoyang_custom_images', JSON.stringify(savedImages));
                        
                        // 更新对应的URL输入框
                        const urlInput = document.querySelector(`input[data-preview-id="${previewId}"]`);
                        if (urlInput) {
                            urlInput.value = compressed;
                        }
                    };
                    img.src = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    });
    
    document.querySelectorAll('.journal-video-input').forEach(input => {
        input.addEventListener('blur', function() {
            validateVideoUrl(this);
        });
        
        input.addEventListener('input', function() {
            const index = this.dataset.key.replace('journalVideoUrl', '');
            const errorEl = document.getElementById(`videoUrlError${index}`);
            if (errorEl) {
                errorEl.style.display = 'none';
            }
        });
    });
    
    document.querySelectorAll('.journal-video-clear').forEach(btn => {
        btn.addEventListener('click', function() {
            const key = this.dataset.key;
            const input = document.querySelector(`.journal-video-input[data-key="${key}"]`);
            if (input) {
                input.value = '';
                const index = key.replace('journalVideoUrl', '');
                const errorEl = document.getElementById(`videoUrlError${index}`);
                if (errorEl) {
                    errorEl.style.display = 'none';
                }
                const savedTexts = JSON.parse(localStorage.getItem('luoyang_custom_texts') || '{}');
                delete savedTexts[key];
                localStorage.setItem('luoyang_custom_texts', JSON.stringify(savedTexts));
            }
        });
    });
    
    document.querySelectorAll('.tag-name-input').forEach(input => {
        input.addEventListener('input', function() {
            saveCustomTag(this.dataset.tagType, this.dataset.tagId, 'name', this.value);
        });
    });
    
    document.querySelectorAll('.tag-color-input').forEach(input => {
        input.addEventListener('input', function() {
            saveCustomTag(this.dataset.tagType, this.dataset.tagId, this.dataset.colorType, this.value);
        });
    });
    
    document.querySelectorAll('.tag-reset-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            resetCustomTag(this.dataset.tagType, this.dataset.tagId);
            const nameInput = document.querySelector(`.tag-name-input[data-tag-type="${this.dataset.tagType}"][data-tag-id="${this.dataset.tagId}"]`);
            const colorInput = document.querySelector(`.tag-color-input[data-tag-type="${this.dataset.tagType}"][data-tag-id="${this.dataset.tagId}"][data-color-type="color"]`);
            const bgColorInput = document.querySelector(`.tag-color-input[data-tag-type="${this.dataset.tagType}"][data-tag-id="${this.dataset.tagId}"][data-color-type="bgColor"]`);
            
            if (tagTypes[this.dataset.tagType]) {
                const tagConfig = tagTypes[this.dataset.tagType].find(t => t.id === this.dataset.tagId);
                if (tagConfig) {
                    if (nameInput) nameInput.value = tagConfig.name;
                    if (colorInput) colorInput.value = tagConfig.color;
                    if (bgColorInput) bgColorInput.value = tagConfig.bgColor;
                }
            }
        });
    });
    
    document.querySelectorAll('.hero-image-url').forEach(input => {
        input.addEventListener('blur', function() {
            const url = this.value.trim();
            if (url) {
                const previewId = this.dataset.previewId;
                const preview = document.getElementById(previewId);
                if (preview) {
                    preview.src = url;
                }
            }
        });
    });
    
    document.querySelectorAll('.hero-slide-move').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            const direction = this.dataset.direction;
            moveSlide(index, direction);
        });
    });
    
    document.querySelectorAll('.hero-slide-delete').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            deleteSlide(index);
        });
    });
    
    // 启用/禁用轮播图
    document.querySelectorAll('.hero-slide-toggle').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            let disabledSlides = JSON.parse(localStorage.getItem('luoyang_disabled_slides') || '[]');
            
            if (disabledSlides.includes(index)) {
                // 启用
                disabledSlides = disabledSlides.filter(i => i !== index);
                this.textContent = '禁用';
                this.style.background = '#f59e0b';
                alert('✅ 轮播图已启用');
            } else {
                // 禁用
                disabledSlides.push(index);
                this.textContent = '启用';
                this.style.background = '#22c55e';
                alert('✅ 轮播图已禁用');
            }
            
            localStorage.setItem('luoyang_disabled_slides', JSON.stringify(disabledSlides));
            console.log(`轮播图 ${index} ${disabledSlides.includes(index) ? '已禁用' : '已启用'}`);
        });
    });
    
    // 新轮播图上传按钮
    const newSlideUploadBtn = document.getElementById('newSlideUploadBtn');
    if (newSlideUploadBtn) {
        newSlideUploadBtn.addEventListener('click', function() {
            document.getElementById('newSlideImageUpload').click();
        });
    }
    
    // 新轮播图图片上传处理
    const newSlideImageUpload = document.getElementById('newSlideImageUpload');
    if (newSlideImageUpload) {
        newSlideImageUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                handleHeroImageUpload(file, 'newSlide');
            }
        });
    }
    
    // 已有轮播图图片上传处理
    document.querySelectorAll('.hero-file-input').forEach(input => {
        input.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const previewId = this.dataset.previewId;
                handleHeroImageUpload(file, previewId);
            }
        });
    });
    
    // URL输入变化时显示预览
    const newSlideImageUrlInput = document.getElementById('newSlideImageUrl');
    if (newSlideImageUrlInput) {
        newSlideImageUrlInput.addEventListener('input', function() {
            const url = this.value.trim();
            if (url) {
                document.getElementById('newSlidePreviewImg').src = url;
                document.getElementById('newSlidePreview').style.display = 'block';
            } else {
                document.getElementById('newSlidePreview').style.display = 'none';
            }
        });
    }
    
    // 清空按钮
    const newSlideClearBtn = document.getElementById('newSlideClearBtn');
    if (newSlideClearBtn) {
        newSlideClearBtn.addEventListener('click', function() {
            document.getElementById('newSlideImageUrl').value = '';
            document.getElementById('newSlideTitle').value = '';
            document.getElementById('newSlideSubtitle').value = '';
            document.getElementById('newSlidePreview').style.display = 'none';
            document.getElementById('newSlideImageUpload').value = '';
        });
    }
    
    const addNewSlideBtn = document.getElementById('addNewSlideBtn');
    if (addNewSlideBtn) {
        addNewSlideBtn.addEventListener('click', function() {
            addNewSlide();
        });
    }
    
    // 全局样式输入事件
    document.querySelectorAll('.hero-style-input').forEach(input => {
        input.addEventListener('input', function() {
            updateHeroStylePreview();
        });
    });
    
    // 单张图片样式输入事件
    document.querySelectorAll('.hero-slide-style').forEach(input => {
        input.addEventListener('input', function() {
            const slideIndex = parseInt(this.dataset.slide);
            updateHeroSlidePreview(slideIndex);
        });
    });
    
    // 标题输入实时预览
    document.querySelectorAll('.hero-title-input').forEach(input => {
        input.addEventListener('input', function() {
            const slideIndex = parseInt(this.dataset.slide);
            const preview = document.querySelector(`.hero-content-preview[data-slide="${slideIndex}"] h1`);
            if (preview) {
                preview.textContent = this.value || '预览标题';
            }
        });
    });
    
    // 副标题输入实时预览
    document.querySelectorAll('.hero-subtitle-input').forEach(input => {
        input.addEventListener('input', function() {
            const slideIndex = parseInt(this.dataset.slide);
            const preview = document.querySelector(`.hero-content-preview[data-slide="${slideIndex}"] p`);
            if (preview) {
                preview.textContent = this.value || '预览副标题';
            }
        });
    });
    
    // 新轮播图标题实时预览
    const newSlideTitle = document.getElementById('newSlideTitle');
    if (newSlideTitle) {
        newSlideTitle.addEventListener('input', function() {
            const preview = document.querySelector('#newSlideContentPreview h1');
            if (preview) {
                preview.textContent = this.value || '预览标题';
            }
        });
    }
    
    // 新轮播图副标题实时预览
    const newSlideSubtitle = document.getElementById('newSlideSubtitle');
    if (newSlideSubtitle) {
        newSlideSubtitle.addEventListener('input', function() {
            const preview = document.querySelector('#newSlideContentPreview p');
            if (preview) {
                preview.textContent = this.value || '预览副标题';
            }
        });
    }
    
    // 图片裁剪按钮
    document.querySelectorAll('.hero-crop-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const previewId = this.dataset.previewId;
            openImageCropper(previewId);
        });
    });
    
    // 图片压缩按钮
    document.querySelectorAll('.hero-compress-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const previewId = this.dataset.previewId;
            compressImageFromPreview(previewId);
        });
    });
}

function handleHeroImageUpload(file, targetId) {
    // 验证图片大小（限制在5MB以内）
    if (file.size > 5 * 1024 * 1024) {
        alert('❌ 图片大小不能超过5MB');
        return;
    }
    
    // 验证图片格式
    const validTypes = ['image/jpeg', 'image/png'];
    const validExtensions = ['.jpg', '.jpeg', '.png'];
    const fileName = file.name.toLowerCase();
    const hasValidExtension = validExtensions.some(ext => fileName.endsWith(ext));
    
    if (!validTypes.includes(file.type) && !hasValidExtension) {
        alert('❌ 请上传有效的图片格式（仅支持 JPG、PNG）');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            // 压缩图片到合适尺寸
            const compressed = compressImage(img, 1920, 1080);
            
            if (targetId === 'newSlide') {
                // 新轮播图
                document.getElementById('newSlideImageUrl').value = compressed;
                document.getElementById('newSlidePreviewImg').src = compressed;
                document.getElementById('newSlidePreview').style.display = 'block';
            } else {
                // 已有轮播图
                const preview = document.getElementById(targetId);
                if (preview) {
                    preview.src = compressed;
                }
                
                // 同步更新URL输入框
                const urlInput = document.querySelector(`input[data-preview-id="${targetId}"]`);
                if (urlInput) {
                    urlInput.value = compressed;
                }
                
                // 保存到localStorage
                const storageKey = targetId.replace('Preview', '');
                const savedImages = JSON.parse(localStorage.getItem('luoyang_custom_images') || '{}');
                savedImages[storageKey] = compressed;
                localStorage.setItem('luoyang_custom_images', JSON.stringify(savedImages));
                
                // 刷新轮播图显示
                refreshHeroSlider();
            }
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
}

// 更新全局样式预览
function updateHeroStylePreview() {
    const heroStyles = JSON.parse(localStorage.getItem('luoyang_hero_styles') || '{}');
    
    document.querySelectorAll('.hero-style-input').forEach(input => {
        const key = input.dataset.key;
        let value = input.value;
        if (input.type === 'range') {
            value = parseInt(value);
        }
        heroStyles[key] = value;
    });
    
    localStorage.setItem('luoyang_hero_styles', JSON.stringify(heroStyles));
    
    // 更新所有预览区域
    document.querySelectorAll('.hero-content-preview').forEach(preview => {
        const h1 = preview.querySelector('h1');
        const p = preview.querySelector('p');
        if (h1) {
            h1.style.fontFamily = heroStyles.fontFamily || 'Songti SC';
            h1.style.fontSize = (heroStyles.titleSize || 48) + 'px';
            h1.style.color = heroStyles.titleColor || '#ffffff';
        }
        if (p) {
            p.style.fontFamily = heroStyles.fontFamily || 'Songti SC';
            p.style.fontSize = (heroStyles.subtitleSize || 20) + 'px';
            p.style.color = heroStyles.subtitleColor || '#e5e5e5';
        }
        if (heroStyles.textPosition === 'left') {
            preview.style.textAlign = 'left';
        } else if (heroStyles.textPosition === 'right') {
            preview.style.textAlign = 'right';
        } else {
            preview.style.textAlign = 'center';
        }
    });
    
    console.log('✅ 全局样式已更新');
}

// 更新单张图片样式预览
function updateHeroSlidePreview(slideIndex) {
    const heroStyles = JSON.parse(localStorage.getItem('luoyang_hero_styles') || '{}');
    const slideKey = `slide${slideIndex}`;
    
    if (!heroStyles[slideKey]) {
        heroStyles[slideKey] = {};
    }
    
    document.querySelectorAll(`.hero-slide-style[data-slide="${slideIndex}"]`).forEach(input => {
        const key = input.dataset.key;
        let value = input.value;
        if (input.type === 'range') {
            value = parseInt(value);
        }
        heroStyles[slideKey][key] = value;
    });
    
    localStorage.setItem('luoyang_hero_styles', JSON.stringify(heroStyles));
    
    // 更新该轮播图的预览
    const preview = document.querySelector(`.hero-content-preview[data-slide="${slideIndex}"]`);
    if (preview) {
        const h1 = preview.querySelector('h1');
        const p = preview.querySelector('p');
        const styles = heroStyles[slideKey];
        
        if (h1) {
            h1.style.fontFamily = heroStyles.fontFamily || 'Songti SC';
            h1.style.fontSize = (styles.titleSize || heroStyles.titleSize || 48) + 'px';
            h1.style.color = styles.titleColor || heroStyles.titleColor || '#ffffff';
        }
        if (p) {
            p.style.fontFamily = heroStyles.fontFamily || 'Songti SC';
            p.style.fontSize = (styles.subtitleSize || heroStyles.subtitleSize || 20) + 'px';
            p.style.color = styles.subtitleColor || heroStyles.subtitleColor || '#e5e5e5';
        }
    }
    
    console.log(`✅ 轮播图 ${slideIndex} 样式已更新`);
}

// 打开图片裁剪器
function openImageCropper(previewId) {
    const img = document.getElementById(previewId);
    if (!img || !img.src) {
        alert('❌ 请先上传或选择图片');
        return;
    }
    
    const cropperModal = document.createElement('div');
    cropperModal.id = 'imageCropperModal';
    cropperModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        padding: 20px;
    `;
    
    cropperModal.innerHTML = `
        <div style="width: 100%; max-width: 900px; background: #1a1a1a; border-radius: 16px; padding: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h3 style="color: #c9a227; margin: 0; font-size: 18px;">✂️ 裁剪图片</h3>
                <button id="closeCropper" style="background: #333; color: #fff; border: none; padding: 8px 16px; border-radius: 8px; cursor: pointer;">关闭</button>
            </div>
            <div style="position: relative; aspect-ratio: 16/9; overflow: hidden; border-radius: 12px; background: #000;">
                <img id="cropperImage" src="${img.src}" style="width: 100%; height: 100%; object-fit: contain;">
                <div id="cropArea" style="position: absolute; border: 2px dashed #c9a227; background: rgba(201, 162, 39, 0.1); cursor: move;"></div>
            </div>
            <div style="display: flex; gap: 12px; margin-top: 20px;">
                <button id="cropApply" style="flex: 1; background: linear-gradient(135deg, #c9a227, #b89028); color: #0d0d0d; border: none; padding: 12px; border-radius: 8px; cursor: pointer; font-weight: 600;">应用裁剪</button>
                <button id="cropCancel" style="background: #333; color: #fff; border: none; padding: 12px 20px; border-radius: 8px; cursor: pointer;">取消</button>
            </div>
            <div style="display: flex; gap: 20px; margin-top: 16px; color: #b3b3b3; font-size: 13px;">
                <span>拖动虚线框选择裁剪区域</span>
                <span>建议裁剪比例: 16:9</span>
            </div>
        </div>
    `;
    
    document.body.appendChild(cropperModal);
    
    // 初始化裁剪区域
    const cropArea = document.getElementById('cropArea');
    const cropperImage = document.getElementById('cropperImage');
    
    let isDragging = false;
    let startX, startY, startLeft, startTop;
    
    // 设置初始裁剪区域大小（80%的图片区域）
    setTimeout(() => {
        const container = cropperImage.parentElement;
        const rect = container.getBoundingClientRect();
        const cropWidth = rect.width * 0.8;
        const cropHeight = rect.height * 0.8;
        cropArea.style.width = cropWidth + 'px';
        cropArea.style.height = cropHeight + 'px';
        cropArea.style.left = ((rect.width - cropWidth) / 2) + 'px';
        cropArea.style.top = ((rect.height - cropHeight) / 2) + 'px';
    }, 100);
    
    // 拖拽裁剪区域
    cropArea.addEventListener('mousedown', function(e) {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        startLeft = parseFloat(cropArea.style.left) || 0;
        startTop = parseFloat(cropArea.style.top) || 0;
    });
    
    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        const container = cropperImage.parentElement;
        const rect = container.getBoundingClientRect();
        const cropWidth = parseFloat(cropArea.style.width);
        const cropHeight = parseFloat(cropArea.style.height);
        
        let newLeft = startLeft + (e.clientX - startX);
        let newTop = startTop + (e.clientY - startY);
        
        // 边界检查
        newLeft = Math.max(0, Math.min(newLeft, rect.width - cropWidth));
        newTop = Math.max(0, Math.min(newTop, rect.height - cropHeight));
        
        cropArea.style.left = newLeft + 'px';
        cropArea.style.top = newTop + 'px';
    });
    
    document.addEventListener('mouseup', function() {
        isDragging = false;
    });
    
    // 应用裁剪
    document.getElementById('cropApply').addEventListener('click', function() {
        const container = cropperImage.parentElement;
        const rect = container.getBoundingClientRect();
        const imgRect = cropperImage.getBoundingClientRect();
        
        const cropLeft = parseFloat(cropArea.style.left);
        const cropTop = parseFloat(cropArea.style.top);
        const cropWidth = parseFloat(cropArea.style.width);
        const cropHeight = parseFloat(cropArea.style.height);
        
        // 计算相对于图片的裁剪区域
        const scaleX = cropperImage.naturalWidth / imgRect.width;
        const scaleY = cropperImage.naturalHeight / imgRect.height;
        
        const canvas = document.createElement('canvas');
        canvas.width = cropWidth * scaleX;
        canvas.height = cropHeight * scaleY;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(
            cropperImage,
            cropLeft * scaleX,
            cropTop * scaleY,
            cropWidth * scaleX,
            cropHeight * scaleY,
            0, 0, canvas.width, canvas.height
        );
        
        const croppedImage = canvas.toDataURL('image/jpeg', 0.9);
        
        // 更新预览
        img.src = croppedImage;
        
        // 如果是已有轮播图，保存到localStorage
        if (previewId.startsWith('heroPreview')) {
            const storageKey = previewId.replace('Preview', '');
            const savedImages = JSON.parse(localStorage.getItem('luoyang_custom_images') || '{}');
            savedImages[storageKey] = croppedImage;
            localStorage.setItem('luoyang_custom_images', JSON.stringify(savedImages));
            
            // 更新URL输入框
            const urlInput = document.querySelector(`input[data-preview-id="${previewId}"]`);
            if (urlInput) {
                urlInput.value = croppedImage;
            }
        } else if (previewId === 'newSlidePreviewImg') {
            document.getElementById('newSlideImageUrl').value = croppedImage;
        }
        
        document.body.removeChild(cropperModal);
        alert('✅ 图片裁剪完成');
    });
    
    // 关闭裁剪器
    document.getElementById('closeCropper').addEventListener('click', function() {
        document.body.removeChild(cropperModal);
    });
    
    document.getElementById('cropCancel').addEventListener('click', function() {
        document.body.removeChild(cropperModal);
    });
}

// 从预览压缩图片
function compressImageFromPreview(previewId) {
    const img = document.getElementById(previewId);
    if (!img || !img.src) {
        alert('❌ 请先上传或选择图片');
        return;
    }
    
    const imgElement = new Image();
    imgElement.onload = function() {
        // 压缩到1280x720
        const compressed = compressImage(imgElement, 1280, 720);
        img.src = compressed;
        
        // 保存到localStorage
        if (previewId.startsWith('heroPreview')) {
            const storageKey = previewId.replace('Preview', '');
            const savedImages = JSON.parse(localStorage.getItem('luoyang_custom_images') || '{}');
            savedImages[storageKey] = compressed;
            localStorage.setItem('luoyang_custom_images', JSON.stringify(savedImages));
            
            // 更新URL输入框
            const urlInput = document.querySelector(`input[data-preview-id="${previewId}"]`);
            if (urlInput) {
                urlInput.value = compressed;
            }
        } else if (previewId === 'newSlidePreviewImg') {
            document.getElementById('newSlideImageUrl').value = compressed;
        }
        
        alert('✅ 图片压缩完成');
    };
    imgElement.src = img.src;
}

// 处理拖拽上传
function handleDrop(event) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('image/')) {
        handleHeroImageUpload(files[0], 'newSlide');
    } else {
        alert('❌ 请上传有效的图片文件');
    }
}

function moveSlide(index, direction) {
    const customSlides = JSON.parse(localStorage.getItem('luoyang_custom_slides') || '[]');
    const allSlides = [...heroSlidesData, ...customSlides];
    
    if (direction === 'up' && index > 0) {
        const temp = allSlides[index];
        allSlides[index] = allSlides[index - 1];
        allSlides[index - 1] = temp;
        
        const newCustomSlides = allSlides.slice(heroSlidesData.length);
        localStorage.setItem('luoyang_custom_slides', JSON.stringify(newCustomSlides));
        
        if (index - 1 >= heroSlidesData.length) {
            const texts = JSON.parse(localStorage.getItem('luoyang_custom_texts') || '{}');
            const tempTitle = texts[`heroTitle${index}`];
            const tempSubtitle = texts[`heroSubtitle${index}`];
            texts[`heroTitle${index}`] = texts[`heroTitle${index - 1}`];
            texts[`heroSubtitle${index}`] = texts[`heroSubtitle${index - 1}`];
            texts[`heroTitle${index - 1}`] = tempTitle;
            texts[`heroSubtitle${index - 1}`] = tempSubtitle;
            localStorage.setItem('luoyang_custom_texts', JSON.stringify(texts));
        }
    } else if (direction === 'down' && index < allSlides.length - 1) {
        const temp = allSlides[index];
        allSlides[index] = allSlides[index + 1];
        allSlides[index + 1] = temp;
        
        const newCustomSlides = allSlides.slice(heroSlidesData.length);
        localStorage.setItem('luoyang_custom_slides', JSON.stringify(newCustomSlides));
        
        if (index >= heroSlidesData.length) {
            const texts = JSON.parse(localStorage.getItem('luoyang_custom_texts') || '{}');
            const tempTitle = texts[`heroTitle${index}`];
            const tempSubtitle = texts[`heroSubtitle${index}`];
            texts[`heroTitle${index}`] = texts[`heroTitle${index + 1}`];
            texts[`heroSubtitle${index}`] = texts[`heroSubtitle${index + 1}`];
            texts[`heroTitle${index + 1}`] = tempTitle;
            texts[`heroSubtitle${index + 1}`] = tempSubtitle;
            localStorage.setItem('luoyang_custom_texts', JSON.stringify(texts));
        }
    }
    
    alert('✅ 轮播图顺序已更新！');
}

function deleteSlide(index) {
    const customSlides = JSON.parse(localStorage.getItem('luoyang_custom_slides') || '[]');
    const customIndex = index - heroSlidesData.length;
    
    if (customIndex >= 0 && customIndex < customSlides.length) {
        customSlides.splice(customIndex, 1);
        localStorage.setItem('luoyang_custom_slides', JSON.stringify(customSlides));
        
        const texts = JSON.parse(localStorage.getItem('luoyang_custom_texts') || '{}');
        const images = JSON.parse(localStorage.getItem('luoyang_custom_images') || '{}');
        
        for (let i = index; ; i++) {
            if (!texts[`heroTitle${i + 1}`] && !texts[`heroSubtitle${i + 1}`]) break;
            texts[`heroTitle${i}`] = texts[`heroTitle${i + 1}`];
            texts[`heroSubtitle${i}`] = texts[`heroSubtitle${i + 1}`];
            images[`hero${i}`] = images[`hero${i + 1}`];
            delete texts[`heroTitle${i + 1}`];
            delete texts[`heroSubtitle${i + 1}`];
            delete images[`hero${i + 1}`];
        }
        
        localStorage.setItem('luoyang_custom_texts', JSON.stringify(texts));
        localStorage.setItem('luoyang_custom_images', JSON.stringify(images));
        
        // 清理无效数据
        cleanupHeroData();
        
        // 刷新轮播图显示
        refreshHeroSlider();
        
        alert('✅ 轮播图已删除！');
    }
}

function addNewSlide() {
    const imageUrlInput = document.getElementById('newSlideImageUrl');
    const titleInput = document.getElementById('newSlideTitle');
    const subtitleInput = document.getElementById('newSlideSubtitle');
    const previewDiv = document.getElementById('newSlidePreview');
    
    if (!imageUrlInput || !titleInput || !subtitleInput) {
        console.error('❌ 表单元素不存在');
        alert('❌ 表单初始化失败，请刷新页面重试');
        return;
    }
    
    const imageUrl = imageUrlInput.value.trim();
    const title = titleInput.value.trim();
    const subtitle = subtitleInput.value.trim();
    
    if (!imageUrl) {
        alert('❌ 请输入图片URL或上传图片');
        return;
    }
    
    // 验证图片URL格式
    if (!isValidImageUrl(imageUrl)) {
        alert('❌ 请输入有效的图片URL（支持 JPG、PNG、GIF、WebP、SVG 格式）');
        return;
    }
    
    try {
        const customSlides = JSON.parse(localStorage.getItem('luoyang_custom_slides') || '[]');
        const newIndex = heroSlidesData.length + customSlides.length;
        
        // 保存到 customSlides
        customSlides.push({
            image: imageUrl,
            title: title || '新轮播图',
            subtitle: subtitle || ''
        });
        localStorage.setItem('luoyang_custom_slides', JSON.stringify(customSlides));
        
        // 同时保存图片到 custom_images
        const savedImages = JSON.parse(localStorage.getItem('luoyang_custom_images') || '{}');
        savedImages[`hero${newIndex}`] = imageUrl;
        localStorage.setItem('luoyang_custom_images', JSON.stringify(savedImages));
        
        // 保存文字到 custom_texts
        const savedTexts = JSON.parse(localStorage.getItem('luoyang_custom_texts') || '{}');
        if (title) savedTexts[`heroTitle${newIndex}`] = title;
        if (subtitle) savedTexts[`heroSubtitle${newIndex}`] = subtitle;
        localStorage.setItem('luoyang_custom_texts', JSON.stringify(savedTexts));
        
        // 清空表单（添加存在性检查）
        imageUrlInput.value = '';
        titleInput.value = '';
        subtitleInput.value = '';
        if (previewDiv) {
            previewDiv.style.display = 'none';
        }
        
        // 重置文件上传控件
        const fileInput = document.getElementById('newSlideImageUpload');
        if (fileInput) {
            fileInput.value = '';
        }
        
        // 刷新轮播图显示
        refreshHeroSlider();
        
        alert('✅ 轮播图已添加！');
        console.log(`✅ 新轮播图已添加，索引: ${newIndex}`);
        
    } catch (e) {
        console.error('❌ 添加轮播图失败:', e);
        alert('❌ 添加轮播图失败，请查看控制台错误信息');
    }
}

function isValidImageUrl(url) {
    // 检查是否是有效的图片URL
    const imagePattern = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)$/i;
    // 或者是DataURL
    const dataUrlPattern = /^data:image\/(jpg|jpeg|png|gif|webp);base64,/i;
    
    return imagePattern.test(url) || dataUrlPattern.test(url);
}

function saveCustomTag(tagType, tagId, property, value) {
    const customTags = JSON.parse(localStorage.getItem('luoyang_custom_tags') || '{}');
    if (!customTags[tagType]) {
        customTags[tagType] = {};
    }
    if (!customTags[tagType][tagId]) {
        customTags[tagType][tagId] = {};
    }
    customTags[tagType][tagId][property] = value;
    localStorage.setItem('luoyang_custom_tags', JSON.stringify(customTags));
}

function resetCustomTag(tagType, tagId) {
    const customTags = JSON.parse(localStorage.getItem('luoyang_custom_tags') || '{}');
    if (customTags[tagType] && customTags[tagType][tagId]) {
        delete customTags[tagType][tagId];
        if (Object.keys(customTags[tagType]).length === 0) {
            delete customTags[tagType];
        }
        localStorage.setItem('luoyang_custom_tags', JSON.stringify(customTags));
    }
}

function validateVideoUrl(input) {
    const value = input.value.trim();
    const index = input.dataset.key.replace('journalVideoUrl', '');
    const errorEl = document.getElementById(`videoUrlError${index}`);
    
    if (!value) {
        if (errorEl) errorEl.style.display = 'none';
        return true;
    }
    
    const bilibiliRegex = /^https?:\/\/(www\.)?bilibili\.com\/video\/[A-Za-z0-9]+(\/)?(\?.*)?$/;
    
    if (!bilibiliRegex.test(value)) {
        if (errorEl) errorEl.style.display = 'block';
        return false;
    }
    
    if (errorEl) errorEl.style.display = 'none';
    return true;
}

function saveAllEdits(type) {
    const savedTexts = JSON.parse(localStorage.getItem('luoyang_custom_texts') || '{}');
    const savedImages = JSON.parse(localStorage.getItem('luoyang_custom_images') || '{}');
    
    document.querySelectorAll('.editor-text-input').forEach(input => {
        const key = input.dataset.key;
        
        // 判断是否是图片URL输入（通过 hero-image-url 类标识）
        if (input.classList.contains('hero-image-url')) {
            // 图片URL保存到 custom_images
            savedImages[key] = input.value;
        } else {
            // 文字内容保存到 custom_texts
            savedTexts[key] = input.value;
        }
    });
    
    localStorage.setItem('luoyang_custom_texts', JSON.stringify(savedTexts));
    localStorage.setItem('luoyang_custom_images', JSON.stringify(savedImages));
    console.log(`✅ 已保存 ${type} 的内容`);
}

function getHeroEditor(savedImages, savedTexts) {
    const customSlides = JSON.parse(localStorage.getItem('luoyang_custom_slides') || '[]');
    const disabledSlides = JSON.parse(localStorage.getItem('luoyang_disabled_slides') || '[]');
    const heroStyles = JSON.parse(localStorage.getItem('luoyang_hero_styles') || '{}');
    const allSlides = [...heroSlidesData, ...customSlides];
    
    return `
        <div style="display: grid; gap: 24px;">
            <!-- 全局样式设置 -->
            <div style="background: linear-gradient(145deg, #252525, #1a1a1a); padding: 24px; border-radius: 16px; border: 1px solid #333;">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
                    <div style="width: 32px; height: 32px; background: rgba(96, 165, 250, 0.2); border-radius: 10px; display: flex; align-items: center; justify-content: center;">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2">
                            <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                        </svg>
                    </div>
                    <h4 style="color: #60a5fa; margin: 0; font-size: 18px; font-weight: 600;">全局文字样式</h4>
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px;">
                    <div>
                        <label style="display: block; color: #b3b3b3; font-size: 12px; margin-bottom: 4px;">标题字体大小</label>
                        <input type="range" min="32" max="72" value="${heroStyles.titleSize || 48}" class="hero-style-input" data-key="titleSize" 
                            style="width: 100%;" oninput="updateHeroStylePreview()">
                        <span style="color: #c9a227; font-size: 12px;">${heroStyles.titleSize || 48}px</span>
                    </div>
                    <div>
                        <label style="display: block; color: #b3b3b3; font-size: 12px; margin-bottom: 4px;">副标题字体大小</label>
                        <input type="range" min="16" max="36" value="${heroStyles.subtitleSize || 20}" class="hero-style-input" data-key="subtitleSize" 
                            style="width: 100%;" oninput="updateHeroStylePreview()">
                        <span style="color: #c9a227; font-size: 12px;">${heroStyles.subtitleSize || 20}px</span>
                    </div>
                    <div>
                        <label style="display: block; color: #b3b3b3; font-size: 12px; margin-bottom: 4px;">标题颜色</label>
                        <input type="color" value="${heroStyles.titleColor || '#ffffff'}" class="hero-style-input" data-key="titleColor" 
                            style="width: 100%; height: 40px; border: 1px solid #333; border-radius: 8px; cursor: pointer;">
                    </div>
                    <div>
                        <label style="display: block; color: #b3b3b3; font-size: 12px; margin-bottom: 4px;">副标题颜色</label>
                        <input type="color" value="${heroStyles.subtitleColor || '#e5e5e5'}" class="hero-style-input" data-key="subtitleColor" 
                            style="width: 100%; height: 40px; border: 1px solid #333; border-radius: 8px; cursor: pointer;">
                    </div>
                    <div>
                        <label style="display: block; color: #b3b3b3; font-size: 12px; margin-bottom: 4px;">文字位置</label>
                        <select class="hero-style-input" data-key="textPosition" style="width: 100%; padding: 10px; background: #1a1a1a; border: 1px solid #333; border-radius: 8px; color: #f5f5f5;">
                            <option value="center" ${heroStyles.textPosition === 'center' || !heroStyles.textPosition ? 'selected' : ''}>居中</option>
                            <option value="left" ${heroStyles.textPosition === 'left' ? 'selected' : ''}>左对齐</option>
                            <option value="right" ${heroStyles.textPosition === 'right' ? 'selected' : ''}>右对齐</option>
                        </select>
                    </div>
                    <div>
                        <label style="display: block; color: #b3b3b3; font-size: 12px; margin-bottom: 4px;">字体</label>
                        <select class="hero-style-input" data-key="fontFamily" style="width: 100%; padding: 10px; background: #1a1a1a; border: 1px solid #333; border-radius: 8px; color: #f5f5f5;">
                            <option value="Songti SC" ${heroStyles.fontFamily === 'Songti SC' || !heroStyles.fontFamily ? 'selected' : ''}>宋体</option>
                            <option value="SimHei" ${heroStyles.fontFamily === 'SimHei' ? 'selected' : ''}>黑体</option>
                            <option value="Microsoft YaHei" ${heroStyles.fontFamily === 'Microsoft YaHei' ? 'selected' : ''}>微软雅黑</option>
                            <option value="Arial" ${heroStyles.fontFamily === 'Arial' ? 'selected' : ''}>Arial</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <!-- 轮播图列表 -->
            ${allSlides.map((slide, index) => {
                const isCustom = index >= heroSlidesData.length;
                const isDisabled = disabledSlides.includes(index);
                const imageKey = `hero${index}`;
                const slideStyle = heroStyles[`slide${index}`] || {};
                return `
                    <div style="background: #242424; padding: 24px; border-radius: 16px; position: relative; border: 1px solid ${isDisabled ? '#4a3728' : '#333'}; ${isDisabled ? 'opacity: 0.6;' : ''}">
                        ${isDisabled ? '<div style="position: absolute; top: 16px; right: 16px; background: #ef4444; color: #fff; padding: 5px 12px; border-radius: 12px; font-size: 12px; font-weight: 600;">已禁用</div>' : ''}
                        
                        <!-- 工具栏 -->
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                            <div style="display: flex; align-items: center; gap: 14px;">
                                <span style="width: 32px; height: 32px; background: rgba(201, 162, 39, 0.2); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #c9a227; font-size: 16px; font-weight: 600;">${index + 1}</span>
                                <h4 style="color: #c9a227; margin: 0; font-size: 18px; font-weight: 600;">${isCustom ? '自定义轮播图' : `轮播图 ${index + 1}`}</h4>
                            </div>
                            <div style="display: flex; gap: 8px;">
                                ${index > 0 ? `<button class="hero-slide-move" data-index="${index}" data-direction="up" title="上移" style="background: #333; color: #f5f5f5; border: none; padding: 10px 14px; border-radius: 8px; cursor: pointer; font-size: 14px; transition: all 0.2s; hover:background:#444;">↑</button>` : '<div style="width: 42px;"></div>'}
                                ${index < allSlides.length - 1 ? `<button class="hero-slide-move" data-index="${index}" data-direction="down" title="下移" style="background: #333; color: #f5f5f5; border: none; padding: 10px 14px; border-radius: 8px; cursor: pointer; font-size: 14px; transition: all 0.2s;">↓</button>` : '<div style="width: 42px;"></div>'}
                                <button class="hero-slide-toggle" data-index="${index}" title="${isDisabled ? '启用' : '禁用'}" style="background: ${isDisabled ? '#22c55e' : '#f59e0b'}; color: #0d0d0d; border: none; padding: 10px 16px; border-radius: 8px; cursor: pointer; font-size: 12px; font-weight: 600; transition: all 0.2s;">${isDisabled ? '启用' : '禁用'}</button>
                                ${isCustom ? `<button class="hero-slide-delete" data-index="${index}" title="删除" style="background: #ef4444; color: #fff; border: none; padding: 10px 16px; border-radius: 8px; cursor: pointer; font-size: 12px; font-weight: 600; transition: all 0.2s;">删除</button>` : '<div style="width: 64px;"></div>'}
                            </div>
                        </div>
                        
                        <!-- 图片区域 -->
                        <div style="margin-bottom: 20px;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                                <label style="display: block; color: #b3b3b3; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">图片预览</label>
                                <button class="hero-crop-btn" data-preview-id="heroPreview${index}" style="background: #3b82f6; color: #fff; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 11px; font-weight: 500;">✂️ 裁剪图片</button>
                            </div>
                            <div style="position: relative; border-radius: 12px; overflow: hidden; aspect-ratio: 16/9;">
                                <img id="heroPreview${index}" src="${savedImages[imageKey] || slide.image}" 
                                    style="width: 100%; height: 100%; object-fit: cover;">
                                ${isDisabled ? '<div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center;"><span style="color: #fff; font-size: 20px; font-weight: 600;">已禁用</span></div>' : ''}
                                <!-- 实时预览文字 -->
                                <div class="hero-content-preview" data-slide="${index}" style="position: absolute; bottom: 0; left: 0; right: 0; padding: 40px; background: linear-gradient(transparent, rgba(0,0,0,0.7)); ${heroStyles.textPosition === 'left' ? 'text-align:left;' : heroStyles.textPosition === 'right' ? 'text-align:right;' : 'text-align:center;'}">
                                    <h1 style="color: ${slideStyle.titleColor || heroStyles.titleColor || '#ffffff'}; font-family: ${heroStyles.fontFamily || 'Songti SC'}; font-size: ${slideStyle.titleSize || heroStyles.titleSize || 48}px; margin: 0 0 8px 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">${savedTexts[`heroTitle${index}`] || slide.title}</h1>
                                    <p style="color: ${slideStyle.subtitleColor || heroStyles.subtitleColor || '#e5e5e5'}; font-family: ${heroStyles.fontFamily || 'Songti SC'}; font-size: ${slideStyle.subtitleSize || heroStyles.subtitleSize || 20}px; margin: 0; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">${savedTexts[`heroSubtitle${index}`] || slide.subtitle}</p>
                                </div>
                            </div>
                            <div style="display: flex; gap: 10px; margin-top: 12px;">
                                <input type="file" id="heroInput${index}" class="editor-image-input hero-file-input" data-preview-id="heroPreview${index}" accept=".jpg,.jpeg,.png" style="display: none;">
                                <button class="editor-image-upload-btn" data-input-id="heroInput${index}" 
                                    style="flex: 1; background: linear-gradient(135deg, #3a3a3a, #2a2a2a); color: #f5f5f5; border: 1px solid #444; padding: 12px 16px; border-radius: 8px; cursor: pointer; font-size: 13px; transition: all 0.2s;">📤 上传图片</button>
                                <button class="hero-compress-btn" data-preview-id="heroPreview${index}" style="background: #8b5cf6; color: #fff; border: none; padding: 12px 16px; border-radius: 8px; cursor: pointer; font-size: 13px; transition: all 0.2s;">🗜️ 压缩</button>
                            </div>
                        </div>
                        
                        <!-- 文字编辑区域 -->
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                            <div>
                                <label style="display: block; color: #b3b3b3; font-size: 12px; margin-bottom: 6px;">标题文本</label>
                                <input type="text" class="editor-text-input hero-title-input" data-slide="${index}" data-key="heroTitle${index}"
                                    value="${savedTexts[`heroTitle${index}`] || slide.title}"
                                    style="width: 100%; padding: 12px; background: #1a1a1a; border: 1px solid #333; border-radius: 8px; color: #f5f5f5; font-size: 14px;">
                            </div>
                            <div>
                                <label style="display: block; color: #b3b3b3; font-size: 12px; margin-bottom: 6px;">副标题文本</label>
                                <input type="text" class="editor-text-input hero-subtitle-input" data-slide="${index}" data-key="heroSubtitle${index}"
                                    value="${savedTexts[`heroSubtitle${index}`] || slide.subtitle}"
                                    placeholder="简短描述..."
                                    style="width: 100%; padding: 12px; background: #1a1a1a; border: 1px solid #333; border-radius: 8px; color: #f5f5f5; font-size: 14px;">
                            </div>
                        </div>
                        
                        <!-- 单张图片文字样式 -->
                        <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #333;">
                            <h5 style="color: #8b5cf6; margin: 0 0 12px 0; font-size: 13px; font-weight: 600;">🎨 本张图片文字样式（可选，不设置则使用全局样式）</h5>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px;">
                                <div>
                                    <label style="display: block; color: #b3b3b3; font-size: 11px; margin-bottom: 4px;">标题大小</label>
                                    <input type="range" min="24" max="64" value="${slideStyle.titleSize || heroStyles.titleSize || 48}" class="hero-slide-style" data-slide="${index}" data-key="titleSize" 
                                        style="width: 100%;" oninput="updateHeroSlidePreview(${index})">
                                </div>
                                <div>
                                    <label style="display: block; color: #b3b3b3; font-size: 11px; margin-bottom: 4px;">副标题大小</label>
                                    <input type="range" min="14" max="32" value="${slideStyle.subtitleSize || heroStyles.subtitleSize || 20}" class="hero-slide-style" data-slide="${index}" data-key="subtitleSize" 
                                        style="width: 100%;" oninput="updateHeroSlidePreview(${index})">
                                </div>
                                <div>
                                    <label style="display: block; color: #b3b3b3; font-size: 11px; margin-bottom: 4px;">标题颜色</label>
                                    <input type="color" value="${slideStyle.titleColor || heroStyles.titleColor || '#ffffff'}" class="hero-slide-style" data-slide="${index}" data-key="titleColor" 
                                        style="width: 100%; height: 36px; border: 1px solid #333; border-radius: 6px; cursor: pointer;">
                                </div>
                                <div>
                                    <label style="display: block; color: #b3b3b3; font-size: 11px; margin-bottom: 4px;">副标题颜色</label>
                                    <input type="color" value="${slideStyle.subtitleColor || heroStyles.subtitleColor || '#e5e5e5'}" class="hero-slide-style" data-slide="${index}" data-key="subtitleColor" 
                                        style="width: 100%; height: 36px; border: 1px solid #333; border-radius: 6px; cursor: pointer;">
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }).join('')}
            
            <!-- 添加新轮播图 -->
            <div style="background: linear-gradient(145deg, #2a2a2a, #1f1f1f); padding: 28px; border-radius: 16px; border: 2px dashed #444;">
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 24px;">
                    <div style="width: 36px; height: 36px; background: rgba(201, 162, 39, 0.15); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c9a227" stroke-width="2">
                            <path d="M12 5v14M5 12h14"/>
                        </svg>
                    </div>
                    <h4 style="color: #c9a227; margin: 0; font-size: 20px; font-weight: 600;">添加新轮播图</h4>
                </div>
                <div style="display: grid; gap: 16px;">
                    <div>
                        <label style="display: block; color: #b3b3b3; font-size: 12px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">📤 上传图片</label>
                        <div style="background: #1a1a1a; border: 2px dashed #444; border-radius: 12px; padding: 32px; text-align: center; transition: all 0.2s;" id="newSlideDropZone" ondragover="event.preventDefault()" ondrop="handleDrop(event)">
                            <input type="file" id="newSlideImageUpload" class="hero-file-input" accept=".jpg,.jpeg,.png" style="display: none;">
                            <button id="newSlideUploadBtn" style="background: linear-gradient(135deg, #c9a227, #b89028); color: #0d0d0d; border: none; padding: 14px 32px; border-radius: 10px; cursor: pointer; font-weight: 600; font-size: 15px; transition: all 0.2s; margin-bottom: 10px;">选择本地图片</button>
                            <p style="color: #666; font-size: 13px; margin: 0;">支持 JPG、PNG 格式，单个文件不超过 5MB</p>
                            <p style="color: #555; font-size: 11px; margin: 8px 0 0 0;">或拖拽图片到此处上传</p>
                        </div>
                    </div>
                    <div>
                        <label style="display: block; color: #b3b3b3; font-size: 12px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">🔗 或输入图片URL</label>
                        <input type="text" id="newSlideImageUrl" placeholder="https://example.com/image.jpg" style="width: 100%; padding: 14px; background: #1a1a1a; border: 1px solid #333; border-radius: 10px; color: #f5f5f5; font-size: 14px;">
                    </div>
                    <div id="newSlidePreview" style="display: none;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                            <label style="display: block; color: #b3b3b3; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">👁️ 图片预览</label>
                            <button class="hero-crop-btn" data-preview-id="newSlidePreviewImg" style="background: #3b82f6; color: #fff; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 11px; font-weight: 500;">✂️ 裁剪图片</button>
                        </div>
                        <div style="border-radius: 12px; overflow: hidden; box-shadow: 0 6px 24px rgba(0,0,0,0.4); aspect-ratio: 16/9;">
                            <img id="newSlidePreviewImg" src="" style="width: 100%; height: 100%; object-fit: cover;">
                            <div class="hero-content-preview" id="newSlideContentPreview" style="position: absolute; bottom: 0; left: 0; right: 0; padding: 40px; background: linear-gradient(transparent, rgba(0,0,0,0.7)); text-align: center;">
                                <h1 style="color: #fff; font-size: 48px; margin: 0 0 8px 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.5); font-family: 'Songti SC';">预览标题</h1>
                                <p style="color: #e5e5e5; font-size: 20px; margin: 0; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">预览副标题</p>
                            </div>
                        </div>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
                        <div>
                            <label style="display: block; color: #b3b3b3; font-size: 12px; margin-bottom: 6px;">标题</label>
                            <input type="text" id="newSlideTitle" placeholder="输入轮播图标题" style="width: 100%; padding: 14px; background: #1a1a1a; border: 1px solid #333; border-radius: 10px; color: #f5f5f5; font-size: 14px;">
                        </div>
                        <div>
                            <label style="display: block; color: #b3b3b3; font-size: 12px; margin-bottom: 6px;">副标题</label>
                            <input type="text" id="newSlideSubtitle" placeholder="简短描述..." style="width: 100%; padding: 14px; background: #1a1a1a; border: 1px solid #333; border-radius: 10px; color: #f5f5f5; font-size: 14px;">
                        </div>
                    </div>
                    <div style="display: flex; gap: 14px;">
                        <button id="newSlideClearBtn" style="flex: 1; background: #333; color: #f5f5f5; border: 1px solid #444; padding: 14px; border-radius: 10px; cursor: pointer; font-size: 14px; transition: all 0.2s;">🔄 重置</button>
                        <button id="addNewSlideBtn" style="flex: 2; background: linear-gradient(135deg, #c9a227, #b89028); color: #0d0d0d; border: none; padding: 14px; border-radius: 10px; cursor: pointer; font-weight: 600; font-size: 15px; transition: all 0.2s;">确认添加</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getCultureEditor(savedImages, savedTexts) {
    return `
        <div style="display: grid; gap: 24px;">
            ${cultureData.map((item, index) => `
                <div style="background: #242424; padding: 16px; border-radius: 12px;">
                    <h4 style="color: #c9a227; margin: 0 0 12px 0;">${savedTexts[`cultureTitle${index}`] || item.name}</h4>
                    <div style="margin-bottom: 12px;">
                        <label style="display: block; color: #b3b3b3; font-size: 12px; margin-bottom: 4px;">图片</label>
                        <img id="culturePreview${index}" src="${savedImages[`culture${index}`] || item.image}" 
                            style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px; display: block;">
                        <input type="file" id="cultureInput${index}" class="editor-image-input" data-preview-id="culturePreview${index}" accept="image/*" style="display: none;">
                        <button class="editor-image-upload-btn" data-input-id="cultureInput${index}" 
                            style="margin-top: 8px; background: #333; color: #f5f5f5; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer;">📤 上传图片</button>
                    </div>
                    <div style="margin-bottom: 8px;">
                        <label style="display: block; color: #b3b3b3; font-size: 12px; margin-bottom: 4px;">标题</label>
                        <input type="text" class="editor-text-input" data-key="cultureTitle${index}" 
                            value="${savedTexts[`cultureTitle${index}`] || item.name}"
                            style="width: 100%; padding: 10px; background: #1a1a1a; border: 1px solid #333; border-radius: 8px; color: #f5f5f5;">
                    </div>
                    <div style="margin-bottom: 8px;">
                        <label style="display: block; color: #b3b3b3; font-size: 12px; margin-bottom: 4px;">描述（摘要）</label>
                        <textarea class="editor-text-input" data-key="cultureDesc${index}" rows="3"
                            style="width: 100%; padding: 10px; background: #1a1a1a; border: 1px solid #333; border-radius: 8px; color: #f5f5f5; resize: vertical;">${savedTexts[`cultureDesc${index}`] || item.summary}</textarea>
                    </div>
                    <div>
                        <label style="display: block; color: #b3b3b3; font-size: 12px; margin-bottom: 4px;">📖 展开阅读内容</label>
                        <textarea class="editor-text-input" data-key="cultureFullText${index}" rows="6"
                            style="width: 100%; padding: 10px; background: #1a1a1a; border: 1px solid #333; border-radius: 8px; color: #f5f5f5; resize: vertical;">${savedTexts[`cultureFullText${index}`] || item.fullText}</textarea>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function getJournalEditor(savedImages, savedTexts) {
    let html = '';
    const types = ['official', 'user'];
    
    types.forEach(type => {
        journalData[type].forEach((item, index) => {
            const globalIndex = type === 'official' ? index : journalData.official.length + index;
            const customVideoUrl = savedTexts[`journalVideoUrl${globalIndex}`] || item.videoUrl || '';
            
            html += `
                <div style="background: #242424; padding: 16px; border-radius: 12px;">
                    <h4 style="color: #c9a227; margin: 0 0 12px 0;">${savedTexts[`journalTitle${globalIndex}`] || item.title}</h4>
                    <div style="margin-bottom: 12px;">
                        <label style="display: block; color: #b3b3b3; font-size: 12px; margin-bottom: 4px;">图片</label>
                        <img id="journalPreview${globalIndex}" src="${savedImages[`journal${globalIndex}`] || item.image}" 
                            style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px; display: block;">
                        <input type="file" id="journalInput${globalIndex}" class="editor-image-input" data-preview-id="journalPreview${globalIndex}" accept="image/*" style="display: none;">
                        <button class="editor-image-upload-btn" data-input-id="journalInput${globalIndex}" 
                            style="margin-top: 8px; background: #333; color: #f5f5f5; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer;">📤 上传图片</button>
                    </div>
                    <div style="margin-bottom: 8px;">
                        <label style="display: block; color: #b3b3b3; font-size: 12px; margin-bottom: 4px;">标题</label>
                        <input type="text" class="editor-text-input" data-key="journalTitle${globalIndex}" 
                            value="${savedTexts[`journalTitle${globalIndex}`] || item.title}"
                            style="width: 100%; padding: 10px; background: #1a1a1a; border: 1px solid #333; border-radius: 8px; color: #f5f5f5;">
                    </div>
                    <div style="margin-bottom: 8px;">
                        <label style="display: block; color: #b3b3b3; font-size: 12px; margin-bottom: 4px;">简介</label>
                        <textarea class="editor-text-input" data-key="journalDesc${globalIndex}" rows="3"
                            style="width: 100%; padding: 10px; background: #1a1a1a; border: 1px solid #333; border-radius: 8px; color: #f5f5f5; resize: vertical;">${savedTexts[`journalDesc${globalIndex}`] || item.description}</textarea>
                    </div>
                    <div style="margin-bottom: 8px;">
                        <label style="display: block; color: #b3b3b3; font-size: 12px; margin-bottom: 4px;">视频链接 (B站)</label>
                        <div style="display: flex; gap: 8px;">
                            <input type="text" class="editor-text-input journal-video-input" data-key="journalVideoUrl${globalIndex}" 
                                value="${customVideoUrl}"
                                placeholder="https://www.bilibili.com/video/BVxxx..."
                                style="flex: 1; padding: 10px; background: #1a1a1a; border: 1px solid #333; border-radius: 8px; color: #f5f5f5;">
                            <button class="journal-video-clear" data-key="journalVideoUrl${globalIndex}" 
                                style="background: #444; color: #f5f5f5; border: none; padding: 10px 16px; border-radius: 8px; cursor: pointer; font-size: 12px;">清空</button>
                        </div>
                        <p id="videoUrlError${globalIndex}" style="color: #ef4444; font-size: 11px; margin: 4px 0 0 0; display: none;">⚠️ 请输入有效的B站视频链接</p>
                    </div>
                    <div>
                        <label style="display: block; color: #b3b3b3; font-size: 12px; margin-bottom: 4px;">类型</label>
                        <select class="editor-text-input" data-key="journalType${globalIndex}" 
                            style="width: 100%; padding: 10px; background: #1a1a1a; border: 1px solid #333; border-radius: 8px; color: #f5f5f5;">
                            <option value="article" ${(savedTexts[`journalType${globalIndex}`] || item.type) === 'article' ? 'selected' : ''}>文章</option>
                            <option value="video" ${(savedTexts[`journalType${globalIndex}`] || item.type) === 'video' ? 'selected' : ''}>视频</option>
                        </select>
                    </div>
                </div>
            `;
        });
    });
    
    return `<div style="display: grid; gap: 24px;">${html}</div>`;
}

function getArchiveEditor(savedImages, savedTexts) {
    let content = '';
    
    if (archiveData.food) {
        content += `
            <div style="margin-bottom: 24px;">
                <h4 style="color: #c9a227; margin: 0 0 16px 0; font-size: 18px; border-bottom: 1px solid #333; padding-bottom: 8px;">🍜 舌尖上的洛阳</h4>
                <div style="display: grid; gap: 16px;">
                    ${archiveData.food.map((item, index) => `
                        <div style="background: #242424; padding: 16px; border-radius: 12px;">
                            <img id="archivePreview${index}" src="${savedImages[`archive${index}`] || item.image}" 
                                style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px; display: block;">
                            <input type="file" id="archiveInput${index}" class="editor-image-input" data-preview-id="archivePreview${index}" accept="image/*" style="display: none;">
                            <button class="editor-image-upload-btn" data-input-id="archiveInput${index}" 
                                style="margin: 8px 0; background: #333; color: #f5f5f5; border: none; padding: 6px 10px; border-radius: 6px; cursor: pointer; font-size: 12px;">📤 上传图片</button>
                            <input type="text" class="editor-text-input" data-key="archiveName${index}" 
                                value="${savedTexts[`archiveName${index}`] || item.name}"
                                placeholder="名称"
                                style="width: 100%; padding: 8px; background: #1a1a1a; border: 1px solid #333; border-radius: 6px; color: #f5f5f5; font-size: 14px;">
                            <textarea class="editor-text-input" data-key="archiveDesc${index}" rows="2"
                                placeholder="描述"
                                style="width: 100%; padding: 8px; margin-top: 4px; background: #1a1a1a; border: 1px solid #333; border-radius: 6px; color: #f5f5f5; font-size: 14px; resize: vertical;">${savedTexts[`archiveDesc${index}`] || item.description}</textarea>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    let craftIndex = archiveData.food ? archiveData.food.length : 0;
    if (archiveData.craft) {
        content += `
            <div style="margin-bottom: 24px;">
                <h4 style="color: #c9a227; margin: 0 0 16px 0; font-size: 18px; border-bottom: 1px solid #333; padding-bottom: 8px;">🎨 指尖上的非遗</h4>
                <div style="display: grid; gap: 16px;">
                    ${archiveData.craft.map((item, index) => {
                        const globalIndex = craftIndex + index;
                        return `
                            <div style="background: #242424; padding: 16px; border-radius: 12px;">
                                <img id="archivePreview${globalIndex}" src="${savedImages[`archive${globalIndex}`] || item.image}" 
                                    style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px; display: block;">
                                <input type="file" id="archiveInput${globalIndex}" class="editor-image-input" data-preview-id="archivePreview${globalIndex}" accept="image/*" style="display: none;">
                                <button class="editor-image-upload-btn" data-input-id="archiveInput${globalIndex}" 
                                    style="margin: 8px 0; background: #333; color: #f5f5f5; border: none; padding: 6px 10px; border-radius: 6px; cursor: pointer; font-size: 12px;">📤 上传图片</button>
                                <input type="text" class="editor-text-input" data-key="archiveName${globalIndex}" 
                                    value="${savedTexts[`archiveName${globalIndex}`] || item.name}"
                                    placeholder="名称"
                                    style="width: 100%; padding: 8px; background: #1a1a1a; border: 1px solid #333; border-radius: 6px; color: #f5f5f5; font-size: 14px;">
                                <textarea class="editor-text-input" data-key="archiveDesc${globalIndex}" rows="2"
                                    placeholder="描述"
                                    style="width: 100%; padding: 8px; margin-top: 4px; background: #1a1a1a; border: 1px solid #333; border-radius: 6px; color: #f5f5f5; font-size: 14px; resize: vertical;">${savedTexts[`archiveDesc${globalIndex}`] || item.description}</textarea>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }
    
    let fengHuaIndex = craftIndex + (archiveData.craft ? archiveData.craft.length : 0);
    if (archiveData.fengHua) {
        content += `
            <div style="margin-bottom: 24px;">
                <h4 style="color: #c9a227; margin: 0 0 16px 0; font-size: 18px; border-bottom: 1px solid #333; padding-bottom: 8px;">✨ 洛阳风华</h4>
                <div style="display: grid; gap: 16px;">
                    ${archiveData.fengHua.map((item, index) => {
                        const globalIndex = fengHuaIndex + index;
                        const currentStatus = item.tags ? item.tags.find(t => t.type === 'status')?.tagId : 'open';
                        const currentType = item.tags ? item.tags.find(t => t.type === 'type')?.tagId : 'historical';
                        return `
                            <div style="background: #242424; padding: 16px; border-radius: 12px;">
                                <img id="archivePreview${globalIndex}" src="${savedImages[`archive${globalIndex}`] || item.image}" 
                                    style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px; display: block;">
                                <input type="file" id="archiveInput${globalIndex}" class="editor-image-input" data-preview-id="archivePreview${globalIndex}" accept="image/*" style="display: none;">
                                <button class="editor-image-upload-btn" data-input-id="archiveInput${globalIndex}" 
                                    style="margin: 8px 0; background: #333; color: #f5f5f5; border: none; padding: 6px 10px; border-radius: 6px; cursor: pointer; font-size: 12px;">📤 上传图片</button>
                                <input type="text" class="editor-text-input" data-key="archiveName${globalIndex}" 
                                    value="${savedTexts[`archiveName${globalIndex}`] || item.name}"
                                    placeholder="名称"
                                    style="width: 100%; padding: 8px; background: #1a1a1a; border: 1px solid #333; border-radius: 6px; color: #f5f5f5; font-size: 14px;">
                                <textarea class="editor-text-input" data-key="archiveDesc${globalIndex}" rows="2"
                                    placeholder="描述"
                                    style="width: 100%; padding: 8px; margin-top: 4px; background: #1a1a1a; border: 1px solid #333; border-radius: 6px; color: #f5f5f5; font-size: 14px; resize: vertical;">${savedTexts[`archiveDesc${globalIndex}`] || item.description}</textarea>
                                <div style="display: flex; gap: 12px; margin-top: 8px;">
                                    <div style="flex: 1;">
                                        <label style="display: block; color: #b3b3b3; font-size: 11px; margin-bottom: 3px;">状态标签</label>
                                        <select class="editor-text-input" data-key="archiveStatus${globalIndex}" 
                                            style="width: 100%; padding: 6px; background: #1a1a1a; border: 1px solid #333; border-radius: 6px; color: #f5f5f5; font-size: 13px;">
                                            <option value="open" ${currentStatus === 'open' ? 'selected' : ''}>开放中</option>
                                            <option value="closed" ${currentStatus === 'closed' ? 'selected' : ''}>关闭</option>
                                            <option value="maintenance" ${currentStatus === 'maintenance' ? 'selected' : ''}>维护中</option>
                                            <option value="limited" ${currentStatus === 'limited' ? 'selected' : ''}>限流</option>
                                        </select>
                                    </div>
                                    <div style="flex: 1;">
                                        <label style="display: block; color: #b3b3b3; font-size: 11px; margin-bottom: 3px;">类型标签</label>
                                        <select class="editor-text-input" data-key="archiveType${globalIndex}" 
                                            style="width: 100%; padding: 6px; background: #1a1a1a; border: 1px solid #333; border-radius: 6px; color: #f5f5f5; font-size: 13px;">
                                            <option value="historical" ${currentType === 'historical' ? 'selected' : ''}>历史古迹</option>
                                            <option value="natural" ${currentType === 'natural' ? 'selected' : ''}>自然景观</option>
                                            <option value="cultural" ${currentType === 'cultural' ? 'selected' : ''}>文化场馆</option>
                                            <option value="food" ${currentType === 'food' ? 'selected' : ''}>美食</option>
                                            <option value="craft" ${currentType === 'craft' ? 'selected' : ''}>手工艺</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }
    
    content += `
        <div style="margin-bottom: 24px;">
            <h4 style="color: #c9a227; margin: 0 0 16px 0; font-size: 18px; border-bottom: 1px solid #333; padding-bottom: 8px;">🏷️ 标签自定义管理</h4>
            <div style="background: #242424; padding: 16px; border-radius: 12px;">
                <div style="margin-bottom: 16px;">
                    <h5 style="color: #f5f5f5; margin: 0 0 12px 0; font-size: 14px;">状态标签</h5>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
                        ${tagTypes.status.map(tag => {
                            const customTags = JSON.parse(localStorage.getItem('luoyang_custom_tags') || '{}');
                            const customTag = customTags.status?.[tag.id];
                            return `
                                <div style="background: #1a1a1a; padding: 12px; border-radius: 8px;">
                                    <input type="text" class="editor-text-input tag-name-input" data-tag-type="status" data-tag-id="${tag.id}"
                                        value="${customTag?.name || tag.name}"
                                        placeholder="标签名称"
                                        style="width: 100%; padding: 6px; background: #242424; border: 1px solid #333; border-radius: 4px; color: #f5f5f5; font-size: 12px; margin-bottom: 6px;">
                                    <div style="display: flex; gap: 6px;">
                                        <input type="color" class="tag-color-input" data-tag-type="status" data-tag-id="${tag.id}" data-color-type="color"
                                            value="${customTag?.color || tag.color}"
                                            style="width: 40px; height: 30px; border: none; border-radius: 4px; cursor: pointer;">
                                        <input type="color" class="tag-color-input" data-tag-type="status" data-tag-id="${tag.id}" data-color-type="bgColor"
                                            value="${customTag?.bgColor || tag.bgColor}"
                                            style="width: 40px; height: 30px; border: none; border-radius: 4px; cursor: pointer;">
                                        <button class="tag-reset-btn" data-tag-type="status" data-tag-id="${tag.id}"
                                            style="flex: 1; background: #444; color: #f5f5f5; border: none; padding: 6px; border-radius: 4px; cursor: pointer; font-size: 11px;">重置</button>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
                <div>
                    <h5 style="color: #f5f5f5; margin: 0 0 12px 0; font-size: 14px;">类型标签</h5>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
                        ${tagTypes.type.map(tag => {
                            const customTags = JSON.parse(localStorage.getItem('luoyang_custom_tags') || '{}');
                            const customTag = customTags.type?.[tag.id];
                            return `
                                <div style="background: #1a1a1a; padding: 12px; border-radius: 8px;">
                                    <input type="text" class="editor-text-input tag-name-input" data-tag-type="type" data-tag-id="${tag.id}"
                                        value="${customTag?.name || tag.name}"
                                        placeholder="标签名称"
                                        style="width: 100%; padding: 6px; background: #242424; border: 1px solid #333; border-radius: 4px; color: #f5f5f5; font-size: 12px; margin-bottom: 6px;">
                                    <div style="display: flex; gap: 6px;">
                                        <input type="color" class="tag-color-input" data-tag-type="type" data-tag-id="${tag.id}" data-color-type="color"
                                            value="${customTag?.color || tag.color}"
                                            style="width: 40px; height: 30px; border: none; border-radius: 4px; cursor: pointer;">
                                        <input type="color" class="tag-color-input" data-tag-type="type" data-tag-id="${tag.id}" data-color-type="bgColor"
                                            value="${customTag?.bgColor || tag.bgColor}"
                                            style="width: 40px; height: 30px; border: none; border-radius: 4px; cursor: pointer;">
                                        <button class="tag-reset-btn" data-tag-type="type" data-tag-id="${tag.id}"
                                            style="flex: 1; background: #444; color: #f5f5f5; border: none; padding: 6px; border-radius: 4px; cursor: pointer; font-size: 11px;">重置</button>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    return content;
}

function loadCustomTexts() {
    const savedTexts = JSON.parse(localStorage.getItem('luoyang_custom_texts') || '{}');
    const customSlides = JSON.parse(localStorage.getItem('luoyang_custom_slides') || '[]');
    
    // 加载首页轮播图文字（包括自定义轮播图）
    if (heroSlidesData) {
        const allSlides = [...heroSlidesData, ...customSlides];
        allSlides.forEach((slide, index) => {
            if (savedTexts[`heroTitle${index}`]) slide.title = savedTexts[`heroTitle${index}`];
            if (savedTexts[`heroSubtitle${index}`]) slide.subtitle = savedTexts[`heroSubtitle${index}`];
        });
    }
    
    // 加载文化解码文字
    if (cultureData) {
        cultureData.forEach((item, index) => {
            if (savedTexts[`cultureTitle${index}`]) item.name = savedTexts[`cultureTitle${index}`];
            if (savedTexts[`cultureDesc${index}`]) item.description = savedTexts[`cultureDesc${index}`];
        });
    }
    
    // 加载探访实录文字
    if (journalData) {
        let journalIndex = 0;
        ['official', 'user'].forEach(type => {
            if (journalData[type]) {
                journalData[type].forEach(item => {
                    if (savedTexts[`journalTitle${journalIndex}`]) item.title = savedTexts[`journalTitle${journalIndex}`];
                    if (savedTexts[`journalDesc${journalIndex}`]) item.description = savedTexts[`journalDesc${journalIndex}`];
                    if (savedTexts[`journalVideoUrl${journalIndex}`]) item.videoUrl = savedTexts[`journalVideoUrl${journalIndex}`];
                    if (savedTexts[`journalType${journalIndex}`]) item.type = savedTexts[`journalType${journalIndex}`];
                    journalIndex++;
                });
            }
        });
    }
    
    // 加载风物档案文字和图片
    let index = 0;
    if (archiveData.food) {
        archiveData.food.forEach((item, foodIndex) => {
            if (savedTexts[`archiveName${foodIndex}`]) item.name = savedTexts[`archiveName${foodIndex}`];
            if (savedTexts[`archiveDesc${foodIndex}`]) item.description = savedTexts[`archiveDesc${foodIndex}`];
            if (savedImages[`archive${foodIndex}`]) {
                item.image = savedImages[`archive${foodIndex}`];
                console.log('Archive:', item.name, 'imageKey:', `archive${foodIndex}`, 'image exists:', true);
            } else {
                console.log('Archive:', item.name, 'imageKey:', `archive${foodIndex}`, 'image exists:', false);
            }
        });
        index = archiveData.food.length;
    }
    if (archiveData.craft) {
        archiveData.craft.forEach((item, craftIndex) => {
            const globalIndex = index + craftIndex;
            if (savedTexts[`archiveName${globalIndex}`]) item.name = savedTexts[`archiveName${globalIndex}`];
            if (savedTexts[`archiveDesc${globalIndex}`]) item.description = savedTexts[`archiveDesc${globalIndex}`];
            if (savedImages[`archive${globalIndex}`]) {
                item.image = savedImages[`archive${globalIndex}`];
                console.log('Archive:', item.name, 'imageKey:', `archive${globalIndex}`, 'image exists:', true);
            } else {
                console.log('Archive:', item.name, 'imageKey:', `archive${globalIndex}`, 'image exists:', false);
            }
        });
        index += archiveData.craft.length;
    }
    if (archiveData.fengHua) {
        archiveData.fengHua.forEach((item, fengHuaIndex) => {
            const globalIndex = index + fengHuaIndex;
            if (savedTexts[`archiveName${globalIndex}`]) item.name = savedTexts[`archiveName${globalIndex}`];
            if (savedTexts[`archiveDesc${globalIndex}`]) item.description = savedTexts[`archiveDesc${globalIndex}`];
            if (savedImages[`archive${globalIndex}`]) {
                item.image = savedImages[`archive${globalIndex}`];
                console.log('Archive:', item.name, 'imageKey:', `archive${globalIndex}`, 'image exists:', true);
            } else {
                console.log('Archive:', item.name, 'imageKey:', `archive${globalIndex}`, 'image exists:', false);
            }
        });
    }
    
    console.log('✅ 已加载自定义文字内容');
}

// 首页轮播图数据
const heroSlidesData = [
    {
        image: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=1920&q=80',
        title: '龙门石窟 · 艺术瑰宝',
        subtitle: '世界文化遗产，佛教艺术巅峰'
    },
    {
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80',
        title: '应天门 · 天下第一门',
        subtitle: '隋唐洛阳城的辉煌见证'
    },
    {
        image: 'https://images.unsplash.com/photo-1531971418865-487f516101c0?w=1920&q=80',
        title: '洛阳牡丹 · 国色天香',
        subtitle: '花开时节动京城'
    }
];

// 根据类型刷新对应区域的图片显示
function refreshSectionByType(type, subtype = '') {
    console.log(`🔄 刷新区域显示: type=${type}, subtype=${subtype}`);
    
    if (type === 'culture') {
        const container = document.getElementById('cultureGrid');
        if (container) {
            container.innerHTML = '';
            initCultureSection();
        }
    } else if (type === 'journal') {
        const container = document.querySelector('.journal-grid');
        if (container) {
            container.innerHTML = '';
            initJournalSection();
        }
    } else if (type === 'archive') {
        const container = document.getElementById('archiveGrid');
        if (container) {
            container.innerHTML = '';
            initArchiveSection();
        }
    } else if (type === 'hero') {
        refreshHeroSlider();
    } else if (type === 'map') {
        // 地图标记不需要在这里刷新
    }
    
    console.log(`✅ ${type} 区域已刷新`);
}

function openInlineEditor(type, index, subtype = '') {
    const savedImages = JSON.parse(localStorage.getItem('luoyang_custom_images') || '{}');
    const savedTexts = JSON.parse(localStorage.getItem('luoyang_custom_texts') || '{}');
    
    let item = null;
    let imageKey = '';
    let titleKey = '';
    let descKey = '';
    let fullTextKey = '';
    let titleLabel = '标题';
    let descLabel = '描述';
    
    switch(type) {
        case 'culture':
            item = cultureData[index];
            imageKey = `culture${index}`;
            titleKey = `cultureTitle${index}`;
            descKey = `cultureDesc${index}`;
            fullTextKey = `cultureFullText${index}`;
            break;
        case 'journal':
            // journal使用全局索引，需要转换为子类型内的本地索引
            let localIndex = index;
            if (subtype === 'user') {
                localIndex = index - (journalData.official ? journalData.official.length : 0);
            }
            item = journalData[subtype] && journalData[subtype][localIndex];
            imageKey = `journal${index}`;
            titleKey = `journalTitle${index}`;
            descKey = `journalDesc${index}`;
            break;
        case 'archive':
            item = archiveData[subtype] && archiveData[subtype][index];
            const archiveIndex = getArchiveGlobalIndex(subtype, index);
            imageKey = `archive${archiveIndex}`;
            titleKey = `archiveName${archiveIndex}`;
            descKey = `archiveDesc${archiveIndex}`;
            titleLabel = '名称';
            break;
    }
    
    if (!item) {
        alert('❌ 找不到要编辑的内容');
        return;
    }
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        padding: 20px;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
        background: #1a1a1a;
        border: 1px solid #333;
        border-radius: 16px;
        padding: 24px;
        max-width: 500px;
        width: 100%;
    `;
    
    const videoUrlKey = `journalVideoUrl${index}`;
    const typeKey = `journalType${index}`;
    
    const videoUrlField = type === 'journal' ? `
        <div style="margin-bottom: 12px;">
            <label style="display: block; color: #b3b3b3; font-size: 12px; margin-bottom: 4px;">视频链接（B站）</label>
            <input type="text" id="inlineVideoUrl" 
                value="${savedTexts[videoUrlKey] || item.videoUrl || ''}"
                placeholder="https://www.bilibili.com/video/BVxxxxxx"
                style="width: 100%; padding: 10px; background: #1a1a1a; border: 1px solid #333; border-radius: 8px; color: #f5f5f5;">
            <p id="videoUrlError" style="color: #ef4444; font-size: 12px; margin: 4px 0 0 0; display: none;">⚠️ 请输入有效的B站视频链接</p>
        </div>
    ` : '';
    
    const typeField = type === 'journal' ? `
        <div style="margin-bottom: 20px;">
            <label style="display: block; color: #b3b3b3; font-size: 12px; margin-bottom: 4px;">内容类型</label>
            <select id="inlineType" style="width: 100%; padding: 10px; background: #1a1a1a; border: 1px solid #333; border-radius: 8px; color: #f5f5f5;">
                <option value="article" ${(savedTexts[typeKey] || item.type || 'article') === 'article' ? 'selected' : ''}>📝 文章</option>
                <option value="video" ${(savedTexts[typeKey] || item.type || 'article') === 'video' ? 'selected' : ''}>📹 视频</option>
            </select>
        </div>
    ` : '';
    
    const websiteKey = type === 'archive' ? `archiveWebsite${archiveIndex}` : '';
    const websiteField = type === 'archive' ? `
        <div style="margin-bottom: 12px;">
            <label style="display: block; color: #b3b3b3; font-size: 12px; margin-bottom: 4px;">🌐 官方网站链接</label>
            <input type="text" id="inlineWebsite" 
                value="${savedTexts[websiteKey] || item.website || ''}"
                placeholder="https://www.example.com"
                style="width: 100%; padding: 10px; background: #1a1a1a; border: 1px solid #333; border-radius: 8px; color: #f5f5f5;">
            <p id="websiteError" style="color: #ef4444; font-size: 12px; margin: 4px 0 0 0; display: none;">⚠️ 请输入有效的URL地址</p>
        </div>
    ` : '';
    
    const fullTextField = type === 'culture' ? `
        <div style="margin-bottom: 20px;">
            <label style="display: block; color: #b3b3b3; font-size: 12px; margin-bottom: 4px;">📖 展开阅读内容</label>
            <textarea id="inlineFullText" rows="6"
                style="width: 100%; padding: 10px; background: #1a1a1a; border: 1px solid #333; border-radius: 8px; color: #f5f5f5; resize: vertical;">${savedTexts[fullTextKey] || item.fullText || ''}</textarea>
        </div>
    ` : '';
    
    content.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h2 style="color: #c9a227; font-size: 20px; margin: 0;">✏️ 编辑内容</h2>
            <button id="closeInlineEditorBtn" style="background: #333; color: #f5f5f5; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer;">关闭</button>
        </div>
        
        <div style="margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <label style="display: block; color: #b3b3b3; font-size: 12px; margin: 0;">图片</label>
                <div style="display: flex; gap: 6px;">
                    <button id="inlineCropBtn" style="background: #3b82f6; color: #fff; border: none; padding: 4px 10px; border-radius: 4px; cursor: pointer; font-size: 11px;">✂️ 裁剪</button>
                    <button id="inlineCompressBtn" style="background: #8b5cf6; color: #fff; border: none; padding: 4px 10px; border-radius: 4px; cursor: pointer; font-size: 11px;">🗜️ 压缩</button>
                </div>
            </div>
            <img id="inlinePreview" src="${savedImages[imageKey] || item.image}" 
                style="width: 100%; height: 180px; object-fit: cover; border-radius: 8px; display: block; cursor: pointer;">
            <input type="file" id="inlineImageInput" accept=".jpg,.jpeg,.png" style="display: none;">
            <div style="display: flex; gap: 8px; margin-top: 8px;">
                <button id="inlineUploadBtn" style="flex: 1; background: #333; color: #f5f5f5; border: 1px solid #444; padding: 10px 12px; border-radius: 6px; cursor: pointer; font-size: 13px;">📤 上传图片</button>
                <button id="inlineResetImgBtn" style="background: #444; color: #f5f5f5; border: none; padding: 10px 12px; border-radius: 6px; cursor: pointer; font-size: 13px;">🔄 还原图片</button>
            </div>
        </div>
        
        <div style="margin-bottom: 12px;">
            <label style="display: block; color: #b3b3b3; font-size: 12px; margin-bottom: 4px;">${titleLabel}</label>
            <input type="text" id="inlineTitle" 
                value="${savedTexts[titleKey] || (item.title || item.name)}"
                style="width: 100%; padding: 10px; background: #1a1a1a; border: 1px solid #333; border-radius: 8px; color: #f5f5f5;">
        </div>
        
        <div style="margin-bottom: 12px;">
            <label style="display: block; color: #b3b3b3; font-size: 12px; margin-bottom: 4px;">${descLabel}（摘要）</label>
            <textarea id="inlineDesc" rows="4"
                style="width: 100%; padding: 10px; background: #1a1a1a; border: 1px solid #333; border-radius: 8px; color: #f5f5f5; resize: vertical;">${savedTexts[descKey] || (item.description || item.summary || '')}</textarea>
        </div>
        
        ${fullTextField}
        
        ${videoUrlField}
        ${typeField}
        ${websiteField}
        
        <div style="display: flex; gap: 12px;">
            <button id="inlineResetBtn" style="flex: 1; background: #333; color: #f5f5f5; border: none; padding: 10px; border-radius: 8px; cursor: pointer;">🔄 重置</button>
            <button id="inlineSaveBtn" style="flex: 2; background: #c9a227; color: #0d0d0d; border: none; padding: 10px; border-radius: 8px; cursor: pointer; font-weight: 600;">💾 保存修改</button>
        </div>
    `;
    
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    document.getElementById('closeInlineEditorBtn').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    document.getElementById('inlineUploadBtn').addEventListener('click', () => {
        console.log('📤 上传按钮被点击');
        const input = document.getElementById('inlineImageInput');
        if (input) {
            input.click();
        } else {
            console.error('❌ inlineImageInput 不存在');
        }
    });
    
    document.getElementById('inlineCropBtn').addEventListener('click', () => {
        openImageCropper('inlinePreview');
    });
    
    document.getElementById('inlineCompressBtn').addEventListener('click', () => {
        const img = document.getElementById('inlinePreview');
        if (!img || !img.src || img.src === 'about:blank') {
            alert('❌ 请先上传或选择图片');
            return;
        }
        const tempImg = new Image();
        tempImg.onload = async function() {
            const compressed = compressImage(tempImg, 800, 600);
            img.src = compressed;
            
            // 使用 saveCustomImage 函数确保存储空间检查
            const success = await saveCustomImage(imageKey, compressed);
            if (success) {
                alert('✅ 图片已压缩');
                // 立即更新页面上显示的图片
                refreshSectionByType(type, subtype);
            } else {
                alert('❌ 图片压缩后保存失败，请检查存储空间');
            }
        };
        tempImg.onerror = function() {
            alert('❌ 图片处理失败');
        };
        tempImg.src = img.src;
    });
    
    document.getElementById('inlineResetImgBtn').addEventListener('click', () => {
        document.getElementById('inlinePreview').src = item.image;
        const savedImages = JSON.parse(localStorage.getItem('luoyang_custom_images') || '{}');
        delete savedImages[imageKey];
        localStorage.setItem('luoyang_custom_images', JSON.stringify(savedImages));
        alert('✅ 图片已还原至默认');
    });
    
    document.getElementById('inlineImageInput').addEventListener('change', function(e) {
        const file = e.target.files[0];
        console.log('📁 选择了文件:', file ? file.name : '无文件');
        
        if (file) {
            // 验证文件类型
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
            if (!validTypes.includes(file.type)) {
                alert('❌ 不支持的文件格式，请选择 JPG 或 PNG 图片');
                return;
            }
            
            // 验证文件大小（限制5MB）
            if (file.size > 5 * 1024 * 1024) {
                alert('❌ 图片大小不能超过5MB');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = function(event) {
                console.log('📖 文件读取完成');
                const img = new Image();
                img.onload = async function() {
                    console.log('🖼️ 图片加载完成:', img.width + 'x' + img.height);
                    const compressed = compressImage(img, 800, 600);
                    console.log('🔄 图片压缩完成，大小:', (compressed.length / 1024).toFixed(1), 'KB');
                    document.getElementById('inlinePreview').src = compressed;
                    
                    // 使用新的保存函数
                    const success = await saveCustomImage(imageKey, compressed);
                    if (success) {
                        console.log('✅ 图片保存成功，key:', imageKey);
                        alert('✅ 图片上传成功！');
                        // 立即更新页面上显示的图片
                        refreshSectionByType(type, subtype);
                    } else {
                        console.error('❌ 图片保存失败');
                        // 如果保存失败，恢复原图片
                        document.getElementById('inlinePreview').src = item.image;
                    }
                };
                img.onerror = function() {
                    console.error('❌ 图片加载失败');
                    alert('❌ 图片加载失败，请尝试其他图片');
                };
                img.src = event.target.result;
            };
            reader.onerror = function() {
                console.error('❌ 文件读取失败');
                alert('❌ 文件读取失败，请重试');
            };
            reader.readAsDataURL(file);
        }
    });
    
    document.getElementById('inlineResetBtn').addEventListener('click', () => {
        document.getElementById('inlinePreview').src = item.image;
        document.getElementById('inlineTitle').value = item.title || item.name;
        document.getElementById('inlineDesc').value = item.description || item.summary || '';
        
        if (type === 'culture') {
            document.getElementById('inlineFullText').value = item.fullText || '';
        }
        
        if (type === 'journal') {
            document.getElementById('inlineVideoUrl').value = item.videoUrl || '';
            document.getElementById('inlineType').value = item.type || 'article';
        }
        
        const savedImages = JSON.parse(localStorage.getItem('luoyang_custom_images') || '{}');
        delete savedImages[imageKey];
        localStorage.setItem('luoyang_custom_images', JSON.stringify(savedImages));
        
        const savedTexts = JSON.parse(localStorage.getItem('luoyang_custom_texts') || '{}');
        delete savedTexts[titleKey];
        delete savedTexts[descKey];
        if (type === 'culture') {
            delete savedTexts[fullTextKey];
        }
        if (type === 'journal') {
            delete savedTexts[videoUrlKey];
            delete savedTexts[typeKey];
        }
        localStorage.setItem('luoyang_custom_texts', JSON.stringify(savedTexts));
    });
    
    function validateVideoUrl(url) {
        if (!url || url.trim() === '') return true;
        // 支持带或不带 www. 的B站链接，末尾可带斜杠和查询参数
        const pattern = /^https?:\/\/(www\.)?bilibili\.com\/video\/BV[a-zA-Z0-9]+(\/)?(\?.*)?$/;
        return pattern.test(url);
    }
    
    function validateUrl(url) {
        if (!url || url.trim() === '') return true;
        // 支持带或不带 http/https 的URL
        const pattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        return pattern.test(url);
    }
    
    document.getElementById('inlineSaveBtn').addEventListener('click', () => {
        const title = document.getElementById('inlineTitle').value;
        const desc = document.getElementById('inlineDesc').value;
        
        if (type === 'journal') {
            const videoUrlInput = document.getElementById('inlineVideoUrl');
            const videoUrl = videoUrlInput.value;
            const contentType = document.getElementById('inlineType').value;
            const errorEl = document.getElementById('videoUrlError');
            
            if (!validateVideoUrl(videoUrl)) {
                errorEl.style.display = 'block';
                return;
            }
            errorEl.style.display = 'none';
        }
        
        if (type === 'archive') {
            const websiteInput = document.getElementById('inlineWebsite');
            const website = websiteInput.value;
            const errorEl = document.getElementById('websiteError');
            
            if (website && !validateUrl(website)) {
                errorEl.style.display = 'block';
                return;
            }
            errorEl.style.display = 'none';
        }
        
        const savedTexts = JSON.parse(localStorage.getItem('luoyang_custom_texts') || '{}');
        savedTexts[titleKey] = title;
        savedTexts[descKey] = desc;
        
        if (type === 'culture') {
            const fullText = document.getElementById('inlineFullText').value;
            savedTexts[fullTextKey] = fullText;
        }
        
        if (type === 'journal') {
            const videoUrl = document.getElementById('inlineVideoUrl').value;
            const contentType = document.getElementById('inlineType').value;
            savedTexts[videoUrlKey] = videoUrl;
            savedTexts[typeKey] = contentType;
        }
        
        if (type === 'archive') {
            const website = document.getElementById('inlineWebsite').value;
            savedTexts[websiteKey] = website;
        }
        
        localStorage.setItem('luoyang_custom_texts', JSON.stringify(savedTexts));
        
        alert('✅ 修改已保存！');
        document.body.removeChild(modal);
        
        // 根据类型刷新对应区域的显示，无需重新加载整个页面
        if (type === 'culture') {
            const container = document.getElementById('cultureGrid');
            if (container) {
                container.innerHTML = '';
                initCultureSection();
            }
        } else if (type === 'journal') {
            const container = document.querySelector('.journal-grid');
            if (container) {
                container.innerHTML = '';
                initJournalSection();
            }
        } else if (type === 'archive') {
            const container = document.querySelector('.archive-section');
            if (container) {
                container.innerHTML = '';
                initArchiveSection();
            }
        }
        refreshDeveloperButtons();
    });
}

function getArchiveGlobalIndex(subtype, index) {
    let globalIndex = 0;
    if (subtype === 'craft') {
        globalIndex = (archiveData.food ? archiveData.food.length : 0) + index;
    } else if (subtype === 'fengHua') {
        globalIndex = (archiveData.food ? archiveData.food.length : 0) + 
                      (archiveData.craft ? archiveData.craft.length : 0) + index;
    } else {
        globalIndex = index;
    }
    return globalIndex;
}



function compressImage(img, maxWidth, maxHeight, quality = 0.6) {
    let width = img.width;
    let height = img.height;
    
    // 计算缩放比例，确保图片不超过指定尺寸
    let scale = 1;
    if (width > maxWidth) {
        scale = maxWidth / width;
    }
    if (height > maxHeight) {
        scale = Math.min(scale, maxHeight / height);
    }
    
    width = Math.floor(width * scale);
    height = Math.floor(height * scale);
    
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    
    const ctx = canvas.getContext('2d');
    
    // 使用更好的图像质量设置
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    
    ctx.drawImage(img, 0, 0, width, height);
    
    // 使用指定的质量压缩，默认0.6
    return canvas.toDataURL('image/jpeg', quality);
}

// 存储空间清理函数 - 清理孤立和无用的图片
function cleanupOrphanedImages() {
    const savedImages = JSON.parse(localStorage.getItem('luoyang_custom_images') || '{}');
    const customSlides = JSON.parse(localStorage.getItem('luoyang_custom_slides') || '[]');
    const heroCount = heroSlidesData ? heroSlidesData.length : 0;
    const customSlideCount = customSlides.length;
    const totalSlideCount = heroCount + customSlideCount;
    
    // 文化解码数量
    const cultureCount = cultureData ? cultureData.length : 0;
    
    // 探访实录数量
    const journalCount = (journalData?.official?.length || 0) + (journalData?.user?.length || 0);
    
    // 风物档案数量
    const archiveCount = 
        (archiveData?.food?.length || 0) + 
        (archiveData?.craft?.length || 0) + 
        (archiveData?.fengHua?.length || 0);
    
    const validKeys = new Set();
    
    // 添加有效的hero图片键
    for (let i = 0; i < totalSlideCount; i++) {
        validKeys.add(`hero${i}`);
    }
    
    // 添加有效的其他图片键
    for (let i = 0; i < cultureCount; i++) {
        validKeys.add(`culture${i}`);
    }
    for (let i = 0; i < journalCount; i++) {
        validKeys.add(`journal${i}`);
    }
    for (let i = 0; i < archiveCount; i++) {
        validKeys.add(`archive${i}`);
    }
    
    // 添加地图标记图片键（map_xxx 格式）
    // 从 mapPoints 和 localStorage 中获取所有地图标记名称
    const savedMapPoints = JSON.parse(localStorage.getItem('luoyang_marker_data') || '[]');
    const allMapPoints = mapPoints.length > 0 ? mapPoints : savedMapPoints;
    if (allMapPoints && allMapPoints.length > 0) {
        allMapPoints.forEach(point => {
            if (point.name) {
                validKeys.add(`map_${point.name}`);
            }
        });
    }
    
    // 找出孤立的图片（排除 map_ 格式的 key，因为它们是动态的）
    const orphanedKeys = Object.keys(savedImages).filter(key => {
        // map_ 格式的 key 不应该被清理，因为标记点可能随时添加
        if (key.startsWith('map_')) {
            return false;
        }
        return !validKeys.has(key);
    });
    
    let cleanedSize = 0;
    orphanedKeys.forEach(key => {
        cleanedSize += savedImages[key].length;
        delete savedImages[key];
    });
    
    if (orphanedKeys.length > 0) {
        localStorage.setItem('luoyang_custom_images', JSON.stringify(savedImages));
        console.log(`🗑️ 已清理 ${orphanedKeys.length} 张孤立图片，释放 ${(cleanedSize / 1024).toFixed(1)} KB`);
        return { count: orphanedKeys.length, size: cleanedSize };
    }
    
    console.log('✅ 没有发现孤立图片');
    return { count: 0, size: 0 };
}

// 清理无效的文字数据
function cleanupInvalidTexts() {
    const savedTexts = JSON.parse(localStorage.getItem('luoyang_custom_texts') || '{}');
    const customSlides = JSON.parse(localStorage.getItem('luoyang_custom_slides') || '[]');
    const heroCount = heroSlidesData ? heroSlidesData.length : 0;
    const customSlideCount = customSlides.length;
    const totalSlideCount = heroCount + customSlideCount;
    
    const cultureCount = cultureData ? cultureData.length : 0;
    const journalCount = (journalData?.official?.length || 0) + (journalData?.user?.length || 0);
    const archiveCount = 
        (archiveData?.food?.length || 0) + 
        (archiveData?.craft?.length || 0) + 
        (archiveData?.fengHua?.length || 0);
    
    const validKeys = new Set();
    
    // 添加有效的hero文字键
    for (let i = 0; i < totalSlideCount; i++) {
        validKeys.add(`heroTitle${i}`);
        validKeys.add(`heroSubtitle${i}`);
    }
    
    // 添加有效的culture文字键
    for (let i = 0; i < cultureCount; i++) {
        validKeys.add(`cultureTitle${i}`);
        validKeys.add(`cultureDesc${i}`);
    }
    
    // 添加有效的journal文字键
    for (let i = 0; i < journalCount; i++) {
        validKeys.add(`journalTitle${i}`);
        validKeys.add(`journalDesc${i}`);
        validKeys.add(`journalVideoUrl${i}`);
        validKeys.add(`journalType${i}`);
    }
    
    // 添加有效的archive文字键
    for (let i = 0; i < archiveCount; i++) {
        validKeys.add(`archiveName${i}`);
        validKeys.add(`archiveDesc${i}`);
        validKeys.add(`archiveWebsite${i}`);
    }
    
    // 找出无效的文字数据
    const invalidKeys = Object.keys(savedTexts).filter(key => !validKeys.has(key));
    let cleanedSize = 0;
    
    invalidKeys.forEach(key => {
        cleanedSize += savedTexts[key].length;
        delete savedTexts[key];
    });
    
    if (invalidKeys.length > 0) {
        localStorage.setItem('luoyang_custom_texts', JSON.stringify(savedTexts));
        console.log(`🗑️ 已清理 ${invalidKeys.length} 条无效文字数据，释放 ${(cleanedSize / 1024).toFixed(1)} KB`);
        return { count: invalidKeys.length, size: cleanedSize };
    }
    
    console.log('✅ 没有发现无效文字数据');
    return { count: 0, size: 0 };
}

// 存储空间重压缩函数 - 使用更激进的压缩来释放空间
function recompressAllImages(targetQuality = 0.4, maxWidth = 1024, maxHeight = 768) {
    const savedImages = JSON.parse(localStorage.getItem('luoyang_custom_images') || '{}');
    const imageKeys = Object.keys(savedImages);
    let originalSize = 0;
    let newSize = 0;
    let processed = 0;
    
    const promises = imageKeys.map(key => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                originalSize += savedImages[key].length;
                
                // 使用更激进的压缩设置
                const compressed = compressImage(img, maxWidth, maxHeight, targetQuality);
                savedImages[key] = compressed;
                newSize += compressed.length;
                processed++;
                resolve();
            };
            img.onerror = () => {
                // 如果图片损坏，保留原图
                originalSize += savedImages[key].length;
                newSize += savedImages[key].length;
                processed++;
                resolve();
            };
            img.src = savedImages[key];
        });
    });
    
    return Promise.all(promises).then(() => {
        const saved = originalSize - newSize;
        localStorage.setItem('luoyang_custom_images', JSON.stringify(savedImages));
        console.log(`🔄 图片重压缩完成: 处理 ${processed} 张，原始 ${(originalSize / 1024).toFixed(1)} KB → 新 ${(newSize / 1024).toFixed(1)} KB，节省 ${(saved / 1024).toFixed(1)} KB`);
        return { processed, originalSize, newSize, saved };
    });
}

// 获取存储空间使用情况
function getStorageInfo() {
    const savedImages = JSON.parse(localStorage.getItem('luoyang_custom_images') || '{}');
    const savedTexts = JSON.parse(localStorage.getItem('luoyang_custom_texts') || '{}');
    const customSlides = JSON.parse(localStorage.getItem('luoyang_custom_slides') || '[]');
    
    const imagesSize = JSON.stringify(savedImages).length;
    const textsSize = JSON.stringify(savedTexts).length;
    const slidesSize = JSON.stringify(customSlides).length;
    const totalSize = imagesSize + textsSize + slidesSize;
    const MAX_SIZE = 5 * 1024 * 1024;
    const freeSpace = MAX_SIZE - totalSize;
    const usagePercent = ((totalSize / MAX_SIZE) * 100).toFixed(1);
    
    const imageCount = Object.keys(savedImages).length;
    
    return {
        imagesSize,
        textsSize,
        slidesSize,
        totalSize,
        freeSpace,
        usagePercent,
        imageCount,
        MAX_SIZE
    };
}

// 智能压缩 - 当空间不足时自动压缩
async function smartCompressIfNeeded() {
    const info = getStorageInfo();
    const warningThreshold = 4 * 1024 * 1024; // 4MB
    const criticalThreshold = 4.5 * 1024 * 1024; // 4.5MB
    
    if (info.totalSize > criticalThreshold) {
        console.warn('⚠️ 存储空间严重不足，开始智能压缩...');
        const result = await recompressAllImages(0.35, 800, 600);
        alert(`⚠️ 存储空间已严重不足，已自动压缩 ${result.processed} 张图片，节省 ${(result.saved / 1024).toFixed(1)} KB`);
        return result;
    } else if (info.totalSize > warningThreshold) {
        console.warn('⚠️ 存储空间接近上限，建议清理或压缩图片');
        return { warning: true, info };
    }
    
    return { warning: false, info };
}

function updateImageInPage(imageId, src) {
    console.log(`📺 更新页面图片，imageId: ${imageId}`);
    
    // 注意：archive 图片不需要在这里更新，它们在 renderArchiveItems 中已经处理了
    // 如果用户切换到对应的 tab，renderArchiveItems 会自动从 savedImages 中读取正确的图片
    
    if (imageId.startsWith('hero')) {
        const index = parseInt(imageId.replace('hero', ''));
        const slides = document.querySelectorAll('.hero-slide');
        console.log(`   → hero类型，索引: ${index}，找到slides数量: ${slides.length}`);
        if (slides[index]) {
            slides[index].style.backgroundImage = `url('${src}')`;
            console.log(`   ✅ 成功更新hero图片`);
            return 'success: hero';
        } else {
            console.log(`   ❌ 找不到对应的hero slide: ${index}`);
            return 'failed: hero slide not found';
        }
    }
    
    if (imageId.startsWith('culture')) {
        const index = parseInt(imageId.replace('culture', ''));
        const cultureCards = document.querySelectorAll('.culture-card');
        console.log(`   → culture类型，索引: ${index}，找到cards数量: ${cultureCards.length}`);
        if (cultureCards[index]) {
            const img = cultureCards[index].querySelector('img');
            if (img) {
                img.src = src;
                console.log(`   ✅ 成功更新culture图片`);
                return 'success: culture';
            } else {
                console.log(`   ❌ culture卡片中找不到img元素`);
                return 'failed: img not found in culture card';
            }
        } else {
            console.log(`   ❌ 找不到对应的culture card: ${index}`);
            return 'failed: culture card not found';
        }
    }
    
    if (imageId.startsWith('journal')) {
        const index = parseInt(imageId.replace('journal', ''));
        const journalCards = document.querySelectorAll('.journal-card');
        console.log(`   → journal类型，索引: ${index}，找到cards数量: ${journalCards.length}`);
        if (journalCards[index]) {
            const img = journalCards[index].querySelector('img');
            if (img) {
                img.src = src;
                console.log(`   ✅ 成功更新journal图片`);
                return 'success: journal';
            } else {
                console.log(`   ❌ journal卡片中找不到img元素`);
                return 'failed: img not found in journal card';
            }
        } else {
            console.log(`   ❌ 找不到对应的journal card: ${index}`);
            return 'failed: journal card not found';
        }
    }
    
    if (imageId.startsWith('archive')) {
        // archive 图片在 renderArchiveItems 中加载，这里不需要处理
        // 切换 tab 时会自动加载正确的图片
        console.log(`   ⏭️ 跳过archive图片更新（将在切换tab时自动加载）`);
        return 'skipped: archive loaded in renderArchiveItems';
    }
    
    console.log(`   ❌ 未知的imageId类型: ${imageId}`);
    return 'failed: unknown image type';
}

function loadCustomImages() {
    const savedImages = JSON.parse(localStorage.getItem('luoyang_custom_images') || '{}');
    
    for (const [key, value] of Object.entries(savedImages)) {
        updateImageInPage(key, value);
    }
}

// 刷新所有开发者编辑按钮（在重新初始化区块后调用）
function refreshDeveloperButtons() {
    if (isDeveloperMode()) {
        document.querySelectorAll('.inline-edit-btn').forEach(btn => {
            btn.style.display = 'flex';
        });
    }
}

function isDeveloperMode() {
    return localStorage.getItem('luoyang_developer_mode') === 'true';
}

function setDeveloperMode(enabled) {
    const editTitleBtn = document.getElementById('editTitleBtn');
    const devDashBtn = document.getElementById('devDashBtn');
    
    if (editTitleBtn) {
        enabled ? (editTitleBtn.classList.remove('hidden'), editTitleBtn.classList.add('visible'))
                : (editTitleBtn.classList.remove('visible'), editTitleBtn.classList.add('hidden'));
    }
    
    if (devDashBtn) {
        enabled ? (devDashBtn.classList.remove('hidden'), devDashBtn.classList.add('visible'))
                : (devDashBtn.classList.remove('visible'), devDashBtn.classList.add('hidden'));
    }
    
    // 显示/隐藏所有编辑按钮
    const currentMode = enabled;
    document.querySelectorAll('.inline-edit-btn').forEach(btn => {
        btn.style.display = currentMode ? 'flex' : 'none';
    });
    
    localStorage.setItem('luoyang_developer_mode', enabled ? 'true' : 'false');
    console.log(enabled ? '✅ 开发者模式已开启' : '✅ 开发者模式已关闭');
    
    // 重新渲染所有区块以应用开发者模式
    setTimeout(() => {
        if (enabled) {
            refreshAllSections();
        }
    }, 100);
}

// ==========================================
// 开发者总控面板 — 集中管理所有图片资源
// ==========================================
function openDeveloperDashboard() {
    if (!isDeveloperMode()) {
        const password = prompt('请输入管理密码：');
        if (password === '27149') {
            setDeveloperMode(true);
        } else if (password !== null) {
            alert('❌ 密码错误，请重试');
            return;
        } else {
            return;
        }
    }
    
    const savedImages = JSON.parse(localStorage.getItem('luoyang_custom_images') || '{}');
    const savedTexts = JSON.parse(localStorage.getItem('luoyang_custom_texts') || '{}');
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0,0,0,0.92); display: flex; align-items: flex-start;
        justify-content: center; z-index: 1001; overflow-y: auto; padding: 20px;
        opacity: 0; transition: opacity 0.3s ease;
    `;
    
    const container = document.createElement('div');
    container.style.cssText = `
        background: #1a1a1a; border: 1px solid #333; border-radius: 16px;
        padding: 28px; max-width: 1000px; width: 100%; margin-top: 40px; margin-bottom: 40px;
    `;
    
    // --- 收集所有图片资源 ---
    function buildSection(sectionTitle, items, imageKeyFn, titleKeyFn, subtitleKeyFn, defaultTitleFn, defaultSubtitleFn, websiteKeyFn = null) {
        let html = `
            <div style="margin-bottom: 28px;">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 16px; padding-bottom: 10px; border-bottom: 1px solid #333;">
                    <span style="color: #c9a227; font-size: 18px; font-weight: 600;">${sectionTitle}</span>
                    <span style="color: #666; font-size: 13px;">（${items.length} 项）</span>
                </div>
                <div style="display: grid; gap: 14px;">`;
        
        items.forEach((item, idx) => {
            const imgKey = imageKeyFn(idx);
            const titleKey = titleKeyFn(idx);
            const subKey = subtitleKeyFn(idx);
            const displayTitle = savedTexts[titleKey] || defaultTitleFn(item);
            const displaySub = savedTexts[subKey] || defaultSubtitleFn(item);
            const imgSrc = savedImages[imgKey] || item.image || '';
            
            // 官网链接字段（仅风物档案）
            const websiteKey = websiteKeyFn ? websiteKeyFn(idx) : '';
            const displayWebsite = savedTexts[websiteKey] || (item.website || '');
            
            html += `
                <div style="background: #242424; border-radius: 12px; padding: 16px; border: 1px solid #333;">
                    <div style="display: flex; gap: 16px; align-items: flex-start;">
                        <div style="width: 160px; flex-shrink: 0;">
                            <img id="dash-img-${imgKey}" src="${imgSrc}" 
                                style="width: 100%; height: 100px; object-fit: cover; border-radius: 8px; display: block;">
                            <input type="file" id="dash-input-${imgKey}" class="dash-file-input" accept=".jpg,.jpeg,.png" 
                                data-key="${imgKey}" style="display: none;">
                            <div style="display: flex; gap: 4px; margin-top: 6px;">
                                <button class="dash-upload-btn" data-key="${imgKey}" 
                                    style="flex:1; background:#333; color:#f5f5f5; border:none; padding:5px; border-radius:4px; cursor:pointer; font-size:11px;">📤</button>
                                <button class="dash-crop-btn" data-id="dash-img-${imgKey}" 
                                    style="flex:1; background:#3b82f6; color:#fff; border:none; padding:5px; border-radius:4px; cursor:pointer; font-size:11px;">✂️</button>
                                <button class="dash-compress-btn" data-id="dash-img-${imgKey}" data-key="${imgKey}" 
                                    style="flex:1; background:#8b5cf6; color:#fff; border:none; padding:5px; border-radius:4px; cursor:pointer; font-size:11px;">🗜️</button>
                            </div>
                        </div>
                        <div style="flex:1; display: grid; gap: 8px;">
                            <input type="text" class="dash-title-input" data-key="${titleKey}" 
                                value="${displayTitle}" 
                                style="width:100%; padding:8px 10px; background:#1a1a1a; border:1px solid #444; border-radius:6px; color:#f5f5f5; font-size:13px;">
                            <input type="text" class="dash-subtitle-input" data-key="${subKey}" 
                                value="${displaySub}" 
                                style="width:100%; padding:8px 10px; background:#1a1a1a; border:1px solid #444; border-radius:6px; color:#f5f5f5; font-size:13px;">
                            ${websiteKey ? `<input type="text" class="dash-website-input" data-key="${websiteKey}" 
                                value="${displayWebsite}" 
                                placeholder="🌐 官网链接"
                                style="width:100%; padding:8px 10px; background:#1a1a1a; border:1px solid #444; border-radius:6px; color:#f5f5f5; font-size:13px;">` : ''}
                        </div>
                    </div>
                </div>`;
        });
        
        html += `</div></div>`;
        return html;
    }
    
    // 构建各个区块
    let allContent = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
            <div style="display: flex; align-items: center; gap: 12px;">
                <div style="width:40px;height:40px;background:rgba(201,162,39,0.2);border-radius:12px;display:flex;align-items:center;justify-content:center;">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c9a227" stroke-width="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
                    </svg>
                </div>
                <div>
                    <h2 style="color:#c9a227;font-size:24px;margin:0;">🛠️ 开发者总控面板</h2>
                    <p style="color:#666;font-size:13px;margin:2px 0 0 0;">集中管理所有模块的图片与文字资源 · 修改实时保存</p>
                </div>
            </div>
            <button id="closeDashBtn" style="background:#333;color:#f5f5f5;border:none;padding:10px 18px;border-radius:8px;cursor:pointer;font-size:14px;">✕ 关闭</button>
        </div>
        <div id="storageInfo" style="background: rgba(201,162,39,0.1); border: 1px solid rgba(201,162,39,0.3); border-radius: 12px; padding: 16px; margin-bottom: 20px;">
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="color: #c9a227; font-size: 16px; font-weight: 600;">💾 存储空间</span>
                    <span id="storageUsage" style="color: #f5f5f5; font-size: 14px;">计算中...</span>
                </div>
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    <button id="optimizeStorageBtn" style="background: linear-gradient(135deg, #059669, #10b981); color: #fff; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 600;">🚀 一键优化存储</button>
                    <button id="refreshStorageBtn" style="background: #333; color: #f5f5f5; border: 1px solid #444; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 13px;">🔄 刷新</button>
                    <button id="cleanupOrphanedBtn" style="background: #059669; color: #fff; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 13px;">🧹 清理孤立</button>
                    <button id="recompressImagesBtn" style="background: #7c3aed; color: #fff; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 13px;">🗜️ 重压缩</button>
                    <button id="clearAllImagesBtn" style="background: #dc2626; color: #fff; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 13px;">🗑️ 清空</button>
                </div>
            </div>
            <div style="margin-top: 12px; height: 8px; background: #333; border-radius: 4px; overflow: hidden;">
                <div id="storageBar" style="height: 100%; background: linear-gradient(90deg, #c9a227 0%, #f59e0b 100%); width: 0%; transition: width 0.3s ease;"></div>
            </div>
            <div id="storageDetails" style="margin-top: 10px; display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 8px; font-size: 12px; color: #999;"></div>
        </div>`;
    
    // 轮播图区块
    const customSlides = JSON.parse(localStorage.getItem('luoyang_custom_slides') || '[]');
    const allSlides = [...heroSlidesData, ...customSlides];
    allContent += buildSection(
        '🎠 首页轮播图',
        allSlides,
        i => `hero${i}`,
        i => `heroTitle${i}`,
        i => `heroSubtitle${i}`,
        item => item.title,
        item => item.subtitle || ''
    );
    
    // 文化解码区块
    allContent += buildSection(
        '📜 文化解码',
        cultureData,
        i => `culture${i}`,
        i => `cultureTitle${i}`,
        i => `cultureDesc${i}`,
        item => item.title,
        item => item.summary || ''
    );
    
    // 探访实录区块
    const allJournals = [...(journalData.official || []), ...(journalData.user || [])];
    allContent += buildSection(
        '📝 探访实录',
        allJournals,
        i => `journal${i}`,
        i => `journalTitle${i}`,
        i => `journalDesc${i}`,
        item => item.title,
        item => item.description || ''
    );
    
    // 风物档案区块
    const allArchives = [...(archiveData.food || []), ...(archiveData.craft || []), ...(archiveData.fengHua || [])];
    allContent += buildSection(
        '🏺 风物档案',
        allArchives,
        i => `archive${i}`,
        i => `archiveName${i}`,
        i => `archiveDesc${i}`,
        item => item.name,
        item => item.description || '',
        i => `archiveWebsite${i}`
    );
    
    container.innerHTML = allContent;
    modal.appendChild(container);
    document.body.appendChild(modal);
    setTimeout(() => { modal.style.opacity = '1'; }, 10);
    
    // --- 事件绑定 ---
    document.getElementById('closeDashBtn').addEventListener('click', () => {
        modal.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    });
    
    // --- 更新存储空间显示 ---
    function updateStorageDisplay() {
        try {
            const info = checkStorageSpace();
            if (!info) return;
            
            const usageEl = document.getElementById('storageUsage');
            const barEl = document.getElementById('storageBar');
            const detailsEl = document.getElementById('storageDetails');
            
            if (usageEl) {
                usageEl.textContent = `${(info.totalSize / 1024).toFixed(1)} KB / 5120 KB (${info.usagePercent}%)`;
                usageEl.style.color = parseFloat(info.usagePercent) > 80 ? '#ef4444' : '#f5f5f5';
            }
            
            if (barEl) {
                barEl.style.width = `${Math.min(parseFloat(info.usagePercent), 100)}%`;
                barEl.style.background = parseFloat(info.usagePercent) > 80 
                    ? 'linear-gradient(90deg, #ef4444 0%, #dc2626 100%)' 
                    : 'linear-gradient(90deg, #c9a227 0%, #f59e0b 100%)';
            }
            
            if (detailsEl) {
                detailsEl.innerHTML = `
                    <div>📷 图片: ${(info.imagesSize / 1024).toFixed(1)} KB (${info.imageCount} 张)</div>
                    <div>📝 文字: ${(info.textsSize / 1024).toFixed(1)} KB (${info.textCount} 条)</div>
                    <div>🎠 轮播: ${(info.slidesSize / 1024).toFixed(1)} KB</div>
                    <div>💾 剩余: ${(info.freeSpace / 1024).toFixed(1)} KB</div>
                `;
            }
        } catch (e) {
            console.error('❌ 更新存储显示失败:', e);
        }
    }
    
    updateStorageDisplay();
    
    // 刷新存储空间
    document.getElementById('refreshStorageBtn').addEventListener('click', updateStorageDisplay);
    
    // 一键优化存储
    document.getElementById('optimizeStorageBtn').addEventListener('click', async () => {
        if (!confirm('🚀 一键优化存储\n\n此操作将：\n1. 清理所有孤立图片\n2. 重压缩所有图片以节省空间\n3. 清理无效的文字数据\n\n是否继续？')) {
            return;
        }
        
        const btn = document.getElementById('optimizeStorageBtn');
        const originalText = btn.textContent;
        
        try {
            // 步骤1：清理孤立图片
            btn.textContent = '⏳ 清理中...';
            btn.disabled = true;
            const beforeInfo = getStorageInfo();
            
            const cleanupResult = cleanupOrphanedImages();
            console.log(`🧹 清理孤立图片: ${cleanupResult.count} 张`);
            
            // 步骤2：清理无效文字数据
            btn.textContent = '⏳ 清理文字...';
            const textsCleanResult = cleanupInvalidTexts();
            console.log(`🧹 清理无效文字: ${textsCleanResult.count} 条`);
            
            // 步骤3：重压缩所有图片
            btn.textContent = '⏳ 压缩图片...';
            const recompressResult = await recompressAllImages(0.4, 1024, 768);
            console.log(`🗜️ 重压缩图片: ${recompressResult.processed} 张，节省 ${(recompressResult.saved / 1024).toFixed(1)} KB`);
            
            btn.textContent = '⏳ 完成...';
            
            const afterInfo = getStorageInfo();
            const totalSaved = beforeInfo.totalSize - afterInfo.totalSize;
            
            btn.textContent = originalText;
            btn.disabled = false;
            
            alert(
                `✅ 一键优化完成！\n\n` +
                `📊 优化结果:\n` +
                `├─ 清理孤立图片: ${cleanupResult.count} 张 (${(cleanupResult.size / 1024).toFixed(1)} KB)\n` +
                `├─ 清理无效文字: ${textsCleanResult.count} 条\n` +
                `├─ 重压缩图片: ${recompressResult.processed} 张 (节省 ${(recompressResult.saved / 1024).toFixed(1)} KB)\n` +
                `└─ 总计节省: ${(totalSaved / 1024).toFixed(1)} KB\n\n` +
                `💾 当前状态:\n` +
                `├─ 使用: ${(afterInfo.totalSize / 1024).toFixed(1)} KB (${afterInfo.usagePercent}%)\n` +
                `└─ 剩余: ${(afterInfo.freeSpace / 1024).toFixed(1)} KB`
            );
            
            refreshAllSections();
            updateStorageDisplay();
            
        } catch (err) {
            btn.textContent = originalText;
            btn.disabled = false;
            alert('❌ 优化失败: ' + err.message);
            console.error('优化失败:', err);
        }
    });
    
    // 清理孤立图片
    document.getElementById('cleanupOrphanedBtn').addEventListener('click', () => {
        if (confirm('🧹 确定要清理孤立的图片吗？\n\n孤立图片是指存储中存在但页面上不再使用的图片数据。')) {
            const result = cleanupOrphanedImages();
            if (result.count > 0) {
                alert(`✅ 已清理 ${result.count} 张孤立图片\n释放空间: ${(result.size / 1024).toFixed(1)} KB`);
                updateStorageDisplay();
            } else {
                alert('✅ 没有发现孤立图片，无需清理');
            }
        }
    });
    
    // 重压缩所有图片
    document.getElementById('recompressImagesBtn').addEventListener('click', () => {
        if (confirm('🗜️ 确定要重压缩所有图片吗？\n\n此操作会使用更激进的压缩设置来节省空间\n（可能会略微降低图片质量）')) {
            const btn = document.getElementById('recompressImagesBtn');
            const originalText = btn.textContent;
            btn.textContent = '⏳ 处理中...';
            btn.disabled = true;
            
            recompressAllImages(0.35, 800, 600).then(result => {
                btn.textContent = originalText;
                btn.disabled = false;
                
                if (result.saved > 0) {
                    alert(`✅ 图片重压缩完成！\n\n处理图片: ${result.processed} 张\n原始大小: ${(result.originalSize / 1024).toFixed(1)} KB\n压缩后: ${(result.newSize / 1024).toFixed(1)} KB\n节省空间: ${(result.saved / 1024).toFixed(1)} KB`);
                    refreshAllSections();
                    updateStorageDisplay();
                } else {
                    alert('ℹ️ 图片已经是最佳压缩状态，无需进一步压缩');
                }
            }).catch(err => {
                btn.textContent = originalText;
                btn.disabled = false;
                alert('❌ 图片压缩失败: ' + err.message);
            });
        }
    });
    
    // 清空所有图片
    document.getElementById('clearAllImagesBtn').addEventListener('click', () => {
        if (confirm('⚠️ 确定要清空所有自定义图片吗？\n\n此操作不可恢复！')) {
            localStorage.removeItem('luoyang_custom_images');
            alert('✅ 所有自定义图片已清空');
            refreshAllSections();
            document.body.removeChild(modal);
        }
    });
    
    // 上传图片
    document.querySelectorAll('.dash-upload-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.getElementById(`dash-input-${this.dataset.key}`).click();
        });
    });
    
    document.querySelectorAll('.dash-file-input').forEach(input => {
        input.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (!file) return;
            const key = this.dataset.key;
            const reader = new FileReader();
            reader.onload = function(ev) {
                const img = new Image();
                img.onload = async function() {
                    const compressed = compressImage(img, 1200, 900);
                    document.getElementById(`dash-img-${key}`).src = compressed;
                    
                    // 使用 saveCustomImage 函数确保存储空间检查和清理
                    const success = await saveCustomImage(key, compressed);
                    if (success) {
                        console.log(`✅ 图片已保存: ${key}`);
                        refreshAllSections();
                    } else {
                        alert('❌ 图片保存失败，请检查存储空间');
                    }
                };
                img.onerror = function() {
                    alert('❌ 图片加载失败');
                };
                img.src = ev.target.result;
            };
            reader.onerror = function() {
                alert('❌ 文件读取失败');
            };
            reader.readAsDataURL(file);
        });
    });
    
    // 裁剪
    document.querySelectorAll('.dash-crop-btn').forEach(btn => {
        btn.addEventListener('click', function() { openImageCropper(this.dataset.id); });
    });
    
    // 压缩
    document.querySelectorAll('.dash-compress-btn').forEach(btn => {
        btn.addEventListener('click', async function() {
            const id = this.dataset.id;
            const key = this.dataset.key;
            const imgEl = document.getElementById(id);
            if (!imgEl || !imgEl.src) return alert('❌ 请先上传图片');
            const tempImg = new Image();
            tempImg.onload = async function() {
                const compressed = compressImage(tempImg, 1200, 900);
                imgEl.src = compressed;
                
                // 使用 saveCustomImage 函数确保存储空间检查
                const success = await saveCustomImage(key, compressed);
                if (success) {
                    alert('✅ 图片已压缩');
                    refreshAllSections();
                } else {
                    alert('❌ 图片压缩后保存失败，请检查存储空间');
                }
            };
            tempImg.onerror = function() {
                alert('❌ 图片处理失败');
            };
            tempImg.src = imgEl.src;
        });
    });
    
    // 文字输入（防抖保存 + 刷新）
    let dashTextTimer = null;
    document.querySelectorAll('.dash-title-input, .dash-subtitle-input, .dash-website-input').forEach(input => {
        input.addEventListener('input', function() {
            const key = this.dataset.key;
            const texts = JSON.parse(localStorage.getItem('luoyang_custom_texts') || '{}');
            texts[key] = this.value;
            localStorage.setItem('luoyang_custom_texts', JSON.stringify(texts));
            clearTimeout(dashTextTimer);
            dashTextTimer = setTimeout(() => refreshAllSections(), 600);
        });
    });
    
    function refreshAllSections() {
         refreshHeroSlider();
         const cGrid = document.getElementById('cultureGrid');
         if (cGrid) { cGrid.innerHTML = ''; initCultureSection(); }
         const jGrid = document.querySelector('.journal-grid');
         if (jGrid) { jGrid.innerHTML = ''; initJournalSection(); }
         const aSection = document.querySelector('.archive-section');
         if (aSection) { aSection.innerHTML = ''; initArchiveSection(); }
         refreshDeveloperButtons();
         console.log('✅ 所有模块已刷新');
     }
    
    console.log('✅ 开发者总控面板已打开');
}

function openHeroManager() {
    if (!isDeveloperMode()) {
        const password = prompt('请输入管理密码：');
        if (password === '27149') {
            setDeveloperMode(true);
        } else if (password !== null) {
            alert('❌ 密码错误，请重试');
            return;
        } else {
            return;
        }
    }
    
    const savedImages = JSON.parse(localStorage.getItem('luoyang_custom_images') || '{}');
    const savedTexts = JSON.parse(localStorage.getItem('luoyang_custom_texts') || '{}');
    const customSlides = JSON.parse(localStorage.getItem('luoyang_custom_slides') || '[]');
    const disabledSlides = JSON.parse(localStorage.getItem('luoyang_disabled_slides') || '[]');
    const allSlides = [...heroSlidesData, ...customSlides];
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: flex-start;
        justify-content: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
        overflow-y: auto;
        padding: 20px;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
        background: #1a1a1a;
        border: 1px solid #333;
        border-radius: 16px;
        padding: 24px;
        max-width: 900px;
        width: 100%;
        margin-top: 60px;
        margin-bottom: 20px;
    `;
    
    content.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
            <div style="display: flex; align-items: center; gap: 12px;">
                <div style="width: 40px; height: 40px; background: rgba(201, 162, 39, 0.2); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c9a227" stroke-width="2">
                        <rect x="1" y="1" width="22" height="15" rx="2" ry="2"/><path d="M1 16h22M5 16v6a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-6"/>
                    </svg>
                </div>
                <div>
                    <h2 style="color: #c9a227; font-size: 24px; margin: 0;">🎠 轮播图管理</h2>
                    <p style="color: #666; font-size: 13px; margin: 2px 0 0 0;">管理首页轮播图的图片和文字内容</p>
                </div>
            </div>
            <button id="closeHeroManagerBtn" style="background: #333; color: #f5f5f5; border: none; padding: 10px 18px; border-radius: 8px; cursor: pointer; font-size: 14px; transition: all 0.2s;">✕ 关闭</button>
        </div>
        
        <!-- 轮播图列表 -->
        <div id="heroSlidesContainer" style="display: grid; gap: 20px;">
            ${allSlides.map((slide, index) => {
                const isCustom = index >= heroSlidesData.length;
                const isDisabled = disabledSlides.includes(index);
                const imageKey = `hero${index}`;
                const savedImage = savedImages[imageKey];
                const savedTitle = savedTexts[`heroTitle${index}`];
                const savedSubtitle = savedTexts[`heroSubtitle${index}`];
                
                return `
                    <div style="background: #242424; padding: 20px; border-radius: 12px; border: 1px solid ${isDisabled ? '#554' : '#333'}; ${isDisabled ? 'opacity: 0.6;' : ''}">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <span style="width: 36px; height: 36px; background: rgba(201, 162, 39, 0.2); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #c9a227; font-size: 16px; font-weight: 600;">${index + 1}</span>
                                <div>
                                    <h4 style="color: #c9a227; margin: 0; font-size: 16px; font-weight: 600;">${isCustom ? '自定义轮播图' : `轮播图 ${index + 1}`}</h4>
                                    <p style="color: #666; font-size: 12px; margin: 2px 0 0 0;">${isDisabled ? '状态: 已禁用' : '状态: 启用中'}</p>
                                </div>
                            </div>
                            <div style="display: flex; gap: 8px;">
                                <button class="hero-manager-btn" data-action="toggle" data-index="${index}" style="background: ${isDisabled ? '#22c55e' : '#f59e0b'}; color: #0d0d0d; border: none; padding: 8px 14px; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 600;">${isDisabled ? '启用' : '禁用'}</button>
                                ${isCustom ? `<button class="hero-manager-btn" data-action="delete" data-index="${index}" style="background: #ef4444; color: #fff; border: none; padding: 8px 14px; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 600;">删除</button>` : ''}
                            </div>
                        </div>
                        
                        <!-- 图片区域 -->
                        <div style="margin-bottom: 16px;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                                <label style="display: block; color: #b3b3b3; font-size: 12px;">图片</label>
                                <button class="hero-manager-btn" data-action="crop" data-index="${index}" style="background: #3b82f6; color: #fff; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 11px;">✂️ 裁剪</button>
                            </div>
                            <div style="position: relative; border-radius: 8px; overflow: hidden; aspect-ratio: 16/9;">
                                <img id="heroMgrPreview${index}" src="${savedImage || slide.image}" style="width: 100%; height: 100%; object-fit: cover;">
                                ${isDisabled ? '<div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center;"><span style="color: #fff; font-size: 18px;">已禁用</span></div>' : ''}
                            </div>
                            <div style="display: flex; gap: 8px; margin-top: 10px;">
                                <input type="file" id="heroMgrInput${index}" class="hero-mgr-file-input" data-index="${index}" accept=".jpg,.jpeg,.png" style="display: none;">
                                <button class="hero-manager-btn" data-action="upload" data-index="${index}" style="flex: 1; background: #333; color: #f5f5f5; border: none; padding: 10px; border-radius: 6px; cursor: pointer; font-size: 13px;">📤 上传图片</button>
                                <button class="hero-manager-btn" data-action="compress" data-index="${index}" style="background: #8b5cf6; color: #fff; border: none; padding: 10px; border-radius: 6px; cursor: pointer; font-size: 13px;">🗜️ 压缩</button>
                            </div>
                        </div>
                        
                        <!-- 文字编辑 -->
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                            <div>
                                <label style="display: block; color: #b3b3b3; font-size: 12px; margin-bottom: 4px;">标题</label>
                                <input type="text" class="hero-mgr-title-input" data-index="${index}" value="${savedTitle || slide.title}" 
                                    style="width: 100%; padding: 10px; background: #1a1a1a; border: 1px solid #333; border-radius: 6px; color: #f5f5f5; font-size: 14px;">
                            </div>
                            <div>
                                <label style="display: block; color: #b3b3b3; font-size: 12px; margin-bottom: 4px;">副标题</label>
                                <input type="text" class="hero-mgr-subtitle-input" data-index="${index}" value="${savedSubtitle || slide.subtitle}" 
                                    style="width: 100%; padding: 10px; background: #1a1a1a; border: 1px solid #333; border-radius: 6px; color: #f5f5f5; font-size: 14px;">
                            </div>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
        
        <!-- 添加新轮播图 -->
        <div style="background: linear-gradient(145deg, #2a2a2a, #1f1f1f); padding: 24px; border-radius: 12px; border: 2px dashed #444; margin-top: 20px;">
            <h4 style="color: #c9a227; margin: 0 0 20px 0; font-size: 18px; font-weight: 600;">➕ 添加新轮播图</h4>
            
            <div style="display: grid; gap: 14px;">
                <div>
                    <label style="display: block; color: #b3b3b3; font-size: 12px; margin-bottom: 6px;">📤 上传图片</label>
                    <input type="file" id="newHeroImageInput" accept=".jpg,.jpeg,.png" style="display: none;">
                    <button id="newHeroUploadBtn" style="width: 100%; background: linear-gradient(135deg, #c9a227, #b89028); color: #0d0d0d; border: none; padding: 14px; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 14px;">选择本地图片</button>
                </div>
                
                <div>
                    <label style="display: block; color: #b3b3b3; font-size: 12px; margin-bottom: 6px;">🔗 或输入图片URL</label>
                    <input type="text" id="newHeroImageUrl" placeholder="https://example.com/image.jpg" style="width: 100%; padding: 12px; background: #1a1a1a; border: 1px solid #333; border-radius: 8px; color: #f5f5f5; font-size: 14px;">
                </div>
                
                <div id="newHeroPreview" style="display: none;">
                    <label style="display: block; color: #b3b3b3; font-size: 12px; margin-bottom: 8px;">👁️ 图片预览</label>
                    <div style="border-radius: 8px; overflow: hidden; aspect-ratio: 16/9;">
                        <img id="newHeroPreviewImg" src="" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                    <div>
                        <label style="display: block; color: #b3b3b3; font-size: 12px; margin-bottom: 4px;">标题</label>
                        <input type="text" id="newHeroTitle" placeholder="输入轮播图标题" style="width: 100%; padding: 12px; background: #1a1a1a; border: 1px solid #333; border-radius: 8px; color: #f5f5f5; font-size: 14px;">
                    </div>
                    <div>
                        <label style="display: block; color: #b3b3b3; font-size: 12px; margin-bottom: 4px;">副标题</label>
                        <input type="text" id="newHeroSubtitle" placeholder="输入副标题描述" style="width: 100%; padding: 12px; background: #1a1a1a; border: 1px solid #333; border-radius: 8px; color: #f5f5f5; font-size: 14px;">
                    </div>
                </div>
                
                <button id="addNewHeroBtn" style="width: 100%; background: linear-gradient(135deg, #22c55e, #16a34a); color: #fff; border: none; padding: 14px; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 15px;">✅ 添加轮播图</button>
            </div>
        </div>
    `;
    
    modal.appendChild(content);
    document.body.appendChild(modal);
    setTimeout(() => { modal.style.opacity = '1'; }, 10);
    
    // 关闭按钮
    document.getElementById('closeHeroManagerBtn').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    // 管理按钮事件
    document.querySelectorAll('.hero-manager-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.dataset.action;
            const index = parseInt(this.dataset.index);
            
            if (action === 'toggle') {
                toggleSlideStatus(index);
            } else if (action === 'delete') {
                deleteSlide(index);
            } else if (action === 'upload') {
                document.getElementById(`heroMgrInput${index}`).click();
            } else if (action === 'crop') {
                openImageCropper(`heroMgrPreview${index}`);
            } else if (action === 'compress') {
                compressHeroImage(`heroMgrPreview${index}`);
            }
        });
    });
    
    // 文件上传事件
    document.querySelectorAll('.hero-mgr-file-input').forEach(input => {
        input.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (!file) return;
            
            const index = parseInt(this.dataset.index);
            const reader = new FileReader();
            reader.onload = function(event) {
                const img = new Image();
                img.onload = function() {
                    const compressed = compressImage(img, 1920, 1080);
                    document.getElementById(`heroMgrPreview${index}`).src = compressed;
                    
                    const savedImages = JSON.parse(localStorage.getItem('luoyang_custom_images') || '{}');
                    savedImages[`hero${index}`] = compressed;
                    localStorage.setItem('luoyang_custom_images', JSON.stringify(savedImages));
                    
                    // 刷新主页轮播图
                    refreshHeroSlider();
                    alert('✅ 图片已更新！');
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        });
    });
    
    // 文字输入事件
    let heroTextSaveTimer = null;
    document.querySelectorAll('.hero-mgr-title-input').forEach(input => {
        input.addEventListener('input', function() {
            const index = parseInt(this.dataset.index);
            const texts = JSON.parse(localStorage.getItem('luoyang_custom_texts') || '{}');
            texts[`heroTitle${index}`] = this.value;
            localStorage.setItem('luoyang_custom_texts', JSON.stringify(texts));
            
            // 防抖刷新主页轮播图
            clearTimeout(heroTextSaveTimer);
            heroTextSaveTimer = setTimeout(() => refreshHeroSlider(), 500);
        });
    });
    
    document.querySelectorAll('.hero-mgr-subtitle-input').forEach(input => {
        input.addEventListener('input', function() {
            const index = parseInt(this.dataset.index);
            const texts = JSON.parse(localStorage.getItem('luoyang_custom_texts') || '{}');
            texts[`heroSubtitle${index}`] = this.value;
            localStorage.setItem('luoyang_custom_texts', JSON.stringify(texts));
            
            // 防抖刷新主页轮播图
            clearTimeout(heroTextSaveTimer);
            heroTextSaveTimer = setTimeout(() => refreshHeroSlider(), 500);
        });
    });
    
    // 新轮播图上传
    document.getElementById('newHeroUploadBtn').addEventListener('click', () => {
        document.getElementById('newHeroImageInput').click();
    });
    
    document.getElementById('newHeroImageInput').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                const compressed = compressImage(img, 1920, 1080);
                document.getElementById('newHeroPreviewImg').src = compressed;
                document.getElementById('newHeroPreview').style.display = 'block';
                document.getElementById('newHeroImageUrl').value = '';
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    });
    
    // URL输入
    document.getElementById('newHeroImageUrl').addEventListener('change', function() {
        const url = this.value.trim();
        if (url) {
            document.getElementById('newHeroPreviewImg').src = url;
            document.getElementById('newHeroPreview').style.display = 'block';
        }
    });
    
    // 添加新轮播图
    document.getElementById('addNewHeroBtn').addEventListener('click', () => {
        const imageUrl = document.getElementById('newHeroPreviewImg').src;
        const title = document.getElementById('newHeroTitle').value.trim();
        const subtitle = document.getElementById('newHeroSubtitle').value.trim();
        const urlInput = document.getElementById('newHeroImageUrl').value.trim();
        
        if (!imageUrl || imageUrl === 'about:blank') {
            alert('❌ 请上传图片或输入图片URL');
            return;
        }
        
        const finalImageUrl = urlInput || imageUrl;
        const customSlides = JSON.parse(localStorage.getItem('luoyang_custom_slides') || '[]');
        const newIndex = heroSlidesData.length + customSlides.length;
        
        customSlides.push({
            image: finalImageUrl,
            title: title || '新轮播图',
            subtitle: subtitle || ''
        });
        localStorage.setItem('luoyang_custom_slides', JSON.stringify(customSlides));
        
        const savedImages = JSON.parse(localStorage.getItem('luoyang_custom_images') || '{}');
        savedImages[`hero${newIndex}`] = finalImageUrl;
        localStorage.setItem('luoyang_custom_images', JSON.stringify(savedImages));
        
        // 刷新主页轮播图
        refreshHeroSlider();
        alert('✅ 轮播图已添加！');
        
        // 清空表单
        document.getElementById('newHeroImageInput').value = '';
        document.getElementById('newHeroImageUrl').value = '';
        document.getElementById('newHeroTitle').value = '';
        document.getElementById('newHeroSubtitle').value = '';
        document.getElementById('newHeroPreview').style.display = 'none';
        
        // 刷新界面
        document.body.removeChild(modal);
        openHeroManager();
    });
    
    function toggleSlideStatus(index) {
        const disabledSlides = JSON.parse(localStorage.getItem('luoyang_disabled_slides') || '[]');
        const indexInArray = disabledSlides.indexOf(index);
        
        if (indexInArray > -1) {
            disabledSlides.splice(indexInArray, 1);
        } else {
            disabledSlides.push(index);
        }
        
        localStorage.setItem('luoyang_disabled_slides', JSON.stringify(disabledSlides));
        alert(indexInArray > -1 ? '✅ 轮播图已启用！' : '✅ 轮播图已禁用！');
        
        // 刷新主页轮播图
        refreshHeroSlider();
        document.body.removeChild(modal);
        openHeroManager();
    }
    
    function deleteSlide(index) {
        if (!confirm('确定要删除这个轮播图吗？')) return;
        
        const customSlides = JSON.parse(localStorage.getItem('luoyang_custom_slides') || '[]');
        const customIndex = index - heroSlidesData.length;
        
        if (customIndex >= 0 && customIndex < customSlides.length) {
            customSlides.splice(customIndex, 1);
            localStorage.setItem('luoyang_custom_slides', JSON.stringify(customSlides));
            
            const texts = JSON.parse(localStorage.getItem('luoyang_custom_texts') || '{}');
            const images = JSON.parse(localStorage.getItem('luoyang_custom_images') || '{}');
            
            for (let i = index; ; i++) {
                if (!texts[`heroTitle${i + 1}`] && !texts[`heroSubtitle${i + 1}`] && !images[`hero${i + 1}`]) break;
                texts[`heroTitle${i}`] = texts[`heroTitle${i + 1}`];
                texts[`heroSubtitle${i}`] = texts[`heroSubtitle${i + 1}`];
                images[`hero${i}`] = images[`hero${i + 1}`];
                delete texts[`heroTitle${i + 1}`];
                delete texts[`heroSubtitle${i + 1}`];
                delete images[`hero${i + 1}`];
            }
            
            localStorage.setItem('luoyang_custom_texts', JSON.stringify(texts));
            localStorage.setItem('luoyang_custom_images', JSON.stringify(images));
            
            const disabledSlides = JSON.parse(localStorage.getItem('luoyang_disabled_slides') || '[]');
            const newDisabled = disabledSlides.filter(i => i < index).concat(disabledSlides.filter(i => i > index).map(i => i - 1));
            localStorage.setItem('luoyang_disabled_slides', JSON.stringify(newDisabled));
            
            // 清理无效数据并刷新主页轮播图
            cleanupHeroData();
            refreshHeroSlider();
            alert('✅ 轮播图已删除！');
            
            document.body.removeChild(modal);
            openHeroManager();
        }
    }
    
    function compressHeroImage(previewId) {
        const img = document.getElementById(previewId);
        if (!img || !img.src) {
            alert('❌ 请先选择图片');
            return;
        }
        
        const originalSize = img.src.length;
        const image = new Image();
        image.onload = function() {
            const compressed = compressImage(image, 1200, 800);
            const compressedSize = compressed.length;
            const savedPercent = Math.round((1 - compressedSize / originalSize) * 100);
            
            img.src = compressed;
            
            const index = parseInt(previewId.replace('heroMgrPreview', ''));
            const savedImages = JSON.parse(localStorage.getItem('luoyang_custom_images') || '{}');
            savedImages[`hero${index}`] = compressed;
            localStorage.setItem('luoyang_custom_images', JSON.stringify(savedImages));
            
            alert(`✅ 图片压缩完成！\n原大小: ${(originalSize / 1024).toFixed(1)} KB\n压缩后: ${(compressedSize / 1024).toFixed(1)} KB\n节省: ${savedPercent}%`);
        };
        image.src = img.src;
    }
}
