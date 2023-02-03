import React from "react";
import { StyleSheet, View } from "react-native";
import { useState } from "react";
import * as Yup from "yup";

import {
  AppForm,
  AppFormField,
  SubmitButton,
  AppFormPicker as Picker,
} from "../components/form";
import useLocation from "../hooks/useLocation";
import UploadScreen from "./UploadScreen";
import reqApi from "../api/requests";
import useAuth from "../auth/useAuth";

const validationSchema = Yup.object().shape({
  location: Yup.string().required().label("Location"),
  unit: Yup.number().required().label("Unit"),
  category: Yup.object().required().nullable().label("Category"),
});

const categories = [
  { label: "A+", value: 1 },
  { label: "A-", value: 2 },
  { label: "B+", value: 3 },
  { label: "B-", value: 4 },
  { label: "O+", value: 5 },
  { label: "O-", value: 6 },
  { label: "AB+", value: 7 },
  { label: "AB-", value: 8 },
];

function FindeDonor(props) {
  const { location, isPemited } = useLocation();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const { user } = useAuth();
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

  const handleSubmit = async (info, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);
    const data = {
      group: info.category.label,
      address: info.location,
      unit: info.unit,
      requestee: user._id,
      location: { lat: location.latitude, lon: location.longitude },
    };
    const result = await reqApi.addReq(
      data,
      (progress) => setProgress(progress)
      // console.log(progress)
    );

    if (!result.ok) {
      setUploadVisible(false);
      console.log(result);
      return alert("Could not post the req");
    }

    resetForm();
  };

  return (
    <View style={styles.container}>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        visible={uploadVisible}
        progress={progress}
      />

      <AppForm
        initialValues={{
          location: "",
          unit: "",
          category: null,
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <AppFormField
          autoCorrect={false}
          name={"location"}
          icon={"map-marker"}
          label="Location"
        />
        <AppFormField
          autoCorrect={false}
          name={"unit"}
          icon={"calculator"}
          label="Unit"
          keyboardType="numeric"
        />
        <Picker
          label={"Blood Type"}
          icon={"water"}
          items={categories}
          name="category"
          placeholder="Select Type"
        />

        <View style={styles.buttonsContainer}>
          <SubmitButton title={"Post"} fill style={{ width: "60%" }} />
        </View>
      </AppForm>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    marginVertical: 24,
    alignItems: "center",
  },
});

export default FindeDonor;
