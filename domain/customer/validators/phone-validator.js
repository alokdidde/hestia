import Validator from "../../common/validators/validator.js";

export default class PhoneValidator extends Validator {
  validate(value) {
    let errors = [];
    var mob = /^[1-9]{1}[0-9]{9}$/;
    if (mob.test(value) == false) {
      errors.push(new Error("Phone number must be 10 digits long and should not have special characters"));
    }
    return errors;
  }
}
