import "../styles/globals.css";
import "antd/dist/antd.dark.css";
import { Layout, Menu, Breadcrumb } from 'antd';
import { useState } from 'react';
import {
  DesktopOutlined,
  UserOutlined,
  HomeOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/router';


function MyApp({ Component, pageProps }) {
  const { Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label
    };
  }

  const items = [
    getItem('Home', 1, <DesktopOutlined />),
    getItem("Customers", 2,<UserOutlined />),
    getItem("Rooms", 3, <HomeOutlined />)
  ];

  const onCollapse = (collapsed) => {
    setCollapsed(true);
  };


  const onMenuItemClicked = (params) => {
    switch(params.key) {
      case "1":
        router.push("/");
        break;
      case "2":
        router.push("/customers");
        break;
      case "3":
        router.push("/rooms");
        break;
      default:
        router.push("/");
    }
  }

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu defaultSelectedKeys={["1"]} mode="inline" items={items} onClick={onMenuItemClicked}/>
      </Sider>
      <Layout className="site-layout">
        <Component {...pageProps} />
      </Layout>
    </Layout>
  );
}

export default MyApp;
