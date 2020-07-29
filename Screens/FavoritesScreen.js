import React from "react";
import {
  StyleSheet,
  FlatList,
  Text,
  ImageBackground,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../Components/HeaderButton";
const FavoritesScreen = (props) => {
  const favoriteMeal = useSelector((state) => state.meals.favoriteMeals);
  const renderMealItem = (itemData) => {
    const isFavorite = favoriteMeal.some(
      (meal) => meal.id === itemData.item.id
    );
    return (
      <View style={styles.genContainer}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("MealDetail", {
              MealID: itemData.item.id,
              MealTitle: itemData.item.title,
              isFav: isFavorite,
            });
          }}
        >
          <View style={styles.mealHeader}>
            <ImageBackground
              source={{ uri: itemData.item.imageUrl }}
              style={styles.bgImage}
            >
              <View style={styles.titleTextContainer}>
                <Text style={styles.title} numberOfLines={1}>
                  {itemData.item.title}
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.detailsText}>{itemData.item.duration}m</Text>
            <Text style={styles.detailsText}>{itemData.item.complexity}</Text>
            <Text style={styles.detailsText}>
              {itemData.item.affordability}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const catid = "c8";
  const favMeals = useSelector((state) => state.meals.favoriteMeals);

  if (favMeals.length === 0 || !favMeals) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>No favorites meals Found. Start adding some!</Text>
      </View>
    );
  }
  // const displayMeal = availableMeals.filter(
  //   (meal) => meal.categoryIds.indexOf(catid) >= 0
  // );
  return (
    <FlatList
      data={favMeals}
      keyExtractor={(item, index) => item.id}
      renderItem={renderMealItem}
    />
  );
};

FavoritesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Favorites",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favorite"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  genContainer: {
    width: "100%",
    height: 300,
    marginBottom: 18,
    alignSelf: "center",
    justifyContent: "center",
  },
  mealHeader: {
    height: "80%",
    backgroundColor: "yellow",
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#008080",
    alignItems: "flex-end",
    height: "20%",
    alignItems: "center",
  },
  detailsText: {
    fontSize: 20,
    color: "white",
  },
  bgImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 22,
    fontWeight: "200",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    padding: 20,
  },
  titleTextContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
  },
});
