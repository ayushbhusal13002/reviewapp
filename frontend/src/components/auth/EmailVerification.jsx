import React, { useEffect, useRef, useState } from "react";
import CustomLink from "../../CustomLink";
import Container from "../Container";
import Submit from "../form/Submit";
import Title from "../form/Title";
import FormContainer from "../FormContainer";
import { CommonModalClass } from "../utils/theme";

const OTP_LENGTH = 6;

export default function EmailVerification() {
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);
  const inputRef = useRef();

  const focusNextInputField = (index) => {
    setActiveOtpIndex(index + 1);
  };

  const focusPrevInputField = (index) => {
    let nextIndex;
    const diff = index - 1;
    nextIndex = diff !== 0 ? diff : 0;
    setActiveOtpIndex(nextIndex);
  };

  const handleOtpChange = ({ target }, index) => {
    const { value } = target;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1, value.length);

    // console.log(value);
    if (!value) focusPrevInputField(index);
    else focusNextInputField(index);

    setOtp(newOtp);
  };

  const handleKeyDown = ({ key }, index) => {
    if (key === "Backspace") {
      focusPrevInputField(index);
    }
  };
  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  return (
    <FormContainer>
      <Container>
        <form className={CommonModalClass + " w-96"}>
          <Title>Please enter the OTP to verify your account</Title>
          <p className="text-center text-dark-subtle">
            OTP has been sent to your email
          </p>
          <div className="flex justify-center items-center space-x-4">
            {otp.map((_, index) => {
              return (
                <input
                  ref={activeOtpIndex === index ? inputRef : null}
                  key={index}
                  type="number"
                  value={otp[index] || ""}
                  onChange={(e) => handleOtpChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 border-2 dark:border-dark-subtle border-light-subtle
                  dark:focus:border-white focus:border-primary rounded bg-transparent 
                  outline-none text-center dark:text-white text-primary font-semibold 
                  text-xl spin-button-none"
                />
              );
            })}
          </div>

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
