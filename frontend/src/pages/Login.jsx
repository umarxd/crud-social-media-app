import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <div className="font-bold text-xl mb-6">Log In</div>

      <label>Email address:</label>
      <input
        className="w-52 lg:w-1/4 h-8 mt-1 text-black self-center form-control block px-3 py-1.5 text-base font-normal border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-slate-800 focus:outline-none"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>Password:</label>
      <input
        className="w-52 lg:w-1/4 h-8 mt-1 text-black self-center form-control block px-3 py-1.5 text-base font-normal border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-slate-800 focus:outline-none"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button
        className="w-max self-center mt-2 transition-all ease-in duration-75 bg-slate-800 hover:bg-slate-900 font-bold text-base px-2 py-1 rounded-sm"
        disabled={isLoading}
      >
        Log in
      </button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default Login;
