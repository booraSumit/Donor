import React from "react";
import { useFormikContext } from "formik";
import AppButton from "../AppButton";

function SubmitButton({ title, fill, style }) {
  const { handleSubmit } = useFormikContext();
  return <AppButton title={title} fill onPress={handleSubmit} style={style} />;
}

export default SubmitButton;
