import React from "react";
import { useState } from "react";
import { StyleSheet, View, Image, ScrollView } from "react-native";
import * as Yup from "yup";
import colors from "../config/colors";
import {
  ErrorMessage,
  AppForm,
  AppFormField,
  SubmitButton,
  AppFormPicker as Picker,
} from "../components/form";
import Logo from "../components/Logo";
import useApi from "../hooks/useApi";
import usersApi from "../api/user";
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  phone: Yup.string()
    .required()
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, "too short")
    .max(10, "too long"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
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

function RegisterScreen(props) {
  const [checked, setChecked] = useState(false);
  const registerApi = useApi(usersApi.register);
  const loginApi = useApi(authApi.login);
  const auth = useAuth();
  const [error, setError] = useState();

  const handleSubmit = async (userInfo) => {
    console.log(userInfo);
    const result = await usersApi.register(userInfo);

    if (!result.ok) {
      if (result.data) setError(result.data);
      else {
        setError("An unexpected error occurred.");
        console.log("3", result);
      }
      return;
    }

    const { data: authToken } = await authApi.login(
      userInfo.email,
      userInfo.password
    );
    auth.logIn(authToken);
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 24,
            }}
          >
            <Logo />
            <View style={styles.formContainer}>
              <AppForm
                initialValues={{
                  email: "",
                  password: "",
                  name: "",
                  phone: "",
                  category: null,
                }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                <ErrorMessage error={error} visible={error} />
                <AppFormField
                  autoCorrect={false}
                  name={"name"}
                  icon={"account"}
                  label="Name"
                />
                <AppFormField
                  autoCorrect={false}
                  name={"phone"}
                  icon={"phone"}
                  label="Phone Number"
                  keyboardType="numeric"
                />
                <AppFormField
                  autoCapitalize="none"
                  autoCorrect={false}
                  icon="email"
                  keyboardType="email-address"
                  label="E-mail"
                  name="email"
                  textContentType="emailAddress"
                />
                <AppFormField
                  autoCapitalize="none"
                  autoCorrect={false}
                  icon="lock"
                  label="Password"
                  name="password"
                  secureTextEntry
                  textContentType="password"
                />
                <Picker
                  label={"Blood Type"}
                  icon={"water"}
                  items={categories}
                  name="category"
                  placeholder="Select Type"
                />

                <View style={styles.buttonsContainer}>
                  <SubmitButton title={"Register"} fill />
                </View>
              </AppForm>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  scrollView: {
    flex: 1,
  },
  logoConainer: {
    width: "100%",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 10,
  },
  name: {
    color: colors.primary,
    fontSize: 48,
    fontWeight: "700",
  },
  formContainer: {
    width: "80%",
    marginVertical: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  buttonsContainer: {
    width: "60%",
    alignSelf: "center",
  },
});

export default RegisterScreen;
