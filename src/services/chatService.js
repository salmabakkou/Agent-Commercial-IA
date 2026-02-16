// ===== Chat Service =====
// AI negotiation logic. In production, this connects to Gemini API via n8n webhook.

import { products, formatPrice } from './api';

// Simulated negotiation state
const negotiationState = new Map();

// Extract product mention from message
function findMentionedProduct(message) {
    const msg = message.toLowerCase();
    return products.find(p =>
        msg.includes(p.name.toLowerCase()) ||
        msg.includes(p.nameEn.toLowerCase()) ||
        msg.includes(p.nameAr) ||
        msg.includes(p.category)
    );
}

// Parse price from message
function extractPrice(message) {
    const match = message.match(/(\d[\d\s,.]*)/);
    if (match) {
        return parseInt(match[1].replace(/[\s,.]/g, ''));
    }
    return null;
}

// Generate AI response based on context
function generateResponse(message, lang = 'fr') {
    const msg = message.toLowerCase();

    // Greeting patterns
    const greetings = ['bonjour', 'salut', 'hello', 'hi', 'hey', 'salam', 'مرحبا', 'السلام'];
    if (greetings.some(g => msg.includes(g))) {
        const responses = {
            fr: "Ahlan wa sahlan ! 🌙 Bienvenue dans notre souk virtuel ! Je suis ravi de vous accueillir. Que recherchez-vous aujourd'hui ? Un magnifique tapis berbère, une lanterne en cuivre, ou peut-être des babouches en cuir ? Je suis là pour vous aider et, bien sûr, pour négocier ! 😄",
            en: "Ahlan wa sahlan! 🌙 Welcome to our virtual souk! I'm delighted to welcome you. What are you looking for today? A beautiful Berber rug, a copper lantern, or perhaps leather babouches? I'm here to help and, of course, to negotiate! 😄",
            ar: "أهلاً وسهلاً! 🌙 مرحباً بك في سوقنا الافتراضي! يسعدني استقبالك. ماذا تبحث عنه اليوم؟ زربية أمازيغية جميلة، فانوس نحاسي، أو ربما بلغة جلدية؟ أنا هنا لمساعدتك وبالطبع للتفاوض! 😄",
        };
        return responses[lang] || responses.fr;
    }

    // Product inquiry
    const product = findMentionedProduct(message);
    if (product) {
        negotiationState.set('currentProduct', product);
        negotiationState.set('minPrice', Math.floor(product.price * 0.7));
        negotiationState.set('currentOffer', product.price);

        const responses = {
            fr: `Ah, excellent choix ! 👁️ Le **${product.name}** est une pièce magnifique de ${product.origin}. Prix affiché : **${formatPrice(product.price)}**, mais entre nous... on peut en discuter 😉\n\nC'est fait en **${product.material}** par nos meilleurs artisans. Il ne reste que **${product.stock} pièces** en stock !\n\nVous avez un budget en tête ? Faites-moi une proposition ! 🤝`,
            en: `Ah, excellent choice! 👁️ The **${product.nameEn}** is a magnificent piece from ${product.origin}. Listed price: **${formatPrice(product.price)}**, but between us... we can discuss it 😉\n\nIt's made of **${product.material}** by our finest artisans. Only **${product.stock} pieces** left in stock!\n\nDo you have a budget in mind? Make me an offer! 🤝`,
            ar: `آه، اختيار ممتاز! 👁️ **${product.nameAr}** قطعة رائعة من ${product.origin}. السعر المعروض: **${formatPrice(product.price)}**، لكن بيننا... يمكننا التفاوض 😉\n\nمصنوع من **${product.material}** على يد أمهر حرفيينا. بقي فقط **${product.stock} قطع** في المخزون!\n\nهل لديك ميزانية محددة؟ قدم لي عرضك! 🤝`,
        };
        return responses[lang] || responses.fr;
    }

    // Price negotiation
    const offeredPrice = extractPrice(message);
    const currentProduct = negotiationState.get('currentProduct');

    if (offeredPrice && currentProduct) {
        const minPrice = negotiationState.get('minPrice');
        const currentOffer = negotiationState.get('currentOffer');

        if (offeredPrice >= currentOffer) {
            negotiationState.delete('currentProduct');
            const responses = {
                fr: `Tope là ! 🤝✨ **${formatPrice(offeredPrice)}** pour le **${currentProduct.name}**, c'est un deal ! Vous avez le flair d'un vrai commerçant du souk !\n\nVoulez-vous procéder à la commande ? Je peux aussi vous montrer d'autres trésors ! 🎁`,
                en: `Deal! 🤝✨ **${formatPrice(offeredPrice)}** for the **${currentProduct.nameEn}**, it's a deal! You have the flair of a true souk trader!\n\nWould you like to proceed with the order? I can also show you other treasures! 🎁`,
                ar: `صفقة! 🤝✨ **${formatPrice(offeredPrice)}** مقابل **${currentProduct.nameAr}**، اتفقنا! لديك حس تجاري كتاجر سوق حقيقي!\n\nهل تريد المتابعة بالطلب؟ يمكنني أيضاً أن أعرض عليك كنوزاً أخرى! 🎁`,
            };
            return responses[lang] || responses.fr;
        }

        if (offeredPrice < minPrice) {
            const counterOffer = Math.floor((currentOffer + offeredPrice) / 2);
            const clampedCounter = Math.max(counterOffer, minPrice);
            negotiationState.set('currentOffer', clampedCounter);

            const responses = {
                fr: `Haha, vous plaisantez mon ami ! 😅 **${formatPrice(offeredPrice)}** pour un **${currentProduct.name}** de cette qualité ? Nos artisans travaillent dur !\n\nJe peux descendre à **${formatPrice(clampedCounter)}**, c'est vraiment mon dernier prix. C'est une affaire en or ! ✨ Qu'en dites-vous ?`,
                en: `Haha, you're joking my friend! 😅 **${formatPrice(offeredPrice)}** for a **${currentProduct.nameEn}** of this quality? Our artisans work hard!\n\nI can go down to **${formatPrice(clampedCounter)}**, that's truly my last price. It's a golden deal! ✨ What do you say?`,
                ar: `هاها، أنت تمزح يا صديقي! 😅 **${formatPrice(offeredPrice)}** مقابل **${currentProduct.nameAr}** بهذه الجودة؟ حرفيونا يعملون بجد!\n\nيمكنني النزول إلى **${formatPrice(clampedCounter)}**، هذا حقاً آخر سعر عندي. إنها صفقة ذهبية! ✨ ما رأيك؟`,
            };
            return responses[lang] || responses.fr;
        }

        // Acceptable counter offer
        const counterOffer = Math.floor((currentOffer + offeredPrice) / 2);
        negotiationState.set('currentOffer', counterOffer);

        const responses = {
            fr: `Mmm, **${formatPrice(offeredPrice)}**... Je vois que vous connaissez le jeu ! 🎯 Je peux vous le faire à **${formatPrice(counterOffer)}**. C'est un prix d'ami, wallah ! On se serre la main ? 🤝`,
            en: `Mmm, **${formatPrice(offeredPrice)}**... I see you know the game! 🎯 I can do it for **${formatPrice(counterOffer)}**. That's a friend's price, wallah! Shall we shake on it? 🤝`,
            ar: `ممم، **${formatPrice(offeredPrice)}**... أرى أنك تعرف اللعبة! 🎯 يمكنني أن أعطيك إياها بـ **${formatPrice(counterOffer)}**. هذا سعر صديق، والله! نتصافح؟ 🤝`,
        };
        return responses[lang] || responses.fr;
    }

    // Category queries
    const categoryKeywords = {
        tapis: ['tapis', 'rug', 'carpet', 'زربية', 'زرابي'],
        luminaire: ['lanterne', 'lantern', 'lamp', 'lumière', 'فانوس', 'إنارة'],
        ceramique: ['tajine', 'céramique', 'ceramic', 'poterie', 'طاجين', 'خزف'],
        cuir: ['cuir', 'leather', 'babouche', 'pouf', 'جلد', 'بلغة', 'بوف'],
        bois: ['bois', 'wood', 'thuya', 'خشب', 'عرعار'],
    };

    for (const [category, keywords] of Object.entries(categoryKeywords)) {
        if (keywords.some(k => msg.includes(k))) {
            const categoryProducts = products.filter(p => p.category === category);
            if (categoryProducts.length > 0) {
                const list = categoryProducts.map(p => `• **${p.name}** — ${formatPrice(p.price)}`).join('\n');
                const responses = {
                    fr: `Voici ce que nous avons dans cette catégorie :\n\n${list}\n\nLequel vous intéresse ? Je suis prêt à négocier ! 💰`,
                    en: `Here's what we have in this category:\n\n${list}\n\nWhich one interests you? I'm ready to negotiate! 💰`,
                    ar: `إليك ما لدينا في هذه الفئة:\n\n${list}\n\nأيها يعجبك؟ أنا مستعد للتفاوض! 💰`,
                };
                return responses[lang] || responses.fr;
            }
        }
    }

    // Stock / availability
    if (msg.includes('stock') || msg.includes('disponib') || msg.includes('available') || msg.includes('متوفر')) {
        const responses = {
            fr: "Tous nos produits affichés sont actuellement en stock ! ✅ Dites-moi quel article vous intéresse et je vérifierai la quantité exacte pour vous.",
            en: "All our displayed products are currently in stock! ✅ Tell me which item interests you and I'll check the exact quantity for you.",
            ar: "جميع منتجاتنا المعروضة متوفرة حالياً! ✅ أخبرني أي منتج يعجبك وسأتحقق من الكمية المتاحة.",
        };
        return responses[lang] || responses.fr;
    }

    // Help / commands
    if (msg.includes('aide') || msg.includes('help') || msg.includes('مساعدة') || msg.includes('comment')) {
        const responses = {
            fr: "Voici comment je peux vous aider : 🛍️\n\n• **Explorer** — Dites-moi une catégorie (tapis, céramique, cuir...)\n• **Négocier** — Mentionnez un produit et proposez votre prix\n• **Commander** — Je vous guide dans le processus\n• **Suivre** — Donnez-moi votre numéro de commande\n\nN'hésitez pas, le souk est ouvert ! 🏪",
            en: "Here's how I can help you: 🛍️\n\n• **Explore** — Tell me a category (rugs, ceramics, leather...)\n• **Negotiate** — Mention a product and name your price\n• **Order** — I'll guide you through the process\n• **Track** — Give me your order number\n\nDon't hesitate, the souk is open! 🏪",
            ar: "إليك كيف يمكنني مساعدتك: 🛍️\n\n• **استكشف** — أخبرني عن فئة (زرابي، خزف، جلود...)\n• **تفاوض** — اذكر منتجاً واقترح سعرك\n• **اطلب** — سأرشدك خلال العملية\n• **تتبع** — أعطني رقم طلبك\n\nلا تتردد، السوق مفتوح! 🏪",
        };
        return responses[lang] || responses.fr;
    }

    // Default fallback
    const responses = {
        fr: "Hmm, je ne suis pas sûr de comprendre... 🤔 Mais ne vous inquiétez pas ! Dites-moi :\n\n• Quel **produit** vous intéresse ?\n• Vous cherchez quelque chose de **spécifique** ?\n• Ou tapez **\"aide\"** pour voir ce que je peux faire !\n\nJe suis là pour vous, ya khouya ! 😊",
        en: "Hmm, I'm not sure I understand... 🤔 But don't worry! Tell me:\n\n• Which **product** interests you?\n• Are you looking for something **specific**?\n• Or type **\"help\"** to see what I can do!\n\nI'm here for you, my friend! 😊",
        ar: "ممم، لست متأكداً أنني فهمت... 🤔 لكن لا تقلق! أخبرني:\n\n• أي **منتج** يعجبك؟\n• هل تبحث عن شيء **محدد**؟\n• أو اكتب **\"مساعدة\"** لترى ما يمكنني فعله!\n\nأنا هنا من أجلك يا صاحبي! 😊",
    };
    return responses[lang] || responses.fr;
}

// Main chat function
export async function sendMessage(message, lang = 'fr') {
    // Simulate API delay (would be Gemini API call via n8n in production)
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1500));

    const response = generateResponse(message, lang);
    return {
        id: Date.now(),
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString(),
    };
}

// Get welcome message
export function getWelcomeMessage(lang = 'fr') {
    const messages = {
        fr: "Bienvenue au Souk ! 🕌✨\n\nJe suis **SoukBot**, votre agent commercial IA. Je connais tous les trésors de notre souk et je suis prêt à négocier avec vous !\n\nQue cherchez-vous aujourd'hui ? Un **tapis berbère**, une **lanterne en cuivre**, des **babouches en cuir** ? Dites-moi tout ! 🛍️",
        en: "Welcome to the Souk! 🕌✨\n\nI'm **SoukBot**, your AI commercial agent. I know all the treasures of our souk and I'm ready to negotiate with you!\n\nWhat are you looking for today? A **Berber rug**, a **copper lantern**, **leather babouches**? Tell me everything! 🛍️",
        ar: "مرحباً بك في السوق! 🕌✨\n\nأنا **سوق بوت**، وكيلك التجاري الذكي. أعرف كل كنوز سوقنا ومستعد للتفاوض معك!\n\nماذا تبحث عنه اليوم؟ **زربية أمازيغية**، **فانوس نحاسي**، **بلغة جلدية**؟ أخبرني بكل شيء! 🛍️",
    };
    return {
        id: 0,
        role: 'assistant',
        content: messages[lang] || messages.fr,
        timestamp: new Date().toISOString(),
    };
}
