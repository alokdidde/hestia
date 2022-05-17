
export const SET = (object, field, value) => {
    object[field] = value;
    return object;
};

export const REMOVE = (object, field) => {
    delete object[field];
    return object;
};

export const APPEND = (object, field, value) => {
    object[field] = object[field].concat(value);
    return object;
};

export const REPLACE = (object, field, value, withValue) => {
    let index =  object[field].indexOf(value);
    if (index > -1) {
        object[field][index] = withValue;
    }
    return object;
}

const UpdateOperationType = Object.freeze({
    SET: SET.name,
    REPLACE:   REPLACE.name,
    APPEND:  APPEND.name,
    REMOVE: REMOVE.name
});

export default UpdateOperationType;

