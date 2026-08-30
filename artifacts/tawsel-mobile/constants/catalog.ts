import type { ImageSourcePropType } from 'react-native';
import heroShawarma from '@/assets/images/hero-shawarma.jpg';
import groceryBasket from '@/assets/images/grocery-basket.jpg';

export type Category = 'restaurants' | 'groceries' | 'pharmacy';
export type ToneKey = 'wrap' | 'fatteh' | 'juice' | 'apples' | 'bread' | 'soap';

export const toneColors: Record<ToneKey, [string, string, string]> = {
  wrap: ['#efc083', '#c95e31', '#7f2b23'],
  fatteh: ['#e2ba70', '#a9512e', '#6a3027'],
  juice: ['#f7d579', '#e98b2b', '#b94a22'],
  apples: ['#df7667', '#bd3c32', '#7f2525'],
  bread: ['#f2d49a', '#c9984e', '#8e572e'],
  soap: ['#a8d6c4', '#4c9a7d', '#276158'],
};

export type Venue = {
  id: string;
  name: string;
  arabicName: string;
  kind: Category;
  detail: string;
  arabicDetail: string;
  rating: number;
  eta: string;
  fee: number;
  initials: string;
  image?: ImageSourcePropType;
};

export type Product = {
  id: string;
  name: string;
  arabicName: string;
  venue: string;
  venueId: string;
  category: Category;
  price: number;
  unit: string;
  tone: ToneKey;
  image?: ImageSourcePropType;
  description: string;
  arabicDescription: string;
};

export const venues: Venue[] = [
  { id: 'shawarema', name: 'Shawarema Station', arabicName: 'محطة الشاورما', kind: 'restaurants', detail: 'Wraps • Grill', arabicDetail: 'سندوتشات • مشويات', rating: 4.8, eta: '25–35 min', fee: 8, initials: 'ش', image: heroShawarma },
  { id: 'balah', name: 'Balah Kitchen', arabicName: 'مطبخ البلح', kind: 'restaurants', detail: 'Sudanese • Family', arabicDetail: 'سوداني • عائلي', rating: 4.7, eta: '30–40 min', fee: 7, initials: 'ب' },
  { id: 'bayt', name: 'Bayt Al Tawa', arabicName: 'بيت التاوة', kind: 'restaurants', detail: 'Breakfast • Local', arabicDetail: 'فطور • محلي', rating: 4.6, eta: '20–30 min', fee: 6, initials: 'ت' },
  { id: 'souk', name: 'Soukna Market', arabicName: 'سوقنا ماركت', kind: 'groceries', detail: 'Everyday groceries', arabicDetail: 'مقاضي البيت', rating: 4.9, eta: '35–45 min', fee: 5, initials: 'س', image: groceryBasket },
  { id: 'fresh', name: 'Fresh Basket', arabicName: 'السلة الطازجة', kind: 'groceries', detail: 'Fresh produce', arabicDetail: 'خضار وفاكهة طازجة', rating: 4.7, eta: '30–40 min', fee: 5, initials: 'س' },
  { id: 'dawaa', name: 'Dawaa Pharmacy', arabicName: 'صيدلية دواء', kind: 'pharmacy', detail: 'Wellness • Essentials', arabicDetail: 'عناية • أساسيات', rating: 4.8, eta: '20–30 min', fee: 4, initials: 'د' },
];

export const products: Product[] = [
  { id: 'wrap', name: 'Classic chicken wrap', arabicName: 'سندوتش دجاج كلاسيك', venue: 'Shawarema Station', venueId: 'shawarema', category: 'restaurants', price: 11.5, unit: 'each', tone: 'wrap', image: heroShawarma, description: 'Char-grilled chicken, crisp salad, and house garlic sauce wrapped fresh to order.', arabicDescription: 'دجاج مشوي على الفحم، سلطة طازة، وصوص الثوم الخاص ملفوفة عند الطلب.' },
  { id: 'fatteh', name: 'Sudanese fatteh', arabicName: 'فتة سودانية', venue: 'Balah Kitchen', venueId: 'balah', category: 'restaurants', price: 14, unit: 'plate', tone: 'fatteh', description: 'Warm kisra, chickpeas, and tangy yoghurt finished with sesame sauce.', arabicDescription: 'كسرة دافئة، حمص، وزبادي حامض مع رشة من صوص السمسم.' },
  { id: 'juice', name: 'Mango juice', arabicName: 'عصير مانجو', venue: 'Balah Kitchen', venueId: 'balah', category: 'restaurants', price: 6.5, unit: 'bottle', tone: 'juice', description: 'A chilled, pulpy mango blend made for the walk home or the table.', arabicDescription: 'عصير مانجو بارد ومليان لب، مناسب للمشوار أو للسفرة.' },
  { id: 'apples', name: 'Red apples', arabicName: 'تفاح أحمر', venue: 'Fresh Basket', venueId: 'fresh', category: 'groceries', price: 8.75, unit: '1 kg', tone: 'apples', description: 'Crisp, sweet red apples selected from today’s fresh produce delivery.', arabicDescription: 'تفاح أحمر مقرمش وحلو، مختار من خضار وفاكهة اليوم.' },
  { id: 'bread', name: 'Kisra bread', arabicName: 'خبز كسرة', venue: 'Soukna Market', venueId: 'souk', category: 'groceries', price: 5, unit: 'pack', tone: 'bread', description: 'Soft fermented kisra bread, packed for an easy family meal.', arabicDescription: 'خبز كسرة طري ومخمر، معبأ عشان وجبة عائلية سهلة.' },
  { id: 'soap', name: 'Palmolive soap', arabicName: 'صابون بالموليف', venue: 'Soukna Market', venueId: 'souk', category: 'groceries', price: 13, unit: 'pack', tone: 'soap', description: 'A gentle everyday soap pack for the whole household.', arabicDescription: 'صابون يومي لطيف ومناسب لكل البيت.' },
];

export const categoryLabels: Record<Category, { en: string; ar: string }> = {
  restaurants: { en: 'Restaurants', ar: 'مطاعم' },
  groceries: { en: 'Groceries', ar: 'بقالة' },
  pharmacy: { en: 'Pharmacy', ar: 'صيدلية' },
};

export const categories = [
  { id: 'restaurants' as const, label: 'Restaurants', arabicLabel: 'مطاعم' },
  { id: 'groceries' as const, label: 'Groceries', arabicLabel: 'بقالة' },
  { id: 'pharmacy' as const, label: 'Pharmacy', arabicLabel: 'صيدلية' },
];

export const formatPrice = (value: number, language: 'en' | 'ar') =>
  language === 'ar' ? `${value.toFixed(2)} ج.س` : `${value.toFixed(2)} SDG`;