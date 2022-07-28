import Input from "components/Input";
import Button from "components/Button";
import Separator from "components/Separator";
import { AiFillFacebook } from "react-icons/ai";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { login, register } from "firebase.js";
import { RegisterSchema } from "validation";

export default function Register() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (values, actions) => {
    const response = await register(values);
    if (response)
      navigate(location.state?.return_url || "/", {
        replace: true,
      });
  };

  //Image téléphone + img déroulante
  return (
    <div className="w-[350px] grid gap-y-3">
      <div className="border px-[40px] pt-10 pb-6">
        <a href="#" className="flex justify-center mb-6">
          <img
            className="h-[51px]"
            src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png"
          />
        </a>
        <p className="text-[17px] font-semibold text-[#8e8e8e] text-center mb-4">
          Sign up to see your friends photos and videos.
        </p>
        <Button>
          <AiFillFacebook />
          Log in with Facebook
        </Button>
        <Separator />
        <Formik
          validationShema={RegisterSchema}
          initialValues={{
            email: "",
            full_name: "",
            username: "",
            password: "",
          }}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, isValid, dirty, values }) => (
            <Form className="grid gap-y-1.5">
              <Input name="email" label="Email" />
              <Input name="full_name" label="Full name" />
              <Input name="username" label="Username" />
              <Input type="password" name="password" label="Password" />

              <p className="text-xs text-[#8e8e8e] py-2">
                <br /> <br />
                People who use our service have been able to import your details
                to Instagram.{" "}
                <a href="#" className="font-semibold">
                  Learn more
                </a>{" "}
                <br /> <br />
                By signing up, you agree to our Terms and Conditions. Find out
                how we collect, use and share your data by reading our Privacy
                Policy and how we use cookies and other similar technologies by
                consulting our Cookies Policy.
              </p>

              <Button
                type="submit"
                disabled={!isValid || !dirty || isSubmitting}
              >
                Sign Up
              </Button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="bg-white border p4 text-cm text-center ">
        Have a account ?
        <Link to="/auth/login" className="font-semibold text-brand">
          Log in
        </Link>
      </div>
    </div>
  );
}
