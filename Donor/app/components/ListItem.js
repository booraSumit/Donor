import React from "react";
import { View, StyleSheet, TouchableHighlight, Image } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

import AppText from "./AppText";

function ListItem({
  IconComponent,
  title,
  subTitle,
  onPress,
  image,
  renderRightAction,
}) {
  return (
    <Swipeable renderRightActions={renderRightAction}>
      <TouchableHighlight onPress={onPress}>
        <View style={styles.container}>
          {IconComponent}
          {image && <Image source={image} style={styles.image} />}
          <View style={styles.detailContainer}>
            <AppText>{title}</AppText>
            {subTitle && <AppText style={styles.subTitle}>{subTitle}</AppText>}
          </View>
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
  },
  detailContainer: {
    marginLeft: 10,
    justifyContent: "center",
  },
  subTitle: {
    fontSize: 14,
    color: "#6e6969",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
});

export default ListItem;
