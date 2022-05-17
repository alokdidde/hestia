

export default class DuplicateCustomerError extends Error {
    constructor(message) {
        super(message);
        this.name = "DuplicateCustomerError";
    }
}