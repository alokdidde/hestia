import { Layout } from "antd";
import { PageHeader, Button, Modal, Form, Input, Select, Table, Space } from "antd";
import { useState, useEffect } from "react";
import Router from 'next/router';
import NameValidator from "../../domain/customer/validators/name-validator.js";
import EmailValidator from "../../domain/customer/validators/email-validator.js";
import PhoneValidator from "../../domain/customer/validators/phone-validator.js";

const { Search } = Input;
const { Option } = Select;
const { Column } = Table;
const { Content } = Layout;

export default () => {
  const [customers, setCustomers] = useState([]);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [addUserValues, setAddUserValues] = useState({
    name: null,
    email: null,
    phone: null,
  });
  const [searchString, setSearchString] = useState(null);
  const validators = { name: new NameValidator(), email: new EmailValidator() };
  const [form] = Form.useForm();
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = () => {
    fetch("http://localhost:3000/api/customers")
      .then((response) => response.json())
      .then((data) => {
        setCustomers(data);
      });
  };

  const showAddCustomerModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    (async () => {
      const rawResponse = await fetch("http://localhost:3000/api/customers", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addUserValues),
      });
      setConfirmLoading(false);
      setVisible(false);
      setAddUserValues({ name: null, email: null, phone: null });
      setCustomers([]);
      loadCustomers();
    })();
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onSearch = (value) => {
    setCustomers([]);
    setSearchString(value);
    fetch("http://localhost:3000/api/customers?search=" + value)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setCustomers(data);
    });
  };

  const showCustomerDetails = (customer) => {
    Router.push({
      pathname: `/customer-details/${customer.id}`
    });
  };

  const onFormValuesChanged = (changedValues, allValues) => {
    let totalErrors = [];
    Object.entries(changedValues).forEach((value) => {
      const [fieldName, fieldValue] = value;
      const validator = validators[fieldName];
      if (validator) {
        const errors = validator.validate(fieldValue);
        if (errors.length > 0) {
          form.setFields([{ name: fieldName, errors: errors }]);
          return;
        } else {
          form.setFields([{ name: fieldName, errors: [] }]);
        }
        totalErrors = totalErrors.concat(errors);
      }
      setAddUserValues({ ...addUserValues, ...changedValues });
    });
    if(totalErrors.length === 0) {
      setIsFormValid(true);
    }
    else{
      setIsFormValid(false);
    }
  };


  return (
    <div className="site-page-header-ghost-wrapper">
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title="Customers"
        subTitle="Manage customers here"
        extra={[
          // <Button key="3">Operation</Button>,
          // <Button key="2">Operation</Button>,
          <Button key="1" type="primary" onClick={showAddCustomerModal}>
            Add Customer
          </Button>,
        ]}
      ></PageHeader>

      <Content style={{ padding: "20px" }}>
        <Search
          placeholder="Type Search Here"
          onSearch={onSearch}
          style={{ "marginBottom": "20px" }}
        />
        <Table dataSource={customers} rowKey="email">
          <Column
            title="Full Name"
            dataIndex="name"
            key="nameColumn"
            render={(text, customer) => (
              <Space size="middle">
                <a onClick={() => showCustomerDetails(customer)}>{text}</a>
              </Space>
            )}
          />
          <Column title="Email" dataIndex="email" key="emailColumn" />
          <Column title="Phone" dataIndex="phone" key="phoneColumn" />
        </Table>
      </Content>
      <Modal
        title="Add Customer"
        centered
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okButtonProps={{ disabled: !isFormValid }}
      >
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          onValuesChange={onFormValuesChanged}
          form={form}
          size="large"
        >
          <Form.Item label="Full Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="Phone" name="phone">
            <Input  />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
