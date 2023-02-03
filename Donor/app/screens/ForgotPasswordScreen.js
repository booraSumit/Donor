import React from "react";
import * as Yup from "yup";
import { View, StyleSheet } from "react-native";
import Logo from "../components/Logo";
import { AppForm, AppFormField, SubmitButton } from "../components/form";
import AppText from "../components/AppText";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});

function ForgotPasswordScreen(props) {
  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.formContainer}>
        <AppForm
          initialValues={{
            email: "",
          }}
          onSubmit={(value) => {
            console.log(value);
          }}
          validationSchema={validationSchema}
        >
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            label="E-mail"
            name="email"
            textContentType="emailAddress"
          />
          <AppText style={styles.text}>
            Your password will be send to your {"\n"} registered e-mail address
          </AppText>

          <SubmitButton title={"Send"} fill />
        </AppForm>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 24,
  },

  formContainer: {
    width: "80%",
    marginVertical: 20,
  },
});

export default ForgotPasswordScreen;
