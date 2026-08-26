/**
 * Static image registry for React Native bundler.
 * RN requires `require('./path.png')` to be statically analyzable,
 * so we register every asset we want to use by name here.
 *
 * Per the user's instruction "remove mobile screen shots icons from top to bottom",
 * all UI chrome icons (back arrows, search, cart, menu, etc.) are rendered with
 * @expo/vector-icons (vector glyphs). Only illustration / brand / module images
 * are bundled as raster assets below.
 */
import { ImageSourcePropType } from 'react-native';

// Brand / hero
import logo from '../../assets/images/logo.png';
import headerLogo from '../../assets/images/header_logo.png';
import splash from '../../assets/images/splash.png';

// Onboarding
import onboard1 from '../../assets/images/onboard_1.png';
import onboard2 from '../../assets/images/onboard_2.png';
import onboard3 from '../../assets/images/onboard_3.png';
import onboard4 from '../../assets/images/onboard_4.png';
import otpHero from '../../assets/images/otp_security_hero.png';
import notifBell from '../../assets/images/notification_bell_3d.png';

// Empty states
import emptyAddress from '../../assets/images/empty_address.png';
import emptyBox from '../../assets/images/empty_box.png';
import emptyCart from '../../assets/images/empty_cart.png';
import noDataFound from '../../assets/images/no_data_found.png';
import notificationPlaceholder from '../../assets/images/notification_placeholder.jpg';
import placeholder from '../../assets/images/placeholder.jpg';

// Module banners
import foodBanner from '../../assets/images/food_module_banner_bg.png';
import shopBanner from '../../assets/images/shop_module_banner_bg.png';
import profileBg from '../../assets/images/profile_bg.png';

// Auth / status
import otpImage from '../../assets/images/otp.png';
import successImage from '../../assets/images/success.png';
import verifiedImage from '../../assets/images/verified.png';
import unverifiedImage from '../../assets/images/unverified.png';
import congratLight from '../../assets/images/congratulation_light.gif';
import congratDark from '../../assets/images/congratulation_dark.gif';

// Taxi
import taxiCart from '../../assets/images/taxi_cart.png';
import taxiPickup from '../../assets/images/taxi_pickup.png';
import taxiDestination from '../../assets/images/taxi_destination.png';
import taxiPay from '../../assets/images/taxi_pay.png';
import taxiPending from '../../assets/images/taxi_panding.png';
import taxiHome from '../../assets/images/taxi_home_address.png';
import taxiOffice from '../../assets/images/taxi_office_address.png';
import taxiOther from '../../assets/images/taxi_other_address.png';
import taxiCompleted from '../../assets/images/taxi_completed.gif';

// Parcel
import parcelImage from '../../assets/images/parcel.png';
import parcelInstruction from '../../assets/images/parcel_instruction_icon.png';
import parcelCart from '../../assets/images/parcel_cart.gif';

// Wallet
import walletImage from '../../assets/images/wallet.png';
import walletBonus from '../../assets/images/wallet_bonus.png';
import walletCredit from '../../assets/images/wallet_credit.png';
import walletDebit from '../../assets/images/wallet_debit.png';
import walletProfile from '../../assets/images/wallet_profile.png';
import partialWallet from '../../assets/images/partial_wallet.png';

// Stores / delivery
import storeMarker from '../../assets/images/store_marker.png';
import markerStore from '../../assets/images/marker_store.png';
import deliveryManMarker from '../../assets/images/delivery_man_marker.png';
import deliveryManJoin from '../../assets/images/delivery_man_join.png';
import userMarker from '../../assets/images/user_marker.png';
import deliveryLocation from '../../assets/images/delivery_location.png';

// Social / login
import appleLogo from '../../assets/images/apple_logo.png';
import landingStores from '../../assets/images/landing_stores.png';
import guestProfile from '../../assets/images/guest_profile.png';
import profileImage from '../../assets/images/profile.png';

// Misc
import arabicFlag from '../../assets/images/arabic.png';
import banglaFlag from '../../assets/images/bangla.png';

const registry: Record<string, ImageSourcePropType> = {
  // Brand
  logo, header_logo: headerLogo, splash,
  // Onboarding
  onboard_1: onboard1, onboard_2: onboard2, onboard_3: onboard3, onboard_4: onboard4,
  otp_security_hero: otpHero, notification_bell_3d: notifBell,
  // Empty states
  empty_address: emptyAddress, empty_box: emptyBox, empty_cart: emptyCart,
  no_data_found: noDataFound, notification_placeholder: notificationPlaceholder,
  placeholder,
  // Module banners
  food_module_banner_bg: foodBanner, shop_module_banner_bg: shopBanner, profile_bg: profileBg,
  // Status
  otp: otpImage, success: successImage, verified: verifiedImage, unverified: unverifiedImage,
  congratulation_light: congratLight, congratulation_dark: congratDark,
  // Taxi
  taxi_cart: taxiCart, taxi_pickup: taxiPickup, taxi_destination: taxiDestination, taxi_pay: taxiPay,
  taxi_panding: taxiPending, taxi_home_address: taxiHome, taxi_office_address: taxiOffice,
  taxi_other_address: taxiOther, taxi_completed: taxiCompleted,
  // Parcel
  parcel: parcelImage, parcel_instruction_icon: parcelInstruction, parcel_cart: parcelCart,
  // Wallet
  wallet: walletImage, wallet_bonus: walletBonus, wallet_credit: walletCredit,
  wallet_debit: walletDebit, wallet_profile: walletProfile, partial_wallet: partialWallet,
  // Stores
  store_marker: storeMarker, marker_store: markerStore, delivery_man_marker: deliveryManMarker,
  delivery_man_join: deliveryManJoin, user_marker: userMarker, delivery_location: deliveryLocation,
  // Social
  apple_logo: appleLogo, landing_stores: landingStores, guest_profile: guestProfile, profile: profileImage,
  // Flags
  arabic: arabicFlag, bangla: banglaFlag,
};

export function getImage(name: string): ImageSourcePropType | null {
  // Check main registry first, then food image registry
  if (registry[name]) return registry[name];
  try {
    const food = require('./foodAssetMap').getFoodImage(name);
    if (food) return food;
  } catch {}
  return null;
}

export function listImages(): string[] {
  return Object.keys(registry);
}
