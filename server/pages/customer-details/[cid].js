import {
  PageHeader,
  Button,
  Descriptions,
  Form,
  Input,
  Modal,
  Select,
  notification,
} from "antd";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import UpdateSchema from "../../../domain/common/entities/update-schema.js";
import UpdateOperationType from "../../../domain/common/entities/update-operation.js";
import FieldUpdateSchema from "../../../domain/common/entities/field-update-schema.js";
import NameValidator from "../../../domain/customer/validators/name-validator.js";
import EmailValidator from "../../../domain/customer/validators/email-validator.js";
import ReactTimeAgo from "react-time-ago";
import en from "javascript-time-ago/locale/en.json";
import TimeAgo from "javascript-time-ago";

TimeAgo.addDefaultLocale(en);

const { Option, OptGroup } = Select;

export default () => {
  const router = useRouter();
  const [customer, setCustomer] = useState(null);
  const [form] = Form.useForm();
  const update = new UpdateSchema();

  const validators = { name: new NameValidator(), email: new EmailValidator() };
  const [showRoomSelectorModal, setShowRoomSelectorModal] = useState(false);
  const [rooms, setRooms] = useState({});
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [customerCheckedIn, setCustomerCheckedIn] = useState(false);
  const [occupancy, setOccupancy] = useState(null);

  useEffect(() => {
    if (!router.isReady) return;
    const customerId = router.query.cid;
    getCustomerDetails(customerId);
    getOccupancyForCustomerId(customerId);
  }, [router.isReady]);

  const getCustomerDetails = (customerId) => {
    fetch(`http://localhost:3000/api/customers/${customerId}`)
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      })
      .then((data) => {
        setCustomer(data);
        form.setFieldsValue({
          name: data.name,
          email: data.email,
          phone: data.phone,
        });
      });
  };

  const getOccupancyForCustomerId = (customerId) => {
    fetch(`http://localhost:3000/api/occupancies/customers/${customerId}`)
      .then((response) => {
        if (response.status === 404) {
          setCustomerCheckedIn(false);
          setOccupancy(null);
          return;
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setCustomerCheckedIn(true);
          setOccupancy(data);
        }
      })
      .catch((error) => {
        if (error.status === 404) {
          setCustomerCheckedIn(false);
          setOccupancy(null);
        }
      });
  };

  const onFormValuesChanged = (changedValues, allValues) => {
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
      }
      update.set(fieldName, {
        value: fieldValue,
        operation: UpdateOperationType.SET,
      });
    });
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 24 },
  };

  const onResetButtonClicked = () => {};

  const onUpdateButtonClicked = () => {
    const customerId = router.query.cid;
    if (update.size > 0) {
      fetch(`http://localhost:3000/api/customers/${customerId}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(update.toJSON()),
      })
        .then((response) => response.json())
        .then((data) => {
          setCustomer(data);
          notification.open({
            message: "Customer Updated",
            description: "The customer has been updated with the details.",
            onClick: () => {},
          });
        });
    } else {
      alert("Cannot Update no Changes Have been done");
    }
  };

  const onCheckInButtonClicked = () => {
    fetchAvailableRooms();
  };

  const onCheckOutButtonClicked = () => {
    console.log(occupancy);
    const roomId = occupancy.roomId;
    fetch(`http://localhost:3000/api/occupancies/rooms/${roomId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        setCustomerCheckedIn(false);
        notification.open({
          message: "Checkout Completed",
          description: "The customer has been checked out of the room.",
          onClick: () => {
            console.log("Notification Clicked!");
          },
        });
      });
  };

  const onRoomSelectorModalOk = () => {
    fetch(`http://localhost:3000/api/occupancies`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomId: selectedRoom,
        customerId: router.query.cid,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setCustomerCheckedIn(true);
        setShowRoomSelectorModal(false);
        notification.open({
          message: "Check-In Complete",
          description: "The customer has been checked in to the room.",
          onClick: () => {
            router.push(`/room-details/${data.roomId}`);
          },
        });
      });
  };

  const onRoomSelectorModalCancel = () => {
    setShowRoomSelectorModal(false);
  };

  const fetchAvailableRooms = () => {
    fetch(`http://localhost:3000/api/rooms?filter=available`)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((roomData) => {
        roomData.forEach((room) => {
          const floor = Number(room.id[0].toUpperCase());
          const floorRooms = rooms[floor] || [];
          floorRooms.push(room);
          rooms[floor] = floorRooms;
          setRooms(rooms);
          setShowRoomSelectorModal(true);
        });
      });
  };

  const showRoomDetails = (roomId) => {
    router.push(`/room-details/${roomId}`);
  };

  const optionButton = customerCheckedIn ? (
    <Button key="2" type="primary" onClick={onCheckOutButtonClicked}>
      Check Out
    </Button>
  ) : (
    <Button key="1" type="primary" onClick={onCheckInButtonClicked}>
      Check In
    </Button>
  );

  return (
    <div className="site-page-header-ghost-wrapper" style={{ padding: "24px" }}>
      {customer && (
        <>
          <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title={customer.name}
            subTitle="Details"
            extra={[optionButton]}
          >
            {occupancy && (
              <Descriptions>
                <Descriptions.Item label="Booked ">
                  <ReactTimeAgo
                    date={occupancy.checkInDate}
                    locale="en-US"
                  />
                </Descriptions.Item>
                <Descriptions.Item label="Room">
                  <a onClick={() => showRoomDetails(occupancy.roomId)}>
                    {occupancy.roomId}
                  </a>
                </Descriptions.Item>
              </Descriptions>
            )}
          </PageHeader>
          <div
            style={{
              padding: "20px",
              display: "flex",
              justifyItems: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <Form
              style={{ width: "100%" }}
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
                <Input name="email" />
              </Form.Item>
              <Form.Item label="Phone" name="phone">
                <Input name="phone" />
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Button
                  type="primary"
                  onClick={onUpdateButtonClicked}
                  style={{ marginRight: "24px" }}
                >
                  Submit
                </Button>
                <Button htmlType="button" onClick={onResetButtonClicked}>
                  Reset
                </Button>
              </Form.Item>
            </Form>

            <Modal
              title="Select a Room to Check In"
              visible={showRoomSelectorModal}
              onOk={onRoomSelectorModalOk}
              onCancel={onRoomSelectorModalCancel}
              okButtonProps={{ disabled: selectedRoom === null }}
              cancelButtonProps={{ disabled: selectedRoom === null }}
            >
              <Select style={{ width: 200 }} onChange={setSelectedRoom}>
                {Object.keys(rooms).map((floor) => (
                  <OptGroup key={`floor${floor}`} label={`Floor ${floor}`}>
                    {rooms[floor].map((room) => (
                      <Option value={room.id} key={room.id}>
                        {room.id}
                      </Option>
                    ))}
                  </OptGroup>
                ))}
              </Select>
            </Modal>
          </div>
        </>
      )}
    </div>
  );
};
