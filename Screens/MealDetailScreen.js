import React, { useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../Components/HeaderButton";
import { toggleFavorite } from "../store/actions/meals";
const MealDetailScreen = (props) => {
  const mealId = props.navigation.getParam("MealID");
  const SelectedMeal = useSelector((state) => state.meals.meals);
  const meal = SelectedMeal.find((meal) => meal.id == mealId);
  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
    alert("Favorites Updated");
  }, [dispatch, mealId]);
  useEffect(() => {
    props.navigation.setParams({ ToggleFavorite: toggleFavoriteHandler });
  }, [toggleFavoriteHandler]);

  const currMealIsFav = useSelector((state) =>
    state.meals.favoriteMeals.some((meal) => meal.id === mealId)
  );

  useEffect(() => {
    props.navigation.setParams({ isFav: currMealIsFav });
  }, [currMealIsFav]);
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.imageContainer}>
        <ImageBackground
          style={{ width: "100%", height: "100%", justifyContent: "flex-end" }}
          source={{ uri: meal.imageUrl }}
        >
          <View style={styles.inlineTextDiv}>
            <Text style={styles.smallDetails}>{meal.duration}m</Text>
            <Text style={styles.smallDetails}>{meal.complexity}</Text>
            <Text style={styles.smallDetails}>{meal.affordability}</Text>
          </View>
        </ImageBackground>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.ingridients}>
          <Text style={styles.headerTitle}>Ingridients</Text>
          {meal.ingredients.map((ingredient) => (
            <View style={styles.ingridentContainer} key={ingredient}>
              <Text style={styles.ingredient}>{ingredient}</Text>
            </View>
          ))}
        </View>
        <View style={styles.steps}>
          <Text style={styles.headerTitle}>Steps</Text>
          {meal.steps.map((step, i) => (
            <View style={styles.stepsContainer} key={step}>
              <Text>{i + 1}.</Text>
              <Text style={styles.stepsText}>{step}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
MealDetailScreen.navigationOptions = (navigationData) => {
  const MealTitle = navigationData.navigation.getParam("MealTitle");
  const isFav = navigationData.navigation.getParam("isFav");
  const toggleFavorite = navigationData.navigation.getParam("ToggleFavorite");
  return {
    headerTitle: MealTitle,
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favorite"
          iconName={isFav ? "ios-star" : "ios-star-outline"}
          onPress={toggleFavorite}
        />
      </HeaderButtons>
    ),
  };
};
export default MealDetailScreen;

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    height: "40%",
  },
  inlineTextDiv: {
    backgroundColor: "rgba(0,0,0,0.5)",
    borderBottomColor: "#008080",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 12,
  },
  smallDetails: {
    fontSize: 20,
    color: "white",
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
  },
  ingridentContainer: {
    borderWidth: 0.5,
    borderColor: "black",
    marginVertical: 8,
    padding: 10,
    borderLeftWidth: 3,
  },
  steps: {
    marginVertical: 15,
  },
  stepsContainer: {
    flexDirection: "row",
    marginVertical: 10,
    borderBottomWidth: 0.6,
    borderBottomColor: "black",
    paddingBottom: 5,
  },
  stepsText: {
    marginLeft: 8,
  },
});
