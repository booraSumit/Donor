import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  FlatList,
  StyleSheet,
  View,
  StatusBar,
  Alert,
  BackHandler,
} from "react-native";

import { ErrorMessage } from "../components/form";
import colors from "../config/colors";
import useLocation from "../hooks/useLocation";
import RequestCard from "./RequestCard";
import requests from "../api/requests";
import ReqContext from "../contexts/reqContext";
import ActivityIndicator from "./animation/ActivityIndicator";

function RequestList(props) {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(true);

  const { location, isPemited } = useLocation();
  if (!isPemited) {
    Alert.alert("Permission Denied!", "please turn on location permission.", [
      {
        text: "ok",
        onPress: () => {
          BackHandler.exitApp();
        },
      },
    ]);
  }

  const fetchData = async () => {
    setLoading(true);
    setFetching(true);
    try {
      const result = await requests.getReq(
        location.latitude,
        location.longitude
      );
      if (!result.ok) return console.log(result.data);

      setData(result.data);
    } catch (error) {
      console.log(error);
    }
    setFetching(false);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [location]);

  return (
    <ReqContext.Provider value={data}>
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.primary} />
        {data.length < 1 && (
          <ErrorMessage error={"There Are No Requests"} visible={true} />
        )}
        <ErrorMessage error={"try to fetch location"} visible={fetching} />
        {loading ? (
          <ActivityIndicator visible={loading} />
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <RequestCard
                btype={item.group}
                unit={item.unit}
                location={item.address}
                date={item.date}
                onpress={() =>
                  navigation.navigate("ReqDetail", {
                    item,
                    visible: true,
                  })
                }
              />
            )}
            refreshing={fetching}
            onRefresh={fetchData}
          />
        )}
      </View>
    </ReqContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default RequestList;
