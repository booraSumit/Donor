import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  Button,
  FlatList,
} from "react-native";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "./AppText";
import Screen from "./Screen";
import defaultStyles from "../config/styles";
import PickerItem from "./PickerItem";

function AppPicker({
  icon,
  items,
  onSelectItem,
  placeholder,
  selectedItem,
  label,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <View style={styles.container}>
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            size={20}
            color={defaultStyles.colors.dark}
            style={styles.icon}
          />
        )}
        <View style={styles.fieldContainer}>
          <AppText style={styles.label}>{label}</AppText>
          <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
            <View style={styles.dropdownContainer}>
              {selectedItem ? (
                <AppText style={styles.text}>{selectedItem.label}</AppText>
              ) : (
                <AppText style={styles.placeholder}>{placeholder}</AppText>
              )}
              <MaterialCommunityIcons
                name="chevron-down"
                size={20}
                color={defaultStyles.colors.medium}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>

      <Modal visible={modalVisible} animationType="slide">
        <Screen>
          <Button
            title="Close"
            color={colors.primary}
            onPress={() => setModalVisible(false)}
          />
          <FlatList
            data={items}
            keyExtractor={(item) => item.value.toString()}
            renderItem={({ item }) => (
              <PickerItem
                label={item.label}
                onPress={() => {
                  setModalVisible(false);
                  onSelectItem(item);
                }}
              />
            )}
          />
        </Screen>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderBottomWidth: 1,
    borderColor: colors.medium,
  },
  fieldContainer: {
    paddingHorizontal: 18,
    width: "100%",
  },
  dropdownContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
  },
  icon: {
    marginRight: 10,
  },
  placeholder: {
    paddingVertical: 4,
    fontSize: 16,
    width: "100%",
    color: colors.dark,
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
  },
  text: {
    paddingVertical: 4,
    width: "100%",
    color: colors.veryDark,
  },
  icon: {
    paddingHorizontal: 18,
    borderRightWidth: 1,
    borderColor: colors.medium,
  },
});

export default AppPicker;
