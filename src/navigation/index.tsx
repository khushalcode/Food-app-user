/**
 * Root navigator.
 * Splash → Language → Onboarding → Auth → MainApp (Bottom Tabs + Stacks)
 *
 * Food-only app — no taxi / parcel / grocery / vendor routes.
 */
import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, fontFamilies } from '../theme/theme';
import { useTranslation } from '../i18n';

import { Splash } from '../screens/Splash';
import { LanguageSelect } from '../screens/LanguageSelect';
import { Onboarding } from '../screens/Onboarding';
import { SignIn } from '../screens/auth/SignIn';
import { SignUp } from '../screens/auth/SignUp';
import { OtpVerify } from '../screens/auth/OtpVerify';
import { ForgotPassword } from '../screens/auth/ForgotPassword';
import { ResetPassword } from '../screens/auth/ResetPassword';

import { Home } from '../screens/home/Home';
import { Search } from '../screens/home/Search';
import { SpecialOffers } from '../screens/home/SpecialOffers';
import { CuratedList } from '../screens/home/CuratedList';
import { CategoryBrowse } from '../screens/home/CategoryBrowse';
import { StoreListing } from '../screens/store/StoreListing';
import { StoreDetail } from '../screens/store/StoreDetail';
import { ItemDetail } from '../screens/store/ItemDetail';
import { Cart } from '../screens/store/Cart';
import { Checkout } from '../screens/store/Checkout';
import { OrderTracking } from '../screens/order/OrderTracking';

import { Favourites } from '../screens/order/Favourites';
import { MyOrders } from '../screens/order/MyOrders';
import { OrderDetail } from '../screens/order/OrderDetail';

import { Menu } from '../screens/menu/Menu';
import { Profile } from '../screens/menu/Profile';
import { EditProfile } from '../screens/menu/EditProfile';
import { AddressBook } from '../screens/menu/AddressBook';
import { AddAddress } from '../screens/menu/AddAddress';
import { Wallet } from '../screens/wallet/Wallet';
import { WalletHistory } from '../screens/wallet/WalletHistory';
import { AddMoney } from '../screens/wallet/AddMoney';
import { LoyaltyPoints } from '../screens/menu/LoyaltyPoints';
import { Coupons } from '../screens/menu/Coupons';
import { ReferEarn } from '../screens/menu/ReferEarn';
import { HelpSupport } from '../screens/support/HelpSupport';
import { LiveChat } from '../screens/support/LiveChat';
import { Settings } from '../screens/menu/Settings';
import { Notifications } from '../screens/menu/Notifications';
import { Terms } from '../screens/support/Terms';
import { Privacy } from '../screens/support/Privacy';
import { Wishlist } from '../screens/menu/Wishlist';

export type RootStackParamList = {
  Splash: undefined;
  LanguageSelect: undefined;
  Onboarding: undefined;
  SignIn: undefined;
  SignUp: undefined;
  OtpVerify: { phone?: string; mode: 'signup' | 'login' | 'forgot' } | undefined;
  ForgotPassword: undefined;
  ResetPassword: undefined;
  MainApp: undefined;
};

export type MainTabParamList = {
  HomeTab: undefined;
  FavouriteTab: undefined;
  OrdersTab: undefined;
  MenuTab: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  Search: { query?: string } | undefined;
  SpecialOffers: undefined;
  CuratedList: { type: 'fast' | 'veg' | 'spotlight' | 'top10' | 'offers' } | undefined;
  CategoryBrowse: undefined;
  StoreListing: { category?: string; title?: string } | undefined;
  StoreDetail: { storeId: string } | undefined;
  ItemDetail: { itemId: string } | undefined;
  Cart: undefined;
  Checkout: undefined;
  OrderTracking: { orderId: string } | undefined;
};

export type OrdersStackParamList = {
  MyOrders: undefined;
  OrderDetail: { orderId: string } | undefined;
};

export type MenuStackParamList = {
  Menu: undefined;
  Profile: undefined;
  EditProfile: undefined;
  AddressBook: undefined;
  AddAddress: undefined;
  Wallet: undefined;
  WalletHistory: undefined;
  AddMoney: undefined;
  LoyaltyPoints: undefined;
  Coupons: undefined;
  ReferEarn: undefined;
  HelpSupport: undefined;
  LiveChat: undefined;
  Settings: undefined;
  Notifications: undefined;
  Terms: undefined;
  Privacy: undefined;
  Wishlist: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const OrdersStack = createNativeStackNavigator<OrdersStackParamList>();
const MenuStack = createNativeStackNavigator<MenuStackParamList>();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    primary: colors.primary,
    card: colors.white,
    text: colors.text,
    border: colors.border,
    notification: colors.primary,
  },
};

function HomeTab() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Search" component={Search} />
      <HomeStack.Screen name="SpecialOffers" component={SpecialOffers} />
      <HomeStack.Screen name="CuratedList" component={CuratedList} />
      <HomeStack.Screen name="CategoryBrowse" component={CategoryBrowse} />
      <HomeStack.Screen name="StoreListing" component={StoreListing} />
      <HomeStack.Screen name="StoreDetail" component={StoreDetail} />
      <HomeStack.Screen name="ItemDetail" component={ItemDetail} />
      <HomeStack.Screen name="Cart" component={Cart} />
      <HomeStack.Screen name="Checkout" component={Checkout} />
      <HomeStack.Screen name="OrderTracking" component={OrderTracking} />
    </HomeStack.Navigator>
  );
}

function OrdersTab() {
  return (
    <OrdersStack.Navigator screenOptions={{ headerShown: false }}>
      <OrdersStack.Screen name="MyOrders" component={MyOrders} />
      <OrdersStack.Screen name="OrderDetail" component={OrderDetail} />
    </OrdersStack.Navigator>
  );
}

function MenuTab() {
  return (
    <MenuStack.Navigator screenOptions={{ headerShown: false }}>
      <MenuStack.Screen name="Menu" component={Menu} />
      <MenuStack.Screen name="Profile" component={Profile} />
      <MenuStack.Screen name="EditProfile" component={EditProfile} />
      <MenuStack.Screen name="AddressBook" component={AddressBook} />
      <MenuStack.Screen name="AddAddress" component={AddAddress} />
      <MenuStack.Screen name="Wallet" component={Wallet} />
      <MenuStack.Screen name="WalletHistory" component={WalletHistory} />
      <MenuStack.Screen name="AddMoney" component={AddMoney} />
      <MenuStack.Screen name="LoyaltyPoints" component={LoyaltyPoints} />
      <MenuStack.Screen name="Coupons" component={Coupons} />
      <MenuStack.Screen name="ReferEarn" component={ReferEarn} />
      <MenuStack.Screen name="HelpSupport" component={HelpSupport} />
      <MenuStack.Screen name="LiveChat" component={LiveChat} />
      <MenuStack.Screen name="Settings" component={Settings} />
      <MenuStack.Screen name="Notifications" component={Notifications} />
      <MenuStack.Screen name="Terms" component={Terms} />
      <MenuStack.Screen name="Privacy" component={Privacy} />
      <MenuStack.Screen name="Wishlist" component={Wishlist} />
    </MenuStack.Navigator>
  );
}

function FavouriteTab() {
  return <Favourites />;
}

function MainApp() {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: colors.divider,
          height: 56 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 4,
        },
        tabBarLabelStyle: {
          fontFamily: fontFamilies.medium,
          fontSize: 11,
          marginTop: 2,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeTab}
        options={{
          title: t('home') || 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-variant" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="FavouriteTab"
        component={FavouriteTab}
        options={{
          title: t('favorite') || 'Favourite',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="heart-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="OrdersTab"
        component={OrdersTab}
        options={{
          title: t('my_orders') || 'Orders',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="clipboard-list-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MenuTab"
        component={MenuTab}
        options={{
          title: t('menu') || 'Menu',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="LanguageSelect" component={LanguageSelect} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="OtpVerify" component={OtpVerify} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="MainApp" component={MainApp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
