import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { AppHeader, AppScreen, CategoryChips, ProductCard, styles as uiStyles, VenueCard } from '@/components/tawsel-ui';
import { categoryLabels, products, venues, type Category } from '@/constants/catalog';
import { useColors } from '@/hooks/useColors';
import { useTawsel } from '@/components/tawsel-context';

export default function ShopScreen() {
  const { language } = useTawsel();
  const colors = useColors();
  const router = useRouter();
  const params = useLocalSearchParams<{ category?: string }>();
  const selectedCategory = (params.category as Category | undefined);
  const [query, setQuery] = useState('');
  const filteredProducts = useMemo(() => products.filter((product) => (!selectedCategory || product.category === selectedCategory) && `${product.name} ${product.arabicName} ${product.venue}`.toLowerCase().includes(query.toLowerCase())), [query, selectedCategory]);
  const filteredVenues = useMemo(() => venues.filter((venue) => (!selectedCategory || venue.kind === selectedCategory) && `${venue.name} ${venue.arabicName}`.toLowerCase().includes(query.toLowerCase())), [query, selectedCategory]);
  const categoryTitle = selectedCategory ? categoryLabels[selectedCategory][language] : language === 'ar' ? 'رف الحلة' : 'The local shelf';
  return <KeyboardAvoidingView behavior="padding" style={shopStyles.keyboard}><AppScreen><AppHeader title={categoryTitle} eyebrow={language === 'ar' ? 'تسوق' : 'SHOP'} /><Text style={[shopStyles.title, { color: colors.foreground }]}>{language === 'ar' ? 'اطلبها على كيفك.' : 'Good things, ready to go.'}</Text><Text style={[shopStyles.subtitle, { color: colors.mutedForeground }]}>{language === 'ar' ? 'أكل، مقاضي، وأساسيات من أماكن قريبة.' : 'Food, groceries, and essentials from nearby places.'}</Text><View style={[shopStyles.search, { backgroundColor: colors.card, borderColor: colors.border }]}><Feather name="search" size={18} color={colors.mutedForeground} /><TextInput value={query} onChangeText={setQuery} placeholder={language === 'ar' ? 'فتش عن منتج أو محل…' : 'Search products or shops…'} placeholderTextColor={colors.mutedForeground} style={[shopStyles.input, { color: colors.foreground }]} testID="mobile-shop-search" returnKeyType="search" /></View><CategoryChips active={selectedCategory} /><View style={shopStyles.resultHeader}><Text style={[uiStyles.eyebrow, { color: colors.primary }]}>{filteredProducts.length} {language === 'ar' ? 'منتجات' : 'PRODUCTS'}</Text><Pressable onPress={() => router.push('/cart')} testID="mobile-shop-cart"><Text style={[shopStyles.cartText, { color: colors.primary }]}>{language === 'ar' ? 'شوف السلة ›' : 'View basket ›'}</Text></Pressable></View><View style={shopStyles.productGrid}>{filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}</View>{filteredVenues.length > 0 && <><Text style={[uiStyles.eyebrow, { color: colors.primary, marginTop: 28 }]}>{language === 'ar' ? 'الأماكن' : 'PLACES'}</Text><View style={shopStyles.venueList}>{filteredVenues.map((venue) => <VenueCard key={venue.id} venue={venue} />)}</View></>}{filteredProducts.length === 0 && filteredVenues.length === 0 && <View style={[shopStyles.empty, { backgroundColor: colors.secondary }]}><Feather name="search" size={24} color={colors.mutedForeground} /><Text style={[shopStyles.emptyTitle, { color: colors.foreground }]}>{language === 'ar' ? 'ما لقينا حاجة.' : 'Nothing on this shelf yet.'}</Text><Text style={[shopStyles.emptyBody, { color: colors.mutedForeground }]}>{language === 'ar' ? 'جرب كلمة تانية أو شوف كل المنتجات.' : 'Try another search or browse another category.'}</Text></View>}</AppScreen></KeyboardAvoidingView>;
}

const shopStyles = StyleSheet.create({
  keyboard: { flex: 1 },
  title: { fontSize: 29, fontWeight: '800', letterSpacing: -1, marginTop: 10 },
  subtitle: { fontSize: 13, lineHeight: 19, marginTop: 8, marginBottom: 18 },
  search: { height: 52, borderRadius: 17, borderWidth: 1, paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 4 },
  input: { flex: 1, fontSize: 14 },
  resultHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, marginBottom: 13 },
  cartText: { fontSize: 12, fontWeight: '800' },
  productGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  venueList: { marginTop: 12, gap: 12 },
  empty: { borderRadius: 22, alignItems: 'center', padding: 34, marginTop: 20 },
  emptyTitle: { fontSize: 17, fontWeight: '800', marginTop: 11 },
  emptyBody: { fontSize: 12, marginTop: 6, textAlign: 'center' },
});