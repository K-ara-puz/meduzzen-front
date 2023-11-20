"use client";
import { TextField } from "@mui/material";
import { Field, reduxForm } from "redux-form";
import validate from "../../utils/validate";
import { useAuth0 } from "@auth0/auth0-react";

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
    if (!value) return "Required";
    return undefined;
  },
};

const LoginForm = ({ handleSubmit }) => {
  const { loginWithRedirect } = useAuth0();
  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
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
        />
      </div>
      <br></br>
      <button className="bg-green-400 p" type="submit">
        Submit
      </button>
      <br></br>
      <button
        className="bg-green-400 p"
        type="button"
        onClick={() =>
          loginWithRedirect({
            appState: { returnTo: process.env.NEXT_PUBLIC_REACT_APP_AUTH0_CALLBACK_URL },
          })
        }
      >
        SignIn with Auth0
      </button>
    </form>
  );
};

export default reduxForm({
  form: "loginForm",
  validate,
})(LoginForm);
