import { Feather, Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { categoryLabels, formatPrice, products, toneColors, type Category, type Product, type Venue } from '@/constants/catalog';
import { useColors } from '@/hooks/useColors';
import { useTawsel } from '@/components/tawsel-context';

export function AppScreen({ children, scroll = true }: { children: React.ReactNode; scroll?: boolean }) {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const content = <View style={[styles.content, { paddingBottom: insets.bottom + 104 }]}>{children}</View>;
  return <View style={[styles.screen, { backgroundColor: colors.background }]}>{scroll ? <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: insets.top + 12 }}>{content}</ScrollView> : content}</View>;
}

export function AppHeader({
  title,
  eyebrow,
  showBrand = false,
  showBack = false,
  showCart = true,
}: {
  title?: string;
  eyebrow?: string;
  showBrand?: boolean;
  showBack?: boolean;
  showCart?: boolean;
}) {
  const router = useRouter();
  const colors = useColors();
  const { language, cartCount } = useTawsel();
  const goBack = () => (router.canGoBack() ? router.back() : router.replace('/'));
  return <View style={styles.header}>
    {showBrand ? <Pressable onPress={() => router.push('/')} accessibilityRole="button" testID="mobile-logo" style={styles.logoButton}>
      <View style={[styles.logoMark, { backgroundColor: colors.primary }]}><Ionicons name="bicycle" size={20} color={colors.primaryForeground} /></View>
      <View><Text style={[styles.logo, { color: colors.foreground }]}>tawsel.</Text><Text style={[styles.logoSub, { color: colors.mutedForeground }]}>{language === 'ar' ? 'الخرطوم، السودان' : 'KHARTOUM, SUDAN'}</Text></View>
    </Pressable> : showBack ? <View style={styles.headerTitleGroup}>
      <Pressable onPress={goBack} accessibilityRole="button" accessibilityLabel={language === 'ar' ? 'رجوع' : 'Go back'} testID="mobile-header-back" style={styles.headerBackButton}>
        <Feather name="arrow-left" size={17} color={colors.foreground} />
      </Pressable>
      <View style={styles.headerTitle}>
        {eyebrow && <Text style={[styles.headerEyebrow, { color: colors.primary }]}>{eyebrow}</Text>}
        {title && <Text style={[styles.headerText, { color: colors.foreground }]} numberOfLines={1}>{title}</Text>}
      </View>
    </View> : <View style={[styles.headerTitle, styles.headerTitleStandalone]}>
      {eyebrow && <Text style={[styles.headerEyebrow, { color: colors.primary }]}>{eyebrow}</Text>}
      {title && <Text style={[styles.headerText, { color: colors.foreground }]} numberOfLines={1}>{title}</Text>}
    </View>}
    <View style={styles.headerRight}>
      {showCart && <Pressable onPress={() => router.push('/cart')} accessibilityRole="button" testID="mobile-header-cart" style={[styles.iconButton, { backgroundColor: colors.primary }]}>
        <Ionicons name="bag-handle-outline" size={18} color={colors.primaryForeground} />
        {cartCount > 0 && <View style={[styles.count, { backgroundColor: colors.accent, borderColor: colors.background }]}><Text style={[styles.countText, { color: colors.accentForeground }]}>{cartCount}</Text></View>}
      </Pressable>}
    </View>
  </View>;
}

export function CategoryChips({ active }: { active?: Category }) {
  const router = useRouter();
  const colors = useColors();
  const { language } = useTawsel();
  return <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
    {(Object.keys(categoryLabels) as Category[]).map((category) => {
      const selected = active === category;
      const label = categoryLabels[category][language];
      return <Pressable key={category} onPress={() => router.push({ pathname: '/shop', params: { category } })} testID={`mobile-category-${category}`} style={[styles.chip, { backgroundColor: selected ? colors.foreground : colors.card, borderColor: selected ? colors.foreground : colors.border }]}><Text style={[styles.chipText, { color: selected ? colors.card : colors.foreground }]}>{label}</Text></Pressable>;
    })}
  </ScrollView>;
}

export function ProductArt({ product, height = 142, width }: { product: Product; height?: number; width?: number }) {
  const colors = useColors();
  return <LinearGradient colors={toneColors[product.tone]} style={[styles.productArt, { height, width }]}>
    {product.image ? <Image source={product.image} contentFit="cover" style={StyleSheet.absoluteFillObject} /> : <View style={[styles.artDot, { backgroundColor: colors.card }]} />}
    <View style={[styles.artMark, { backgroundColor: colors.card }]} />
  </LinearGradient>;
}

export function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const colors = useColors();
  const { language, cart, addToCart } = useTawsel();
  const line = cart.find((item) => item.productId === product.id);
  return <View style={[styles.productCard, { backgroundColor: colors.card, borderColor: colors.border }]} testID={`mobile-product-card-${product.id}`}>
    <Pressable onPress={() => router.push({ pathname: '/product/[id]', params: { id: product.id } })} testID={`mobile-product-${product.id}`} accessibilityRole="button">
      <ProductArt product={product} />
      <View style={styles.cardCopy}><Text style={[styles.productName, { color: colors.foreground }]} numberOfLines={2}>{language === 'ar' ? product.arabicName : product.name}</Text><Text style={[styles.productVenue, { color: colors.mutedForeground }]}>{product.venue}</Text><Text style={[styles.productPrice, { color: colors.primary }]}>{formatPrice(product.price, language)} <Text style={[styles.unit, { color: colors.mutedForeground }]}>/ {product.unit}</Text></Text></View>
    </Pressable>
    <Pressable onPress={() => addToCart(product.id)} testID={`mobile-add-${product.id}`} accessibilityLabel={language === 'ar' ? `أضف ${product.arabicName}` : `Add ${product.name}`} style={[styles.addButton, { backgroundColor: colors.primary }]}>
      {line ? <Text style={[styles.addCount, { color: colors.primaryForeground }]}>{line.quantity}</Text> : <Feather name="plus" size={16} color={colors.primaryForeground} />}
    </Pressable>
  </View>;
}

export function VenueCard({ venue }: { venue: Venue }) {
  const router = useRouter();
  const colors = useColors();
  const { language } = useTawsel();
  return <Pressable onPress={() => router.push({ pathname: '/shop/[id]', params: { id: venue.id } })} testID={`mobile-venue-${venue.id}`} style={[styles.venueCard, { backgroundColor: colors.card, borderColor: colors.border }]} accessibilityRole="button">
    <LinearGradient colors={venue.kind === 'groceries' ? [colors.groceryStart, colors.groceryEnd] : venue.kind === 'pharmacy' ? [colors.pharmacyStart, colors.pharmacyEnd] : [colors.restaurantStart, colors.restaurantEnd]} style={styles.venueArt}>
      {venue.image ? <Image source={venue.image} contentFit="cover" style={StyleSheet.absoluteFillObject} /> : <Text style={[styles.venueInitial, { color: colors.card }]}>{venue.initials}</Text>}
      <View style={[styles.rating, { backgroundColor: colors.card }]}><Text style={[styles.ratingText, { color: colors.foreground }]}>★ {venue.rating}</Text></View>
    </LinearGradient>
    <View style={styles.venueCopy}><Text style={[styles.venueName, { color: colors.foreground }]}>{language === 'ar' ? venue.arabicName : venue.name}</Text><Text style={[styles.productVenue, { color: colors.mutedForeground }]}>{language === 'ar' ? venue.arabicDetail : venue.detail}</Text><Text style={[styles.venueMeta, { color: colors.mutedForeground }]}>{venue.eta}  ·  {formatPrice(venue.fee, language)}</Text></View>
  </Pressable>;
}

export function SectionTitle({ eyebrow, title, action, onAction }: { eyebrow: string; title: string; action?: string; onAction?: () => void }) {
  const colors = useColors();
  return <View style={styles.sectionTitle}><View><Text style={[styles.eyebrow, { color: colors.primary }]}>{eyebrow}</Text><Text style={[styles.sectionHeading, { color: colors.foreground }]}>{title}</Text></View>{action && <Pressable onPress={onAction} testID="mobile-section-action"><Text style={[styles.actionText, { color: colors.primary }]}>{action}  ›</Text></Pressable>}</View>;
}

export const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 18 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18, paddingBottom: 14 },
  logoButton: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  logoMark: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  logo: { fontSize: 19, fontWeight: '800', letterSpacing: -0.7 },
  logoSub: { fontSize: 7, fontWeight: '700', letterSpacing: 1.1, marginTop: 1 },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerTitleGroup: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 11 },
  headerTitle: { flexShrink: 1 },
  headerTitleStandalone: { flex: 1 },
  headerBackButton: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center' },
  headerEyebrow: { fontSize: 8, fontWeight: '800', letterSpacing: 1.1 },
  headerText: { fontSize: 18, fontWeight: '800', letterSpacing: -0.35, marginTop: 2 },
  iconButton: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center' },
  count: { position: 'absolute', right: -2, top: -2, minWidth: 18, height: 18, paddingHorizontal: 4, borderRadius: 9, alignItems: 'center', justifyContent: 'center', borderWidth: 2 },
  countText: { fontSize: 9, fontWeight: '800' },
  chips: { gap: 8, paddingVertical: 6, paddingRight: 8 },
  chip: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 22, borderWidth: 1 },
  chipText: { fontSize: 12, fontWeight: '700' },
  productArt: { overflow: 'hidden', borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  artDot: { width: 26, height: 26, borderRadius: 13, opacity: 0.28 },
  artMark: { position: 'absolute', width: 5, height: 5, borderRadius: 3, top: 16, right: 20, opacity: 0.28 },
  productCard: { width: 178, borderRadius: 18, borderWidth: 1, overflow: 'hidden', marginRight: 10, position: 'relative' },
  cardCopy: { padding: 12, paddingRight: 42, minHeight: 102 },
  productName: { fontSize: 14, fontWeight: '800', lineHeight: 18 },
  productVenue: { fontSize: 10, marginTop: 4 },
  productPrice: { fontSize: 13, fontWeight: '800', marginTop: 12 },
  unit: { fontSize: 9, fontWeight: '500' },
  addButton: { position: 'absolute', right: 11, bottom: 11, width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  addCount: { fontSize: 11, fontWeight: '800' },
  venueCard: { width: 250, borderRadius: 20, borderWidth: 1, overflow: 'hidden', marginRight: 12 },
  venueArt: { height: 130, justifyContent: 'center', alignItems: 'center' },
  venueInitial: { fontSize: 52, fontWeight: '800', opacity: 0.9 },
  rating: { position: 'absolute', left: 11, top: 11, paddingHorizontal: 8, paddingVertical: 5, borderRadius: 13 },
  ratingText: { fontSize: 10, fontWeight: '800' },
  venueCopy: { padding: 13 },
  venueName: { fontSize: 15, fontWeight: '800' },
  venueMeta: { fontSize: 10, marginTop: 9 },
  sectionTitle: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 27, marginBottom: 13 },
  eyebrow: { fontSize: 9, fontWeight: '800', letterSpacing: 1.5, textTransform: 'uppercase' },
  sectionHeading: { fontSize: 24, fontWeight: '800', letterSpacing: -0.7, marginTop: 5 },
  actionText: { fontSize: 12, fontWeight: '800', paddingBottom: 3 },
  hero: { minHeight: 265, borderRadius: 28, padding: 23, overflow: 'hidden', flexDirection: 'row', alignItems: 'center', marginBottom: 2 },
  heroCopy: { flex: 1, zIndex: 2 },
  heroKicker: { fontSize: 9, fontWeight: '800', letterSpacing: 1.5 },
  heroTitle: { fontSize: 31, fontWeight: '800', letterSpacing: -1.2, marginTop: 9, lineHeight: 35 },
  heroBody: { fontSize: 13, lineHeight: 19, marginTop: 11, maxWidth: 220 },
  heroButton: { marginTop: 20, alignSelf: 'flex-start', paddingHorizontal: 15, paddingVertical: 11, borderRadius: 22, flexDirection: 'row', alignItems: 'center', gap: 7 },
  heroButtonText: { fontSize: 12, fontWeight: '800' },
  heroOrb: { width: 142, height: 142, borderWidth: 18, borderRadius: 71, alignItems: 'center', justifyContent: 'center', opacity: 0.65, transform: [{ rotate: '-18deg' }], marginRight: -42 },
  categoryRow: { gap: 9, paddingVertical: 3, paddingRight: 8 },
  categoryCard: { width: 104, borderRadius: 19, borderWidth: 1, padding: 12, alignItems: 'center', gap: 10 },
  categoryIcon: { width: 48, height: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  categoryText: { fontSize: 11, fontWeight: '800' },
  horizontalRow: { paddingRight: 8 },
  promise: { flexDirection: 'row', alignItems: 'center', borderRadius: 22, padding: 17, marginTop: 29 },
  promiseCopy: { flex: 1, marginLeft: 12 },
  promiseTitle: { fontSize: 14, fontWeight: '800' },
  promiseBody: { fontSize: 11, lineHeight: 17, marginTop: 4 },
  mobileEmpty: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 120 },
  mobileEmptyTitle: { fontSize: 24, fontWeight: '800', marginTop: 15, marginBottom: 22 },
  primaryButton: { minHeight: 50, paddingHorizontal: 20, borderRadius: 17, flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'center' },
  primaryButtonText: { fontSize: 14, fontWeight: '800' },
  backLink: { flexDirection: 'row', alignItems: 'center', gap: 7, marginBottom: 13, paddingVertical: 4 },
  backText: { fontSize: 12, fontWeight: '800' },
  detailCard: { borderRadius: 24, borderWidth: 1, overflow: 'hidden' },
  detailBody: { padding: 18 },
  detailTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  categoryTag: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12, fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  basketTag: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12, fontSize: 10, fontWeight: '800' },
  detailTitle: { fontSize: 29, lineHeight: 33, fontWeight: '800', letterSpacing: -0.8, marginTop: 17 },
  detailDescription: { fontSize: 14, lineHeight: 21, marginTop: 10 },
  detailMeta: { borderTopWidth: 1, borderBottomWidth: 1, paddingVertical: 15, marginTop: 20, gap: 14 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  metaLabel: { fontSize: 9, fontWeight: '800', letterSpacing: 1.1 },
  metaValue: { fontSize: 12, fontWeight: '800', marginTop: 3 },
  priceRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 },
  detailPrice: { fontSize: 25, fontWeight: '800', letterSpacing: -0.5 },
  quantity: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 22, padding: 4, gap: 10 },
  quantityButton: { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  quantityText: { fontSize: 14, fontWeight: '800', minWidth: 13, textAlign: 'center' },
  secondaryButton: { minHeight: 48, borderRadius: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 10 },
  secondaryButtonText: { fontSize: 13, fontWeight: '800' },
  relatedGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  shopIntro: { marginTop: 24, marginBottom: 13 },
  shopTitle: { fontSize: 23, fontWeight: '800', letterSpacing: -0.5 },
  shopSubtitle: { fontSize: 12, marginTop: 5 },
  emptyBody: { fontSize: 13, lineHeight: 20, textAlign: 'center' },
  addressRow: { flexDirection: 'row', alignItems: 'center', gap: 9, borderWidth: 1, borderRadius: 17, padding: 14, marginBottom: 15 },
  addressText: { flex: 1, fontSize: 12, fontWeight: '700' },
  changeText: { fontSize: 11, fontWeight: '800' },
  cartList: { gap: 10 },
  cartRow: { minHeight: 108, borderWidth: 1, borderRadius: 20, padding: 10, flexDirection: 'row', alignItems: 'center', gap: 10 },
  cartCopy: { flex: 1, minWidth: 0 },
  cartName: { fontSize: 13, lineHeight: 17, fontWeight: '800' },
  summary: { borderRadius: 24, padding: 18, marginTop: 16, gap: 12 },
  summaryLine: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  summaryLabel: { fontSize: 12 },
  summaryValue: { fontSize: 12, fontWeight: '700' },
  summaryTotal: { borderTopWidth: 1, paddingTop: 14, marginTop: 3 },
  summaryTotalLabel: { fontSize: 15, fontWeight: '800' },
  summaryTotalValue: { fontSize: 18, fontWeight: '800' },
  segment: { flexDirection: 'row', alignSelf: 'flex-start', padding: 4, borderRadius: 22, marginBottom: 16 },
  segmentButton: { borderRadius: 18, paddingHorizontal: 15, paddingVertical: 9 },
  segmentText: { fontSize: 11, fontWeight: '800' },
  orderCard: { borderWidth: 1, borderRadius: 24, padding: 17 },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  orderHeading: { flex: 1 },
  statusPill: { alignSelf: 'flex-start', paddingHorizontal: 9, paddingVertical: 6, borderRadius: 11, fontSize: 9, fontWeight: '800', letterSpacing: 0.7 },
  orderName: { fontSize: 14, fontWeight: '800' },
  orderId: { fontSize: 10, marginTop: 4 },
  timeline: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 27, marginBottom: 19 },
  timelineItem: { alignItems: 'center', gap: 7, flex: 1 },
  timelineDot: { width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  timelineText: { fontSize: 9, textAlign: 'center' },
  courier: { flexDirection: 'row', alignItems: 'center', borderRadius: 16, padding: 11 },
  avatar: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 14, fontWeight: '800' },
  courierCopy: { flex: 1, marginLeft: 10 },
  courierTitle: { fontSize: 11, fontWeight: '800' },
  courierBody: { fontSize: 10, marginTop: 3 },
  etaBox: { borderRadius: 20, padding: 17, marginTop: 14 },
  etaLabel: { fontSize: 9, fontWeight: '800', letterSpacing: 1.1 },
  eta: { fontSize: 30, fontWeight: '800', marginTop: 7 },
  etaSub: { fontSize: 11, marginTop: 2 },
  totalRow: { fontSize: 11, marginTop: 18 },
  pastList: { gap: 10 },
  pastRow: { minHeight: 76, borderWidth: 1, borderRadius: 20, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 11 },
  pastIcon: { width: 42, height: 42, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  pastCopy: { flex: 1 },
  pastTotal: { fontSize: 11, fontWeight: '800' },
  profile: { borderWidth: 1, borderRadius: 22, padding: 17, flexDirection: 'row', alignItems: 'center' },
  profileAvatar: { width: 56, height: 56, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  profileAvatarText: { fontSize: 24, fontWeight: '800' },
  profileCopy: { flex: 1, marginLeft: 13 },
  profileName: { fontSize: 17, fontWeight: '800' },
  profilePhone: { fontSize: 11, marginTop: 4 },
  accountRows: { gap: 10, marginTop: 14 },
  accountRow: { borderWidth: 1, borderRadius: 20, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 11 },
  accountIcon: { width: 40, height: 40, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  accountRowCopy: { flex: 1 },
  accountTitle: { fontSize: 12, fontWeight: '800' },
  accountDetail: { fontSize: 10, marginTop: 4 },
  preferenceCard: { borderRadius: 22, padding: 17, marginTop: 22 },
  preferenceRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, gap: 11 },
});