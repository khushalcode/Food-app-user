/**
 * Food image registry — auto-generated.
 * All real food photos downloaded from the web via z-ai image-search.
 * Lives in assets/images/food/*.jpg
 */
import { ImageSourcePropType } from 'react-native';

const registry: Record<string, ImageSourcePropType> = {
  // Pizzas
  pizza_margherita: require('../../assets/images/food/pizza_margherita.jpg'),
  pizza_cheese_lava: require('../../assets/images/food/pizza_cheese_lava.jpg'),
  pizza_farmhouse: require('../../assets/images/food/pizza_farmhouse.jpg'),
  pizza_mexican: require('../../assets/images/food/pizza_mexican.jpg'),
  pizza_otc: require('../../assets/images/food/pizza_otc.jpg'),
  pizza_pepperoni: require('../../assets/images/food/pizza_pepperoni.jpg'),
  pizza_chicken_tikka: require('../../assets/images/food/pizza_chicken_tikka.jpg'),
  // Biryani
  biryani_chicken: require('../../assets/images/food/biryani_chicken.jpg'),
  biryani_veg: require('../../assets/images/food/biryani_veg.jpg'),
  biryani_mughlai: require('../../assets/images/food/biryani_mughlai.jpg'),
  // Burgers
  burger_double_patty: require('../../assets/images/food/burger_double_patty.jpg'),
  burger_cheese: require('../../assets/images/food/burger_cheese.jpg'),
  burger_veg_whopper: require('../../assets/images/food/burger_veg_whopper.jpg'),
  burger_paneer: require('../../assets/images/food/burger_paneer.jpg'),
  burger_chicken_whopper: require('../../assets/images/food/burger_chicken_whopper.jpg'),
  // Momos
  momos_paneer: require('../../assets/images/food/momos_paneer.jpg'),
  momos_tandoori: require('../../assets/images/food/momos_tandoori.jpg'),
  momos_kurkure: require('../../assets/images/food/momos_kurkure.jpg'),
  // Dosa & South Indian
  dosa_masala: require('../../assets/images/food/dosa_masala.jpg'),
  dosa_cheese_paneer: require('../../assets/images/food/dosa_cheese_paneer.jpg'),
  dosa_butter: require('../../assets/images/food/dosa_butter.jpg'),
  idli_rava: require('../../assets/images/food/idli_rava.jpg'),
  idli_butter: require('../../assets/images/food/idli_butter.jpg'),
  // Thali & North Indian
  thali_veg: require('../../assets/images/food/thali_veg.jpg'),
  paneer_butter_masala: require('../../assets/images/food/paneer_butter_masala.jpg'),
  dal_makhani: require('../../assets/images/food/dal_makhani.jpg'),
  // Chinese
  noodles_hakka: require('../../assets/images/food/noodles_hakka.jpg'),
  chilli_paneer: require('../../assets/images/food/chilli_paneer.jpg'),
  // Desserts
  ice_cream_butterscotch: require('../../assets/images/food/ice_cream_butterscotch.jpg'),
  pastry_chocolate_truffle: require('../../assets/images/food/pastry_chocolate_truffle.jpg'),
  cake_red_velvet: require('../../assets/images/food/cake_red_velvet.jpg'),
  // Rolls & Chaat
  roll_chicken_kathi: require('../../assets/images/food/roll_chicken_kathi.jpg'),
  roll_paneer_tikka: require('../../assets/images/food/roll_paneer_tikka.jpg'),
  pani_puri_ragi: require('../../assets/images/food/pani_puri_ragi.jpg'),
  kachori_raj: require('../../assets/images/food/kachori_raj.jpg'),
  // Chicken
  chicken_fried: require('../../assets/images/food/chicken_fried.jpg'),
  // Restaurant banners
  restaurant_kfc: require('../../assets/images/food/restaurant_kfc.jpg'),
  restaurant_burger_king: require('../../assets/images/food/restaurant_burger_king.jpg'),
  restaurant_pizza_hut: require('../../assets/images/food/restaurant_pizza_hut.jpg'),
  restaurant_dominos: require('../../assets/images/food/restaurant_dominos.jpg'),
  restaurant_biryani: require('../../assets/images/food/restaurant_biryani.jpg'),
  restaurant_pizza: require('../../assets/images/food/restaurant_pizza.jpg'),
  restaurant_dessert: require('../../assets/images/food/restaurant_dessert.jpg'),
  restaurant_south_indian: require('../../assets/images/food/restaurant_south_indian.jpg'),
  restaurant_chinese: require('../../assets/images/food/restaurant_chinese.jpg'),
  restaurant_thali: require('../../assets/images/food/restaurant_thali.jpg'),
  restaurant_ice_cream: require('../../assets/images/food/restaurant_ice_cream.jpg'),
  restaurant_bakery: require('../../assets/images/food/restaurant_bakery.jpg'),
  restaurant_chaat: require('../../assets/images/food/restaurant_chaat.jpg'),
  // Hero / banner
  hero_food_delivery: require('../../assets/images/food/hero_food_delivery.jpg'),
  hero_50_off: require('../../assets/images/food/hero_50_off.jpg'),
  hero_grocery: require('../../assets/images/food/hero_grocery.jpg'),
  hero_welcome: require('../../assets/images/food/hero_welcome.jpg'),
  // Category photos
  cat_pizza: require('../../assets/images/food/cat_pizza.jpg'),
  cat_biryani: require('../../assets/images/food/cat_biryani.jpg'),
  cat_burger: require('../../assets/images/food/cat_burger.jpg'),
  cat_momos: require('../../assets/images/food/cat_momos.jpg'),
  cat_dosa: require('../../assets/images/food/cat_dosa.jpg'),
  cat_thali: require('../../assets/images/food/cat_thali.jpg'),
  cat_chinese: require('../../assets/images/food/cat_chinese.jpg'),
  cat_dessert: require('../../assets/images/food/cat_dessert.jpg'),
  cat_rolls: require('../../assets/images/food/cat_rolls.jpg'),
  cat_chaat: require('../../assets/images/food/cat_chaat.jpg'),
  cat_south_indian: require('../../assets/images/food/cat_south_indian.jpg'),
  cat_healthy: require('../../assets/images/food/cat_healthy.jpg'),
};

export function getFoodImage(name: string): ImageSourcePropType | null {
  return registry[name] ?? null;
}

export function listFoodImages(): string[] {
  return Object.keys(registry);
}
