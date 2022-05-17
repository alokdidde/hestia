import Validator from '../../common/validators/validator.js';

export default class NameValidator extends Validator{

    validate(value){
        var errors = [];
        if(value.length < 4){
            errors.push("Name must be at least 3 characters long");
        }
        return errors;
    }
}