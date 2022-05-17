import CustomerRepository from "../../domain/customer/repositories/customer-repository.js";
import Customer from "../../domain/customer/entities/customer.js";
import fs from "fs";
import path from 'path';
import uuid4 from "uuid4";

const filePath = path.resolve('./server', 'public', 'assets', 'customers.json');

class MockCustomerRepository extends CustomerRepository {

    customers = [];

    constructor(){
        super();
        let rawData = fs.readFileSync(filePath);
        this.customers = JSON.parse(rawData);
    }

    createCustomer(customer) {
        customer.id = uuid4();
        this.customers.push(customer);
        saveData(this.customers);
        return customer;
    };

    getCustomer(id){
        return this.customers.find(customer => customer.id === id);
    };

    getCustomers(skip = 0, limit = 10){
        return this.customers;
    };

    findCustomerByPhoneOrEmail(email, phone){
        return this.customers.find(customer => customer.email === email || customer.phone === phone);
    }

    searchCustomers(search){
        return this.customers.filter(customer => customer?.name?.toLowerCase()?.includes(search?.toLowerCase()) || customer?.email?.toLowerCase()?.includes(search?.toLowerCase()) || customer?.phone?.toLowerCase()?.includes(search?.toLowerCase()));
    }

    updateCustomer(customer){
        let index = this.customers.findIndex(c => c.id === customer.id);
        this.customers[index] = customer;
        saveData(this.customers);
        return customer;
    };
}

function saveData(customers) {
    fs.writeFileSync(filePath, JSON.stringify(customers, null, 4));
}

const mockCustomerRepository = new MockCustomerRepository();
export default mockCustomerRepository;