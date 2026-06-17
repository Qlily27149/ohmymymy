window.tagTypes = {
    status: [
        { id: 'open', name: '开放中', color: '#22c55e', bgColor: 'rgba(34, 197, 94, 0.15)' },
        { id: 'closed', name: '关闭', color: '#ef4444', bgColor: 'rgba(239, 68, 68, 0.15)' },
        { id: 'maintenance', name: '维护中', color: '#f59e0b', bgColor: 'rgba(245, 158, 11, 0.15)' },
        { id: 'limited', name: '限流', color: '#8b5cf6', bgColor: 'rgba(139, 92, 246, 0.15)' }
    ],
    type: [
        { id: 'historical', name: '历史古迹', color: '#3b82f6', bgColor: 'rgba(59, 130, 246, 0.15)' },
        { id: 'natural', name: '自然景观', color: '#10b981', bgColor: 'rgba(16, 185, 129, 0.15)' },
        { id: 'cultural', name: '文化场馆', color: '#f59e0b', bgColor: 'rgba(245, 158, 11, 0.15)' },
        { id: 'food', name: '美食', color: '#ef4444', bgColor: 'rgba(239, 68, 68, 0.15)' },
        { id: 'craft', name: '手工艺', color: '#8b5cf6', bgColor: 'rgba(139, 92, 246, 0.15)' }
    ]
};

window.archiveData = {
    food: [
        {
            id: 1,
            name: "洛阳水席",
            description: "洛阳传统名菜，24道菜道道带汤，风味独特",
            image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
            location: { lat: 34.6257, lng: 112.4539 },
            locationName: "洛阳市区",
            tags: [{ type: 'type', tagId: 'food' }]
        },
        {
            id: 2,
            name: "牡丹燕菜",
            description: "以萝卜为主要原料，形如牡丹，清香爽口",
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80",
            location: { lat: 34.6257, lng: 112.4539 },
            locationName: "洛阳市区"
        },
        {
            id: 3,
            name: "小街锅贴",
            description: "金黄酥脆的锅贴，配上酸辣汤，美味至极",
            image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
            location: { lat: 34.6237, lng: 112.4589 },
            locationName: "西工小街"
        },
        {
            id: 4,
            name: "酸浆面条",
            description: "用酸浆发酵制成的面条，酸爽开胃",
            image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
            location: { lat: 34.6257, lng: 112.4539 },
            locationName: "洛阳市区"
        },
        {
            id: 5,
            name: "新安烫面角",
            description: "新安县特色小吃，皮薄馅大，鲜香可口",
            image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
            location: { lat: 34.7247, lng: 112.1769 },
            locationName: "新安县"
        },
        {
            id: 6,
            name: "孟津梨",
            description: "孟津特产，皮薄肉厚，汁多味甜",
            image: "https://images.unsplash.com/photo-1579613832488-191322ee64b0?w=600&q=80",
            location: { lat: 34.8127, lng: 112.4239 },
            locationName: "孟津区"
        }
    ],
    craft: [
        {
            id: 101,
            name: "唐三彩",
            description: "唐代陶瓷艺术珍品，色彩斑斓，造型生动",
            image: "https://images.unsplash.com/photo-1588486467745-8069034ffd6d?w=600&q=80",
            location: { lat: 34.6257, lng: 112.4539 },
            locationName: "洛阳市区"
        },
        {
            id: 102,
            name: "洛阳剪纸",
            description: "传统民间艺术，剪纸作品精美细腻",
            image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=80",
            location: { lat: 34.6257, lng: 112.4539 },
            locationName: "洛阳市区"
        },
        {
            id: 103,
            name: "澄泥砚",
            description: "中国四大名砚之一，以黄河澄泥制成",
            image: "https://images.unsplash.com/photo-1586182057814-1521731e4473?w=600&q=80",
            location: { lat: 34.7457, lng: 112.2539 },
            locationName: "新安县"
        },
        {
            id: 104,
            name: "牡丹瓷",
            description: "将牡丹与陶瓷完美结合的艺术品",
            image: "https://images.unsplash.com/photo-1583121276288-262df3afc4e3?w=600&q=80",
            location: { lat: 34.6257, lng: 112.4539 },
            locationName: "洛阳市区"
        },
        {
            id: 105,
            name: "洛绣",
            description: "传统刺绣工艺，针法细腻，图案精美",
            image: "https://images.unsplash.com/photo-1544473487-c4fd4a8544e0?w=600&q=80",
            location: { lat: 34.6257, lng: 112.4539 },
            locationName: "洛阳市区"
        },
        {
            id: 106,
            name: "面塑",
            description: "用面粉捏制各种形象，栩栩如生",
            image: "https://images.unsplash.com/photo-1571877227200-c2d32456f306?w=600&q=80",
            location: { lat: 34.6257, lng: 112.4539 },
            locationName: "洛阳市区"
        }
    ],
    fengHua: [
        {
            id: 201,
            name: "龙门石窟",
            description: "中国四大石窟之一，世界文化遗产，始凿于北魏孝文帝年间",
            image: "https://images.unsplash.com/photo-1531971418865-487f516101c0?w=600&q=80",
            location: { lat: 34.5135, lng: 112.4746 },
            locationName: "洛龙区",
            mapPointName: "龙门石窟",
            website: "",
            tags: [{ type: 'status', tagId: 'open' }, { type: 'type', tagId: 'historical' }]
        },
        {
            id: 202,
            name: "白马寺",
            description: "中国第一古刹，佛教传入中国后兴建的第一座官办寺院",
            image: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=600&q=80",
            location: { lat: 34.7085, lng: 112.6276 },
            locationName: "瀍河区",
            mapPointName: "白马寺",
            website: "",
            tags: [{ type: 'status', tagId: 'open' }, { type: 'type', tagId: 'historical' }]
        },
        {
            id: 203,
            name: "应天门",
            description: "隋唐洛阳城宫城正南门，被誉为天下第一门",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
            location: { lat: 34.6275, lng: 112.4546 },
            locationName: "西工区",
            mapPointName: "应天门",
            website: "",
            tags: [{ type: 'status', tagId: 'open' }, { type: 'type', tagId: 'historical' }]
        },
        {
            id: 204,
            name: "洛阳博物馆",
            description: "国家一级博物馆，馆藏文物40余万件",
            image: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=600&q=80",
            location: { lat: 34.6105, lng: 112.4296 },
            locationName: "洛龙区",
            mapPointName: "洛阳博物馆",
            website: "",
            tags: [{ type: 'status', tagId: 'open' }, { type: 'type', tagId: 'cultural' }]
        },
        {
            id: 205,
            name: "王城公园",
            description: "洛阳市最大的综合性公园，集牡丹观赏与历史文化于一体",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
            location: { lat: 34.6395, lng: 112.4246 },
            locationName: "西工区",
            mapPointName: "王城公园",
            website: "",
            tags: [{ type: 'status', tagId: 'open' }, { type: 'type', tagId: 'natural' }]
        },
        {
            id: 206,
            name: "关林庙",
            description: "埋葬关羽首级的地方，全国重点文物保护单位",
            image: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=600&q=80",
            location: { lat: 34.5735, lng: 112.4656 },
            locationName: "洛龙区",
            mapPointName: "关林庙",
            website: "",
            tags: [{ type: 'status', tagId: 'maintenance' }, { type: 'type', tagId: 'historical' }]
        },
        {
            id: 208,
            name: "老君山",
            description: "天下无双圣境，世界第一仙山",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
            location: { lat: 33.8135, lng: 111.7246 },
            locationName: "栾川县",
            mapPointName: "老君山",
            website: "",
            tags: [{ type: 'status', tagId: 'open' }, { type: 'type', tagId: 'natural' }]
        }
    ]
};

window.mapPoints = [
    {
        id: 1,
        name: "龙门石窟",
        lat: 34.5135,
        lng: 112.4746,
        description: "中国四大石窟之一，世界文化遗产",
        image: "https://images.unsplash.com/photo-1531971418865-487f516101c0?w=300&q=80"
    },
    {
        id: 2,
        name: "白马寺",
        lat: 34.7252,
        lng: 112.4786,
        description: "中国第一座官办寺院，佛教传入中国后兴建的第一座官办寺院",
        image: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=300&q=80"
    },
    {
        id: 3,
        name: "应天门",
        lat: 34.6234,
        lng: 112.4579,
        description: "隋唐洛阳城宫城正南门，被誉为'天下第一门'",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&q=80"
    },
    {
        id: 4,
        name: "洛邑古城",
        lat: 34.6287,
        lng: 112.4709,
        description: "展现洛阳古城风貌的历史文化街区",
        image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=300&q=80"
    },
    {
        id: 5,
        name: "洛阳博物馆",
        lat: 34.6057,
        lng: 112.4389,
        description: "国家一级博物馆，馆藏丰富",
        image: "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?w=300&q=80"
    },
    {
        id: 6,
        name: "隋唐大运河博物馆",
        lat: 34.6347,
        lng: 112.4859,
        description: "展示隋唐大运河历史文化的专题博物馆",
        image: "https://images.unsplash.com/photo-1611262588024-1e641d390988?w=300&q=80"
    }
];
