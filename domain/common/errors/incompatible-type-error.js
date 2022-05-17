export default class IncompatibleTypeError extends Error {
    constructor(message) {
        super(message);
        this.name = "IncompatibleTypeError";
    }
}