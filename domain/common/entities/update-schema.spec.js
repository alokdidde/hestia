import FieldUpdateSchema from './field-update-schema.js';
import UpdateSchema from   './update-schema.js';
import UpdateOperationType from './update-operation.js';
import { expect } from 'chai';


describe("Update Schema", () => {
  it("Should be able Create UpdateSchema Instance", () => {
    const updateSchema = new UpdateSchema();
  });

  it("Should be able to set field Update", () => {
    const updateSchema = new UpdateSchema();
    updateSchema.set("name", new FieldUpdateSchema("John", UpdateOperationType.SET));
    const result = updateSchema.get("name");
    expect(result.value).to.be.equal("John");
    expect(result.operation).to.be.equal(UpdateOperationType.SET);
  });

  it("Should get Correct Size of update keys", () => {
    const updateSchema = new UpdateSchema();
    updateSchema.set("name", new FieldUpdateSchema("John", UpdateOperationType.SET));
    updateSchema.set("email", new FieldUpdateSchema("john@example.com", UpdateOperationType.SET));
    expect(updateSchema.size).to.be.equal(2);
  });

  it("Should be able to convert to JSON", () => {
    const updateSchema = new UpdateSchema();
    updateSchema.set("name", new FieldUpdateSchema("John", UpdateOperationType.SET));
    updateSchema.set("email", new FieldUpdateSchema("john@example.com", UpdateOperationType.SET));
    const result = updateSchema.toJSON();
    expect(result).to.be.equal('{"name":{"value":"John","operation":"SET"},"email":{"value":"john@example.com","operation":"SET"}}');
  });

});