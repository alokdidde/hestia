import { expect } from "chai";
import sinon from "sinon";
import CustomerRepository from "../repositories/customer-repository.js";
import UpdateCustomerUseCase from "../use-cases/update-customer-use-case.js";
import IncompatibleTypeError from "../../common/errors/incompatible-type-error.js";
import UpdateCustomerCommand from "../commands/update-customer-command.js";
import UpdateSchema from "../../common/entities/update-schema.js";
import Customer from "../../customer/entities/customer.js";


describe("Update Customer Use Case", () => {

    it("Should throw error when initialised with incompatible repository", () => {
        expect(() => {
            const updateCustomerUseCase = new UpdateCustomerUseCase({});
        }).to.throw(IncompatibleTypeError);
    });

    it("Should Instantiate when initialised with compatible repository", () => {
        const customerRepository = sinon.createStubInstance(CustomerRepository);
        const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);
    });

    it("Should update customer when called with valid command", () => {
        const customerRepository = new CustomerRepository();
        sinon.stub(customerRepository, 'getCustomer').callsFake(() => new Customer("John", "", ""));
        const updateCustomerMethodSpy = sinon.spy(customerRepository, "updateCustomer");
        const updateSchema = new UpdateSchema();
        updateSchema.name = {value:"John Dory",operation:"SET"};
        updateSchema.email = {value:"john@example.com",operation:"SET"};
        updateSchema.phone = {value:"+23480983409384",operation:"SET"};
        const updateCustomerCommand = new UpdateCustomerCommand(100, updateSchema);
        const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);
        updateCustomerUseCase.updateCustomer(updateCustomerCommand);
        expect(updateCustomerMethodSpy.calledOnce).to.be.true;
        const updatedCustomerArgument = updateCustomerMethodSpy.getCalls()[0].args[0];
        expect(updatedCustomerArgument.name).to.equal("John Dory");
        expect(updatedCustomerArgument.email).to.equal("john@example.com");
        expect(updatedCustomerArgument.phone).to.equal("+23480983409384");
    });

    it("Should update Single Field for customer when called with valid command", () => {
        const customerRepository = new CustomerRepository();
        sinon.stub(customerRepository, 'getCustomer').callsFake(() => new Customer("John", "", ""));
        const updateCustomerMethodSpy = sinon.spy(customerRepository, "updateCustomer");
        const updateSchema = new UpdateSchema();
        updateSchema.name = {value:"John Dory",operation:"SET"};
        const updateCustomerCommand = new UpdateCustomerCommand(100, updateSchema);
        const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);
        updateCustomerUseCase.updateCustomer(updateCustomerCommand);
        expect(updateCustomerMethodSpy.calledOnce).to.be.true;
        const updatedCustomerArgument = updateCustomerMethodSpy.getCalls()[0].args[0];
        expect(updatedCustomerArgument.name).to.equal("John Dory");
    });

});