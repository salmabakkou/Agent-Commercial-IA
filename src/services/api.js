// ===== Mock Data & API Layer =====
// In production, these would connect to Google Sheets via n8n webhooks

// Product catalog
export const products = [
    {
        id: 1,
        name: "Tapis Berbère Azilal",
        nameAr: "زربية أمازيغية أزيلال",
        nameEn: "Azilal Berber Rug",
        description: "Tapis fait main avec des motifs géométriques traditionnels berbères. Laine naturelle teinte à la main.",
        descriptionEn: "Handmade rug with traditional Berber geometric patterns. Naturally hand-dyed wool.",
        descriptionAr: "زربية مصنوعة يدوياً بنقوش هندسية أمازيغية تقليدية. صوف طبيعي مصبوغ يدوياً.",
        price: 2500,
        originalPrice: 3200,
        currency: "MAD",
        category: "tapis",
        stock: 8,
        image: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=600",
        rating: 4.8,
        reviews: 124,
        origin: "Azilal",
        material: "Laine naturelle",
        dimensions: "200x150 cm",
    },
    {
        id: 2,
        name: "Lanterne Marocaine Cuivre",
        nameAr: "فانوس مغربي نحاسي",
        nameEn: "Moroccan Copper Lantern",
        description: "Lanterne artisanale en cuivre ciselé avec des motifs floraux. Crée une ambiance chaleureuse.",
        descriptionEn: "Artisanal chiseled copper lantern with floral patterns. Creates a warm ambiance.",
        descriptionAr: "فانوس حرفي من النحاس المنقوش بنقوش زهرية. يخلق أجواء دافئة.",
        price: 450,
        originalPrice: 600,
        currency: "MAD",
        category: "luminaire",
        stock: 15,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600",
        rating: 4.6,
        reviews: 89,
        origin: "Marrakech",
        material: "Cuivre",
        dimensions: "40x20 cm",
    },
    {
        id: 3,
        name: "Tajine Décoratif Fassi",
        nameAr: "طاجين ديكوري فاسي",
        nameEn: "Fes Decorative Tajine",
        description: "Tajine en céramique peint à la main avec des motifs traditionnels de Fès. Pièce décorative unique.",
        descriptionEn: "Hand-painted ceramic tajine with traditional Fes patterns. Unique decorative piece.",
        descriptionAr: "طاجين من الخزف مرسوم يدوياً بنقوش فاسية تقليدية. قطعة ديكورية فريدة.",
        price: 350,
        originalPrice: 450,
        currency: "MAD",
        category: "ceramique",
        stock: 22,
        image: "https://images.unsplash.com/photo-1579656592043-a20e25a4c936?w=600",
        rating: 4.9,
        reviews: 156,
        origin: "Fès",
        material: "Céramique",
        dimensions: "30x25 cm",
    },
    {
        id: 4,
        name: "Babouches en Cuir",
        nameAr: "بلغة جلدية",
        nameEn: "Leather Babouches",
        description: "Babouches traditionnelles en cuir souple, teintées à la main. Confort et authenticité.",
        descriptionEn: "Traditional soft leather babouches, hand-dyed. Comfort and authenticity.",
        descriptionAr: "بلغة تقليدية من الجلد الطري، مصبوغة يدوياً. راحة وأصالة.",
        price: 180,
        originalPrice: 250,
        currency: "MAD",
        category: "cuir",
        stock: 35,
        image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600",
        rating: 4.7,
        reviews: 203,
        origin: "Marrakech",
        material: "Cuir naturel",
        dimensions: "Pointures 36-45",
    },
    {
        id: 5,
        name: "Pouf Marocain",
        nameAr: "بوف مغربي",
        nameEn: "Moroccan Pouf",
        description: "Pouf en cuir véritable avec broderies artisanales. Rembourré à la main.",
        descriptionEn: "Genuine leather pouf with artisanal embroidery. Hand-stuffed.",
        descriptionAr: "بوف من الجلد الحقيقي بتطريز حرفي. محشو يدوياً.",
        price: 650,
        originalPrice: 850,
        currency: "MAD",
        category: "cuir",
        stock: 12,
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600",
        rating: 4.5,
        reviews: 67,
        origin: "Marrakech",
        material: "Cuir véritable",
        dimensions: "50x50x35 cm",
    },
    {
        id: 6,
        name: "Plateau en Thuya",
        nameAr: "صينية من خشب العرعار",
        nameEn: "Thuya Wood Tray",
        description: "Plateau artisanal en bois de thuya avec incrustation de nacre. Pièce unique.",
        descriptionEn: "Artisanal thuya wood tray with mother-of-pearl inlay. Unique piece.",
        descriptionAr: "صينية حرفية من خشب العرعار بترصيع الصدف. قطعة فريدة.",
        price: 320,
        originalPrice: 400,
        currency: "MAD",
        category: "bois",
        stock: 18,
        image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600",
        rating: 4.8,
        reviews: 45,
        origin: "Essaouira",
        material: "Bois de Thuya",
        dimensions: "40x30 cm",
    },
];

// Categories
export const categories = [
    { id: "all", name: "Tout", nameEn: "All", nameAr: "الكل", icon: "✦" },
    { id: "tapis", name: "Tapis", nameEn: "Rugs", nameAr: "زرابي", icon: "🏠" },
    { id: "luminaire", name: "Luminaires", nameEn: "Lighting", nameAr: "إنارة", icon: "🕯️" },
    { id: "ceramique", name: "Céramique", nameEn: "Ceramics", nameAr: "خزفيات", icon: "🏺" },
    { id: "cuir", name: "Cuir", nameEn: "Leather", nameAr: "جلود", icon: "👜" },
    { id: "bois", name: "Bois", nameEn: "Wood", nameAr: "خشب", icon: "🪵" },
];

// Mock orders
export const mockOrders = [
    {
        id: "CMD-2024-001",
        date: "2024-12-15",
        status: "delivered",
        items: [
            { name: "Tapis Berbère Azilal", quantity: 1, price: 2500 },
        ],
        total: 2500,
        customer: { name: "Ahmed Benali", email: "ahmed@email.com", city: "Casablanca" },
    },
    {
        id: "CMD-2024-002",
        date: "2024-12-18",
        status: "shipped",
        items: [
            { name: "Lanterne Marocaine Cuivre", quantity: 2, price: 450 },
            { name: "Babouches en Cuir", quantity: 1, price: 180 },
        ],
        total: 1080,
        customer: { name: "Marie Dupont", email: "marie@email.com", city: "Paris" },
    },
    {
        id: "CMD-2024-003",
        date: "2024-12-20",
        status: "processing",
        items: [
            { name: "Pouf Marocain", quantity: 1, price: 650 },
        ],
        total: 650,
        customer: { name: "John Smith", email: "john@email.com", city: "London" },
    },
    {
        id: "CMD-2024-004",
        date: "2024-12-22",
        status: "pending",
        items: [
            { name: "Tajine Décoratif Fassi", quantity: 3, price: 350 },
            { name: "Plateau en Thuya", quantity: 1, price: 320 },
        ],
        total: 1370,
        customer: { name: "Fatima Zahra", email: "fatima@email.com", city: "Rabat" },
    },
];

// Status labels
export const statusLabels = {
    pending: { fr: "En attente", en: "Pending", ar: "في الانتظار", color: "#fbbf24" },
    processing: { fr: "En traitement", en: "Processing", ar: "قيد المعالجة", color: "#60a5fa" },
    shipped: { fr: "Expédié", en: "Shipped", ar: "تم الشحن", color: "#a78bfa" },
    delivered: { fr: "Livré", en: "Delivered", ar: "تم التسليم", color: "#34d399" },
    cancelled: { fr: "Annulé", en: "Cancelled", ar: "ملغى", color: "#f87171" },
};

// Format price
export function formatPrice(price, currency = "MAD") {
    return `${price.toLocaleString('fr-FR')} ${currency}`;
}

// Simulate API call delay
export function simulateDelay(ms = 800) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Get product by id
export function getProductById(id) {
    return products.find(p => p.id === parseInt(id));
}

// Get products by category
export function getProductsByCategory(category) {
    if (category === 'all') return products;
    return products.filter(p => p.category === category);
}

// Search products
export function searchProducts(query) {
    const q = query.toLowerCase();
    return products.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.nameEn.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.origin.toLowerCase().includes(q)
    );
}

// Translations
export const translations = {
    fr: {
        nav: {
            home: "Accueil",
            catalog: "Catalogue",
            chat: "Négocier",
            tracking: "Suivi",
            admin: "Admin",
        },
        home: {
            hero_title: "L'Art du Souk,",
            hero_title2: "Réinventé par l'IA",
            hero_subtitle: "Négociez vos pièces artisanales marocaines avec notre agent IA intelligent. L'expérience authentique du souk, disponible 24/7.",
            cta_chat: "Commencer à négocier",
            cta_catalog: "Explorer le catalogue",
            feature1_title: "Négociation IA",
            feature1_desc: "Notre agent comprend l'art de la négociation marocaine et vous propose les meilleurs prix.",
            feature2_title: "Artisanat Authentique",
            feature2_desc: "Chaque pièce est vérifiée et certifiée par nos artisans partenaires.",
            feature3_title: "Livraison Mondiale",
            feature3_desc: "Recevez vos trésors du souk partout dans le monde, en toute sécurité.",
            stats_products: "Produits",
            stats_artisans: "Artisans",
            stats_countries: "Pays livrés",
            stats_satisfaction: "Satisfaction",
        },
        catalog: {
            title: "Notre Catalogue",
            subtitle: "Découvrez notre sélection d'artisanat marocain authentique",
            search: "Rechercher un produit...",
            add_to_cart: "Ajouter au panier",
            negotiate: "Négocier le prix",
            in_stock: "En stock",
            out_of_stock: "Rupture de stock",
            origin: "Origine",
            material: "Matière",
        },
        chat: {
            title: "Négociez avec SoukBot",
            subtitle: "Notre agent IA maîtrise l'art de la négociation. Proposez votre prix !",
            placeholder: "Tapez votre message...",
            send: "Envoyer",
            welcome: "Bienvenue au Souk ! 🕌 Je suis votre agent commercial IA. Comment puis-je vous aider ? Vous cherchez un produit spécifique ou souhaitez négocier un prix ?",
            typing: "SoukBot est en train d'écrire",
        },
        tracking: {
            title: "Suivi de Commande",
            subtitle: "Suivez l'état de vos commandes en temps réel",
            search: "Entrez votre numéro de commande...",
            track: "Suivre",
            order_id: "N° Commande",
            date: "Date",
            status: "Statut",
            total: "Total",
            items: "Articles",
        },
        admin: {
            title: "Dashboard Admin",
            subtitle: "Gérez vos produits, commandes et conversations",
            total_revenue: "Revenu total",
            total_orders: "Commandes",
            total_products: "Produits",
            conversations: "Conversations",
            recent_orders: "Commandes récentes",
            customer: "Client",
            city: "Ville",
        },
    },
    en: {
        nav: {
            home: "Home",
            catalog: "Catalog",
            chat: "Negotiate",
            tracking: "Tracking",
            admin: "Admin",
        },
        home: {
            hero_title: "The Art of the Souk,",
            hero_title2: "Reinvented by AI",
            hero_subtitle: "Negotiate your Moroccan artisanal pieces with our intelligent AI agent. The authentic souk experience, available 24/7.",
            cta_chat: "Start Negotiating",
            cta_catalog: "Explore Catalog",
            feature1_title: "AI Negotiation",
            feature1_desc: "Our agent understands the art of Moroccan negotiation and offers you the best prices.",
            feature2_title: "Authentic Craftsmanship",
            feature2_desc: "Every piece is verified and certified by our partner artisans.",
            feature3_title: "Worldwide Delivery",
            feature3_desc: "Receive your souk treasures anywhere in the world, safely.",
            stats_products: "Products",
            stats_artisans: "Artisans",
            stats_countries: "Countries",
            stats_satisfaction: "Satisfaction",
        },
        catalog: {
            title: "Our Catalog",
            subtitle: "Discover our selection of authentic Moroccan craftsmanship",
            search: "Search for a product...",
            add_to_cart: "Add to Cart",
            negotiate: "Negotiate Price",
            in_stock: "In Stock",
            out_of_stock: "Out of Stock",
            origin: "Origin",
            material: "Material",
        },
        chat: {
            title: "Negotiate with SoukBot",
            subtitle: "Our AI agent masters the art of negotiation. Name your price!",
            placeholder: "Type your message...",
            send: "Send",
            welcome: "Welcome to the Souk! 🕌 I'm your AI commercial agent. How can I help you? Are you looking for a specific product or would you like to negotiate a price?",
            typing: "SoukBot is typing",
        },
        tracking: {
            title: "Order Tracking",
            subtitle: "Track your orders in real time",
            search: "Enter your order number...",
            track: "Track",
            order_id: "Order #",
            date: "Date",
            status: "Status",
            total: "Total",
            items: "Items",
        },
        admin: {
            title: "Admin Dashboard",
            subtitle: "Manage your products, orders and conversations",
            total_revenue: "Total Revenue",
            total_orders: "Orders",
            total_products: "Products",
            conversations: "Conversations",
            recent_orders: "Recent Orders",
            customer: "Customer",
            city: "City",
        },
    },
    ar: {
        nav: {
            home: "الرئيسية",
            catalog: "الكتالوج",
            chat: "تفاوض",
            tracking: "تتبع",
            admin: "لوحة التحكم",
        },
        home: {
            hero_title: "فن السوق،",
            hero_title2: "أعيد اختراعه بالذكاء الاصطناعي",
            hero_subtitle: "تفاوض على قطعك الحرفية المغربية مع وكيلنا الذكي. تجربة السوق الأصيلة، متاحة على مدار الساعة.",
            cta_chat: "ابدأ التفاوض",
            cta_catalog: "استكشف الكتالوج",
            feature1_title: "تفاوض بالذكاء الاصطناعي",
            feature1_desc: "وكيلنا يفهم فن التفاوض المغربي ويقدم لك أفضل الأسعار.",
            feature2_title: "حرف يدوية أصيلة",
            feature2_desc: "كل قطعة محققة ومعتمدة من طرف حرفيينا الشركاء.",
            feature3_title: "توصيل عالمي",
            feature3_desc: "استلم كنوز السوق في أي مكان في العالم، بأمان تام.",
            stats_products: "منتج",
            stats_artisans: "حرفي",
            stats_countries: "بلد",
            stats_satisfaction: "رضا",
        },
        catalog: {
            title: "كتالوجنا",
            subtitle: "اكتشف مجموعتنا من الحرف اليدوية المغربية الأصيلة",
            search: "البحث عن منتج...",
            add_to_cart: "أضف للسلة",
            negotiate: "تفاوض على السعر",
            in_stock: "متوفر",
            out_of_stock: "نفذ المخزون",
            origin: "الأصل",
            material: "المادة",
        },
        chat: {
            title: "تفاوض مع سوق بوت",
            subtitle: "وكيلنا الذكي يتقن فن التفاوض. قدم سعرك!",
            placeholder: "اكتب رسالتك...",
            send: "إرسال",
            welcome: "مرحبا بك في السوق! 🕌 أنا وكيلك التجاري الذكي. كيف يمكنني مساعدتك؟ هل تبحث عن منتج معين أو ترغب في التفاوض على سعر؟",
            typing: "سوق بوت يكتب",
        },
        tracking: {
            title: "تتبع الطلب",
            subtitle: "تابع حالة طلباتك في الوقت الحقيقي",
            search: "أدخل رقم طلبك...",
            track: "تتبع",
            order_id: "رقم الطلب",
            date: "التاريخ",
            status: "الحالة",
            total: "المجموع",
            items: "المنتجات",
        },
        admin: {
            title: "لوحة التحكم",
            subtitle: "إدارة المنتجات والطلبات والمحادثات",
            total_revenue: "إجمالي الإيرادات",
            total_orders: "الطلبات",
            total_products: "المنتجات",
            conversations: "المحادثات",
            recent_orders: "الطلبات الأخيرة",
            customer: "العميل",
            city: "المدينة",
        },
    },
};
