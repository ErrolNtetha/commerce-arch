import { validator } from "../../src/api/v1/validator/index.js";

/* Testing the email validation function. */
test("check if email is valid", () => {
  return expect(validator.validateEmail("giftmoobi@gmail.com")).resolves.toBe(
    "giftmoobi@gmail.com"
  );
});

test("reject if email is invalid", () => {
  return expect(
    validator.validateEmail("giftmoobi@@gmail.com")
  ).rejects.toMatch("Sorry, invalid email.");
});

test("add country code to mobile if not exist", () => {
  expect(validator.validateMobile("0771234567")).toBe("+27771234567");
});

test("return mobile if country code exist", () => {
  expect(validator.validateMobile("+27771234567")).toBe("+27771234567");
});
