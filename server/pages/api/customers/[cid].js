import mockCustomerRepository from "../../../repositories/mock-customer-repository";
import UpdateCustomerUseCase from "../../../../domain/customer/use-cases/update-customer-use-case.js";

export default function handler(req, res) {

    if (req.method === "GET") {
    const { cid } = req.query;
    const customer = mockCustomerRepository.getCustomer(cid);
    res.status(200).json(customer);
    return;
  }

    if(req.method === "PATCH") {
    const body = req.body;
    const { cid } = req.query;
    const updateCustomerUseCase = new UpdateCustomerUseCase(mockCustomerRepository);
    const customer = updateCustomerUseCase.updateCustomer({customerId: cid, updateSchema: JSON.parse(body)});
    res.status(200).json(customer);
    return;
  }
  // if (req.method === "POST") {
  //   let customer = createCustomer(body.fullName, body.email, body.phone);
  //   res.status(200).json(customer);
  //   return;
  // }

  // if(req.method === "GET") {
  //   let customerRepository = new MockCustomerRepository();
  //   let customers = customerRepository.getCustomers();
  //   res.status(200).json(customers);
  //   return;
  // }

  // res.status(405).send({ message: "Only POST requests allowed" });
  // return;
}
