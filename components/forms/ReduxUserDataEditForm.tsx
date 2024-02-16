"use client";
import { Field, reduxForm } from "redux-form";
import validate from "../../utils/validate";
import { validationRules } from "../../utils/reduxFormsValidateRules";
import CustomBtn from "../CustomBtn";
import { renderTextField } from "./CustomTextField";

const UserDataEditForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center max-w-[400px] mx-auto mb-10">
      <div className="w-full mb-5">
        <Field
          name="firstName"
          component={renderTextField}
          label="firstName"
          validate={[validationRules.minLength, validationRules.maxLength]}
        />
      </div>
      <div className="w-full mb-10">
        <Field
          name="lastName"
          validate={[validationRules.minLength, validationRules.maxLength]}
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
