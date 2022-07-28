import Yup from "./validate";

export const RegisterSchema = Yup.object().shape({
  email: Yup.string().required(),
  full_name: Yup.string().required().email(),
  username: Yup.mixed()
    .required()
    .test({
      message: "please enter a valid username",
      test: (str) => /^[a-z0-9\.\_]+$/i.test(str),
    }),
  password: Yup.string().required(),
});
