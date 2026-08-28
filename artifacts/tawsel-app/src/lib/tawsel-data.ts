import heroShawarma from '@/assets/hero-shawarma.jpg';
import groceryBasket from '@/assets/grocery-basket.jpg';

export type Language = 'ar' | 'en';
export type Category = 'all' | 'restaurants' | 'groceries' | 'pharmacy';

export type Venue = {
  id: string;
  name: string;
  arabicName: string;
  kind: Exclude<Category, 'all'>;
  detail: string;
  arabicDetail: string;
  rating: number;
  eta: string;
  fee: number;
  accent: string;
  image?: string;
  initials: string;
};

export type Product = {
  id: string;
  name: string;
  arabicName: string;
  venue: string;
  category: Exclude<Category, 'all'>;
  price: number;
  unit: string;
  tone: string;
  image?: string;
  description: string;
  arabicDescription: string;
};

export const venues: Venue[] = [
  { id: 'shawarema', name: 'Shawarema Station', arabicName: 'محطة الشاورما', kind: 'restaurants', detail: 'Wraps • Grill', arabicDetail: 'سندوتشات • مشويات', rating: 4.8, eta: '25–35 min', fee: 8, accent: 'from-[#f4b083] to-[#bc3d27]', image: heroShawarma, initials: 'ش' },
  { id: 'balah', name: 'Balah Kitchen', arabicName: 'مطبخ البلح', kind: 'restaurants', detail: 'Sudanese • Family', arabicDetail: 'سوداني • عائلي', rating: 4.7, eta: '30–40 min', fee: 7, accent: 'from-[#f3d7a5] to-[#a95f39]', initials: 'ب' },
  { id: 'bayt', name: 'Bayt Al Tawa', arabicName: 'بيت التاوة', kind: 'restaurants', detail: 'Breakfast • Local', arabicDetail: 'فطور • محلي', rating: 4.6, eta: '20–30 min', fee: 6, accent: 'from-[#e7b857] to-[#a63e2e]', initials: 'ت' },
  { id: 'souk', name: 'Soukna Market', arabicName: 'سوقنا ماركت', kind: 'groceries', detail: 'Everyday groceries', arabicDetail: 'مقاضي البيت', rating: 4.9, eta: '35–45 min', fee: 5, accent: 'from-[#b8d1ad] to-[#467362]', image: groceryBasket, initials: 'س' },
  { id: 'fresh', name: 'Fresh Basket', arabicName: 'السلة الطازجة', kind: 'groceries', detail: 'Fresh produce', arabicDetail: 'خضار وفاكهة طازجة', rating: 4.7, eta: '30–40 min', fee: 5, accent: 'from-[#e6c58a] to-[#7e6e3b]', initials: 'س' },
  { id: 'dawaa', name: 'Dawaa Pharmacy', arabicName: 'صيدلية دواء', kind: 'pharmacy', detail: 'Wellness • Essentials', arabicDetail: 'عناية • أساسيات', rating: 4.8, eta: '20–30 min', fee: 4, accent: 'from-[#b5d9dd] to-[#367582]', initials: 'د' },
];

export const products: Product[] = [
  { id: 'wrap', name: 'Classic chicken wrap', arabicName: 'سندوتش دجاج كلاسيك', venue: 'Shawarema Station', category: 'restaurants', price: 11.5, unit: 'each', tone: 'from-[#ebbd82] via-[#cf6333] to-[#832d22]', image: heroShawarma, description: 'Char-grilled chicken, crisp salad, and our house garlic sauce wrapped fresh to order.', arabicDescription: 'دجاج مشوي على الفحم، سلطة طازجة، وصوص الثوم الخاص ملفوفة طازة عند الطلب.' },
  { id: 'fatteh', name: 'Sudanese fatteh', arabicName: 'فتة سودانية', venue: 'Balah Kitchen', category: 'restaurants', price: 14, unit: 'plate', tone: 'from-[#dfb66b] via-[#a8532c] to-[#6c3227]', description: 'Warm kisra, chickpeas, and tangy yoghurt finished with a drizzle of sesame sauce.', arabicDescription: 'كسرة دافئة، حمص، وزبادي حامض مع رشة من صوص السمسم.' },
  { id: 'juice', name: 'Mango juice', arabicName: 'عصير مانجو', venue: 'Balah Kitchen', category: 'restaurants', price: 6.5, unit: 'bottle', tone: 'from-[#f7d477] via-[#e98c2b] to-[#b94b22]', description: 'A chilled, pulpy mango blend made for the walk home or the table.', arabicDescription: 'عصير مانجو بارد ومليان لب، مناسب للمشوار أو للسفرة.' },
  { id: 'apples', name: 'Red apples', arabicName: 'تفاح أحمر', venue: 'Fresh Basket', category: 'groceries', price: 8.75, unit: '1 kg', tone: 'from-[#df7667] via-[#bd3c32] to-[#7f2525]', description: 'Crisp, sweet red apples selected from today’s fresh produce delivery.', arabicDescription: 'تفاح أحمر مقرمش وحلو، مختار من خضار وفاكهة اليوم.' },
  { id: 'bread', name: 'Kisra bread', arabicName: 'خبز كسرة', venue: 'Soukna Market', category: 'groceries', price: 5, unit: 'pack', tone: 'from-[#f2d49a] via-[#c9984e] to-[#8e572e]', description: 'Soft fermented kisra bread, packed for an easy family meal.', arabicDescription: 'خبز كسرة طري ومخمر، معبأ عشان وجبة عائلية سهلة.' },
  { id: 'soap', name: 'Palmolive soap', arabicName: 'صابون بالموليف', venue: 'Soukna Market', category: 'groceries', price: 13, unit: 'pack', tone: 'from-[#a8d6c4] via-[#4c9a7d] to-[#276158]', description: 'A gentle everyday soap pack for the whole household.', arabicDescription: 'صابون يومي لطيف ومناسب لكل البيت.' },
];

export type CartLine = { productId: string; quantity: number };

export const initialCart: CartLine[] = [
  { productId: 'wrap', quantity: 1 },
  { productId: 'juice', quantity: 2 },
];

export const categories = [
  { id: 'restaurants' as const, label: 'Restaurants', arabicLabel: 'مطاعم', icon: 'fork' },
  { id: 'groceries' as const, label: 'Groceries', arabicLabel: 'بقالة', icon: 'basket' },
  { id: 'pharmacy' as const, label: 'Pharmacy', arabicLabel: 'صيدلية', icon: 'plus' },
];

export const formatPrice = (value: number, language: Language) =>
  language === 'ar' ? `${value.toFixed(2)} ج.س` : `${value.toFixed(2)} SDG`;