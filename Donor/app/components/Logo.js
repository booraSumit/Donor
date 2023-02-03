import React from "react";
import { StyleSheet, View, Image } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";

function Logo(props) {
  return (
    <View style={styles.logoConainer}>
      <Image style={styles.logo} source={require("../assets/logo.png")} />
      <AppText style={styles.name}>Life Drops</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  logoConainer: {
    width: "100%",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 10,
  },
  name: {
    color: colors.primary,
    fontSize: 48,
    fontWeight: "700",
  },
});

export default Logo;
