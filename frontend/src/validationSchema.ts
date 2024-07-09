import * as yup from "yup";

export const eventSchema = yup.object().shape({
  name: yup
    .string()
    .max(32, "Name should be 32 characters or less")
    .required("Name is required"),
  description: yup.string().required("Description is required"),
  startDate: yup.date().required("Start date is required"),
  endDate: yup
    .date()
    .min(yup.ref("startDate"), "End date can’t be before start date")
    .required("End date is required"),
  timezone: yup.string().required("Timezone is required"),
  color: yup.string().required("Color is required"),
});
