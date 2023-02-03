import React from "react";
import { View } from "react-native";
import { useFormikContext } from "formik";
import AppTextInput from "../AppTextInput";
import ErrorMessage from "./ErrorMessage";
function AppFormField({ name, label, ...otherProps }) {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();
  return (
    <>
      <View style={{ marginVertical: 12 }}>
        <AppTextInput
          onChangeText={(text) => setFieldValue(name, text)}
          value={values[name]}
          onBlur={() => setFieldTouched(name)}
          label={label}
          {...otherProps}
        />
        <ErrorMessage error={errors[name]} visible={touched[name]} />
      </View>
    </>
  );
}

export default AppFormField;
