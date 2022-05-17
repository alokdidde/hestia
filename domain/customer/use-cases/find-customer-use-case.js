import IncompatibleTypeError from "../../common/errors/incompatible-type-error.js";
import CustomerRepository from "../repositories/customer-repository.js";

export default class FindCustomerUseCase {
  constructor(customerRepository) {
    if (!(customerRepository instanceof CustomerRepository))
      throw new IncompatibleTypeError("Not an instance of customerRepository");
    this.customerRepository = customerRepository;
  }

  findCustomer(findCustomerQuery) {
    return this.customerRepository.findCustomerByPhoneOrEmail(
        findCustomerQuery.phoneNumber,
        findCustomerQuery.email
      );
  }
}
