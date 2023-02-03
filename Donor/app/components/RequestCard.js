import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";

function RequestCard({ btype, unit, location, date, onpress }) {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={onpress}>
      <View style={styles.container}>
        <View style={[styles.textField, styles.dateTextField]}>
          <View>
            <AppText style={styles.lable}>Blood Type</AppText>
            <AppText style={styles.name}>{btype}</AppText>
          </View>
          <AppText style={styles.date}>{date}</AppText>
        </View>
        <View style={styles.textField}>
          <AppText style={styles.lable}>Unit</AppText>
          <AppText style={styles.name}>{unit}</AppText>
        </View>
        <View style={styles.textField}>
          <AppText style={styles.lable}>Location</AppText>
          <AppText style={styles.name}>{location}</AppText>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.dark,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginVertical: 8,
    marginHorizontal: 16,
  },

  textField: {
    marginVertical: 6,
  },

  dateTextField: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  date: {
    color: colors.secondary,
  },

  lable: {
    color: colors.dark,
    fontSize: 12,
  },

  name: {
    color: colors.veryDark,
    marginVertical: 4,
  },

  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default RequestCard;
