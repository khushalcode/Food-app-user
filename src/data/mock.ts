/**
 * BlinkSy Food App — mock data
 * Real restaurant names + food items matching the new screenshots
 * (KFC, Burger King, Behrouz Biryani, La Pino's Pizza, etc.)
 */

export type Category = {
  id: string;
  name: string;
  icon: string;        // MaterialCommunityIcons name (fallback)
  color: string;
  image?: string;      // real food photo name
};

export type Item = {
  id: string;
  name: string;
  storeName: string;
  storeId: string;
  price: number;
  oldPrice?: number;
  rating: number;
  ratingCount: number;
  veg: boolean;
  image: string;
  category: string;
  description?: string;
  prepTime?: string;
  bestseller?: boolean;
};

export type Store = {
  id: string;
  name: string;
  rating: number;
  ratingCount: string;
  distanceKm: number;
  deliveryTime: string;
  deliveryFee: number;
  cuisine: string;
  isOpen: boolean;
  image: string;
  tags?: string[];
  discount?: string;
  extraDiscount?: string;
  pureVeg?: boolean;
  promoBanner?: string;
};

export type Order = {
  id: string;
  date: string;
  status: 'running' | 'delivered' | 'cancelled';
  type: 'order';
  total: number;
  storeName?: string;
  itemsCount?: number;
  itemsPreview?: string;
  driver?: string;
  eta?: string;
};

export type WalletTxn = {
  id: string;
  date: string;
  type: 'credit' | 'debit';
  amount: number;
  desc: string;
};

export type Coupon = {
  id: string;
  code: string;
  title: string;
  desc: string;
  discount: string;
  minOrder: number;
  validTill: string;
  active: boolean;
};

export type Address = {
  id: string;
  label: 'Home' | 'Office' | 'Other';
  contactName: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  isDefault?: boolean;
};

export const categories: Category[] = [
  { id: 'pizza', name: 'Pizza', icon: 'pizza', color: '#FF6B7A', image: 'cat_pizza' },
  { id: 'biryani', name: 'Biryani', icon: 'bowl-mix', color: '#FFC107', image: 'cat_biryani' },
  { id: 'burger', name: 'Burger', icon: 'hamburger', color: '#16A34A', image: 'cat_burger' },
  { id: 'momos', name: 'Momos', icon: 'bowl-mix', color: '#2563EB', image: 'cat_momos' },
  { id: 'dosa', name: 'Dosa', icon: 'egg-fried', color: '#DC2626', image: 'cat_dosa' },
  { id: 'north_indian', name: 'Thali', icon: 'rice', color: '#7C3AED', image: 'cat_thali' },
  { id: 'chinese', name: 'Chinese', icon: 'noodles', color: '#F59E0B', image: 'cat_chinese' },
  { id: 'dessert', name: 'Dessert', icon: 'cake-variant', color: '#EC4899', image: 'cat_dessert' },
  { id: 'south_indian', name: 'South Indian', icon: 'rice', color: '#0EA5E9', image: 'cat_south_indian' },
  { id: 'rolls', name: 'Rolls', icon: 'burrito', color: '#10B981', image: 'cat_rolls' },
  { id: 'chaat', name: 'Chaat', icon: 'circle-multiple', color: '#F97316', image: 'cat_chaat' },
  { id: 'healthy', name: 'Healthy', icon: 'leaf', color: '#84CC16', image: 'cat_healthy' },
];

export const stores: Store[] = [
  { id: 's1', name: 'KFC', rating: 4.2, ratingCount: '12K+', distanceKm: 1.4, deliveryTime: '25-30 min', deliveryFee: 0, cuisine: 'Burgers, Fried Chicken, Fast Food', isOpen: true, image: 'restaurant_kfc', discount: '50% OFF up to ₹100', extraDiscount: 'Extra 10% OFF with dishes', tags: ['Bestseller', 'Pure Veg'], promoBanner: 'ITEMS AT 50% OFF' },
  { id: 's2', name: 'Burger King', rating: 4.3, ratingCount: '8.5K+', distanceKm: 2.0, deliveryTime: '20-25 min', deliveryFee: 0, cuisine: 'Burgers, American, Fast Food', isOpen: true, image: 'restaurant_burger_king', discount: 'Flat ₹125 OFF', extraDiscount: 'Above ₹299', tags: ['Bestseller'] },
  { id: 's3', name: 'Behrouz Biryani', rating: 4.0, ratingCount: '5.2K+', distanceKm: 4.3, deliveryTime: '30-35 min', deliveryFee: 20, cuisine: 'Biryani, Mughlai, North Indian', isOpen: true, image: 'restaurant_biryani', discount: 'Flat ₹100 OFF', extraDiscount: 'Above ₹399' },
  { id: 's4', name: 'La Pino\'s Pizza', rating: 4.1, ratingCount: '3.8K+', distanceKm: 3.1, deliveryTime: '30-35 min', deliveryFee: 15, cuisine: 'Pizza, Italian, Fast Food', isOpen: true, image: 'restaurant_pizza', discount: 'Buy 1 Get 1 Free', extraDiscount: 'On medium pizzas', tags: ['Pure Veg'] },
  { id: 's5', name: 'Biryani On Wheels', rating: 4.3, ratingCount: '2.1K+', distanceKm: 2.8, deliveryTime: '25-30 min', deliveryFee: 10, cuisine: 'Biryani, North Indian', isOpen: true, image: 'restaurant_biryani', discount: '20% OFF up to ₹50' },
  { id: 's6', name: 'The Chai House', rating: 4.1, ratingCount: '1.4K+', distanceKm: 2.8, deliveryTime: '25-30 min', deliveryFee: 12, cuisine: 'Bakery, Desserts, Beverages', isOpen: true, image: 'restaurant_dessert', discount: 'Flat ₹50 OFF', tags: ['Pure Veg'] },
  { id: 's7', name: 'Domino\'s Pizza', rating: 4.2, ratingCount: '15K+', distanceKm: 3.5, deliveryTime: '30-35 min', deliveryFee: 0, cuisine: 'Pizza, Italian, Fast Food', isOpen: true, image: 'restaurant_dominos', discount: 'Flat ₹125 OFF', extraDiscount: 'Above ₹399' },
  { id: 's8', name: 'Pizza Hut', rating: 4.0, ratingCount: '6.7K+', distanceKm: 4.0, deliveryTime: '30-35 min', deliveryFee: 20, cuisine: 'Pizza, Italian', isOpen: true, image: 'restaurant_pizza_hut', discount: '50% OFF up to ₹100' },
  { id: 's9', name: 'NIC Ice Creams', rating: 4.5, ratingCount: '4.3K+', distanceKm: 2.2, deliveryTime: '20-25 min', deliveryFee: 0, cuisine: 'Ice Cream, Desserts', isOpen: true, image: 'restaurant_ice_cream', discount: 'Flat ₹50 OFF', tags: ['Pure Veg'] },
  { id: 's10', name: 'Theobroma', rating: 4.4, ratingCount: '3.1K+', distanceKm: 3.2, deliveryTime: '25-30 min', deliveryFee: 15, cuisine: 'Bakery, Desserts', isOpen: true, image: 'restaurant_bakery', discount: '10% OFF', tags: ['Pure Veg'] },
  { id: 's11', name: 'Tinku\'s', rating: 4.0, ratingCount: '980+', distanceKm: 1.8, deliveryTime: '15-20 min', deliveryFee: 0, cuisine: 'North Indian, Chinese', isOpen: true, image: 'restaurant_thali', discount: '20% OFF' },
  { id: 's12', name: 'Wrapstick', rating: 4.2, ratingCount: '1.7K+', distanceKm: 2.4, deliveryTime: '20-25 min', deliveryFee: 10, cuisine: 'Rolls, Fast Food', isOpen: true, image: 'restaurant_chinese', discount: 'Flat ₹75 OFF' },
  { id: 's13', name: 'A3 Family Restaurant', rating: 4.1, ratingCount: '2.5K+', distanceKm: 3.7, deliveryTime: '30-35 min', deliveryFee: 15, cuisine: 'North Indian, Mughlai', isOpen: true, image: 'restaurant_thali', discount: '50% OFF up to ₹100' },
  { id: 's14', name: 'Apna Sweets', rating: 4.3, ratingCount: '3.6K+', distanceKm: 4.5, deliveryTime: '35-40 min', deliveryFee: 20, cuisine: 'Sweets, North Indian, Snacks', isOpen: true, image: 'restaurant_bakery', discount: 'Flat ₹100 OFF', tags: ['Pure Veg'] },
  { id: 's15', name: 'Hotel Malwa Inn', rating: 4.2, ratingCount: '1.1K+', distanceKm: 4.8, deliveryTime: '35-40 min', deliveryFee: 25, cuisine: 'North Indian, Punjabi', isOpen: true, image: 'restaurant_thali', discount: '15% OFF' },
  { id: 's16', name: 'Marlin\'s Pizza', rating: 3.9, ratingCount: '720+', distanceKm: 5.0, deliveryTime: '35-40 min', deliveryFee: 25, cuisine: 'Pizza, Italian', isOpen: true, image: 'restaurant_pizza', discount: 'Buy 1 Get 1 Free' },
  { id: 's17', name: 'Chick N Serve', rating: 4.0, ratingCount: '1.3K+', distanceKm: 2.7, deliveryTime: '20-25 min', deliveryFee: 0, cuisine: 'Fried Chicken, Fast Food', isOpen: true, image: 'restaurant_kfc', discount: '20% OFF up to ₹50' },
  { id: 's18', name: 'Guru Kripa Rasoi', rating: 4.2, ratingCount: '890+', distanceKm: 3.4, deliveryTime: '30-35 min', deliveryFee: 15, cuisine: 'North Indian, Thali', isOpen: true, image: 'restaurant_thali', discount: 'Flat ₹50 OFF', tags: ['Pure Veg'] },
];

export const items: Item[] = [
  // KFC items
  { id: 'i1', name: 'Double Patty Veg Burger', storeName: 'KFC', storeId: 's1', price: 326, oldPrice: 399, rating: 4.2, ratingCount: 320, veg: true, image: 'burger_double_patty', category: 'burger', prepTime: '15 min', bestseller: true, description: 'Two crunchy veg patties with cheese, lettuce and signature sauce.' },
  { id: 'i2', name: 'Cheese Burger', storeName: 'KFC', storeId: 's1', price: 179, rating: 4.1, ratingCount: 280, veg: true, image: 'burger_cheese', category: 'burger', prepTime: '12 min', description: 'Classic cheese burger with melted cheddar.' },
  { id: 'i3', name: 'Paneer Burger', storeName: 'KFC', storeId: 's1', price: 98, rating: 4.0, ratingCount: 90, veg: true, image: 'burger_paneer', category: 'burger', prepTime: '10 min', description: 'Crispy paneer patty with mint mayo.' },
  { id: 'i4', name: 'Hot & Crispy Chicken', storeName: 'KFC', storeId: 's1', price: 249, oldPrice: 299, rating: 4.4, ratingCount: 540, veg: false, image: 'chicken_fried', category: 'burger', prepTime: '15 min', bestseller: true, description: 'Signature KFC fried chicken pieces.' },
  // Burger King items
  { id: 'i5', name: 'Whopper', storeName: 'Burger King', storeId: 's2', price: 199, oldPrice: 249, rating: 4.3, ratingCount: 410, veg: false, image: 'burger_chicken_whopper', category: 'burger', prepTime: '15 min', bestseller: true, description: 'Flame-grilled beef patty with fresh veggies.' },
  { id: 'i6', name: 'Veg Whopper', storeName: 'Burger King', storeId: 's2', price: 169, rating: 4.2, ratingCount: 280, veg: true, image: 'burger_veg_whopper', category: 'burger', prepTime: '15 min', description: 'Flame-grilled veg patty with veggies.' },
  // Behrouz Biryani
  { id: 'i7', name: 'Royal Mughlai Chicken Biryani', storeName: 'Behrouz Biryani', storeId: 's3', price: 389, oldPrice: 489, rating: 4.5, ratingCount: 620, veg: false, image: 'biryani_chicken', category: 'biryani', prepTime: '25 min', bestseller: true, description: 'Slow-cooked basmati rice with marinated chicken, saffron and exotic spices.' },
  { id: 'i8', name: 'Subz-e-Biryani', storeName: 'Behrouz Biryani', storeId: 's3', price: 329, oldPrice: 399, rating: 4.3, ratingCount: 280, veg: true, image: 'biryani_veg', category: 'biryani', prepTime: '25 min', description: 'Vegetable biryani with aromatic spices.' },
  // La Pino's Pizza
  { id: 'i9', name: 'Cheese Lava Pizza', storeName: 'La Pino\'s Pizza', storeId: 's4', price: 494, oldPrice: 599, rating: 4.7, ratingCount: 410, veg: true, image: 'pizza_cheese_lava', category: 'pizza', prepTime: '25 min', bestseller: true, description: 'Loaded with triple cheese blend and molten cheddar center.' },
  { id: 'i10', name: 'Farmhouse Pizza', storeName: 'La Pino\'s Pizza', storeId: 's4', price: 449, oldPrice: 540, rating: 4.5, ratingCount: 360, veg: true, image: 'pizza_farmhouse', category: 'pizza', prepTime: '25 min', description: 'Loaded with onion, capsicum, mushroom and tomato.' },
  { id: 'i11', name: 'Mexican Green Wave Pizza', storeName: 'La Pino\'s Pizza', storeId: 's4', price: 327, oldPrice: 400, rating: 4.3, ratingCount: 240, veg: true, image: 'pizza_mexican', category: 'pizza', prepTime: '25 min', description: 'Spicy mexican-style pizza with jalapenos.' },
  // Domino's
  { id: 'i12', name: 'Margherita Pizza', storeName: 'Domino\'s Pizza', storeId: 's7', price: 199, oldPrice: 249, rating: 4.3, ratingCount: 880, veg: true, image: 'pizza_margherita', category: 'pizza', prepTime: '20 min', bestseller: true, description: 'Classic pizza with tangy tomato sauce and mozzarella.' },
  { id: 'i13', name: 'Pepperoni Pizza', storeName: 'Domino\'s Pizza', storeId: 's7', price: 399, oldPrice: 499, rating: 4.4, ratingCount: 420, veg: false, image: 'pizza_pepperoni', category: 'pizza', prepTime: '20 min', description: 'Loaded with pepperoni slices.' },
  // Pizza Hut
  { id: 'i14', name: 'OTC Pizza', storeName: 'Pizza Hut', storeId: 's8', price: 175, rating: 4.3, ratingCount: 180, veg: true, image: 'pizza_otc', category: 'pizza', prepTime: '20 min', description: 'Over-the-counter special with onion, tomato, capsicum and mozzarella.' },
  { id: 'i15', name: 'Chicken Tikka Pizza', storeName: 'Pizza Hut', storeId: 's8', price: 449, oldPrice: 540, rating: 4.4, ratingCount: 290, veg: false, image: 'pizza_chicken_tikka', category: 'pizza', prepTime: '25 min', description: 'Tandoori chicken with onion and capsicum.' },
  // Biryani On Wheels
  { id: 'i16', name: 'Chicken Dum Biryani', storeName: 'Biryani On Wheels', storeId: 's5', price: 249, oldPrice: 299, rating: 4.5, ratingCount: 380, veg: false, image: 'biryani_chicken', category: 'biryani', prepTime: '25 min', bestseller: true, description: 'Hyderabadi-style dum biryani with marinated chicken.' },
  { id: 'i17', name: 'Veg Dum Biryani', storeName: 'Biryani On Wheels', storeId: 's5', price: 199, rating: 4.3, ratingCount: 220, veg: true, image: 'biryani_veg', category: 'biryani', prepTime: '25 min', description: 'Mixed vegetable dum biryani with saffron.' },
  // Tasty Fresh — South Indian
  { id: 'i18', name: 'Masala Dosa', storeName: 'Tasty Fresh', storeId: 's_tasty', price: 50, oldPrice: 70, rating: 4.5, ratingCount: 320, veg: true, image: 'dosa_masala', category: 'dosa', prepTime: '15 min', bestseller: true, description: 'Crispy rice crepe filled with spiced potato masala, served with coconut chutney and sambar.' },
  { id: 'i19', name: 'Cheese Paneer Butter Masala Dosa', storeName: 'Tasty Fresh', storeId: 's_tasty', price: 238, oldPrice: 290, rating: 4.6, ratingCount: 170, veg: true, image: 'dosa_cheese_paneer', category: 'dosa', prepTime: '20 min', description: 'Rich and cheesy dosa with butter masala filling.' },
  { id: 'i20', name: 'Butter Dosa', storeName: 'Tasty Fresh', storeId: 's_tasty', price: 157, rating: 4.4, ratingCount: 150, veg: true, image: 'dosa_butter', category: 'dosa', prepTime: '18 min', description: 'Classic dosa roasted in butter.' },
  { id: 'i21', name: 'Rava Idli', storeName: 'Tasty Fresh', storeId: 's_tasty', price: 100, rating: 4.4, ratingCount: 210, veg: true, image: 'idli_rava', category: 'south_indian', prepTime: '12 min', description: 'Steamed semolina cakes, light and fluffy.' },
  // Sai Bakers — Momos
  { id: 'i22', name: 'Paneer Momos', storeName: 'Sai Bakers', storeId: 's_sai', price: 120, oldPrice: 150, rating: 4.5, ratingCount: 260, veg: true, image: 'momos_paneer', category: 'momos', prepTime: '18 min', bestseller: true, description: 'Steamed dumplings stuffed with spiced cottage cheese.' },
  { id: 'i23', name: 'Tandoori Paneer Momos', storeName: 'Sai Bakers', storeId: 's_sai', price: 234, oldPrice: 280, rating: 4.6, ratingCount: 190, veg: true, image: 'momos_tandoori', category: 'momos', prepTime: '22 min', description: 'Char-grilled momos in tandoori marinade.' },
  { id: 'i24', name: 'Veg Kurkure Momos', storeName: 'Sai Bakers', storeId: 's_sai', price: 36, oldPrice: 60, rating: 4.1, ratingCount: 220, veg: true, image: 'momos_kurkure', category: 'momos', prepTime: '15 min', description: 'Crunchy fried momos with veg filling.' },
  // Pani Puri / Chaat
  { id: 'i25', name: 'Ragi Pani Puri', storeName: 'Food Seller', storeId: 's_food', price: 93, rating: 4.4, ratingCount: 220, veg: true, image: 'pani_puri_ragi', category: 'chaat', prepTime: '8 min', description: 'Healthy ragi puris with tangy tamarind water.' },
  { id: 'i26', name: 'Raj Kachori', storeName: 'Food Seller', storeId: 's_food', price: 146, rating: 4.5, ratingCount: 130, veg: true, image: 'kachori_raj', category: 'chaat', prepTime: '10 min', bestseller: true, description: 'Crisp kachori stuffed with sprouts, curd and chutneys.' },
  // Thali
  { id: 'i27', name: 'Veg Thali', storeName: 'Guru Kripa Rasoi', storeId: 's18', price: 199, oldPrice: 249, rating: 4.4, ratingCount: 180, veg: true, image: 'thali_veg', category: 'north_indian', prepTime: '20 min', description: 'Complete meal: 3 sabzi, dal, rice, 4 roti, salad, sweet.' },
  { id: 'i28', name: 'Paneer Butter Masala', storeName: 'A3 Family Restaurant', storeId: 's13', price: 249, oldPrice: 299, rating: 4.5, ratingCount: 240, veg: true, image: 'paneer_butter_masala', category: 'north_indian', prepTime: '20 min', bestseller: true, description: 'Cottage cheese in creamy tomato gravy.' },
  { id: 'i29', name: 'Dal Makhani', storeName: 'A3 Family Restaurant', storeId: 's13', price: 179, rating: 4.3, ratingCount: 160, veg: true, image: 'dal_makhani', category: 'north_indian', prepTime: '15 min', description: 'Slow-cooked black lentils in butter cream.' },
  // Chinese
  { id: 'i30', name: 'Veg Hakka Noodles', storeName: 'Tinku\'s', storeId: 's11', price: 149, rating: 4.2, ratingCount: 140, veg: true, image: 'noodles_hakka', category: 'chinese', prepTime: '15 min', description: 'Stir-fried noodles with vegetables.' },
  { id: 'i31', name: 'Chilli Paneer', storeName: 'Tinku\'s', storeId: 's11', price: 199, oldPrice: 249, rating: 4.4, ratingCount: 180, veg: true, image: 'chilli_paneer', category: 'chinese', prepTime: '18 min', bestseller: true, description: 'Indo-Chinese paneer in spicy chilli sauce.' },
  // Desserts
  { id: 'i32', name: 'Butterscotch Ice Cream', storeName: 'NIC Ice Creams', storeId: 's9', price: 110, rating: 4.5, ratingCount: 180, veg: true, image: 'ice_cream_butterscotch', category: 'dessert', prepTime: '5 min', description: 'Creamy butterscotch ice cream with caramel bits.' },
  { id: 'i33', name: 'Chocolate Truffle Pastry', storeName: 'Theobroma', storeId: 's10', price: 95, rating: 4.7, ratingCount: 320, veg: true, image: 'pastry_chocolate_truffle', category: 'dessert', prepTime: '5 min', bestseller: true, description: 'Rich chocolate truffle cake slice.' },
  { id: 'i34', name: 'Red Velvet Cake (500g)', storeName: 'Theobroma', storeId: 's10', price: 549, oldPrice: 649, rating: 4.6, ratingCount: 240, veg: true, image: 'cake_red_velvet', category: 'dessert', prepTime: '5 min', description: 'Classic red velvet with cream cheese frosting.' },
  // Rolls
  { id: 'i35', name: 'Chicken Kathi Roll', storeName: 'Wrapstick', storeId: 's12', price: 129, oldPrice: 159, rating: 4.3, ratingCount: 220, veg: false, image: 'roll_chicken_kathi', category: 'rolls', prepTime: '12 min', bestseller: true, description: 'Spiced chicken wrapped in flaky paratha.' },
  { id: 'i36', name: 'Paneer Tikka Roll', storeName: 'Wrapstick', storeId: 's12', price: 99, rating: 4.2, ratingCount: 160, veg: true, image: 'roll_paneer_tikka', category: 'rolls', prepTime: '12 min', description: 'Tandoori paneer in soft roll.' },
];

// Add Tasty Fresh, Sai Bakers, Food Seller as stores so store detail works
export const allStores: Store[] = [
  ...stores,
  { id: 's_tasty', name: 'Tasty Fresh', rating: 4.6, ratingCount: '540+', distanceKm: 1.8, deliveryTime: '28 min', deliveryFee: 18, cuisine: 'South Indian, Dosa', isOpen: true, image: 'restaurant_south_indian', discount: '30% OFF up to ₹75', tags: ['Pure Veg'] },
  { id: 's_sai', name: 'Sai Bakers', rating: 4.3, ratingCount: '860+', distanceKm: 0.8, deliveryTime: '20 min', deliveryFee: 15, cuisine: 'Bakery, Momos, Desserts', isOpen: true, image: 'restaurant_bakery', discount: 'Flat ₹50 OFF', tags: ['Pure Veg'] },
  { id: 's_food', name: 'Food Seller', rating: 4.1, ratingCount: '410+', distanceKm: 3.1, deliveryTime: '35 min', deliveryFee: 30, cuisine: 'Chaat, Snacks, Street Food', isOpen: true, image: 'restaurant_chaat', discount: '20% OFF' },
];

export function findStore(id: string): Store | undefined {
  return allStores.find((s) => s.id === id);
}

export const offers: Item[] = items.filter((i) => i.oldPrice).slice(0, 20);
export const bestReviewed: Item[] = items.filter((i) => i.rating >= 4.4).slice(0, 10);
export const popular: Item[] = [...items].sort((a, b) => b.ratingCount - a.ratingCount).slice(0, 12);
export const bestsellers: Item[] = items.filter((i) => i.bestseller);
export const fastDelivery: Store[] = allStores.filter((s) => parseInt(s.deliveryTime) <= 25).slice(0, 8);
export const pureVegStores: Store[] = allStores.filter((s) => s.tags?.includes('Pure Veg'));
export const spotlight: Store = allStores.find((s) => s.id === 's4')!;

export const orders: Order[] = [
  { id: 'ORD-7841', date: '2026-08-25, 14:32', status: 'running', type: 'order', total: 414, storeName: 'La Pino\'s Pizza', itemsCount: 2, itemsPreview: 'Cheese Lava Pizza, Farmhouse Pizza', driver: 'Ramesh K.', eta: '15 min' },
  { id: 'ORD-7820', date: '2026-08-24, 20:11', status: 'delivered', type: 'order', total: 230, storeName: 'Tasty Fresh', itemsCount: 3, itemsPreview: 'Masala Dosa, Butter Dosa, Rava Idli' },
  { id: 'ORD-7795', date: '2026-08-22, 12:45', status: 'delivered', type: 'order', total: 175, storeName: 'Sai Bakers', itemsCount: 1, itemsPreview: 'Paneer Momos' },
  { id: 'ORD-7760', date: '2026-08-19, 21:30', status: 'cancelled', type: 'order', total: 0, storeName: 'KFC', itemsCount: 2, itemsPreview: 'Cheese Burger, Paneer Burger' },
  { id: 'ORD-7711', date: '2026-08-17, 19:50', status: 'delivered', type: 'order', total: 494, storeName: 'La Pino\'s Pizza', itemsCount: 1, itemsPreview: 'Cheese Lava Pizza' },
  { id: 'ORD-7680', date: '2026-08-15, 13:20', status: 'delivered', type: 'order', total: 389, storeName: 'Behrouz Biryani', itemsCount: 1, itemsPreview: 'Royal Mughlai Chicken Biryani' },
];

export const walletTxns: WalletTxn[] = [
  { id: 'TXN-9921', date: '2026-08-25, 14:35', type: 'debit', amount: 414, desc: 'Order ORD-7841 — La Pino\'s Pizza' },
  { id: 'TXN-9910', date: '2026-08-24, 12:01', type: 'credit', amount: 500, desc: 'Added money via UPI' },
  { id: 'TXN-9900', date: '2026-08-22, 20:15', type: 'debit', amount: 230, desc: 'Order ORD-7820 — Tasty Fresh' },
  { id: 'TXN-9888', date: '2026-08-20, 11:00', type: 'credit', amount: 50, desc: 'Cashback — Refer & Earn' },
  { id: 'TXN-9871', date: '2026-08-19, 21:32', type: 'debit', amount: 0, desc: 'Order ORD-7760 cancelled — refunded' },
  { id: 'TXN-9850', date: '2026-08-17, 19:55', type: 'debit', amount: 494, desc: 'Order ORD-7711 — La Pino\'s Pizza' },
];

export const coupons: Coupon[] = [
  { id: 'c1', code: 'WELCOME50', title: '₹50 off on first order', desc: 'Valid on orders above ₹199', discount: '₹50 OFF', minOrder: 199, validTill: '31 Dec 2026', active: true },
  { id: 'c2', code: 'PIZZA100', title: '₹100 off on Pizza', desc: 'Min order ₹399. Only on Pizza category.', discount: '₹100 OFF', minOrder: 399, validTill: '30 Sep 2026', active: true },
  { id: 'c3', code: 'FREESHIP', title: 'Free delivery', desc: 'No delivery fee on orders above ₹249', discount: 'FREE DELIVERY', minOrder: 249, validTill: '15 Sep 2026', active: true },
  { id: 'c4', code: 'BIRYANI75', title: '₹75 off on Biryani', desc: 'Min order ₹299', discount: '₹75 OFF', minOrder: 299, validTill: '30 Nov 2026', active: true },
];

export const addresses: Address[] = [
  { id: 'a1', label: 'Home', contactName: 'Khushal Arya', phone: '+91 98765 43210', address: 'House 24, Green Avenue, Lane 3, Model Town', city: 'Ludhiana', pincode: '141008', isDefault: true },
];

export const user = {
  name: 'Khushal Arya',
  email: 'khushal.arya@example.com',
  phone: '+91 98765 43210',
  birthday: '12 Mar',
  walletBalance: 0,
  loyaltyPoints: 0,
  totalOrders: 8,
  referralCode: 'AE5I0EAZ4Y',
  avatar: 'guest_profile',
};

export const walletFeatures = [
  { icon: 'gesture-tap', title: 'Single tap payments', desc: 'Pay at checkout in one tap — no OTP, no PIN' },
  { icon: 'shield-check', title: 'Zero failures', desc: 'Powered by UPI Autopay. 99.98% success rate.' },
  { icon: 'cash-refund', title: 'Real-time refunds', desc: 'Cancellations & returns refunded instantly to wallet.' },
];

export const supportChannels = [
  { id: 'ai', icon: 'robot', title: 'AI Assistant', desc: 'Instant answers, 24/7', action: 'Chat' },
  { id: 'call', icon: 'phone', title: 'Call Customer Support', desc: '+91 1800-123-4567', action: 'Call now' },
  { id: 'email', icon: 'email', title: 'Email Support', desc: 'support@blinksy.com', action: 'Send mail' },
  { id: 'whatsapp', icon: 'whatsapp', title: 'WhatsApp', desc: 'Chat on WhatsApp', action: 'Chat now' },
];

export const menuSections = [
  {
    title: 'Your Information',
    items: [
      { id: 'edit_profile', icon: 'account-circle', label: 'Edit Profile' },
      { id: 'address_book', icon: 'map-marker', label: 'Address book' },
      { id: 'wishlist', icon: 'heart-outline', label: 'Wishlist' },
      { id: 'notifications', icon: 'bell-outline', label: 'Notifications' },
      { id: 'language', icon: 'translate', label: 'Language' },
    ],
  },
  {
    title: 'Payment and rewards',
    items: [
      { id: 'wallet', icon: 'wallet', label: 'My Wallet' },
      { id: 'loyalty', icon: 'star-shooting', label: 'Loyalty Points' },
      { id: 'coupons', icon: 'ticket-confirmation', label: 'Coupons' },
      { id: 'refer', icon: 'gift', label: 'Refer & Earn' },
    ],
  },
  {
    title: 'Support and policies',
    items: [
      { id: 'live_chat', icon: 'chat-processing', label: 'Live Chat' },
      { id: 'help', icon: 'lifebuoy', label: 'Help & Support' },
      { id: 'terms', icon: 'file-document', label: 'Terms & Conditions' },
      { id: 'privacy', icon: 'shield-lock', label: 'Privacy Policy' },
      { id: 'about', icon: 'information', label: 'About Us' },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { id: 'settings', icon: 'cog', label: 'Settings' },
      { id: 'logout', icon: 'logout', label: 'Logout', danger: true },
    ],
  },
];

/** Helper: INR currency formatter */
export function inr(amount: number): string {
  return '₹' + amount.toLocaleString('en-IN');
}
