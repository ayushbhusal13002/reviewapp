const jwt = require("jsonwebtoken");
const User = require("../models/user");
const EmailVerificationToken = require("../models/emailVerificationToken");
const { isValidObjectId } = require("mongoose");
const { generateOTP, generateMailTransporter } = require("../utils/mail");
const { sendError, generateRandomByte } = require("../utils/helper");
const PasswordResetToken = require("../models/passwordResetToken");

exports.create = async (req, res) => {
  const { name, email, password } = req.body;
  const oldUser = await User.findOne({ email });

  if (oldUser) return sendError(res, "Email is already in use");

  const newUser = new User({ name, email, password });
  await newUser.save();

  let OTP = generateOTP();

  const newEmailVerificationToken = new EmailVerificationToken({
    owner: newUser._id,
    token: OTP,
  });

  await newEmailVerificationToken.save();

  const transport = generateMailTransporter();
  transport.sendMail({
    from: "verification@reviewapp.com",
    to: newUser.email,
    subject: "Email Verifiaction",
    html: `
    
    <p>Your Verification Token/OTP is <h1>${OTP}</h1></p>`,
  });

  res.status(201).json({
    messeage:
      "Please verify your email. OTP has been sent to your email account!",
    user: newUser,
  });
};

exports.verifyEmail = async (req, res) => {
  const { userId, OTP } = req.body;

  if (!isValidObjectId(userId)) return sendError(res, "User not Found!!");

  const user = await User.findById(userId);
  if (!user) return sendError(res, "User not Found!");

  if (user.isVerified) return sendError(res, "User is already Verified!");

  const token = await EmailVerificationToken.findOne({ owner: userId });
  if (!token) return sendError(res, "Token not found!");

  const isMatched = await token.compareToken(OTP);
  if (!isMatched) return sendError(res, "Please submit a valid OTP");

  user.isVerified = true;
  await user.save();

  await EmailVerificationToken.findByIdAndDelete(token._id);

  const transport = generateMailTransporter();
  transport.sendMail({
    from: "verification@reviewapp.com",
    to: user.email,
    subject: "Welcome Email",
    html: `
    <h1>Welcome to our app and thanks for choosing us</h1>`,
  });
  res.json({ message: "Your email is verified!" });
};

exports.resendEmailVerificationToken = async (req, res) => {
  const { userId } = req.body;
  const user = await User.findById(userId);

  if (!user) return res.json({ error: "User not Found!!" });
  if (user.isVerified)
    return res.json({ error: "This email id is already verified!" });

  const alreadyHasToken = await EmailVerificationToken.findOne({
    owner: userId,
  });
  if (alreadyHasToken)
    return res.json({
      error: "Only after one hour you can request for another token!",
    });

  let OTP = generateOTP();

  const newEmailVerificationToken = new EmailVerificationToken({
    owner: user._id,
    token: OTP,
  });

  await newEmailVerificationToken.save();

  const transport = generateMailTransporter();
  transport.sendMail({
    from: "verification@reviewapp.com",
    to: user.email,
    subject: "Email Verifiaction",
    html: `
      
      <p>Your Verification Token/OTP is <h1>${OTP}</h1></p>`,
  });

  res.status(201).json({
    messeage:
      "Please verify your email. OTP has been sent to your email account!",
    user: user,
  });
};

exports.forgetPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) return sendError(res, "Email is Missing!!");

  const user = await User.findOne({ email });
  if (!user) return sendError(res, "User not Found!", 404);

  const alreadyHasToken = await PasswordResetToken.findOne({ owner: user._id });
  if (alreadyHasToken)
    return sendError(
      res,
      "Only after one hour you can request for another token!"
    );

  const token = await generateRandomByte();

  const newPasswordResetToken = await PasswordResetToken({
    owner: user._id,
    token,
  });

  await newPasswordResetToken.save();
  const resetPasswordUrl = `http://localhost:3000/reset-password?token=${token}&id=${user._id}`;

  const transport = generateMailTransporter();
  transport.sendMail({
    from: "security@reviewapp.com",
    to: user.email,
    subject: "Reset Password Link",
    html: `
    <p>Click here to reset Password</p><a href = "${resetPasswordUrl}">Change Password</a>`,
  });

  res.json({ message: "Link sent to your email!" });
};

exports.sendResetPasswordTokenStatus = (req, res) => {
  res.json({ valid: true });
};

exports.resetPassword = async (req, res) => {
  const { newPassword, userId } = req.body;

  const user = await User.findById(userId);
  const matched = await user.comparePassword(newPassword);
  if (matched)
    return sendError(
      res,
      "The new password must be different that the old one!"
    );

  user.password = newPassword;
  await user.save();

  await PasswordResetToken.findByIdAndDelete(req.resetToken._id);
  const transport = generateMailTransporter();
  transport.sendMail({
    from: "security@reviewapp.com",
    to: user.email,
    subject: "Password Reset Successfully",
    html: `
    <h1>Password Reset Successfully</h1>
    <p>Now you can use new password</p>
    `,
  });

  res.json({
    message: "passsword reset successfully, now you can use new password",
  });
};

exports.signIn = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return sendError(res, "Email/Password mismatch!");

  const matched = await user.comparePassword(password);
  if (!matched) return sendError(res, "Email/Password mismatch!");

  const { _id, name } = user;

  const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  res.json({ user: { id: user._id, name, email, jwtToken } });
};
