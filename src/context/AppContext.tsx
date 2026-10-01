import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  Artisan, 
  Order, 
  CartItem, 
  CurrencyCode, 
  UserRole, 
  UserProfile, 
  CraftArticle,
  LightingMode
} from '../types';
import { 
  PRODUCTS as INITIAL_PRODUCTS, 
  ARTISANS, 
  INITIAL_ORDERS, 
  CRAFT_ARTICLES,
  CURRENCY_RATES 
} from '../data/mockData';

interface AppContextType {
  // Catalog & Artisans
  products: Product[];
  artisans: Artisan[];
  articles: CraftArticle[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Selected Product / Modals
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  activeLighting: LightingMode;
  setActiveLighting: (mode: LightingMode) => void;
  isScaleModalOpen: boolean;
  setIsScaleModalOpen: (open: boolean) => void;
  isProcessModalOpen: boolean;
  setIsProcessModalOpen: (open: boolean) => void;
  isStoriesModalOpen: boolean;
  setIsStoriesModalOpen: (open: boolean) => void;
  selectedArtisan: Artisan | null;
  setSelectedArtisan: (artisan: Artisan | null) => void;
  customCommissionProduct: Product | null;
  setCustomCommissionProduct: (product: Product | null) => void;

  // Currency
  currentCurrency: CurrencyCode;
  setCurrentCurrency: (currency: CurrencyCode) => void;
  formatPrice: (pkrAmount: number) => string;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotalPKR: number;
  cartItemCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  freeShippingThresholdPKR: number;
  reservationSecondsLeft: number;

  // Wishlist
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Checkout & Orders
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'trackingSteps' | 'trackingNumber'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['status'], newLocation?: string, note?: string) => void;
  activeOrderConfirmation: Order | null;
  setActiveOrderConfirmation: (order: Order | null) => void;

  // User & Roles
  currentUser: UserProfile;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isAccountModalOpen: boolean;
  setIsAccountModalOpen: (open: boolean) => void;
  loginAs: (role: UserRole, emailOrPhone: string, name?: string) => void;
  logout: () => void;

  // Filters & Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedTown: string;
  setSelectedTown: (town: string) => void;
  selectedTechnique: string;
  setSelectedTechnique: (technique: string) => void;

  // Toast Notification
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD_PKR = 15000;

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State initialization
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('dastkari_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [artisans] = useState<Artisan[]>(ARTISANS);
  const [articles] = useState<CraftArticle[]>(CRAFT_ARTICLES);
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('dastkari_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [currentCurrency, setCurrentCurrency] = useState<CurrencyCode>('PKR');
  const [currentRole, setCurrentRole] = useState<UserRole>('buyer');

  const [currentUser, setCurrentUser] = useState<UserProfile>({
    id: 'usr-buyer-01',
    name: 'Asif Ali Larik',
    email: 'asifalilarik51@gmail.com',
    phone: '+92 300 8274192',
    role: 'buyer',
    savedAddresses: [
      {
        id: 'addr-1',
        label: 'Home (Karachi)',
        street: 'House 42, Street 7, Phase 6, DHA',
        city: 'Karachi',
        postalCode: '75500',
        country: 'Pakistan',
        isDefault: true
      },
      {
        id: 'addr-2',
        label: 'Lahore Studio',
        street: 'Apartment 304, Mall One, Gulberg III',
        city: 'Lahore',
        postalCode: '54000',
        country: 'Pakistan',
        isDefault: false
      }
    ]
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('dastkari_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('dastkari_wishlist');
    return saved ? JSON.parse(saved) : ['prod-teli-ajrak-silk-01'];
  });

  // Modal States
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeLighting, setActiveLighting] = useState<LightingMode>('sunlight');
  const [isScaleModalOpen, setIsScaleModalOpen] = useState(false);
  const [isProcessModalOpen, setIsProcessModalOpen] = useState(false);
  const [isStoriesModalOpen, setIsStoriesModalOpen] = useState(false);
  const [selectedArtisan, setSelectedArtisan] = useState<Artisan | null>(null);
  const [customCommissionProduct, setCustomCommissionProduct] = useState<Product | null>(null);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeOrderConfirmation, setActiveOrderConfirmation] = useState<Order | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTown, setSelectedTown] = useState('All');
  const [selectedTechnique, setSelectedTechnique] = useState('All');

  // Reservation Countdown (10 min = 600 seconds)
  const [reservationSecondsLeft, setReservationSecondsLeft] = useState(600);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('dastkari_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('dastkari_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('dastkari_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('dastkari_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Reservation timer when items are in cart
  useEffect(() => {
    if (cart.length === 0) {
      setReservationSecondsLeft(600);
      return;
    }
    const interval = setInterval(() => {
      setReservationSecondsLeft((prev) => {
        if (prev <= 1) return 600; // loop reset for demo
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [cart.length]);

  // Currency format helper
  const formatPrice = (pkrAmount: number): string => {
    const config = CURRENCY_RATES[currentCurrency] || CURRENCY_RATES.PKR;
    const converted = pkrAmount * config.rate;
    if (currentCurrency === 'PKR') {
      return `${config.symbol}${Math.round(converted).toLocaleString('en-PK')}`;
    }
    return `${config.symbol}${converted.toFixed(2)}`;
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedLighting: activeLighting }];
    });
    showToast(`Added "${product.title}" to your cart.`);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart.');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartTotalPKR = cart.reduce(
    (sum, item) => sum + item.product.pricePKR * item.quantity,
    0
  );

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed from heritage wishlist.');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Added to your heritage wishlist.');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Product CRUD (Admin)
  const addProduct = (newProd: Omit<Product, 'id'>) => {
    const id = `prod-${Date.now()}`;
    const product: Product = { ...newProd, id };
    setProducts((prev) => [product, ...prev]);
    showToast('Product catalog item published successfully.');
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    showToast('Product details updated.');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product removed from catalog.');
  };

  // Orders
  const createOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'trackingSteps' | 'trackingNumber'>): Order => {
    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const courier = orderData.courier || 'TCS Express';
    const trackingPrefix = courier.includes('DHL') ? 'DHL' : courier.includes('Leopards') ? 'LCS' : 'TCS';
    const trackingNumber = `${trackingPrefix}-${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    
    const now = new Date();
    const timestamp = now.toISOString().replace('T', ' ').substring(0, 16);

    const newOrder: Order = {
      ...orderData,
      id: orderId,
      createdAt: now.toISOString(),
      trackingNumber,
      trackingSteps: [
        {
          status: 'Pending',
          timestamp,
          description: 'Order placed & payment verified with Sindh artisan cooperative',
          location: 'Dastkari Platform Karachi'
        },
        {
          status: 'Processing',
          timestamp: 'Moments later',
          description: 'Authenticity seal prepared; artisan craft packaging initiated',
          location: 'Sindh Craft Collective Guild'
        }
      ]
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setActiveOrderConfirmation(newOrder);
    showToast(`Order #${orderId} confirmed successfully!`);
    return newOrder;
  };

  const updateOrderStatus = (
    orderId: string, 
    status: Order['status'], 
    newLocation = 'Regional Dispatch Center', 
    note = 'Status updated by guild manager'
  ) => {
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        const newStep = {
          status,
          timestamp: now,
          description: note,
          location: newLocation
        };
        return {
          ...o,
          status,
          trackingSteps: [...o.trackingSteps, newStep]
        };
      })
    );
    showToast(`Order #${orderId} status changed to ${status}`);
  };

  // Auth / Role login
  const loginAs = (role: UserRole, emailOrPhone: string, name?: string) => {
    setCurrentRole(role);
    setCurrentUser((prev) => ({
      ...prev,
      role,
      name: name || (role === 'admin' ? 'Master Guild Admin' : role === 'artisan' ? 'Ustad Mohammad Hashim' : 'Sindh Heritage Patron'),
      email: emailOrPhone.includes('@') ? emailOrPhone : 'asifalilarik51@gmail.com',
      phone: emailOrPhone.includes('@') ? '+92 300 8274192' : emailOrPhone
    }));
    setIsAuthModalOpen(false);
    showToast(`Switched active view to ${role.toUpperCase()}`);
  };

  const logout = () => {
    setCurrentRole('buyer');
    showToast('Signed out to guest buyer mode.');
  };

  return (
    <AppContext.Provider
      value={{
        products,
        artisans,
        articles,
        addProduct,
        updateProduct,
        deleteProduct,

        selectedProduct,
        setSelectedProduct,
        activeLighting,
        setActiveLighting,
        isScaleModalOpen,
        setIsScaleModalOpen,
        isProcessModalOpen,
        setIsProcessModalOpen,
        isStoriesModalOpen,
        setIsStoriesModalOpen,
        selectedArtisan,
        setSelectedArtisan,
        customCommissionProduct,
        setCustomCommissionProduct,

        currentCurrency,
        setCurrentCurrency,
        formatPrice,

        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotalPKR,
        cartItemCount,
        isCartOpen,
        setIsCartOpen,
        freeShippingThresholdPKR: FREE_SHIPPING_THRESHOLD_PKR,
        reservationSecondsLeft,

        wishlist,
        toggleWishlist,
        isInWishlist,

        isCheckoutOpen,
        setIsCheckoutOpen,
        orders,
        createOrder,
        updateOrderStatus,
        activeOrderConfirmation,
        setActiveOrderConfirmation,

        currentUser,
        currentRole,
        setCurrentRole,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isAccountModalOpen,
        setIsAccountModalOpen,
        loginAs,
        logout,

        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedTown,
        setSelectedTown,
        selectedTechnique,
        setSelectedTechnique,

        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
