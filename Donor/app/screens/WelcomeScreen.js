import React from "react";
import { StyleSheet, View, Image } from "react-native";

import AppText from "../components/AppText";
import Screen from "../components/Screen";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import routes from "../navigation/routes";

function WelcomeScreen({ navigation }) {
  return (
    <Screen style={styles.container}>
      <View style={styles.logoConainer}>
        <Image style={styles.logo} source={require("../assets/logo.png")} />
        <AppText style={styles.name}>
          Life<AppText style={styles.span}> Drops</AppText>
        </AppText>
        <AppText style={styles.tagline}>
          You can donate for ones in need and request {"\n"} donation for blood
          if you need
        </AppText>
      </View>
      <View style={styles.buttonsContainer}>
        <AppButton
          title={"log in"}
          onPress={() => navigation.navigate(routes.LOGIN)}
        />
        <AppButton
          title={"Register"}
          fill
          onPress={() => navigation.navigate(routes.REGISTER)}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  tagline: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: 50,
    fontWeight: "700",
  },
  logoConainer: {
    width: "100%",
    alignItems: "center",
  },
  buttonsContainer: {
    width: "80%",
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
  span: {
    color: colors.secondary,
    fontSize: 48,
    fontWeight: "700",
  },
});

export default WelcomeScreen;
