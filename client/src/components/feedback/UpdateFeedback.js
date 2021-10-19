import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { updateFeedback } from "../../actions/feedbacks";
import iconEditFeedback from "../../assets/imgs/icon-edit-feedback.svg";
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

const statuses = [
  { label: "Suggestion", value: "suggestion" },
  { label: "Planned", value: "planned" },
  { label: "In-Progress", value: "in-progress" },
  { label: "Live", value: "live" },
];

const UpdateFeedback = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formMethods = useForm();
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: errors,
  } = formMethods;

  const feedback = useSelector((state) =>
    state.feedbacks.filter((feedback) => feedback._id === id)
  );

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    if (feedback) {
      await dispatch(updateFeedback(id, data));
      history.push("/feedbacks");
      setIsSubmitting(false);
      reset("", {
        keepValues: false,
      });
    }
  };

  useEffect(() => {
    if (feedback) {
      for (const key in feedback[0]) {
        setValue(key, feedback[0][key]);
      }
    }
  }, [feedback, setValue]);

  return (
    <div className="mx-auto w-full max-w-xl my-16 px-2 sm:px-5">
      <Helmet>
        <title>Update Feedback</title>
        <meta name="description" content="update your feedback" />
      </Helmet>
      <PageHeader />
      <div className="bg-white px-6 py-8 rounded-lg shadow-sm mx-auto mt-16 relative">
        <FormProvider {...formMethods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <img
              src={iconEditFeedback}
              className="w-16 absolute -top-8"
              alt="Add new feedback"
            />
            <h1 className="text-lg font-semibold text-primary-dark mt-8">
              {`Editing ${feedback[0].title}`}
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
              <Label labelName="Update Status" />
              <small className="text-base text-secondary-dark mb-2 inline-block">
                Change feature status
              </small>
              {/* <Input inputName="title" type="text" /> */}
              <select
                name="status"
                id="status"
                className="block w-full p-3 bg-primary-light rounded-md outline-none focus:ring-1 focus:ring-tertiary-dark text-primary-dark font-bold text-xs"
                {...register("status", { required: true })}
              >
                {statuses.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
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
                  errors.errors.description?.type === "required"
                    ? "focus:outline-none focus:border-red-500"
                    : "focus:outline-none focus:border-tertiary-dark"
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
                  "Update Feedback"
                )}
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default UpdateFeedback;
