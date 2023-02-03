import React, { useState } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Linking,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import AppText from "./AppText";
import useAuth from "../auth/useAuth";
import reqApi from "../api/requests";
import SuccessIndicator from "./animation/SuccessIndicator";
import { useNavigation } from "@react-navigation/native";

function ReqDetail({ route }) {
  const { group, unit, date, address, location, requestee, _id, visible } =
    route.params.item;

  const { user } = useAuth();
  const [reqAccepted, setReqAccepted] = useState(false);
  const navigation = useNavigation();

  const openMap = async (latitude, longitude, label = "requestee Location") => {
    const scheme = `${Platform.OS === "ios" ? "maps" : "geo"}:0,0?q=`;
    const link = Platform.select({
      ios: `${scheme}${label}@${latitude},${longitude}`,
      android: `${scheme}${latitude},${longitude}(${label})`,
    });

    try {
      const supported = await Linking.canOpenURL(link);

      if (supported) Linking.openURL(link);
    } catch (error) {
      console.log(error);
    }
  };

  const acceptReq = async () => {
    const result = await reqApi.setReq(_id, user._id);

    if (!result.ok) {
      Alert.alert("Error", "Error During Making Request \nTry Again");
      return console.log(result.data);
    }
    navigation.pop();
    navigation.navigate("AcceptedRequests");
  };

  return (
    <View style={styles.container}>
      <SuccessIndicator visible={false} />
      <View style={[styles.textField, styles.dateTextField]}>
        <View>
          <AppText style={styles.lable}>Name</AppText>
          <AppText style={styles.name}>{requestee.name}</AppText>
        </View>
        <AppText style={styles.date}>{date}</AppText>
      </View>
      <View style={styles.textField}>
        <AppText style={styles.lable}>Phone </AppText>
        <AppText style={styles.name}>{requestee.phone}</AppText>
      </View>
      <View style={styles.textField}>
        <AppText style={styles.lable}>Blood Type</AppText>
        <AppText style={styles.name}>{group}</AppText>
      </View>

      <View style={styles.textField}>
        <AppText style={styles.lable}>Unit</AppText>
        <AppText style={styles.name}>{unit}</AppText>
      </View>
      <View style={styles.textField}>
        <AppText style={styles.lable}>Location</AppText>
        <AppText style={styles.name}>{address}</AppText>
      </View>
      <View style={styles.btnContainer}>
        <TouchableWithoutFeedback
          onPress={() => openMap(location.lat, location.lon)}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="send"
              size={24}
              color={colors.primary}
              style={{ transform: [{ rotate: "-45deg" }], marginRight: 8 }}
            />
            <AppText style={{ color: colors.primary }}>Show on Map</AppText>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={acceptReq}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {route.params.visible ? (
              <>
                <MaterialCommunityIcons
                  name="plus-thick"
                  size={24}
                  color={colors.primary}
                  style={{ marginRight: 8 }}
                />
                <AppText style={{ color: colors.primary }}>Donate</AppText>
              </>
            ) : (
              <AppText style={{ color: colors.primary }}>Accepted</AppText>
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: colors.medium,
    borderBottomWidth: 1,
    borderBottomColor: colors.medium,
    marginVertical: 12,
  },
});

export default ReqDetail;
