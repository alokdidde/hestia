import AddCustomerUseCase from "../../../domain/customer/use-cases/add-customer-use-case.js";
import AddCustomerCommand from "../../../domain/customer/commands/add-customer-command.js";
import mockCustomerRepository from "../../repositories/mock-customer-repository.js";

export default function handler(req, res) {
  const body = req.body;

  if (req.method === "POST") {
    let addCustomerUseCase = new AddCustomerUseCase(mockCustomerRepository);
    let addCustomerCommand = new AddCustomerCommand(
      body.name,
      body.email,
      body.phone
    );
    const customer = addCustomerUseCase.createCustomer(addCustomerCommand);
    res.status(200).json(customer);
    return;
  }

  if (req.method === "GET") {
    const query = req.query;
    if (query != null && query.search != null && query.search.length > 0) {
      let customers = mockCustomerRepository.searchCustomers(query.search);
      res.status(200).json(customers);
      return;
    } else {
      let customers = mockCustomerRepository.getCustomers();
      res.status(200).json(customers);
      return;
    }
  }

  res.status(405).send({ message: "Only GET and POST requests allowed" });
  return;
}

export function createCustomer(name, email, phone) {}
