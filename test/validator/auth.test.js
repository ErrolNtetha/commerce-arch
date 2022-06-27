import { validator } from "../../src/api/v1/validator/index.js";

/* Testing the email validation function. */
test("check if email is valid", () => {
  return expect(validator.validateEmail("user.test@gmail.com")).resolves.toBe(
    "user.test@gmail.com"
  );
});
test("reject if email is invalid", () => {
  return expect(
    validator.validateEmail("user.test@@gmail.com")
  ).rejects.toMatch("Sorry, invalid email.");
});

/* Testing the validateMobile function. */
test("add country code to mobile if not exist", () => {
  expect(validator.validateMobile("0771234567")).toBe("+27771234567");
});
test("return mobile if country code exist", () => {
  expect(validator.validateMobile("+27771234567")).toBe("+27771234567");
});

/* Testing the validatePassword function. */
test("resolve if password is valid", () => {
  return expect(
    validator.validatePassword("Mk327452_", "Mk327452_")
  ).resolves.toBe();
});
test("reject if passwords does not match", () => {
  return expect(
    validator.validatePassword("password", "password1")
  ).rejects.toMatch("Sorry, passwords does not match.");
});
test("reject if password is too short", () => {
  return expect(validator.validatePassword("pass", "pass")).rejects.toMatch(
    "Sorry, password must be at least 8 characters long."
  );
});
test("reject if password does not contain lowercase letters", () => {
  return expect(
    validator.validatePassword("PASSWORD", "PASSWORD")
  ).rejects.toMatch(
    "Password must contain at least one lowercase letter, one uppercase letter, and one number."
  );
});
test("reject if password does not contain upper letters", () => {
  return expect(
    validator.validatePassword("password", "password")
  ).rejects.toMatch(
    "Password must contain at least one lowercase letter, one uppercase letter, and one number."
  );
});
test("reject if password does not contain numeric", () => {
  return expect(
    validator.validatePassword("passworD", "passworD")
  ).rejects.toMatch(
    "Password must contain at least one lowercase letter, one uppercase letter, and one number."
  );
});
