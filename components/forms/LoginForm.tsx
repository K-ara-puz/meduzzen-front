import { loginForm } from "@/interfaces/loginForm.interface";
import { ChangeEvent, FormEvent, useState } from "react";

export const LoginForm = () => {
  const initLoginData = {
    login: "",
    password: "",
  };
  const [data, setData] = useState<loginForm>(initLoginData);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    alert(`Submitted: login: ${data.login}; password: ${data.password}`);
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event)
    setData({ ...data, [event.target.name]: event.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 mx-auto">
      <div className="flex flex-col">
        <label>Enter your login:</label>
        <input
          type="email"
          value={data.login}
          name="login"
          onChange={(e) => handleChange(e)}
          className="bg-transparent focus:outline-none border-b-2 border-slate-300"
        />
      </div>
      <div className="flex flex-col">
        <label>Enter your password:</label>
        <input
          type="password"
          value={data.password}
          name="password"
          onChange={(e) => handleChange(e)}
          className="bg-transparent focus:outline-none border-b-2 border-slate-300"
        />
      </div>
      <button type="submit" className="bg-green-500 px-5 py-2 mt-5">
        Login
      </button>
    </form>
  );
};
