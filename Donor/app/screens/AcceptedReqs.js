import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Linking,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "../components/AppText";
import reqApi from "../api/requests";
import useAuth from "../auth/useAuth";
import colors from "../config/colors";
import ActivityIndicator from "../components/animation/ActivityIndicator";
import { ErrorMessage } from "../components/form";
import AppButton from "../components/AppButton";

function DetailCard(item) {
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
  const { group, unit, date, address, location, requestee, _id } = item.item;
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
  return (
    <View style={styles.container}>
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
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <AppText style={{ color: colors.primary }}>Accepted</AppText>
        </View>
      </View>
    </View>
  );
}

function AcceptedReqs(props) {
  const [data, setData] = useState([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  const fetchData = async () => {
    setFetching(true);
    setLoading(true);
    let result = await reqApi.getAcceptedReq(user._id);
    if (!result.ok) console.log(result.data);
    setData(result.data);
    setLoading(false);
    setFetching(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {data.length < 1 && <ErrorMessage error={"No requests"} visible={true} />}
      {data.length < 1 && <AppButton title={"Refresh"} fill />}
      <ActivityIndicator visible={loading} />
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <DetailCard item={item} />}
        refreshing={fetching}
        onRefresh={fetchData}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AcceptedReqs;
