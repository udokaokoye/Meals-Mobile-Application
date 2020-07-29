import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";

import { Ionicons } from "@expo/vector-icons";
import { color } from "react-native-reanimated";

const CustomHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={"white"}
    />
  );
};

export default CustomHeaderButton;

const styles = StyleSheet.create({});
