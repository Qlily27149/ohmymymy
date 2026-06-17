// 初始数据文件 - 用于部署时预置自定义内容
// 用户可以通过"导出所有数据"功能获取当前数据，然后更新此文件
// 注意：图片以 base64 格式存储，文件可能会很大

const initialCustomImages = {};

const initialCustomTexts = {};

const initialFavorites = [];

const initialMarkerData = [];

const initialCustomSlides = [];

const initialDisabledSlides = [];

const initialHeroStyles = {};

function loadInitialData() {
    const hasImages = localStorage.getItem('luoyang_custom_images');
    const hasTexts = localStorage.getItem('luoyang_custom_texts');
    const hasFavorites = localStorage.getItem('luoyang_favorites');
    const hasMarkerData = localStorage.getItem('luoyang_marker_data');
    const hasCustomSlides = localStorage.getItem('luoyang_custom_slides');
    
    if (!hasImages || Object.keys(JSON.parse(hasImages || '{}')).length === 0) {
        localStorage.setItem('luoyang_custom_images', JSON.stringify(initialCustomImages));
        console.log('📦 已加载初始图片数据');
    }
    
    if (!hasTexts || Object.keys(JSON.parse(hasTexts || '{}')).length === 0) {
        localStorage.setItem('luoyang_custom_texts', JSON.stringify(initialCustomTexts));
        console.log('📦 已加载初始文本数据');
    }
    
    if (!hasFavorites) {
        localStorage.setItem('luoyang_favorites', JSON.stringify(initialFavorites));
        console.log('📦 已加载初始收藏数据');
    }
    
    if (!hasMarkerData || JSON.parse(hasMarkerData || '[]').length === 0) {
        localStorage.setItem('luoyang_marker_data', JSON.stringify(initialMarkerData));
        console.log('📦 已加载初始地图标记数据');
    }
    
    if (!hasCustomSlides || JSON.parse(hasCustomSlides || '[]').length === 0) {
        localStorage.setItem('luoyang_custom_slides', JSON.stringify(initialCustomSlides));
        console.log('📦 已加载初始轮播图数据');
    }
    
    if (!localStorage.getItem('luoyang_disabled_slides')) {
        localStorage.setItem('luoyang_disabled_slides', JSON.stringify(initialDisabledSlides));
        console.log('📦 已加载初始禁用轮播图数据');
    }
    
    if (!localStorage.getItem('luoyang_hero_styles')) {
        localStorage.setItem('luoyang_hero_styles', JSON.stringify(initialHeroStyles));
        console.log('📦 已加载初始轮播图样式数据');
    }
}

function getInitialData() {
    return {
        customImages: initialCustomImages,
        customTexts: initialCustomTexts,
        favorites: initialFavorites,
        markerData: initialMarkerData,
        customSlides: initialCustomSlides,
        disabledSlides: initialDisabledSlides,
        heroStyles: initialHeroStyles
    };
}

function updateInitialData(newData) {
    console.log('⚠️ updateInitialData 仅用于开发环境，生产环境请手动编辑此文件');
    console.log('新数据:', JSON.stringify(newData, null, 2).substring(0, 500), '...');
}

window.initialData = {
    load: loadInitialData,
    get: getInitialData,
    update: updateInitialData
};