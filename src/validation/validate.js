import * as Yup from "yup";

Yup.setLocale({
  mixed: {
    required: "Required Field",
  },
  string: {
    email: "please enter a valid email",
  },
});

export default Yup;
