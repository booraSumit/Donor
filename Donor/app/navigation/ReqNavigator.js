import React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import FeedNavigator from "./FeedNavigator";
import colors from "../config/colors";
import AcceptedReqs from "../screens/AcceptedReqs";

function NotificationsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Notifications!</Text>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarInactiveTintColor: colors.white,
        tabBarActiveTintColor: colors.white,
        tabBarIndicatorStyle: {
          borderBottomColor: colors.white,
          borderBottomWidth: 2,
        },
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: colors.primary },
      }}
    >
      <Tab.Screen
        name="Feed"
        component={FeedNavigator}
        options={{ tabBarLabel: "Requests" }}
      />
      <Tab.Screen
        name="AcceptedRequests"
        component={AcceptedReqs}
        options={{ tabBarLabel: "Updates" }}
      />
    </Tab.Navigator>
  );
}
export default function ReqNavigator() {
  return <MyTabs />;
}
