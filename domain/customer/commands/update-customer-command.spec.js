import UpdateCustomerCommand  from "../../../domain/customer/commands/update-customer-command.js";
import IncompatibleTypeError from "../../common/errors/incompatible-type-error.js";
import UpdateSchema from "../../../domain/common/entities/update-schema.js";
import { expect } from "chai";

describe("Update Customer Command", () => {

    it("Should be able to create UpdateCustomerCommand Instance", () => {
        const updateCustomerCommand = new UpdateCustomerCommand(1, new UpdateSchema());
        expect(updateCustomerCommand).to.be.an.instanceof(UpdateCustomerCommand);
    });

    it("Should throw error when incompatible type is passed", () => {
        expect(() => {
            const updateCustomerCommand = new UpdateCustomerCommand(1, {});
        }).to.throw(IncompatibleTypeError);
    });

});