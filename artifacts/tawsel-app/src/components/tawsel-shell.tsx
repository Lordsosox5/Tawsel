import { createContext, useContext, useEffect, useMemo, useState, type Dispatch, type SetStateAction } from 'react';
import { Link, useLocation } from 'wouter';
import { ArrowLeft, ArrowRight, Bell, Bike, Heart, Home, Menu, Search, ShoppingBag, ShoppingBasket, UserRound, Utensils, Plus, Languages, ReceiptText } from 'lucide-react';
import { categories, formatPrice, initialCart, products, type CartLine, type Language } from '@/lib/tawsel-data';

type TawselContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  cart: CartLine[];
  addToCart: (productId: string, quantity?: number) => void;
  changeQuantity: (productId: string, delta: number) => void;
  removeFromCart: (productId: string) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  toast: string | null;
  showToast: (message: string) => void;
};

const TawselContext = createContext<TawselContextValue | null>(null);

const useStored = <T,>(key: string, fallback: T): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => {
    try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback; } catch { return fallback; }
  });
  useEffect(() => { localStorage.setItem(key, JSON.stringify(value)); }, [key, value]);
  return [value, setValue];
};

export function TawselProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useStored<Language>('tawsel-language', 'en');
  const [cart, setCart] = useStored<CartLine[]>('tawsel-cart', initialCart);
  const [favorites, setFavorites] = useStored<string[]>('tawsel-favorites', ['shawarema']);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(null), 2500);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const value = useMemo<TawselContextValue>(() => ({
    language,
    setLanguage,
    cart,
    addToCart: (productId, quantity = 1) => {
      setCart((currentCart) => {
        const existing = currentCart.find((item) => item.productId === productId);
        return existing
          ? currentCart.map((item) => item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item)
          : [...currentCart, { productId, quantity }];
      });
      setToast(language === 'ar' ? 'تمت الإضافة إلى السلة' : 'Added to your basket');
    },
    changeQuantity: (productId, delta) => setCart((currentCart) => currentCart.map((item) => item.productId === productId ? { ...item, quantity: item.quantity + delta } : item).filter((item) => item.quantity > 0)),
    removeFromCart: (productId) => setCart((currentCart) => currentCart.filter((item) => item.productId !== productId)),
    favorites,
    toggleFavorite: (id) => {
      setFavorites(favorites.includes(id) ? favorites.filter((item) => item !== id) : [...favorites, id]);
      setToast(favorites.includes(id) ? (language === 'ar' ? 'تمت الإزالة من المفضلة' : 'Removed from favourites') : (language === 'ar' ? 'تمت الإضافة للمفضلة' : 'Saved to favourites'));
    },
    toast,
    showToast: setToast,
  }), [language, cart, favorites, toast, setCart, setFavorites, setLanguage]);
  return <TawselContext.Provider value={value}>{children}</TawselContext.Provider>;
}

export function useTawsel() {
  const value = useContext(TawselContext);
  if (!value) throw new Error('useTawsel must be used inside TawselProvider');
  return value;
}

const copy = (language: Language, en: string, ar: string) => language === 'ar' ? ar : en;

function Logo() {
  return <Link href="/" data-testid="link-logo" className="group flex items-center gap-2.5">
    <span className="relative grid h-10 w-10 place-items-center rounded-[14px] bg-primary text-primary-foreground shadow-warm-sm transition-transform group-hover:-rotate-6">
      <Bike size={22} strokeWidth={2.5} />
      <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-background bg-accent" />
    </span>
    <span className="leading-none">
      <span className="block font-display text-[21px] font-bold tracking-[-.05em] text-foreground">tawsel<span className="text-primary">.</span></span>
      <span className="mt-1 block font-mono text-[8px] font-bold uppercase tracking-[.18em] text-muted-foreground">Khartoum, Sudan</span>
    </span>
  </Link>;
}

const navItems = [
  { href: '/', label: 'Home', arabic: 'الرئيسية', icon: Home },
  { href: '/search', label: 'Explore', arabic: 'استكشف', icon: Search },
  { href: '/orders', label: 'Orders', arabic: 'طلباتي', icon: ReceiptText },
  { href: '/account', label: 'Account', arabic: 'حسابي', icon: UserRound },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { language, setLanguage, cart } = useTawsel();
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const isArabic = language === 'ar';
  return <div dir={isArabic ? 'rtl' : 'ltr'} className="tawsel-noise min-h-[100dvh] bg-background text-foreground">
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[74px] max-w-[1440px] items-center justify-between gap-5 px-4 sm:px-7 lg:px-10">
        <div className="flex items-center gap-8"><Logo />
          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map(({ href, label, arabic, icon: Icon }) => <Link key={href} href={href} data-testid={`link-nav-${label.toLowerCase()}`} className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${location === href ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'}`}>
              <Icon size={16} strokeWidth={location === href ? 2.5 : 2} /><span>{copy(language, label, arabic)}</span>
            </Link>)}
          </nav>
        </div>
        <div className="flex items-center gap-2.5">
          <button onClick={() => setLanguage(isArabic ? 'en' : 'ar')} data-testid="button-toggle-language" className="hidden h-10 items-center gap-2 rounded-full border border-border bg-card px-3 text-xs font-bold text-muted-foreground transition-all hover:border-primary/40 hover:text-primary sm:flex">
            <Languages size={15} /><span>{isArabic ? 'English' : 'العربية'}</span>
          </button>
          <button data-testid="button-notifications" onClick={() => {}} className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"><Bell size={17} /></button>
          <Link href="/cart" data-testid="link-cart-header" className="relative grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground shadow-warm-sm transition-transform hover:-translate-y-0.5"><ShoppingBag size={17} />{count > 0 && <span data-testid="text-cart-count" className="absolute -right-1 -top-1 grid h-[19px] min-w-[19px] place-items-center rounded-full border-2 border-background bg-accent px-1 font-mono text-[9px] font-bold text-accent-foreground">{count}</span>}</Link>
          <button data-testid="button-mobile-menu" onClick={() => {}} className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground lg:hidden"><Menu size={18} /></button>
        </div>
      </div>
    </header>
    <main className="mx-auto max-w-[1440px] px-4 pb-28 pt-7 sm:px-7 lg:px-10 lg:pb-12 lg:pt-10">{children}</main>
    <nav className="fixed inset-x-3 bottom-3 z-40 flex items-center justify-around rounded-[22px] border border-border/80 bg-card/95 p-2 shadow-warm backdrop-blur-xl lg:hidden">
      {navItems.map(({ href, label, arabic, icon: Icon }) => <Link key={href} href={href} data-testid={`link-mobile-nav-${label.toLowerCase()}`} className={`flex min-w-[62px] flex-col items-center gap-1 rounded-[16px] px-2 py-2 text-[10px] font-semibold transition-colors ${location === href ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}><Icon size={18} /><span>{copy(language, label, arabic)}</span></Link>)}
      <Link href="/cart" data-testid="link-mobile-cart" className={`flex min-w-[62px] flex-col items-center gap-1 rounded-[16px] px-2 py-2 text-[10px] font-semibold ${location === '/cart' ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}><span className="relative"><ShoppingBag size={18} />{count > 0 && <b className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-0.5 font-mono text-[8px] text-accent-foreground">{count}</b>}</span><span>{copy(language, 'Basket', 'السلة')}</span></Link>
    </nav>
    {useTawsel().toast && <div role="status" data-testid="status-toast" className="fixed bottom-24 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-foreground px-4 py-3 text-sm font-semibold text-background shadow-warm lg:bottom-8"><span className="grid h-5 w-5 place-items-center rounded-full bg-accent text-[11px]">✓</span>{useTawsel().toast}</div>}
  </div>;
}

export function SectionHeading({ eyebrow, title, action, href = '/search' }: { eyebrow?: string; title: string; action?: string; href?: string }) {
  const { language } = useTawsel();
  return <div className="mb-5 flex items-end justify-between gap-3">
    <div><div className="mb-1 font-mono text-[10px] font-bold uppercase tracking-[.18em] text-primary">{eyebrow}</div><h2 data-testid={`text-heading-${title.toLowerCase().replace(/\s/g, '-')}`} className="font-display text-2xl font-bold tracking-[-.04em] text-foreground sm:text-[28px]">{title}</h2></div>
    {action && <Link href={href} data-testid={`link-see-${title.toLowerCase().replace(/\s/g, '-')}`} className="flex items-center gap-1 text-xs font-bold text-primary hover:gap-2 transition-all">{action}<ArrowLeft className="rtl:hidden" size={14} /><ArrowRight className="hidden rtl:block" size={14} /></Link>}
  </div>;
}

export function CategoryPill({ id, label, arabicLabel, icon }: (typeof categories)[number]) {
  const { language } = useTawsel();
  const Icon = icon === 'basket' ? ShoppingBasket : icon === 'plus' ? Plus : Utensils;
  return <Link href={`/search?category=${id}`} data-testid={`link-category-${id}`} className="group flex min-w-[93px] flex-col items-center gap-3 rounded-[20px] border border-border bg-card p-3.5 shadow-warm-sm transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-warm">
    <span className={`grid h-12 w-12 place-items-center rounded-[16px] transition-colors ${id === 'restaurants' ? 'bg-[#f9ddd5] text-primary' : id === 'groceries' ? 'bg-[#e4ecd9] text-[#568064]' : 'bg-[#dbecee] text-[#377986]'}`}><Icon size={21} strokeWidth={1.8} /></span>
    <span className="text-center text-[11px] font-bold leading-tight">{copy(language, label, arabicLabel)}</span>
  </Link>;
}

export function VenueMark({ venue, className = '' }: { venue: typeof import('@/lib/tawsel-data').venues[number]; className?: string }) {
  return <div className={`relative overflow-hidden rounded-[20px] bg-gradient-to-br ${venue.accent} ${className}`}>
    {venue.image ? <img src={venue.image} alt="" className="h-full w-full object-cover mix-blend-multiply opacity-80" /> : <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, white 0 2px, transparent 3px), radial-gradient(circle at 80% 70%, white 0 1px, transparent 2px)', backgroundSize: '34px 34px' }} />}
    <span className="absolute bottom-2 left-2 grid h-9 w-9 place-items-center rounded-xl bg-card/90 font-arabic text-lg font-bold text-foreground shadow-sm">{venue.initials}</span>
  </div>;
}

export function ProductMark({ product, className = '' }: { product: typeof products[number]; className?: string }) {
  return <div className={`relative overflow-hidden rounded-[18px] bg-gradient-to-br ${product.tone} ${className}`}>
    {product.image && <img src={product.image} alt="" className="h-full w-full object-cover mix-blend-multiply opacity-70" />}
    {!product.image && <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'radial-gradient(circle at 70% 25%, white 0 2px, transparent 3px), radial-gradient(circle at 25% 75%, white 0 12px, transparent 13px)' }} />}
  </div>;
}

export function VenueCard({ venue }: { venue: typeof import('@/lib/tawsel-data').venues[number] }) {
  const { language, favorites, toggleFavorite } = useTawsel();
  const favorite = favorites.includes(venue.id);
  return <article data-testid={`card-venue-${venue.id}`} className="group relative min-w-[238px] overflow-hidden rounded-[22px] border border-border bg-card shadow-warm-sm transition-all hover:-translate-y-1 hover:shadow-warm">
    <Link href={`/search?venue=${venue.id}`} data-testid={`link-venue-${venue.id}`} className="block"><VenueMark venue={venue} className="h-[142px] w-full rounded-none" /><div className="p-4"><div className="flex items-start justify-between gap-2"><div><h3 className="font-display text-[15px] font-bold leading-tight">{copy(language, venue.name, venue.arabicName)}</h3><p className="mt-1 text-[11px] text-muted-foreground">{copy(language, venue.detail, venue.arabicDetail)}</p></div><span className="flex items-center gap-1 rounded-full bg-accent/20 px-2 py-1 font-mono text-[10px] font-bold text-foreground">★ {venue.rating}</span></div><div className="mt-3 flex items-center gap-3 text-[10px] font-semibold text-muted-foreground"><span className="flex items-center gap-1"><Bike size={12} />{venue.eta}</span><span>•</span><span>{formatPrice(venue.fee, language)} {copy(language, 'delivery', 'توصيل')}</span></div></div></Link>
    <button onClick={() => toggleFavorite(venue.id)} data-testid={`button-favorite-${venue.id}`} aria-label={favorite ? 'Remove favourite' : 'Save favourite'} className={`absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full border border-white/60 bg-card/90 shadow-sm transition-transform hover:scale-110 ${favorite ? 'text-primary' : 'text-muted-foreground'}`}><Heart size={15} fill={favorite ? 'currentColor' : 'none'} /></button>
  </article>;
}

export function ProductCard({ product }: { product: typeof products[number] }) {
  const { language, cart, addToCart } = useTawsel();
  const line = cart.find((item) => item.productId === product.id);
  return <article data-testid={`card-product-${product.id}`} className="group relative overflow-hidden rounded-[20px] border border-border bg-card shadow-warm-sm transition-all hover:-translate-y-1 hover:shadow-warm"><Link href={`/products/${product.id}`} data-testid={`link-product-${product.id}`} className="block"><ProductMark product={product} className="h-[130px] w-full rounded-none" /><div className="p-3.5 pr-12"><p className="font-arabic text-[13px] font-bold leading-snug">{copy(language, product.name, product.arabicName)}</p><p className="mt-1 text-[10px] text-muted-foreground">{product.venue}</p><div className="mt-3"><strong className="font-mono text-xs">{formatPrice(product.price, language)}</strong><span className="ml-1 text-[10px] text-muted-foreground">/ {product.unit}</span></div></div></Link><button onClick={() => addToCart(product.id)} data-testid={`button-add-product-${product.id}`} aria-label={copy(language, `Add ${product.name} to basket`, `أضف ${product.arabicName} للسلة`)} className="absolute bottom-3.5 right-3.5 grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-110 active:scale-95">{line ? <span className="font-mono text-[11px] font-bold">{line.quantity}</span> : <Plus size={15} />}</button></article>;
}

export { copy };