import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { createFeedback, updateFeedback } from "../../actions/feedbacks";
import iconNewFeedback from "../../assets/imgs/icon-new-feedback.svg";
import loader from "../../assets/imgs/loader.svg";
import Input from "../authForm/Input";
import Label from "../authForm/Label";
import Button from "../helpers/Button";
import PageHeader from "../helpers/PageHeader";

const categories = [
  { label: "Feature", value: "feature" },
  { label: "Bug", value: "bug" },
  { label: "Enhancement", value: "enhancement" },
  { label: "UI", value: "ui" },
  { label: "UX", value: "ux" },
];

const CreateFeedback = ({ feedback }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const formMethods = useForm();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = formMethods;
  // get user profile from local storage
  const user = JSON.parse(localStorage.getItem("profile"));
  const onSubmit = async (data) => {
    if (feedback) {
      await dispatch(updateFeedback(feedback._id, data));
      history.push("/feedbacks");
      reset("", {
        keepValues: false,
      });
    } else {
      await dispatch(
        createFeedback({
          ...data,
          status: "suggestion",
          name: user?.result?.name,
        })
      );
      history.push("/feedbacks");
    }
  };
  return (
    <div className="mx-auto w-full max-w-xl my-16 px-2 sm:px-5">
      <Helmet>
        <title>Create New Feedback</title>
        <meta
          name="description"
          content="create a new feedback or give your suggestion"
        />
      </Helmet>
      <PageHeader />
      <div className="bg-white px-6 py-8 rounded-lg shadow-sm mx-auto mt-16 relative">
        <FormProvider {...formMethods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <img
              src={iconNewFeedback}
              className="w-16 absolute -top-8"
              alt="Add new feedback"
            />
            <h1 className="text-lg font-semibold text-primary-dark mt-8">
              Create New Feedback
            </h1>
            <div className="mt-3">
              <Label labelName="Feedback Title" />
              <small className="text-base text-secondary-dark mb-2 inline-block">
                Add a short, descriptive headline
              </small>
              <Input inputName="title" type="text" />
            </div>
            <div className="mt-3">
              <Label labelName="Category" />
              <small className="text-base text-secondary-dark mb-2 inline-block">
                Choose a category for your feedback
              </small>
              {/* <Input inputName="title" type="text" /> */}
              <select
                name="category"
                id="category"
                className="block w-full p-3 bg-primary-light rounded-md outline-none focus:ring-1 focus:ring-tertiary-dark text-primary-dark font-bold text-xs"
                {...register("category", { required: true })}
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-3">
              <Label labelName="Feedback Detail" />
              <small className="text-base text-secondary-dark mb-2 inline-block">
                Include any specific comments on what should be improved, added,
                etc.
              </small>
              <textarea
                name="description"
                id="description"
                cols="30"
                rows="5"
                className={`${
                  errors.description?.type === "required"
                    ? "focus:outline-none focus:border-red-500"
                    : "focus:outline-none  focus:border-tertiary-dark"
                } p-4 w-full rounded-lg bg-primary-light text-primary-dark font-bold text-xs border focus:outline-none border-gray-100`}
                {...register("description", { required: true })}
              ></textarea>
            </div>
            <div className="flex flex-col-reverse md:flex-row md:justify-end mt-8">
              <Button
                type="button"
                btnText="Cancel"
                bgColor="bg-primary-dark"
                hoverBgColor="bg-secondary-dark"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-5 py-3 text-sm rounded-lg mb-4 md:mb-0 md:ml-2 bg-neutral text-white ${
                  isSubmitting && "bg-btn-hover"
                } hover:bg-btn-hover`}
              >
                {isSubmitting ? (
                  <img src={loader} className="w-5 h-5" alt="loader" />
                ) : (
                  "Add Feedback"
                )}
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default CreateFeedback;
