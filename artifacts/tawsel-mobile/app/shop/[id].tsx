import { Feather, Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { AppHeader, AppScreen, ProductCard, SectionTitle, VenueCard, styles } from '@/components/tawsel-ui';
import { products, venues } from '@/constants/catalog';
import { useColors } from '@/hooks/useColors';
import { useTawsel } from '@/components/tawsel-context';

export default function ShopDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colors = useColors();
  const { language } = useTawsel();
  const venue = venues.find((item) => item.id === id);
  if (!venue) return <AppScreen><AppHeader /><View style={styles.mobileEmpty}><Ionicons name="storefront-outline" size={34} color={colors.primary} /><Text style={[styles.mobileEmptyTitle, { color: colors.foreground }]}>{language === 'ar' ? 'المحل ده ما متوفر.' : 'That shop is not available.'}</Text><Pressable onPress={() => router.replace('/shop')} style={[styles.primaryButton, { backgroundColor: colors.primary }]}><Text style={[styles.primaryButtonText, { color: colors.primaryForeground }]}>{language === 'ar' ? 'العودة للمحلات' : 'Back to shops'}</Text></Pressable></View></AppScreen>;
  const shopProducts = products.filter((product) => product.venueId === venue.id);
  return <AppScreen><Stack.Screen options={{ title: language === 'ar' ? venue.arabicName : venue.name }} /><AppHeader title={language === 'ar' ? venue.arabicName : venue.name} eyebrow={language === 'ar' ? 'المحل' : 'SHOP'} /><Pressable onPress={() => router.back()} style={styles.backLink} testID="mobile-shop-back"><Feather name="arrow-left" size={15} color={colors.primary} /><Text style={[styles.backText, { color: colors.primary }]}>{language === 'ar' ? 'العودة' : 'Back'}</Text></Pressable><VenueCard venue={venue} /><View style={styles.shopIntro}><Text style={[styles.shopTitle, { color: colors.foreground }]}>{language === 'ar' ? 'اختار طلبك' : 'Pick your order'}</Text><Text style={[styles.shopSubtitle, { color: colors.mutedForeground }]}>{language === 'ar' ? `${venue.eta} · توصيل ${venue.fee} ج.س` : `${venue.eta} · ${venue.fee} SDG delivery`}</Text></View><View style={styles.relatedGrid}>{shopProducts.map((product) => <ProductCard key={product.id} product={product} />)}</View></AppScreen>;
}