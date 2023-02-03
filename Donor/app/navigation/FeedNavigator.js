import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import RequestCard from "../components/RequestCard";
import RequestList from "../components/RequestList";
import ReqDetail from "../components/ReqDetail";

const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
    <Stack.Screen
      name="RequestList"
      component={RequestList}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="ReqDetail" component={ReqDetail} />
  </Stack.Navigator>
);

export default FeedNavigator;
