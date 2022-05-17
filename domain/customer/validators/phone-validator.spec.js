import PhoneValidator from "./phone-validator.js";
import { expect } from "chai";

describe("Phone Validator", function() {

    var validator;

    beforeEach(function() {
        validator = new PhoneValidator();
    });

    it('should give error when invalid Phone', function() {
        let errors = validator.validate('12345678910');
        expect(errors.length).to.be.greaterThan(0);
    });

    it('should give no error when valid Phone', function() {
        let errors = validator.validate('1234567890');
        expect(errors.length).to.be.equal(0);
    });


});