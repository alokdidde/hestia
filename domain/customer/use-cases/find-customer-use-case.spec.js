import FindCustomerUseCase from "../use-cases/find-customer-use-case.js";
import { expect } from "chai";
import IncompatibleTypeError from "../../common/errors/incompatible-type-error.js";
import CustomerRepository from "../repositories/customer-repository.js";
import sinon from "sinon";
import FindCustomerQuery from "../queries/find-customer-query.js";

describe("Find Customer Use Case", () => {
  it("Should throw error when initialised with incompatible repository", () => {
    expect(() => {
      const findCustomerUseCase = new FindCustomerUseCase({});
    }).throws(IncompatibleTypeError);
  });

  it("Should Instantiate when initialised with compatible repository", () => {
    const customerRepository = sinon.createStubInstance(CustomerRepository);
    const findCustomerUseCase = new FindCustomerUseCase(customerRepository);
  });

  it("Should call find customer when called with valid query", () => {
    const customerRepository = new CustomerRepository();
    const findCustomerMethodSpy = sinon.spy(customerRepository, "findCustomerByPhoneOrEmail");
    const findCustomerQuery = new FindCustomerQuery("32190-83420984", "john@email.com");
    const findCustomerUseCase = new FindCustomerUseCase(customerRepository);
    findCustomerUseCase.findCustomer(findCustomerQuery);
    expect(findCustomerMethodSpy.calledOnce).to.be.true;
  });
});
