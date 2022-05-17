import Customer from "../entities/customer.js";
import CustomerRepository from "../repositories/customer-repository.js";
import DuplicateCustomerError from "../errors/duplicate-customer-error.js";

export default class AddCustomerUseCase{

    constructor(customerRepository) {
        if(!(customerRepository instanceof CustomerRepository)){
            throw new Error("Invalid repository");
        }
        this.customerRepository = customerRepository;
    }

    createCustomer(addCustomerCommand){
        let customer = this.customerRepository.findCustomerByPhoneOrEmail(addCustomerCommand.phone, addCustomerCommand.email);
        if(customer != null )
            throw new DuplicateCustomerError("Customer already exists");

        customer = new Customer(addCustomerCommand.name, addCustomerCommand.email, addCustomerCommand.phone);
        this.customerRepository.createCustomer(customer);
        return customer;
    }

}