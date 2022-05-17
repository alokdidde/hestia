

export default class UpdateSchema extends Map {
  constructor() {
    super();
  }

  get(key) {
    return super.get(key);
  }

  set(key, operation) {
    var result = super.set(key, operation);
    this._size = super.size;
    return result;
  }

  get size() {
    return this._size;
  }

  toJSON() {
    let obj = {};

    super.forEach(function (value, key) {
      obj[key] = value;
    });

    return JSON.stringify(obj);
  }
}
