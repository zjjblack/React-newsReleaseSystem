import React, { useEffect } from "react";

import SideMenu from "../../component/index/SideMenu";
import TopHeader from "../../component/index/TopHeader";
import NewsRouter from "../../component/index/NewsRouter";

import NProgress from "nprogress";
import "nprogress/nprogress.css";

//css
import "./index.css";

import { Layout } from "antd";

const { Content } = Layout;

export default function Index() {
  NProgress.start();
  useEffect(() => {
    NProgress.done();
  });
  return (
    <Layout>
      <SideMenu></SideMenu>
      <Layout className="site-layout">
        <TopHeader></TopHeader>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            overflow: "auto",
          }}
        >
          <NewsRouter></NewsRouter>
        </Content>
      </Layout>
    </Layout>
  );
}
