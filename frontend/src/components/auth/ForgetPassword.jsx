import React from "react";
import CustomLink from "../../CustomLink";
import Container from "../Container";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";
import FormContainer from "../FormContainer";
import { CommonModalClass } from "../utils/theme";

export default function ForgetPassword() {
  return (
    <FormContainer>
      <Container>
        <form className={CommonModalClass + " w-96"}>
          <Title>Please Enter Your Email</Title>
          <FormInput
            label="Email"
            placeholder="john@email.com"
            name="email"
            type="email"
          ></FormInput>
          <Submit value="Send Link" />
          <div className="flex justify-between">
            <CustomLink to={"/auth/sign-in"}>Sign In</CustomLink>
            <CustomLink to={"/auth/sign-up"}>Sign Up</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}
