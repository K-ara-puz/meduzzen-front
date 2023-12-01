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

const UserDataEditForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <div className="w-full mb-5">
        <Field
          name="firstName"
          component={renderTextField}
          label="firstName"
          validate={[validationRules.minLength]}
        />
      </div>
      <div className="w-full mb-10">
        <Field
          name="lastName"
          validate={[validationRules.minLength]}
          component={renderTextField}
          label="lastName"
        />
      </div>
      <div className="w-full flex gap-5">
        <CustomBtn title="Cancel" btnState="gray" clickHandler={() => {}} />
        <CustomBtn
          title="Save"
          type="submit"
          btnState="success"
          clickHandler={() => {}}
        />
      </div>
    </form>
  );
};

export default reduxForm({
  form: "userDataEditForm",
  validate,
})(UserDataEditForm);
