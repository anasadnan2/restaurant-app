// src/data/dummyData.js
export const categoryImages = {
  c1: require("../assets/images/seafoodCategoryImage/ImageCategory.jpeg"),
  c2: require("../assets/images/sandwichesCategoryImage/ImageCategory.jpeg"),
  c3: require("../assets/images/mainDishesCategoryImage/ImageCategory.webp"),
  c4: require("../assets/images/soupsCategoryImage/ImageCategory.jpeg"),
  c5: require("../assets/images/appetizersCategoryImage/ImageCategory.jpeg"),
  c6: require("../assets/images/drinksCategoryImage/ImageCategory.jpeg"),
};

export const itemImages = {
  i1: require("../assets/images/seafoodCategoryImage/grilledFishImage.jpeg"),
  i2: require("../assets/images/seafoodCategoryImage/friedShrimpImage.webp"),
  i3: require("../assets/images/seafoodCategoryImage/seafoodPastaImage.jpeg"),
  i4: require("../assets/images/sandwichesCategoryImage/chickenShawarmaImage.webp"),
  i5: require("../assets/images/sandwichesCategoryImage/falafelSandwichImage.webp"),
  i6: require("../assets/images/sandwichesCategoryImage/beefBurgerImage.jpeg"),
  i7: require("../assets/images/mainDishesCategoryImage/meatMandiImage.jpeg"),
  i8: require("../assets/images/mainDishesCategoryImage/chickenCurryImage.jpeg"),
  i9: require("../assets/images/soupsCategoryImage/lentilSoupImage.webp"),
  i10: require("../assets/images/appetizersCategoryImage/hummusImage.jpeg"),
  i11: require("../assets/images/appetizersCategoryImage/tabboulehImage.jpg"),
  i12: require("../assets/images/drinksCategoryImage/orangeJuiceImage.webp"),
  i13: require("../assets/images/drinksCategoryImage/lemonMintJuiceImage.jpg"),
  i14: require("../assets/images/drinksCategoryImage/colaImage.webp"),
};

export const DUMMY_CATEGORIES = [
  {
    id: "c1",
    name: "مأكولات بحرية",
    // image: seafoodCategoryImage, // استخدم الصورة المستوردة
    image: categoryImages.c1,
  },
  {
    id: "c2",
    name: "ساندويشات",
    // image: sandwichesCategoryImage,
    image: categoryImages.c2,
  },
  {
    id: "c3",
    name: "أطباق رئيسية",
    // image: mainDishesCategoryImage,
    image: categoryImages.c3,
  },
  {
    id: "c4",
    name: "شوربات",
    // image: soupsCategoryImage,
    image: categoryImages.c4,
  },
  {
    id: "c5",
    name: "مقبلات",
    // image: appetizersCategoryImage,
    image: categoryImages.c5,
  },
  {
    id: "c6",
    name: "مشروبات",
    // image: drinksCategoryImage,
    image: categoryImages.c6,
  },
];

export const DUMMY_ITEMS = [
  // --- مأكولات بحرية ---
  {
    id: "i1",
    categoryId: "c1",
    name: "سمك مشوي فاخر",
    description:
      "سمك طازج مشوي على الفحم مع تتبيلة الليمون والأعشاب الخاصة بنا.",
    ingredients:
      "سمك (حسب الموسم)، ليمون، بهارات مشكلة، زيت زيتون بكر، أعشاب طازجة",
    price: 85, // تم تعديل السعر
    // image: grilledFishImage,
    image: itemImages.i1,
    averageRating: 4.7, // تم تعديل التقييم
    totalRatings: 155, // تم تعديل عدد التقييمات
    comments: [
      {
        id: "comment1_i1",
        user: "أحمد خالد",
        text: "طعم لا يقاوم، أنصح به بشدة!",
      },
      {
        id: "comment2_i1",
        user: "فاطمة علي",
        text: "أفضل سمك مشوي ذقته في حياتي.",
      },
      {
        id: "comment3_i1",
        user: "يوسف محمود",
        text: "التتبيلة رائعة والسمك طازج.",
      },
    ],
  },
  {
    id: "i2",
    categoryId: "c1",
    name: "جمبري مقلي مقرمش",
    description:
      "جمبري كبير الحجم، مقلي حتى يصبح ذهبياً ومقرمشاً، يقدم مع صوص التارتار الخاص.",
    ingredients: "جمبري جامبو، دقيق، بيض، بقسماط، بهارات سرية، صوص تارتار",
    price: 95, // تم تعديل السعر
    // image: friedShrimpImage,
    image: itemImages.i2,
    averageRating: 4.5, // تم تعديل التقييم
    totalRatings: 110, // تم تعديل عدد التقييمات
    comments: [
      {
        id: "comment1_i2",
        user: "مريم حسن",
        text: "القرمشة مثالية والطعم لذيذ!",
      },
    ],
  },
  {
    id: "i3", // صنف جديد
    categoryId: "c1",
    name: "باستا فواكه البحر",
    description:
      "باستا إيطالية غنية بصلصة الطماطم الكريمية ومزيج من فواكه البحر الطازجة.",
    ingredients: "باستا، جمبري، بلح البحر، كاليماري، طماطم، كريمة، ثوم، بقدونس",
    price: 110,
    // image: seafoodPastaImage,
    image: itemImages.i3,
    averageRating: 4.8,
    totalRatings: 90,
    comments: [
      {
        id: "comment1_i14",
        user: "سالم عبد الله",
        text: "طبق غني ومشبع، رائع جداً.",
      },
    ],
  },

  // --- ساندويشات ---
  {
    id: "i4",
    categoryId: "c2",
    name: "ساندويتش شاورما دجاج",
    description:
      "قطع دجاج متبلة ومشوية بعناية، ملفوفة في خبز عربي طازج مع الثومية والمخلل والبطاطا المقلية.",
    ingredients: "دجاج متبل، خبز عربي، صوص ثوم، مخلل خيار، بطاطا مقلية",
    price: 30, // تم تعديل السعر
    // image: chickenShawarmaImage,
    image: itemImages.i4,
    // "https://images.pexels.com/photos/1251198/pexels-photo-1251198.jpeg?auto=compress&cs=tinysrgb&w=600",
    averageRating: 4.9, // تم تعديل التقييم
    totalRatings: 320, // تم تعديل عدد التقييمات
    comments: [
      {
        id: "comment1_i3",
        user: "خالد وليد",
        text: "شاورما لا يعلى عليها، الأفضل!",
      },
      {
        id: "comment2_i3",
        user: "سارة إبراهيم",
        text: "الدجاج طري والتتبيلة ممتازة.",
      },
    ],
  },
  {
    id: "i5",
    categoryId: "c2",
    name: "ساندويتش فلافل مصري",
    description:
      "أقراص فلافل ذهبية مقرمشة من الخارج وطرية من الداخل، مع سلطة خضراء وطحينة في خبز بلدي.",
    ingredients: "فلافل، خبز بلدي، طماطم، خيار، بقدونس، مخلل لفت، صوص طحينة",
    price: 15, // تم تعديل السعر
    // image: falafelSandwichImage,
    image: itemImages.i5,
    // "https://images.pexels.com/photos/4001296/pexels-photo-4001296.jpeg?auto=compress&cs=tinysrgb&w=600",
    averageRating: 4.6,
    totalRatings: 210, // تم تعديل عدد التقييمات
    comments: [
      {
        id: "comment1_i11",
        user: "محمد فتحي",
        text: "طعم الفلافل الأصيل، رائع.",
      },
    ],
  },
  {
    id: "i6", // صنف جديد
    categoryId: "c2",
    name: "برجر لحم كلاسيك",
    description:
      "قطعة لحم بقري صافي مشوية بإتقان، مع خس، طماطم، بصل، مخلل، وصوص خاص في خبز برجر طري.",
    ingredients: "لحم بقري، خبز برجر، خس، طماطم، بصل، مخلل، صوص برجر",
    price: 45,
    // image: beefBurgerImage,
    image: itemImages.i6,
    // "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600",
    averageRating: 4.7,
    totalRatings: 180,
    comments: [
      { id: "comment1_i15", user: "عبدالرحمن", text: "برجر لذيذ ومشبع." },
    ],
  },

  // --- أطباق رئيسية ---
  {
    id: "i7",
    categoryId: "c3",
    name: "مندي لحم فاخر",
    description:
      "أرز بسمتي فاخر مطهو مع بهارات المندي الأصلية وقطع لحم غنم طرية تذوب في الفم، مزين بالزبيب والمكسرات.",
    ingredients: "لحم غنم، أرز بسمتي، بهارات مندي خاصة، زبيب، لوز، صنوبر",
    price: 130, // تم تعديل السعر
    // image: meatMandiImage,
    image: itemImages.i7,
    // "https://images.pexels.com/photos/5410410/pexels-photo-5410410.jpeg?auto=compress&cs=tinysrgb&w=600",
    averageRating: 4.9,
    totalRatings: 350,
    comments: [
      {
        id: "comment1_i4",
        user: "ناصر جابر",
        text: "المندي هنا لا يُعلى عليه، ممتاز!",
      },
      { id: "comment2_i4", user: "أمينة", text: "اللحم ذايب والأرز نثري." },
    ],
  },
  {
    id: "i8",
    categoryId: "c3",
    name: "دجاج بالكاري مع الأرز",
    description:
      "قطع دجاج طرية مطهوة ببطء في صلصة الكاري الهندية الغنية بحليب جوز الهند والبهارات العطرية، تقدم مع أرز أبيض.",
    ingredients:
      "دجاج، أرز بسمتي، حليب جوز الهند، معجون كاري، زنجبيل، ثوم، خضروات مشكلة",
    price: 70, // تم تعديل السعر
    // image: chickenCurryImage,
    image: itemImages.i8,
    // "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=600",
    averageRating: 4.5,
    totalRatings: 100,
    comments: [],
  },

  // --- شوربات ---
  {
    id: "i9",
    categoryId: "c4",
    name: "شوربة عدس كريمية",
    description:
      "شوربة عدس أحمر غنية ومغذية، ذات قوام كريمي، تقدم مع خبز محمص وقطرات من زيت الزيتون.",
    ingredients: "عدس أحمر، جزر، بصل، كرفس، بطاطا، مرق دجاج، كمون، زيت زيتون",
    price: 20, // تم تعديل السعر
    // image: lentilSoupImage,
    image: itemImages.i9,
    // "https://images.pexels.com/photos/90893/pexels-photo-90893.jpeg?auto=compress&cs=tinysrgb&w=600",
    averageRating: 4.4,
    totalRatings: 90,
    comments: [],
  },

  // --- مقبلات ---
  {
    id: "i10",
    categoryId: "c5",
    name: "حمص باللحمة والصنوبر",
    description:
      "حمص بالطحينة ناعم وكريمي، يعلوه قطع لحم مفروم متبلة ومقلية مع صنوبر محمص.",
    ingredients: "حمص، طحينة، ليمون، ثوم، لحم مفروم، صنوبر، زيت زيتون، بهارات",
    price: 35, // تم تعديل السعر
    // image: hummusImage,
    image: itemImages.i10,
    // "https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?auto=compress&cs=tinysrgb&w=600",
    averageRating: 4.8,
    totalRatings: 180,
    comments: [
      { id: "comment1_i6", user: "هدى", text: "أفضل حمص باللحمة على الإطلاق!" },
    ],
  },
  {
    id: "i11", // صنف جديد
    categoryId: "c5",
    name: "تبولة شامية",
    description:
      "سلطة شامية منعشة مكونة من البقدونس المفروم ناعماً، الطماطم، النعناع، البرغل، وعصير الليمون وزيت الزيتون.",
    ingredients: "بقدونس، طماطم، نعناع، برغل ناعم، بصل، عصير ليمون، زيت زيتون",
    price: 25,
    // image: tabboulehImage,
    image: itemImages.i11,
    // "https://images.pexels.com/photos/5938/food-salad-healthy-lunch.jpg?auto=compress&cs=tinysrgb&w=600",
    averageRating: 4.6,
    totalRatings: 130,
    comments: [],
  },

  // --- مشروبات ---
  {
    id: "i12",
    categoryId: "c6",
    name: "عصير برتقال طازج",
    description: "عصير برتقال طبيعي 100% معصور عند الطلب، بدون أي إضافات.",
    ingredients: "برتقال طازج",
    price: 15, // تم تعديل السعر
    // image: orangeJuiceImage,
    image: itemImages.i12,
    // "https://images.pexels.com/photos/161559/background-bitter-breakfast-bright-161559.jpeg?auto=compress&cs=tinysrgb&w=600",
    averageRating: 4.9,
    totalRatings: 250,
    comments: [],
  },
  {
    id: "i13",
    categoryId: "c6",
    name: "ليمون بالنعناع المنعش",
    description:
      "مزيج مثالي من عصير الليمون الحامض وأوراق النعناع الطازجة، يقدم بارداً.",
    ingredients: "ليمون، أوراق نعناع طازجة، سكر (اختياري)، ماء، ثلج",
    price: 18, // تم تعديل السعر
    // image: lemonMintJuiceImage,
    image: itemImages.i13,
    // "https://images.pexels.com/photos/1292294/pexels-photo-1292294.jpeg?auto=compress&cs=tinysrgb&w=600",
    averageRating: 4.8,
    totalRatings: 220,
    comments: [
      { id: "comment1_i13", user: "علي حسن", text: "أفضل مشروب للصيف!" },
      {
        id: "comment2_i13",
        user: "نور كامل",
        text: "الطعم متوازن ومنعش جداً.",
      },
    ],
  },
  {
    id: "i14", // صنف جديد
    categoryId: "c6",
    name: "كوكا كولا",
    description: "مشروب غازي.",
    ingredients: "مياه غازية، سكر، كافيين، نكهات طبيعية",
    price: 8,
    // image: colaImage,
    image: itemImages.i14,
    // "https://images.pexels.com/photos/2775860/pexels-photo-2775860.jpeg?auto=compress&cs=tinysrgb&w=600",
    averageRating: 4.2,
    totalRatings: 300,
    comments: [],
  },
];
