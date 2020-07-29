import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createDrawerNavigator,
} from "react-navigation";
import CategoriesScreen from "../Screens/CategoriesScreen";
import CategoryMealScreen from "../Screens/CategoryMealScreen";
import FavoritesScreen from "../Screens/FavoritesScreen";
import MealDetailScreen from "../Screens/MealDetailScreen";
import FilterScreen from "../Screens/FilterScreen";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { Platform } from "react-native";
const MealsNavigator = createStackNavigator(
  {
    Categories: CategoriesScreen,
    CategoryMeal: CategoryMealScreen,
    MealDetail: MealDetailScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#008080",
      },
      headerTintColor: "white",
    },
  }
);

const FavNavigator = createStackNavigator(
  {
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#008080",
      },
      headerTintColor: "white",
    },
  }
);

const NavConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: "#008080",
    },
  },
  Favorites: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: "#008080",
    },
  },
};

const MealsFavTabNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(NavConfig, {
        activeColor: "white",
        shifting: true,
        barStyle: {
          backgroundColor: "#008080",
        },
      })
    : createBottomTabNavigator(
        { NavConfig },
        {
          tabBarOptions: {
            activeTintColor: "white",
            activeBackgroundColor: "#008080",
          },
        }
      );
const FiltersNavigator = createStackNavigator(
  {
    Filters: FilterScreen,
  },

  {
    navigationOptions: {
      drawerLabel: "Filter Meal",
    },
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#008080",
      },
      headerTintColor: "white",
    },
  }
);
const MainNavigator = createDrawerNavigator({
  MealsFavs: {
    screen: MealsFavTabNavigator,
    navigationOptions: {
      drawerLabel: "Meals",
      drawerIcon: <Ionicons name="ios-restaurant" size={22} color="#008080" />,
    },
  },
  Filter: FiltersNavigator,
});
export default createAppContainer(MainNavigator);
