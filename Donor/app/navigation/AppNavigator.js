import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import NewListingButton from "./NewListingButton";
import routes from "./routes";
import About from "../screens/About";
import FindeDonor from "../screens/FindeDonor";
import colors from "../config/colors";
import ReqNavigator from "./ReqNavigator";

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: colors.primary },
      headerTintColor: colors.white,
      headerTitleAlign: "center",
    }}
  >
    <Tab.Screen
      name="home"
      component={ReqNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
        title: "Donate",
        headerShown: false,
      }}
    />
    <Tab.Screen
      name="CreatePost"
      component={FindeDonor}
      options={({ navigation }) => ({
        tabBarButton: () => (
          <NewListingButton
            onPress={() => navigation.navigate(routes.FINDDONOR)}
          />
        ),
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="plus-circle"
            color={color}
            size={size}
          />
        ),
        title: "Make a Request",
      })}
    />
    <Tab.Screen
      name="About"
      component={About}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;
