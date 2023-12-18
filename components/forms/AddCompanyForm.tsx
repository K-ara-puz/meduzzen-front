"use client";
import { Field, reduxForm } from "redux-form";
import validate from "../../utils/validate";
import { validationRules } from "../../utils/reduxFormsValidateRules";
import CustomBtn from "../CustomBtn";
import { renderTextField } from "./CustomTextField";

const AddCompanyForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <div className="w-full mb-5">
        <Field
          name="name"
          component={renderTextField}
          label="name"
          validate={[validationRules.required, validationRules.minLength, validationRules.maxLength]}
        />
      </div>
      <div className="w-full mb-10">
        <Field
          name="description"
          validate={[validationRules.required, validationRules.minLength10, validationRules.maxLength100]}
          component={renderTextField}
          label="description"
        />
      </div>
      <div className="w-full flex gap-5">
        <CustomBtn
          title="Submit"
          type="submit"
          btnState="success"
          clickHandler={() => {}}
        />
      </div>
    </form>
  );
};

export default reduxForm({
  form: "addCompanyForm",
  validate,
})(AddCompanyForm);
