import handler, { createCustomer } from "./customers.js";
import { expect } from "chai";
import sinon from "sinon";

describe('Customers API', () => {

    it("should create a customer", () => {
        let customer = createCustomer("John Doe", "john@example.com", "1234567890");
        expect(customer.name).to.equal("John Doe");
    });

});