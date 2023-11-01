import { regForm } from "@/interfaces/regForm.interface";
import { ChangeEvent, FormEvent, useState } from "react";
import CustomInput from "../CustomInput";

export const RegistrationForm = () => {
  const initLoginData = {
    login: "",
    password: "",
  };
  const [data, setData] = useState<regForm>(initLoginData);

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
        Registration
      </button>
    </form>
  );
};
