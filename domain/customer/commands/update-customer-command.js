import UpdateSchema  from "../../common/entities/update-schema.js";
import IncompatibleTypeError from "../../common/errors/incompatible-type-error.js";

export default class UpdateCustomerCommand {
    constructor(customerId, updateSchema) {
        if (!(updateSchema instanceof UpdateSchema))
            throw new IncompatibleTypeError("Not an instance of UpdateSchema");
        this.customerId = customerId;
        this.updateSchema = updateSchema;
    }
}