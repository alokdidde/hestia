import IncompatibleTypeError from "../errors/incompatible-type-error.js";


const checkType = (object, type) => {
    if(!(object instanceof type)) {
        throw new IncompatibleTypeError(`${object} is not of type ${type}`);
    }
}

export default checkType;