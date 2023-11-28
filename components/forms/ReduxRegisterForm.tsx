"use client";
import { TextField } from "@mui/material";
import { Field, reduxForm } from "redux-form";
import validate from "../../utils/validate";
import { validationRules } from "../../utils/reduxFormsValidateRules";
import CustomBtn from "../CustomBtn";

const renderTextField = ({
  input,
  label,
  name,
  meta: { touched, error, warning },
  ...custom
}) => {
  return (
    <div className="flex flex-col">
      <TextField
        label={label}
        error={error && touched ? true : false}
        variant="outlined"
        {...input}
        {...custom}
      />
      {touched &&
        ((error && <span className="text-red-500">{error}</span>) ||
          (warning && <span className="text-yellow-600">{warning}</span>))}
    </div>
  );
};

const RegisterForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5">
      <div className="w-full">
        <Field
          name="firstName"
          component={renderTextField}
          label="firstName"
          validate={[validationRules.required, validationRules.minLength]}
        />
      </div>
      <div className="w-full">
        <Field
          name="lastName"
          component={renderTextField}
          label="lastName"
          validate={[validationRules.required, validationRules.minLength]}
        />
      </div>
      <div className="w-full">
        <Field
          name="email"
          component={renderTextField}
          label="email"
          validate={[validationRules.required, validationRules.email]}
        />
      </div>
      <div className="w-full">
        <Field
          name="password"
          validate={[validationRules.required]}
          component={renderTextField}
          label="password"
        />
      </div>
      <div className="w-full mb-5">
        <Field
          name="confirmPass"
          component={renderTextField}
          label="confirmPass"
          validate={[validationRules.required, validationRules.confirmPass]}
        />
      </div>
      <CustomBtn title="Submit" btnState="success"/>
    </form>
  );
};

export default reduxForm({
  form: "registerForm",
  validate,
})(RegisterForm);
