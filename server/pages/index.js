import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Layout, Menu, Breadcrumb, Result, Button } from "antd";
import { useState } from "react";``
import { useRouter } from 'next/router';

export default function Home() {
  const { Header, Content, Footer, Sider } = Layout;
  const router = useRouter();

  const navigateToRooms = () => {
    router.push("/customers");
  }

  return (
    <Content
      style={{
        margin: "0 16px",
      }}
    >
      <div
        style={{
          padding: 24,
          minHeight: 360,
        }}
      >
        <Result
          title="Welcome to the Hotel Booking System"
          subTitle="Click the button below to get started"
          extra={<Button type="primary" onClick={navigateToRooms}>View Customers</Button>}
        />
      </div>
    </Content>
  );
}
