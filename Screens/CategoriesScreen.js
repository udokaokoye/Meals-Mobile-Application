import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { CATEGORIES } from "../data/dummy-data";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../Components/HeaderButton";

const CategoriesScreen = (props) => {
  const renderGridItem = (itemData) => {
    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate("CategoryMeal", {
            CategoryID: itemData.item.id,
          })
        }
        style={styles.grid}
      >
        <View
          style={{
            ...styles.imgCon,
            ...{ backgroundColor: itemData.item.color },
          }}
        >
          <Image
            style={styles.img}
            source={itemData.item.image}
            resizeMode="cover"
          />
          <View style={styles.gridItemDiv}>
            <Text style={styles.gridItemText}>{itemData.item.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      keyExtractor={(item, index) => item.id}
      data={CATEGORIES}
      renderItem={renderGridItem}
      numColumns={2}
    />
  );
};

CategoriesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Meal Categories",
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
const styles = StyleSheet.create({
  grid: {
    flex: 1,
    marginVertical: 1,
    marginHorizontal: 4,
    height: 200,
    backgroundColor: "#008080",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3,
  },
  imgCon: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  img: {
    width: "100%",
    height: "100%",
  },
  gridItemDiv: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  gridItemText: {
    color: "white",
    borderColor: "white",
    borderWidth: 1,
    padding: 20,
    borderRadius: 6,
    backgroundColor: "rgba(0, 0, 0, 0.37)",
  },
});

export default CategoriesScreen;
