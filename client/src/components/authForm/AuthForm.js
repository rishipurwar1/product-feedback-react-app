import React, { useState } from "react";
import Input from "./Input";
import Label from "./Label";
import { useForm, FormProvider } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { signin, signup } from "../../actions/auth";
import { v4 as uuidv4 } from "uuid";
import ErrorMessage from "../helpers/ErrorMessage";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const formMethods = useForm();
  const { handleSubmit } = formMethods;
  const authData = useSelector((state) => state.auth.authData);

  const dispatch = useDispatch();
  const history = useHistory();

  const removeError = () => {
    dispatch({ type: "REMOVE_ERROR" });
  };
  const switchMode = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
    removeError();
  };

  const onSubmit = (data) => {
    if (isLogin) {
      dispatch(signin(data, history));
    } else {
      dispatch(
        signup(
          {
            ...data,
            username: data.email.match(/^([^@]*)@/)[1],
            photo: `https://avatars.dicebear.com/api/avataaars/${uuidv4()}.svg`,
          },
          history
        )
      );
    }
  };

  return (
    <section className="col-start-1 col-end-2 sm:mx-0 md:my-auto h-screen self-center">
      <div className=" w-full max-w-md bg-white mt-16 px-6 py-8 rounded-md shadow-md mx-auto">
        <FormProvider {...formMethods}>
          <form className="" onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full flex justify-around mb-2">
              <button
                className={`${
                  isLogin
                    ? "bg-primary-dark text-white"
                    : "bg-transparent text-primary-dark hover:text-white hover:bg-primary-dark"
                } transition text-white text-xs font-bold px-6 py-4 rounded-full`}
                type="button"
                onClick={switchMode}
              >
                LOG IN
              </button>
              <button
                className={`${
                  !isLogin
                    ? "bg-primary-dark text-white"
                    : "bg-transparent text-primary-dark hover:text-white hover:bg-primary-dark"
                } transition text-xs font-bold px-6 py-4 rounded-full`}
                type="button"
                onClick={switchMode}
              >
                SIGN UP
              </button>
            </div>
            <div>
              {!isLogin && (
                <div>
                  <Label labelName="Name" />
                  <Input inputName="name" type="text" />
                </div>
              )}
              <div>
                <Label labelName="Email" />
                <Input inputName="email" type="email" />
              </div>
              <div>
                <Label labelName="Password" />
                <Input inputName="password" type="password" />
              </div>
            </div>
            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-neutral font-extralight text-xs pt-6"
              >
                {!isLogin
                  ? "Already have an account? Log In"
                  : "Don't have an account? Sign Up"}
              </button>
              <ErrorMessage errorMessage={authData?.message} />
            </div>

            <button className="bg-neutral text-white transition hover:bg-btn-hover px-4 py-3 w-full rounded-md font-bold mt-4 shadow-md">
              {isLogin ? "Log In" : "Sign Up"}
            </button>
            <div className="flex items-center py-6">
              <div className="w-1/2 h-px bg-white bg-opacity-40"></div>
              <p className="text-white px-1 text-xs">OR</p>
              <div className="w-1/2 h-px bg-white bg-opacity-40"></div>
            </div>
          </form>
        </FormProvider>
      </div>
    </section>
  );
};

export default AuthForm;
