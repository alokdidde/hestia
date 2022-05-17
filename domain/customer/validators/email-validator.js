import Validator from "../../common/validators/validator.js";

export default class EmailValidator extends Validator {
  validate(value) {
    var errors = [];
    let match = String(value)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    if (!match) {
      errors.push("Please enter a valid email address");
    }
    return errors;
  }
}
