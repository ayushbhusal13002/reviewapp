import React from "react";
import CustomLink from "../../CustomLink";
import Container from "../Container";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";
import FormContainer from "../FormContainer";
import { CommonModalClass } from "../utils/theme";

export default function Signup() {
  return (
    <FormContainer>
      <Container>
        <form className={CommonModalClass + " w-72"}>
          <Title>Sign Up</Title>
          <FormInput
            label="Name"
            placeholder="John Doe"
            name="name"
            type="text"
          ></FormInput>
          <FormInput
            label="Email"
            placeholder="john@email.com"
            name="email"
            type="email"
          ></FormInput>
          <FormInput
            label="Password"
            placeholder="********"
            name="password"
            type="password"
          ></FormInput>
          <Submit value="Sign up" />
          <div className="flex justify-between">
            <CustomLink to={"/auth/forget-password"}>
              Forget Password
            </CustomLink>
            <CustomLink to={"/auth/sign-in"}>Sign In</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}
