'use client'
import { TextField } from "@mui/material";
import { Field, reduxForm } from "redux-form";
import validate from "../../utils/validate";

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
const validationRules = {
  required: (value: unknown) => (value ? undefined : "Required"),
  email: (value: string) =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
      ? "Invalid email address"
      : undefined,
  confirmPass: (value: string) => {
    if (!value) return "Required"
    return undefined
  }
};

const RegisterForm = ({handleSubmit}) => {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <div>
        <Field
          name="firstName"
          component={renderTextField}
          label="firstName"
          validate={[validationRules.required]}
        />
      </div>
      <br></br>
      <div>
        <Field
          name="lastName"
          component={renderTextField}
          label="lastName"
          validate={[validationRules.required]}
        />
      </div>
      <br></br>
      <div>
        <Field
          name="email"
          component={renderTextField}
          label="email"
          validate={[validationRules.required, validationRules.email]}
        />
      </div>
      <br></br>
      <div>
        <Field
          name="password"
          validate={[validationRules.required]}
          component={renderTextField}
          label="password"
        />
      </div>
      <br></br>
      <div>
        <Field
          name="confirmPass"
          component={renderTextField}
          label="confirmPass"
          validate={[validationRules.required, validationRules.confirmPass]}
          ref="testRef" withRef
        />
      </div>
      <br></br>
      <button className="bg-green-400 p" type="submit">
        Submit
      </button>
    </form>
  );
};

export default reduxForm({
  form: "registerForm",
  validate,
})(RegisterForm);
