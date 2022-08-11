import React from "react";
import Container from "../Container";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";
import FormContainer from "../FormContainer";
import { CommonModalClass } from "../utils/theme";

export default function ConfirmPassword() {
  return (
    <FormContainer>
      <Container>
        <form className={CommonModalClass + " w-96"}>
          <Title>Please New Password</Title>
          <FormInput
            label="New Password"
            placeholder="********"
            name="password"
            type="password"
          ></FormInput>
          <FormInput
            label="Confirm Password"
            placeholder="********"
            name="confirmPassword"
            type="password"
          ></FormInput>
          <Submit value="Confirm Password" />
        </form>
      </Container>
    </FormContainer>
  );
}
