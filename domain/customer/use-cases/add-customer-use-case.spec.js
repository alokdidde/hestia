import AddCustomerUseCase from "./add-customer-use-case.js";
import CustomerRepository from "../repositories/customer-repository.js";
import AddCustomerCommand  from "../commands/add-customer-command.js";
import { expect } from 'chai';
import sinon from 'sinon';
import Customer from "../entities/customer.js";
import DuplicateCustomerError from "../errors/duplicate-customer-error.js";


describe("Add Customer Usecase", () => {

    it("Should throw error when initialised with incompatible repository", () => {
        expect(() => {
            const addCustomerUseCase = new AddCustomerUseCase({});
        }).to.throw(Error);
    });

    it("Should Instantiate when initialised with compatible repository", () => {
        const customerRepository = sinon.createStubInstance(CustomerRepository);
        const addCustomerUseCase = new AddCustomerUseCase(customerRepository);
    });

    it("Should create customer when called with valid command", () => {
        const customerRepository = new CustomerRepository();
        const createCustomerMethodSpy = sinon.spy(customerRepository,
            "createCustomer");
        const addCustomerCommand = new AddCustomerCommand(1, "John", "test@example.com", "1234567890");
        const addCustomerUseCase = new AddCustomerUseCase(customerRepository);
        addCustomerUseCase.createCustomer(addCustomerCommand);
        expect(createCustomerMethodSpy.calledOnce).to.be.true;
    });

    it("Should throw error when user with email or phone already exists", () => {
        const customerRepository = new CustomerRepository();
        const stub = sinon.stub(customerRepository, 'findCustomerByPhoneOrEmail').callsFake(() => new Customer(1, "John", "", ""));
        const addCustomerCommand = new AddCustomerCommand(1, "John", "test@example.com", "1234567890");
        const addCustomerUseCase = new AddCustomerUseCase(customerRepository);
        expect(() => {
            addCustomerUseCase.createCustomer(addCustomerCommand);
        }).to.throw(DuplicateCustomerError);
    });

});