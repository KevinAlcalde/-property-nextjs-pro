import Signin from "@/app/components/auth/sign-in";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Iniciar sesión | Módica Inmobiliaria",
};

const SigninPage = () => {
  return (
    <>
      <Signin />
    </>
  );
};

export default SigninPage;
