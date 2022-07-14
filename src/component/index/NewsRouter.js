import React, { useEffect, useState } from "react";
import Home from "../../view/index/home/Home";
import Nopermission from "../../view/index/nopermission/Nopermission";
import RightList from "../../view/index/right-manage/RightList";
import RoleList from "../../view/index/right-manage/RoleList";
import UserList from "../../view/index/user-manage/UserList";
import { Switch, Route, Redirect } from "react-router-dom";
import NewsAdd from "../../view/index/news-manage/NewsAdd";
import NewsDraft from "../../view/index/news-manage/NewsDraft";
import NewsCategory from "../../view/index/news-manage/NewsCategory";
import Audit from "../../view/index/audit-manage/Audit";
import AuditList from "../../view/index/audit-manage/AuditList";
import Unpublished from "../../view/index/publish-manage/Unpublished";
import Published from "../../view/index/publish-manage/Published";
import Sunset from "../../view/index/publish-manage/Sunset";
import axios from "axios";
import NewsPreview from "../../view/index/news-manage/NewsPreview";
import NewsUpdate from "../../view/index/news-manage/NewsUpdate";
import { Spin } from "antd";

import { connect } from "react-redux";
import Cookies from "js-cookie";
const LocalRouterMap = {
  "/home": Home,
  "/user-manage/list": UserList,
  "/right-manage/role/list": RoleList,
  "/right-manage/right/list": RightList,
  "/news-manage/add": NewsAdd,
  "/news-manage/draft": NewsDraft,
  "/news-manage/category": NewsCategory,
  "/news-manage/preview/:id": NewsPreview,
  "/news-manage/update/:id": NewsUpdate,
  "/audit-manage/audit": Audit,
  "/audit-manage/list": AuditList,
  "/publish-manage/unpublished": Unpublished,
  "/publish-manage/published": Published,
  "/publish-manage/sunset": Sunset,
};

function NewsRouter(props) {
  const [BackRouteList, setBackRouteList] = useState([]);
  useEffect(() => {
    Promise.all([axios.get("/rights"), axios.get("/children")]).then((res) => {
      console.log("res", res);
      setBackRouteList([...res[0].data, ...res[1].data]);
      //   console.log(BackRouteList);
    });
  }, []);

  const {
    role: { rights },
  } = JSON.parse(Cookies.get("zjjtoken"));

  const checkRoute = (item) => {
    return (
      LocalRouterMap[item.key] && (item.pagepermisson || item.routepermisson)
    );
  };

  const checkUserPermission = (item) => {
    return rights.includes(item.key);
  };

  return (
    <Spin size="large" spinning={props.isLoading}>
      <Switch>
        {BackRouteList.map((item) => {
          if (checkRoute(item) && checkUserPermission(item)) {
            return (
              <Route
                path={item.key}
                key={item.key}
                component={LocalRouterMap[item.key]}
                exact
              />
            );
          }
          return null;
        })}

        <Redirect from="/index" to="/home" exact />
        <Redirect from="/" to="/home" exact />
        {BackRouteList.length > 0 && (
          <Route path="*" component={Nopermission} />
        )}
      </Switch>
    </Spin>
  );
}

const mapStateToProps = ({ LoadingReducer: { isLoading } }) => ({
  isLoading,
});

export default connect(mapStateToProps)(NewsRouter);
