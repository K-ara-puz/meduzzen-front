"use client";
import { Field, reduxForm } from "redux-form";
import validate from "../../utils/validate";
import { useAuth0 } from "@auth0/auth0-react";
import { validationRules } from "../../utils/reduxFormsValidateRules";
import CustomBtn from "../CustomBtn";
import { renderTextField } from "./CustomTextField";

const LoginForm = ({ handleSubmit }) => {
  const { loginWithRedirect } = useAuth0();

  const loginUser = (e: React.MouseEvent) => {
    e.preventDefault();
    loginWithRedirect({
      appState: {
        returnTo: process.env.NEXT_PUBLIC_REACT_APP_AUTH0_CALLBACK_URL,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <div className="w-full mb-5">
        <Field
          name="email"
          component={renderTextField}
          label="email"
          validate={[validationRules.required, validationRules.email]}
        />
      </div>
      <div className="w-full mb-10">
        <Field
          name="password"
          validate={[validationRules.required]}
          component={renderTextField}
          label="password"
          type="password"
        />
      </div>
      <div className="w-full flex gap-5">
        <CustomBtn
          title="SignIn with Auth0"
          btnState="gray"
          clickHandler={loginUser}
        />
        <CustomBtn
          title="SignIn"
          type="submit"
          btnState="success"
          clickHandler={() => {}}
        />
      </div>
    </form>
  );
};

export default reduxForm({
  form: "loginForm",
  validate,
})(LoginForm);
