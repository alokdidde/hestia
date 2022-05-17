import NameValidator from "./name-validator.js";
import { expect } from "chai";

describe("Name Validator", function() {

    var validator;

    beforeEach(function() {
        validator = new NameValidator();
    });

    it('should give error when invalid Name', function() {
        let errors = validator.validate('tes');
        expect(errors.length).to.be.greaterThan(0);
    });

    it('should give no error when valid Name', function() {
        let errors = validator.validate('name');
        expect(errors.length).to.be.equal(0);
    });

});