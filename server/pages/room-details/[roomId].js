import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { PageHeader, Descriptions, Space, Tag } from "antd";
import Room from "../../../domain/room/entities/room.js";
import ReactTimeAgo from "react-time-ago";
import en from "javascript-time-ago/locale/en.json";
import TimeAgo from "javascript-time-ago";

TimeAgo.addDefaultLocale(en);

export default () => {
  const router = useRouter();
  const [customer, setCustomer] = useState(null);
  const [room, setRoom] = useState(null);
  const [occupancy, setOccupancy] = useState(null);

  useEffect(() => {
    if (!router.isReady) return;
    const roomId = router.query.roomId;
    getRoomDetails(roomId);
    getOccupancyForRoomId(roomId);
  }, [router.isReady]);

  const getOccupancyForRoomId = (roomId) => {
    fetch(`http://localhost:3000/api/occupancies/rooms/${roomId}`)
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        setOccupancy(data);
        getCustomerDetails(data.customerId);
      });
  };

  const getRoomDetails = (roomId) => {
    fetch(`http://localhost:3000/api/rooms/${roomId}`)
      .then((data) => data.json())
      .then((data) => {
        var room = new Room(data.id, data.type, data.status);
        setRoom(room);
      });
  };

  const getCustomerDetails = (customerId) => {
    fetch(`http://localhost:3000/api/customers/${customerId}`)
      .then((data) => data.json())
      .then((data) => {
        setCustomer(data);
      });
  };

  const showCustomerDetails = (customerId) => {
    router.push(`/customer-details/${customerId}`);
  };

  return (
    <div style={{ padding: "24px" }}>
      {room && (
        <>
          <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title={room.id}
            subTitle="Room management"
            extra={
              [
                // <Button key="3">Operation</Button>,
                // <Button key="2">Operation</Button>,
                // <Button key="1" type="primary">
                //   Something
                // </Button>,
              ]
            }
          ></PageHeader>
          <Descriptions bordered>
            <Descriptions.Item label="Room Type">{room.type}</Descriptions.Item>
            <Descriptions.Item label="Room Status">
              <Space size="middle">
                {room.status === "OCCUPIED" && <Tag color="#f50">Occupied</Tag>}
                {room.status === "AVAILABLE" && (
                  <Tag color="#87d068">Available</Tag>
                )}
                {room.status === "UNDER_MAINTENANCE" && (
                  <Tag>Under Maintenance</Tag>
                )}
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Price">{room.price}</Descriptions.Item>
            <Descriptions.Item label="Capacity">
              {room.capacity}
            </Descriptions.Item>
            {customer && (
              <>
                <Descriptions.Item label="Customer">
                  <a onClick={() => showCustomerDetails(customer.id)}>
                    {customer.name}
                  </a>
                </Descriptions.Item>
              </>
            )}
            {occupancy && (
              <>
                <Descriptions.Item label="Booked ">
                  <ReactTimeAgo
                    date={occupancy.checkInDate}
                    locale="en-US"
                  />
                </Descriptions.Item>
              </>
            )}
          </Descriptions>
        </>
      )}
    </div>
  );
};
