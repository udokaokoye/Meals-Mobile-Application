import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { StyleSheet, Text, View, Switch } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../Components/HeaderButton";
import { setFilters } from "../store/actions/meals";

const FilterScreen = (props) => {
  const { navigation } = props;
  const [isGlutenFree, setisGlutenFree] = useState(false);
  const [isLactoseFree, setisLactoseFree] = useState(false);
  const [isVegetarian, setisVegetarian] = useState(false);
  const [isVegan, setisVegan] = useState(false);
  const dispatch = useDispatch();
  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegetarianFree: isVegetarian,
      veganFree: isVegan,
    };
    dispatch(setFilters(appliedFilters));
    alert("Filter Saved");
  }, [isGlutenFree, isLactoseFree, isVegetarian, isVegan, dispatch]);

  useEffect(() => {
    navigation.setParams({
      save: saveFilters,
    });
  }, [saveFilters]);
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Text style={styles.titleText}>Available Filters / Restrictions</Text>
      <View style={styles.filterContainer}>
        <Text>Gluten-free</Text>
        <Switch
          value={isGlutenFree}
          onValueChange={(newValue) => setisGlutenFree(newValue)}
        />
      </View>
      <View style={styles.filterContainer}>
        <Text>Lactose-free</Text>
        <Switch
          value={isLactoseFree}
          onValueChange={(newValue) => setisLactoseFree(newValue)}
        />
      </View>
      <View style={styles.filterContainer}>
        <Text>Vegetarian</Text>
        <Switch
          value={isVegetarian}
          onValueChange={(newValue) => setisVegetarian(newValue)}
        />
      </View>
      <View style={styles.filterContainer}>
        <Text>Vegan</Text>
        <Switch
          value={isVegan}
          onValueChange={(newValue) => setisVegan(newValue)}
        />
      </View>
    </View>
  );
};

FilterScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Filter Meals",
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
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favorite"
          iconName="ios-save"
          onPress={navData.navigation.getParam("save")}
        />
      </HeaderButtons>
    ),
  };
};

export default FilterScreen;

const styles = StyleSheet.create({
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    alignItems: "center",
    marginVertical: 15,
  },
});
