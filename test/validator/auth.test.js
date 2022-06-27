import { validator } from "../../src/api/v1/validator/index.js";

test("check if email is valid", () => {
  return expect(validator.validateEmail("giftmoobi@gmail.com")).resolves.toBe(
    "giftmoobi@gmail.com"
  );
});

test("reject if email is invalid", () => {
  return expect(validator.validateEmail("giftmoobi@@gmail.com")).rejects.toMatch(
    "Sorry, invalid email."
  );
});
