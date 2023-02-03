import React, { useState } from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";

import Icon from "../components/Icon";
import ListItem from "../components/ListItem";
import colors from "../config/colors";
import useAuth from "../auth/useAuth";
import RequestedList from "./RequestedList";
import DonorList from "./Donor";

function About(props) {
  const { user, logOut } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const handleLogout = async () => {
    Alert.alert("Are You Sure!", "", [
      {
        text: "Yes",
        onPress: function () {
          logOut();
        },
      },
      {
        text: "No",
        onPress: () => {
          return;
        },
      },
    ]);
  };

  return (
    <>
      <View>
        <ListItem
          title={user.name}
          subTitle={user.email}
          image={require("../assets/user.png")}
        />

        {modalVisible && (
          <RequestedList
            visible={modalVisible}
            onClose={(res) => setModalVisible(res)}
          />
        )}
        {statusModalVisible && (
          <DonorList
            visible={statusModalVisible}
            onClose={(res) => setStatusModalVisible(res)}
          />
        )}

        <ListItem
          title="Blood Requested"
          IconComponent={<Icon name="water" bgColor="#fc5c65" />}
          onPress={() => {
            setModalVisible(true);
          }}
        />
        <ListItem
          title="Request Status"
          IconComponent={<Icon name="water" bgColor="#4ecdc4" />}
          onPress={() => {
            setStatusModalVisible(true);
          }}
        />
        <ListItem
          title="Log Out"
          IconComponent={<Icon name="logout" bgColor="#ffe66d" />}
          onPress={handleLogout}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#f7f4f4",
  },
});

const Separator = () => {
  return (
    <View
      style={{ width: "100%", backgroundColor: colors.medium, height: 1 }}
    ></View>
  );
};

export default About;
