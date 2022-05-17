import UpdateOperationType from "../../common/entities/update-operation.js";
import IncompatibleTypeError from "../../common/errors/incompatible-type-error.js";
import CustomerRepository from "../repositories/customer-repository.js";
import { SET, REMOVE } from "../../common/entities/update-operation.js";

export default class UpdateCustomerUseCase{


    fieldsOperationsSchema = {"name":[UpdateOperationType.SET], "email":[UpdateOperationType.SET, UpdateOperationType.REMOVE], "phone":[UpdateOperationType.SET, UpdateOperationType.REMOVE]};


    constructor(customerRepository){
        if(!(customerRepository instanceof CustomerRepository))
            throw new IncompatibleTypeError("customerRepository");
        this.customerRepository = customerRepository;
    }

    updateCustomer(updateCustomerCommand){
        let customer = this.customerRepository.getCustomer(updateCustomerCommand.customerId);
        let updateSchema = updateCustomerCommand.updateSchema;
        Object.keys(updateSchema).forEach(key => {
            let fieldUpdateSchema = updateSchema[key];
            if(fieldUpdateSchema && this.fieldsOperationsSchema[key].includes(fieldUpdateSchema.operation)){
                if(SET.name === fieldUpdateSchema.operation){
                    customer = SET(customer, key, fieldUpdateSchema.value);
                }
                else if(REMOVE.name === fieldUpdateSchema.operation){
                    customer = REMOVE(customer, key);
                }
            }
        });
        return this.customerRepository.updateCustomer(customer);
    }
}