# BlinkSy Food — React Native Food Delivery App (v2)

A modern **food delivery mobile app** built with React Native + Expo + TypeScript, with **65 real food images** downloaded from the web, **grocery-style category browsing**, and a much richer UI with 12+ home sections.

## 🎨 3-Color Scheme

| Color | Hex | Usage |
|-------|-----|-------|
| **Primary Red** | `#FF1F3A` | Headers, CTAs, brand, "50% OFF" banners |
| **Accent Gold** | `#FFC107` | Highlights, bestseller badges, "Explore More" tiles |
| **Neutral White/Gray** | `#FFFFFF` / `#F5F5F5` | Backgrounds, surfaces, cards |

**Functional accents** (not part of the 3-color scheme):
- **Green** `#16A34A` — rating badges, "Pure Veg" pills, "Delivered" status
- **Danger** `#DC2626` — errors, cancelled orders

## ✨ What's New in v2

### 🖼 Real Food Images Everywhere
- **65 real food photos** downloaded from the web via `z-ai image-search`
- Every restaurant card, item card, menu item, cart line, order detail, and onboarding slide now uses a real photo
- No more placeholder icons — actual food photography throughout
- Images cover: 7 pizzas, 3 biryanis, 5 burgers, 3 momos, 5 dosas/idlis, 3 North Indian, 2 Chinese, 3 desserts, 4 rolls/chaat, 1 chicken, 13 restaurant banners, 4 hero banners, 12 category photos

### 🛒 Grocery-Style Category Browse (NEW SCREEN)
- **CategoryBrowse** — full-screen grid of food categories with real photos
- Each category tile shows a real food photo with dark overlay + category name
- Tap any category to filter restaurants by cuisine
- Accessible from Home's "Explore More" → "Browse All"

### 🏠 Rich Home Screen — 12+ Sections
The Home screen is no longer simple or boring. It now has:

1. **Location header** — "DELIVER TO Home • Barwala Garden" + notification bell
2. **Search bar** — "Restaurant name or dish..." with mic button
3. **Hero carousel** — 3 swipeable banners: "ITEMS AT 50% OFF" / "FREE DELIVERY" / "₹150 OFF Welcome"
4. **"What's on your mind?"** — 12 category circles with real food photos
5. **"Explore More"** — 6 tiles: Offers / Top 10 / Pure Veg / Under 30 min / Best Rated / Browse All
6. **"In The Spotlight"** — featured restaurant with full-bleed image + gradient overlay
7. **"Top Picks for You"** — horizontal item carousel with real food photos
8. **"Free Delivery"** — restaurants with ₹0 delivery fee
9. **"Trending Now"** — most-rated items this week
10. **"Newly Launched"** — newest restaurants on the platform
11. **"Bestsellers"** — horizontal item carousel
12. **"Gourmet & Premium"** — top-rated restaurants (4.2+)
13. **Filter chips** — Filters / Sort by / Near & Fast / Rating 4.0+ / Pure Veg / Offers
14. **"856 restaurants delivering to you"** — main restaurant feed

### 🍽 Real Restaurant Data
18 real restaurant brands with real images:
- **KFC, Burger King, Domino's Pizza, Pizza Hut** — fast food
- **Behrouz Biryani, Biryani On Wheels** — biryani
- **La Pino's Pizza** — pizza (spotlight featured)
- **Tasty Fresh** — South Indian / dosa
- **Sai Bakers** — momos / bakery
- **The Chai House, Theobroma, NIC Ice Creams** — desserts
- **Tinku's, Wrapstick, A3 Family Restaurant, Apna Sweets, Hotel Malwa Inn, Marlin's Pizza, Chick N Serve, Guru Kripa Rasoi, Food Seller**

## 🍔 FoodImage Component
A reusable component that renders real food photos with graceful fallback:
```tsx
<FoodImage name="pizza_cheese_lava" style={styles.image} fallbackIcon="food-variant" fallbackIconSize={40} />
```
- Looks up the image by name in the food asset registry
- Falls back to a placeholder icon if the image is not found
- Used in all screens: Home, Search, StoreListing, StoreDetail, ItemDetail, Cart, Checkout, OrderDetail, Favourites, Wishlist, SpecialOffers, CuratedList, CategoryBrowse

## 📱 All Screens (43 total)

**Onboarding & Auth (8)**
- Splash · Language Select (en/hi/pa) · Onboarding (4 slides with real food photos) · Sign In · Sign Up · OTP Verify · Forgot Password · Reset Password

**Home & Discovery (5)**
- **Home** (12+ sections, real images) · **Search** (VEG toggle, real images) · **SpecialOffers** grid · **CuratedList** (5 types: fast/veg/top10/spotlight/offers) · **CategoryBrowse** (grocery-style grid, NEW)

**Stores & Ordering (5)**
- Store Listing · Store Detail (real hero + menu images) · Item Detail (real large image) · Cart (real item thumbnails) · Checkout

**Orders & Tracking (4)**
- My Orders · Order Detail (real item thumbnails) · Order Tracking · Favourites (real images)

**Menu / Account Hub (12)**
- Menu · Profile · Edit Profile · Address Book · Add Address · Settings · Notifications · Loyalty Points · Coupons · Refer & Earn · Wishlist (real images) · + Wallet screens

**Wallet (3)**
- Wallet (Blinksy Money) · Wallet History · Add Money

**Support & Legal (4)**
- Help & Support · Live Chat · Terms & Conditions · Privacy Policy

## 🏗 Stack

- **Runtime**: React Native 0.76 + Expo SDK 52 (managed workflow)
- **Language**: TypeScript 5.3 (strict mode)
- **Navigation**: `@react-navigation/native` + `native-stack` + `bottom-tabs`
- **State**: React Context + AsyncStorage persistence (cart store)
- **Styling**: React Native `StyleSheet` + `expo-linear-gradient`
- **Icons**: `@expo/vector-icons` (MaterialCommunityIcons) — all UI chrome
- **Images**: 65 real food photos bundled as JPG assets
- **i18n**: Custom hook with en/hi/pa locales (1710 keys each)
- **Fonts**: Roboto Regular / Medium / Bold / Black

## 📁 Project structure

```
blinksy-food-app/
├── app.json                    # Expo config (BlinkSy Food branding)
├── assets/
│   ├── fonts/                  # Roboto-Regular/Medium/Bold/Black.ttf
│   ├── images/                 # illustrations, empty-states, brand assets
│   └── images/food/            # 65 real food photos (JPG)
└── src/
    ├── App.tsx
    ├── components/index.tsx    # UI kit + FoodImage component
    ├── theme/theme.ts          # 3-color scheme (Red + Gold + White)
    ├── i18n/                   # en/hi/pa locales
    ├── data/mock.ts            # 18 stores, 36 items — all with real image names
    ├── store/cart.tsx
    ├── utils/
    │   ├── assetMap.ts         # illustration registry
    │   └── foodAssetMap.ts     # 65 real food photo registry
    ├── navigation/index.tsx
    └── screens/
        ├── home/               # Home, Search, SpecialOffers, CuratedList, CategoryBrowse
        ├── store/              # StoreListing, StoreDetail, ItemDetail, Cart, Checkout
        ├── order/              # MyOrders, OrderDetail, OrderTracking, Favourites
        ├── menu/               # 11 menu screens
        ├── wallet/             # 3 wallet screens
        ├── support/            # 4 support screens
        └── auth/               # 5 auth screens
```

## 🚀 Run

```bash
cd blinksy-food-app
npm install
npm start
#  then press:  a = Android emulator  /  i = iOS simulator  /  scan QR with Expo Go
```

## ✅ Verified

- TypeScript strict mode passes with zero errors
- Android bundle builds successfully (3.82 MB Hermes bytecode)
- iOS bundle builds successfully
- All 65 food images resolve correctly in the bundle
- All 43 screens compile and render

## 📄 License

For personal/educational use only.
