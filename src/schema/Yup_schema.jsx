import * as Yup from "yup";
export const Yup_schema = Yup.object({
  email: Yup.string().email().required("Please Fill This Email"),
  password: Yup.string().min(6).required("Please Fill This password"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "password must match"),
});

