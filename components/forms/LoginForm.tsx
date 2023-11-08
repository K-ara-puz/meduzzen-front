import { ChangeEvent, FormEvent, useState } from "react";
import CustomInput from "../CustomInput";
import { LoginFormI } from "../../interfaces/LoginForm.interface";

export const LoginForm = () => {
  const initLoginData = {
    login: "",
    password: "",
  };
  const [data, setData] = useState<LoginFormI>(initLoginData);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    alert(`Submitted: login: ${data.login}; password: ${data.password}`);
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 mx-auto">
      <CustomInput value={data.login} name="login" type="email" label="Enter your login:" afterChange={handleChange}></CustomInput>
      <CustomInput value={data.password} name="password" type="password" label="Enter your password:" afterChange={handleChange}></CustomInput>
      <button type="submit" className="bg-green-500 px-5 py-2 mt-5">
        Login
      </button>
    </form>
  );
};
