import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { CartLine } from '@/constants/types';

export type Language = 'en' | 'ar';
type TawselContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  cart: CartLine[];
  addToCart: (productId: string, quantity?: number) => void;
  changeQuantity: (productId: string, delta: number) => void;
  cartCount: number;
};

const TawselContext = createContext<TawselContextValue | null>(null);
const initialCart: CartLine[] = [{ productId: 'wrap', quantity: 1 }, { productId: 'juice', quantity: 2 }];

export function TawselProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [cart, setCart] = useState<CartLine[]>(initialCart);

  useEffect(() => {
    AsyncStorage.getItem('tawsel-mobile-cart').then((stored) => {
      if (stored) setCart(JSON.parse(stored) as CartLine[]);
    }).catch(() => undefined);
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('tawsel-mobile-cart', JSON.stringify(cart)).catch(() => undefined);
  }, [cart]);

  const value = useMemo<TawselContextValue>(() => ({
    language,
    setLanguage,
    cart,
    addToCart: (productId, quantity = 1) => setCart((current) => {
      const existing = current.find((item) => item.productId === productId);
      return existing
        ? current.map((item) => item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item)
        : [...current, { productId, quantity }];
    }),
    changeQuantity: (productId, delta) => setCart((current) => current.map((item) => item.productId === productId ? { ...item, quantity: item.quantity + delta } : item).filter((item) => item.quantity > 0)),
    cartCount: cart.reduce((total, item) => total + item.quantity, 0),
  }), [cart, language]);

  return <TawselContext.Provider value={value}>{children}</TawselContext.Provider>;
}

export function useTawsel() {
  const context = useContext(TawselContext);
  if (!context) throw new Error('useTawsel must be used inside TawselProvider');
  return context;
}