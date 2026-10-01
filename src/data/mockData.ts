import { Artisan, Product, Order, CraftArticle, CurrencyCode } from '../types';

import heroAjrakImg from '../assets/images/hero_sindhi_ajrak_textile_1790837432010.jpg';
import productAjrakSilkImg from '../assets/images/product_teli_ajrak_silk_1790837445497.jpg';
import productRilliQuiltImg from '../assets/images/product_tuk_rilli_quilt_1790837458070.jpg';
import productKashiPotteryImg from '../assets/images/product_hala_kashi_pottery_1790837471096.jpg';
import artisanBhitshahImg from '../assets/images/artisan_portrait_bhitshah_1790837483948.jpg';

export const CURRENCY_RATES: Record<CurrencyCode, { symbol: string; rate: number; label: string }> = {
  PKR: { symbol: 'Rs. ', rate: 1, label: 'PKR - Pakistani Rupee' },
  USD: { symbol: '$', rate: 0.0036, label: 'USD - US Dollar' },
  GBP: { symbol: '£', rate: 0.0028, label: 'GBP - British Pound' },
  EUR: { symbol: '€', rate: 0.0033, label: 'EUR - Euro' },
  AED: { symbol: 'AED ', rate: 0.0132, label: 'AED - UAE Dirham' },
};

export const ARTISANS: Artisan[] = [
  {
    id: 'artisan-1',
    name: 'Ustad Mohammad Hashim Soomro',
    honorific: 'Master Block-Carver & Dyer',
    town: 'Bhit Shah',
    region: 'Matiari District, Sindh',
    generationCount: 6,
    craftSpecialty: 'Traditional 14-Stage Teli Ajrak on Pure Silk & Cambric Cotton',
    bio: 'Born in the mystical town of Bhit Shah near the shrine of Shah Abdul Latif Bhittai, Ustad Hashim inherited centuries-old hand-carved shisham wood blocks and natural vat recipes for indigofera tinctoria and wild madder root (majith). He leads an indigenous cluster of 18 artisan families.',
    avatarUrl: artisanBhitshahImg,
    workshopLocation: 'Bhit Shah Artisan Guild, Near Karar Lake',
    cooperativeSharePercentage: 74,
    quote: 'Ajrak is not merely cloth; it is the starry night of the Indus Valley and the warmth of the Sindhi soil wrapped around your shoulders.'
  },
  {
    id: 'artisan-2',
    name: 'Mai Jindo Baloch',
    honorific: 'Ustadah of Tuk Appliqué & Patchwork',
    town: 'Tharparkar',
    region: 'Mithi, Thar Desert, Sindh',
    generationCount: 4,
    craftSpecialty: 'Tuk Rilli Geometric Appliqué & High-Density Tanka Quilting',
    bio: 'Residing in the sand dunes of Tharparkar, Mai Jindo weaves the resilient spirit of desert folklore into vibrant geometric tuk quilts. Every diamond and triangular motif symbolizes desert wells, peacock feathers, and desert flora.',
    avatarUrl: artisanBhitshahImg,
    workshopLocation: 'Thar Women Artisanal Collective, Mithi',
    cooperativeSharePercentage: 78,
    quote: 'In the desert where water is rare, we pour our dreams into the vivid hues of the Rilli quilt.'
  },
  {
    id: 'artisan-3',
    name: 'Kashigar Ghulam Qadir Solangi',
    honorific: 'Royal Master of Cobalt Kashi',
    town: 'Hala',
    region: 'Hala Old, Sindh',
    generationCount: 8,
    craftSpecialty: 'Traditional Glazed Ceramic Pottery & Hand-Painted Kashi Tiles',
    bio: 'Carrying forward eight unbroken generations of indigenous Hala terracotta craft, Ghulam Qadir creates distinct turquoise and cobalt blue earthenware using natural riverbed silt from the Indus River.',
    avatarUrl: artisanBhitshahImg,
    workshopLocation: 'Solangi Kashi Karkhana, Hala Heritage Bazaar',
    cooperativeSharePercentage: 72,
    quote: 'The secret of Hala Kashi lies in the sacred mud of the Indus and copper oxide fires.'
  },
  {
    id: 'artisan-4',
    name: 'Master Abdul Sattar Kumbhar',
    honorific: 'Senior Handloom Weaver',
    town: 'Matiari',
    region: 'Matiari District, Sindh',
    generationCount: 5,
    craftSpecialty: 'Organic Handloom Khaddar & Double-Sided Asmani Ajrak',
    bio: 'Operating pit-looms in Matiari, Abdul Sattar spins and weaves indigenous organic cotton khaddar before applying the laborious double-sided block resist print technique known as Bhedi Ajrak.',
    avatarUrl: artisanBhitshahImg,
    workshopLocation: 'Matiari Handloom Center, Station Road',
    cooperativeSharePercentage: 75,
    quote: 'Handloom cloth breathes with the wearer; every thread carries human warmth.'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-teli-ajrak-silk-01',
    title: 'Authentic 14-Stage Teli Ajrak Pure Silk Chaddar',
    sindhiName: 'تيلى اجرڪ ريشمي چادر',
    subtitle: 'Natural Indigo & Wild Madder Root Double-Dyed on 100% Mulberry Silk',
    category: 'Ajrak',
    pricePKR: 18500,
    originalPricePKR: 21500,
    artisanId: 'artisan-1',
    artisanTown: 'Bhit Shah',
    technique: 'Natural Veg-dye (Teli)',
    baseMaterial: 'Pure Mulberry Silk',
    intendedUse: 'Apparel / Chaddar',
    isOneOfAKind: true,
    stockQuantity: 4,
    inStock: true,
    isNaturalDyeCertified: true,
    dyeIngredients: [
      'Wild Indigofera Tinctoria (Natural Indigo)',
      'Madder Root (Majith / Rubia Tinctorum)',
      'Tamarind Seed Resist Paste',
      'Mustard Oil (Teli Stage)',
      'Cow Dung Fermentation Bleach'
    ],
    numberOfStages: 14,
    dimensions: {
      lengthInches: 102,
      widthInches: 50,
      lengthCm: 259,
      widthCm: 127,
      weightGrams: 380,
      categoryScaleType: 'shawl'
    },
    mainImage: productAjrakSilkImg,
    secondaryImage: heroAjrakImg,
    detailImage: productAjrakSilkImg,
    lightingImages: {
      sunlight: productAjrakSilkImg,
      indoor: heroAjrakImg,
      gallery: productAjrakSilkImg
    },
    description: 'This museum-grade Teli Ajrak represents the pinnacle of ancient Indus Valley textile chemistry. Handcrafted over 28 continuous days in Bhit Shah, each piece undergoes the sacred 14 stages—from river washing (Khumbh) and mustard oil immersion (Teli) to delicate block printing with natural indigo and boiled madder root.',
    provenanceDetails: 'Carved with antique Shisham blocks circa 1938. Sourced directly from Ustad Mohammad Hashim Soomro’s guild in Bhit Shah. Includes wax seal certificate of authenticity.',
    careInstructions: [
      'Dry clean recommended for silk base',
      'For hand maintenance: gentle dip in cold water with mild organic soap',
      'Do not wring; roll gently in a clean dry towel and air dry in shade',
      'Iron on reverse with low silk setting'
    ],
    reviews: [
      {
        id: 'rev-1',
        userName: 'Zainab Mir',
        userCity: 'Karachi, Pakistan',
        rating: 5,
        date: '2026-08-14',
        comment: 'The drape and sheen of the silk with natural indigo is breathtaking. You can immediately smell the earthy madder root scent, proving it is authentic vegetable dye and not cheap chemical pigment. Worth every rupee.',
        verifiedBuyer: true
      },
      {
        id: 'rev-2',
        userName: 'Hamza Tariq',
        userCity: 'London, UK',
        rating: 5,
        date: '2026-07-29',
        comment: 'Ordered from the UK. DHL delivery arrived in 4 days. The packaging with dried rose petals and handwritten artisan card from Bhit Shah was so touching.',
        verifiedBuyer: true
      }
    ],
    rating: 4.95,
    reviewCount: 28,
    tags: ['Teli Ajrak', 'Bhit Shah', 'Pure Silk', 'Natural Indigo', 'Chaddar', '14-Stage Dye']
  },
  {
    id: 'prod-tuk-rilli-quilt-02',
    title: 'Heritage Tuk Rilli Geometric Appliqué Quilt',
    sindhiName: 'ٿر جي ٽڪ واري رلي',
    subtitle: 'Hand-Cut Diamond Motifs & High-Density Tanka Stitching on Organic Khaddar',
    category: 'Rilli',
    pricePKR: 24500,
    originalPricePKR: 28000,
    artisanId: 'artisan-2',
    artisanTown: 'Tharparkar',
    technique: 'Hand-stitched Appliqué (Tuk)',
    baseMaterial: 'Handloom Khaddar',
    intendedUse: 'Bedding / Quilt',
    isOneOfAKind: true,
    stockQuantity: 2,
    inStock: true,
    isNaturalDyeCertified: true,
    dyeIngredients: [
      'Indigofera Tinctoria',
      'Pomegranate Rind (Naswari)',
      'Turmeric Root (Haldi Yellow)',
      'Iron Rust Slag (Syahi Black)'
    ],
    numberOfStages: 8,
    dimensions: {
      lengthInches: 98,
      widthInches: 86,
      lengthCm: 249,
      widthCm: 218,
      weightGrams: 2100,
      categoryScaleType: 'bedding'
    },
    mainImage: productRilliQuiltImg,
    secondaryImage: productRilliQuiltImg,
    detailImage: productRilliQuiltImg,
    lightingImages: {
      sunlight: productRilliQuiltImg,
      indoor: productRilliQuiltImg,
      gallery: productRilliQuiltImg
    },
    description: 'An exceptional example of desert appliqué needlework, this Tuk Rilli is assembled entirely by hand over 120 artisan hours in Tharparkar. Thousands of minute fabric triangles are folded into diamond tessellations representing desert sand dunes, water reservoirs, and celestial stars.',
    provenanceDetails: 'Stitched by Mai Jindo Baloch and the Thar Women Artisanal Collective in Mithi. 78% of direct proceeds support maternal healthcare in Tharparkar.',
    careInstructions: [
      'Gentle hand wash in cold water using gentle non-bleach detergent',
      'Wash separately to preserve vegetable-dyed khaddar luster',
      'Dry flat in partial shade to retain cotton fullness',
      'Do not tumble dry'
    ],
    reviews: [
      {
        id: 'rev-3',
        userName: 'Ayesha Siddiqui',
        userCity: 'Lahore, Pakistan',
        rating: 5,
        date: '2026-09-02',
        comment: 'This quilt is an heirloom. The tanka stitch density is astonishing—you can feel the hours of patient devotion. Fits our Queen bed perfectly.',
        verifiedBuyer: true
      }
    ],
    rating: 5.0,
    reviewCount: 19,
    tags: ['Tuk Rilli', 'Tharparkar', 'Handmade Quilt', 'Appliqué', 'Heirloom Bedding']
  },
  {
    id: 'prod-kashi-pottery-vase-03',
    title: 'Hala Imperial Cobalt & Turquoise Kashi Ceramic Urn',
    sindhiName: 'هالا جو ڪاشي گلدان',
    subtitle: 'Wheel-Thrown Indus River Terracotta with Hand-Etched Traditional Floral Glaze',
    category: 'Kashi Pottery',
    pricePKR: 14200,
    originalPricePKR: 16500,
    artisanId: 'artisan-3',
    artisanTown: 'Hala',
    technique: 'Cobalt Kashi Glaze',
    baseMaterial: 'Natural Terracotta Clay',
    intendedUse: 'Artisanal Ceramic',
    isOneOfAKind: true,
    stockQuantity: 3,
    inStock: true,
    isNaturalDyeCertified: false,
    dyeIngredients: ['Cobalt Oxide', 'Copper Carbonate', 'Natural Quartz Powder', 'Indus Alluvial Silt'],
    numberOfStages: 7,
    dimensions: {
      lengthInches: 18,
      widthInches: 10,
      lengthCm: 45,
      widthCm: 25,
      weightGrams: 3200,
      categoryScaleType: 'pottery'
    },
    mainImage: productKashiPotteryImg,
    secondaryImage: productKashiPotteryImg,
    detailImage: productKashiPotteryImg,
    lightingImages: {
      sunlight: productKashiPotteryImg,
      indoor: productKashiPotteryImg,
      gallery: productKashiPotteryImg
    },
    description: 'Fired in a wood-burning updraft kiln in ancient Hala Old, this Kashi pottery vase showcases the signature turquoise and royal cobalt blue floral arabesques that have adorned Sindh’s monuments and shrines since the 16th century.',
    provenanceDetails: 'Wheel-thrown and hand-glazed by Kashigar Ghulam Qadir Solangi. Marked with his master artisan signature seal on the foot.',
    careInstructions: [
      'Wipe with soft damp microfibre cloth',
      'Avoid abrasive chemical cleaners or wire sponges',
      'Suitable for decorative dry arrangements and ambient water holding'
    ],
    reviews: [
      {
        id: 'rev-4',
        userName: 'Dr. Tariq Farooqui',
        userCity: 'Islamabad, Pakistan',
        rating: 5,
        date: '2026-08-20',
        comment: 'The glaze has that unmistakable deep glass-like depth only achievable with wood-kiln firing. Superbly padded shipping box arrived without a scratch.',
        verifiedBuyer: true
      }
    ],
    rating: 4.9,
    reviewCount: 14,
    tags: ['Hala Pottery', 'Kashi Glaze', 'Cobalt Blue', 'Handmade Ceramics', 'Indus Heritage']
  },
  {
    id: 'prod-khaddar-ajrak-chaddar-04',
    title: 'Bhedi Double-Sided Handloom Khaddar Ajrak',
    sindhiName: 'ٻٽي پاسي واري کاڌي اجرڪ',
    subtitle: 'Block-Printed on Both Sides with Exact Registration on Thick Winter Khaddar',
    category: 'Ajrak',
    pricePKR: 12500,
    originalPricePKR: 14000,
    artisanId: 'artisan-4',
    artisanTown: 'Matiari',
    technique: 'Hand-block printed',
    baseMaterial: 'Handloom Khaddar',
    intendedUse: 'Apparel / Chaddar',
    isOneOfAKind: false,
    stockQuantity: 6,
    inStock: true,
    isNaturalDyeCertified: true,
    dyeIngredients: [
      'Natural Indigo Vat',
      'Madder Root (Majith)',
      'Fullers Earth (Multani Mitti)',
      'Tamarind Seed Gum'
    ],
    numberOfStages: 12,
    dimensions: {
      lengthInches: 100,
      widthInches: 52,
      lengthCm: 254,
      widthCm: 132,
      weightGrams: 750,
      categoryScaleType: 'shawl'
    },
    mainImage: heroAjrakImg,
    secondaryImage: productAjrakSilkImg,
    detailImage: heroAjrakImg,
    lightingImages: {
      sunlight: heroAjrakImg,
      indoor: productAjrakSilkImg,
      gallery: heroAjrakImg
    },
    description: 'A genuine double-sided (Bhedi) Ajrak requiring immaculate artisan precision. The master stamper prints the identical geometric matrix on both front and back surfaces without a millimeter of misalignment, ensuring the textile is completely reversible.',
    provenanceDetails: 'Woven on indigenous pit looms in Matiari and hand-stamped using seasoned Acacia nilotica (Babul) wooden blocks.',
    careInstructions: [
      'Hand wash separately in lukewarm or cold water',
      'Add a pinch of natural rock salt to the first rinse to set indigo crystals',
      'Dry in shaded breeze away from direct noon sun'
    ],
    reviews: [
      {
        id: 'rev-5',
        userName: 'Sohail Abbasi',
        userCity: 'Hyderabad, Sindh',
        rating: 5,
        date: '2026-08-30',
        comment: 'As a Sindhi who grew up with Ajrak, finding authentic Bhedi Ajrak with true double-sided alignment is rare nowadays. Sattar bhai’s work is pure heritage.',
        verifiedBuyer: true
      }
    ],
    rating: 4.88,
    reviewCount: 33,
    tags: ['Bhedi Ajrak', 'Matiari', 'Double-Sided', 'Handloom Khaddar', 'Winter Chaddar']
  },
  {
    id: 'prod-soofi-rilli-wall-05',
    title: 'Soofi Tuk Wall Tapestry & Art Throw',
    sindhiName: 'صوفي ٽڪ واري ديوار رلي',
    subtitle: 'Micro-Appliqué Meditation Pattern with Hand-Braided Tassels & Cowrie Shells',
    category: 'Rilli',
    pricePKR: 16800,
    originalPricePKR: 19500,
    artisanId: 'artisan-2',
    artisanTown: 'Tharparkar',
    technique: 'Patchwork Rilli',
    baseMaterial: 'Fine Voile',
    intendedUse: 'Wall Décor',
    isOneOfAKind: true,
    stockQuantity: 1,
    inStock: true,
    isNaturalDyeCertified: true,
    dyeIngredients: ['Desert Henna', 'Natural Indigo', 'Madder Root', 'Pomegranate Peel'],
    numberOfStages: 6,
    dimensions: {
      lengthInches: 60,
      widthInches: 42,
      lengthCm: 152,
      widthCm: 106,
      weightGrams: 890,
      categoryScaleType: 'wall_hanging'
    },
    mainImage: productRilliQuiltImg,
    secondaryImage: productRilliQuiltImg,
    detailImage: productRilliQuiltImg,
    lightingImages: {
      sunlight: productRilliQuiltImg,
      indoor: productRilliQuiltImg,
      gallery: productRilliQuiltImg
    },
    description: 'Designed as a focal textile art piece for modern interiors, this Soofi tapestry blends the contemplative geometry of Sufi architecture with the vivid needlecraft of Thar desert women.',
    provenanceDetails: 'Includes solid brass hanging loops pre-stitched along the top hem for easy wall mounting.',
    careInstructions: [
      'Spot clean with gentle damp cloth',
      'Vacuum gently using brush attachment to remove dust',
      'Keep away from high humidity zones'
    ],
    reviews: [
      {
        id: 'rev-6',
        userName: 'Elena Rostova',
        userCity: 'Dubai, UAE',
        rating: 5,
        date: '2026-09-12',
        comment: 'Mounted this above our living room sofa in Dubai. The geometric energy and craftsmanship draw compliments from every guest.',
        verifiedBuyer: true
      }
    ],
    rating: 4.95,
    reviewCount: 11,
    tags: ['Wall Tapestry', 'Sufi Art', 'Thar Appliqué', 'Interior Décor', 'One of a Kind']
  },
  {
    id: 'prod-kashi-dinner-plates-06',
    title: 'Hala Hand-Painted Kashi Ceramic Platter (Set of 2)',
    sindhiName: 'هالا ڪاشي دسترخوان ٿالهيون',
    subtitle: 'Lead-Free Food Safe Glaze with Classic Indus Turquoise Rosette Detailing',
    category: 'Kashi Pottery',
    pricePKR: 9800,
    originalPricePKR: 11000,
    artisanId: 'artisan-3',
    artisanTown: 'Hala',
    technique: 'Cobalt Kashi Glaze',
    baseMaterial: 'Natural Terracotta Clay',
    intendedUse: 'Artisanal Ceramic',
    isOneOfAKind: false,
    stockQuantity: 5,
    inStock: true,
    isNaturalDyeCertified: false,
    dyeIngredients: ['Turquoise Copper Glaze', 'Cobalt Slip', 'Kaolin White Clay Base'],
    numberOfStages: 5,
    dimensions: {
      lengthInches: 12,
      widthInches: 12,
      lengthCm: 30,
      widthCm: 30,
      weightGrams: 1400,
      categoryScaleType: 'pottery'
    },
    mainImage: productKashiPotteryImg,
    secondaryImage: productKashiPotteryImg,
    detailImage: productKashiPotteryImg,
    lightingImages: {
      sunlight: productKashiPotteryImg,
      indoor: productKashiPotteryImg,
      gallery: productKashiPotteryImg
    },
    description: 'Bring the royal dining heritage of Sindh to your table. Hand-painted by master artisans in Hala Old using certified 100% lead-free, food-safe high fire glazes.',
    provenanceDetails: 'Tested and certified food-safe. Fired at 1050°C in traditional wood-fired kilns.',
    careInstructions: [
      'Hand washing recommended to preserve high-gloss glaze luster',
      'Microwave safe for gentle reheating',
      'Avoid sudden temperature shocks'
    ],
    reviews: [
      {
        id: 'rev-7',
        userName: 'Maryam Qureshi',
        userCity: 'Karachi, Pakistan',
        rating: 5,
        date: '2026-09-08',
        comment: 'Incredible craftsmanship and wonderful to know these are lead-free and safe for serving dry fruits and festive appetizers.',
        verifiedBuyer: true
      }
    ],
    rating: 4.85,
    reviewCount: 16,
    tags: ['Hala Ceramics', 'Food Safe Platter', 'Kashi Art', 'Dinnerware']
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-9821',
    createdAt: '2026-09-28T14:32:00Z',
    customerName: 'Asif Ali Larik',
    customerEmail: 'asifalilarik51@gmail.com',
    customerPhone: '+92 300 8274192',
    shippingAddress: {
      street: 'House 42, Street 7, Phase 6, DHA',
      city: 'Karachi',
      postalCode: '75500',
      country: 'Pakistan'
    },
    items: [
      {
        productId: 'prod-teli-ajrak-silk-01',
        productTitle: 'Authentic 14-Stage Teli Ajrak Pure Silk Chaddar',
        productImage: productAjrakSilkImg,
        pricePKR: 18500,
        quantity: 1
      }
    ],
    subtotalPKR: 18500,
    shippingFeePKR: 0,
    totalPKR: 18500,
    currencyPaid: 'PKR',
    paymentMethod: 'JazzCash',
    paymentStatus: 'Paid',
    status: 'In Transit',
    courier: 'TCS Express',
    trackingNumber: 'TCS-9021847192',
    trackingSteps: [
      {
        status: 'Pending',
        timestamp: '2026-09-28 14:32',
        description: 'Order placed and authenticated',
        location: 'Dastkari Platform'
      },
      {
        status: 'Processing',
        timestamp: '2026-09-28 17:00',
        description: 'Verified with Ustad Mohammad Hashim in Bhit Shah workshop',
        location: 'Bhit Shah Artisan Guild'
      },
      {
        status: 'Awaiting Courier Pickup',
        timestamp: '2026-09-29 10:15',
        description: 'Packaged in hand-screened cotton pouch with wax seal certificate',
        location: 'Matiari Dispatch Hub'
      },
      {
        status: 'In Transit',
        timestamp: '2026-09-29 16:40',
        description: 'Dispatched via TCS Express overnight route',
        location: 'Karachi Sorting Facility'
      }
    ]
  },
  {
    id: 'ORD-9815',
    createdAt: '2026-09-25T09:12:00Z',
    customerName: 'Sarah Jenkins',
    customerEmail: 's.jenkins@heritagecrafts.org',
    customerPhone: '+44 7911 123456',
    shippingAddress: {
      street: '14 Kensington Church Street',
      city: 'London',
      postalCode: 'W8 4EP',
      country: 'United Kingdom'
    },
    items: [
      {
        productId: 'prod-tuk-rilli-quilt-02',
        productTitle: 'Heritage Tuk Rilli Geometric Appliqué Quilt',
        productImage: productRilliQuiltImg,
        pricePKR: 24500,
        quantity: 1
      }
    ],
    subtotalPKR: 24500,
    shippingFeePKR: 4500,
    totalPKR: 29000,
    currencyPaid: 'GBP',
    paymentMethod: 'Stripe Card',
    paymentStatus: 'Paid',
    status: 'Delivered',
    courier: 'DHL Express Worldwide',
    trackingNumber: 'DHL-4819204123',
    trackingSteps: [
      {
        status: 'Delivered',
        timestamp: '2026-09-28 11:20',
        description: 'Delivered and signed by recipient',
        location: 'London, United Kingdom'
      }
    ]
  }
];

export const CRAFT_ARTICLES: CraftArticle[] = [
  {
    id: 'art-1',
    title: 'The Alchemy of Teli Ajrak: Understanding the 14 Sacred Stages',
    subtitle: 'How natural river silt, mustard oil, and wild indigo create an indestructible textile',
    author: 'Ustad Mohammad Hashim & Dastkari Curatorial Team',
    readTime: '6 min read',
    date: 'September 2026',
    category: 'Craft Lore',
    imageUrl: heroAjrakImg,
    tags: ['Ajrak', 'Natural Dyes', 'Bhit Shah', 'Intangible Heritage'],
    content: `Ajrak is one of the oldest continuing textile traditions on Earth, tracing its lineage directly back to the Priest-King statue excavated at Mohenjo-Daro (circa 2500 BCE) whose trefoil robe echoes modern Ajrak stars. 

Unlike modern industrial screen-printing which coats synthetic ink on the surface, true Teli Ajrak is an alchemical immersion. The cloth is first steamed in an earthenware vessel (Khumbh) with soda ash, soaked in camel dung solution to neutralize sizing, and treated with mustard oil (Teli) over days until the fibers become porous and receptive to wild indigo and madder root. The wooden blocks, carved from mature rosewood or shisham, are aligned by the artisan’s rhythm alone—breathing life into every repeat.`
  },
  {
    id: 'art-2',
    title: 'Desert Tessellations: Decoding the Symbols of Sindhi Tuk Rilli',
    subtitle: 'From Thar waterholes to the morning star, how desert women stitch memory into quilts',
    author: 'Dr. Shahana Junejo',
    readTime: '5 min read',
    date: 'August 2026',
    category: 'Textile Anthropology',
    imageUrl: productRilliQuiltImg,
    tags: ['Rilli', 'Appliqué', 'Tharparkar', 'Folk Art'],
    content: `In the vast quietude of the Thar Desert, the Rilli quilt is both warmth and biography. Women gather after midday chores to fold and hand-stitch Tuk appliqué patterns. 

The central medallion represents the community well (Khoo), while outward radiating triangles symbolize the desert sand ridges and migrating birds. The contrasting white tanka stitching (running stitch) binds three to five layers of vintage and organic cotton together without a single machine stitch.`
  },
  {
    id: 'art-3',
    title: 'Hala’s Sacred Blue: 400 Years of Cobalt Terracotta Firing',
    subtitle: 'Inside the wood-fired kilns of the Solangi family preserving Kashi craftsmanship',
    author: 'Ghulam Qadir Solangi',
    readTime: '4 min read',
    date: 'July 2026',
    category: 'Ceramic Heritage',
    imageUrl: productKashiPotteryImg,
    tags: ['Kashi', 'Hala Pottery', 'Cobalt', 'Glaze'],
    content: `The town of Hala, situated on the bank of the Indus River, has been renowned for its architectural ceramics and terracotta craft since the Soomra dynasty. The distinct Hala turquoise and deep navy glazes are derived from ground quartz stone, copper oxide, and cobalt mined from regional deposits. Fired in wood-burning kilns, each vessel emerges with subtle variations in glass depth that machine kilns cannot duplicate.`
  }
];

export const FOURTEEN_STAGES = [
  { stage: 1, name: 'Khumbh (Steaming)', duration: '1 Day', description: 'Raw unbleached cotton/silk is dampened and steamed in large copper vats over bubbling water and soda ash to soften the fibers.' },
  { stage: 2, name: 'Saun (Camel Dung Wash)', duration: '3 Days', description: 'Immersed in an organic natural enzymatic solution to strip impurities and naturally bleach the fabric fibers without chlorine.' },
  { stage: 3, name: 'Chhur (Washing at the River)', duration: '1 Day', description: 'Rigorously beaten on riverstones or washed with abundant flowing water to purge loosened starch and impurities.' },
  { stage: 4, name: 'Teli (Mustard Oil Treatment)', duration: '5 Days', description: 'The hallmark stage giving Teli Ajrak its name: fabric is treated with pure mustard oil and tamarind seed solution to create deep mordant receptivity.' },
  { stage: 5, name: 'Kasayan (Harda / Myrobalan Bath)', duration: '2 Days', description: 'Dipped in myrobalan nut extract, imparting a light yellow ground tone essential for binding future vegetable dyes.' },
  { stage: 6, name: 'Kiryan (First Block Outline)', duration: '2 Days', description: 'The master block artisan stamps the intricate geometric boundaries using a resist paste made of gum, rice flour, and lime.' },
  { stage: 7, name: 'Kut (Black Dye Printing)', duration: '1 Day', description: 'Black motifs are hand-stamped using Syahi—a fermented mixture of rusted iron scrap, jaggery (gur), and tamarind seed water.' },
  { stage: 8, name: 'Phulari (White Resist Mud Printing)', duration: '2 Days', description: 'A thick river-clay, fullers earth, and gum paste is stamped over areas intended to remain pure white stars and borders.' },
  { stage: 9, name: 'Gachh (Alum & Clay Overprint)', duration: '1 Day', description: 'Alum mordant mixed with river clay is stamped to define regions that will turn deep red in subsequent boiling.' },
  { stage: 10, name: 'Asmani (First Indigo Vat Dipping)', duration: '1 Day', description: 'Submerged in deep underground indigofera tinctoria vats. Upon emergence, the pale green dye oxidizes with air into rich royal indigo blue.' },
  { stage: 11, name: 'Bod (River Rinsing & Sun Setting)', duration: '1 Day', description: 'Washed in riverbeds to remove loose surface clay and dried flat under the blazing morning sun.' },
  { stage: 12, name: 'Manjhoor (Boiling in Madder Root)', duration: '1 Day', description: 'Simmered in copper cauldrons with crushed madder roots (majith) and dried pomegranate rind. The alum areas react to produce intense crimson red.' },
  { stage: 13, name: 'Tapai (Sun Bleaching & Sprinkling)', duration: '3 Days', description: 'Laid along open fields and sprinkled with water every 2 hours under intense sun to bleach background whites while intensifying indigo and red.' },
  { stage: 14, name: 'Sufi Chhur (Final Bath & Finishing)', duration: '1 Day', description: 'Final wash in pure spring water, folded in master folds, and sealed with traditional rose water and natural incense.' }
];
