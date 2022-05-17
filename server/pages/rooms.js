import {
  Layout,
  PageHeader,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Table,
  Space,
  Tag,
} from "antd";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
const { Content } = Layout;
const { Column } = Table;

export default () => {
  const [rooms, setRooms] = useState([]);
  const router = useRouter();

  const loadRooms = () => {
    fetch("http://localhost:3000/api/rooms")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRooms(data);
      });
  };

  useEffect(() => {
    loadRooms();
  }, []);


  const showRoomDetails = (roomId) => {
    router.push(`/room-details/${roomId}`);
  };


  return (
    <div className="site-page-header-ghost-wrapper">
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title="Rooms"
        subTitle="Rooms management here"
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

      <Content style={{ padding: "5%" }}>
        <Table dataSource={rooms} rowKey="id">
          <Column title="Room No" dataIndex="id" key="RoomNo" />
          <Column title="Room Type" dataIndex="type" key="RoomType" />
          <Column
            title="Room Status"
            dataIndex="status"
            key="RoomStatus"
            render={(text, record) => (
              <Space size="middle">
                {record.status === "OCCUPIED" && (
                  <Tag color="#f50">Occupied</Tag>
                )}
                {record.status === "AVAILABLE" && (
                  <Tag color="#87d068">Available</Tag>
                )}
                {record.status === "UNDER_MAINTENANCE" && (
                  <Tag>Under Maintenance</Tag>
                )}
              </Space>
            )}
          />
          <Column
            title="Action"
            key="action"
            render={(text, record) => (
              <Space size="middle">
                <a onClick={() => showRoomDetails(record.id)}>Details</a>
              </Space>
            )}
          />
        </Table>
      </Content>
    </div>
  );
};
