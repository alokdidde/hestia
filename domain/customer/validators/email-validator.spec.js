import EmailValidator from './email-validator.js';
import { expect } from 'chai';

describe('EmailValidator', function() {
    var validator;

    beforeEach(function() {
        validator = new EmailValidator();
    });

    it('should give error when invalid email', function() {
        let errors = validator.validate('test');
        expect(errors.length).to.be.greaterThan(0);
    });

    it('should give no error when valid email', function() {
        let errors = validator.validate('test@example.com');
        expect(errors.length).to.be.equal(0);
    });

    it('should give error when email without @', function() {
        let errors = validator.validate('test.com');
        expect(errors.length).to.be.greaterThan(0);
    });

    it('should give error when email without TLD', function() {
        let errors = validator.validate('test@google');
        expect(errors.length).to.be.greaterThan(0);
    });
});