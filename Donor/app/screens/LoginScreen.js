import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";

import colors from "../config/colors";
import AppText from "../components/AppText";
import {
  AppForm,
  AppFormField,
  SubmitButton,
  ErrorMessage,
} from "../components/form";
import Link from "../components/Link";
import Logo from "../components/Logo";
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(2).label("Password"),
});

function LoginScreen(props) {
  const { logIn } = useAuth();
  const navigation = useNavigation();
  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = async ({ email, password }) => {
    const result = await authApi.login(email, password);
    if (!result.ok) return setLoginFailed(true);
    setLoginFailed(false);
    logIn(result.data);
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
                initialValues={{ email: "", password: "" }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                <ErrorMessage
                  error="Invalid email and/or password."
                  visible={loginFailed}
                />
                <AppFormField name={"email"} icon={"email"} label="E-mail" />
                <AppFormField
                  name={"password"}
                  icon={"lock"}
                  label="Password"
                />
                <View style={styles.buttonsContainer}>
                  <SubmitButton title={"log in"} fill />
                  <Link>
                    <TouchableWithoutFeedback
                      onPress={() => navigation.navigate("ForgetPassword")}
                    >
                      <View>
                        <AppText
                          style={{
                            textAlign: "center",
                            color: colors.secondary,
                          }}
                        >
                          {/* Forget My Password */}
                        </AppText>
                      </View>
                    </TouchableWithoutFeedback>
                  </Link>
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

export default LoginScreen;
