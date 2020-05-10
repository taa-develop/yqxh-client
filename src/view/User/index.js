import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";

import Box from "../../component/Box";

const Wrap = styled(Box)`
  width: 1080px;
  margin: 0 auto;
  /* background-color: #fff; */
`;
const Title = styled.div`
  color: #00a6f3;
  text-align: center;
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  background-color: #0b0045;
`;
const UserItem = styled.div`
  display: flex;
`;
const TableWrap = styled.table`
  width: 100%;
  border-collapse: collapse;
`;
const TableHeader = styled.thead``;
const TableHeaderRow = styled.tr`
  background-color: #130156;
`;
const TableHeaderItem = styled.td`
  text-align: center;
  padding: 16px;
  border-right: ${(props) =>
    props.noRightBorder ? "none" : "1px solid #0e195c"};
  color: #377dcd;
`;
const TableBody = styled.tbody``;
const TableRow = styled.tr`
  background-color: ${(props) => (props.light ? "#0b0045" : "#130156")};
  transition: all 0.1s ease;
  &:hover {
    background-color: #191966;
  }
`;
const TableRowItem = styled.td`
  text-align: center;
  padding: 10px;
  border-right: ${(props) =>
    props.noRightBorder ? "none" : "1px solid #0e195c"};
  color: #377dcd;
  user-select: none;
`;
const Avatar = styled.div`
  width: 40px;
  height: 40px;
  background-image: url(${(props) => props.url});
  border-radius: 50%;
  background-size: contain;
  margin: 0 auto;
`;
const Select = styled.select`
  width: 100%;
`;

const Pages = styled.ul`
  text-align: center;
  list-style: none;
  padding-left: 0;
  margin: 20px 0;
  user-select: none;
`;
const PageItem = styled.li`
  display: inline-block;
  width: 30px;
  height: 30px;
  margin: 0 10px;
  text-align: center;
  line-height: 30px;
  color: ${(props) => (props.active ? "#377dcd" : "#fff")};
  cursor: pointer;
  border: 1px solid ${(props) => (props.active ? "#377dcd" : "#fff")};
  border-radius: 4px;
`;

const GET_USER_LIST = gql`
  query userList($pageNum: Int!, $pageSize: Int!) {
    userList(pageQuery: { pageNum: $pageNum, pageSize: $pageSize }) {
      id
      username
      realName
      role
      gender
      nickName
      avatarUrl
    }

    pageInfo {
      pageNum
      hasNextPage
      pages
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser($user: InputUser) {
    updateUser(user: $user) {
      id
    }
  }
`;

const ROLE_TABLE = {
  SUPER_ADMIN: "超级管理员",
  ADMIN: "管理员",
  WORKER: "工作人员",
  NORMAL: "客户",
};
function User() {
  //   const history = useHistory();
  const [pageNum, setPage] = useState(1);

  const [getUserList, { loading, data, error }] = useLazyQuery(GET_USER_LIST, {
    variables: { pageNum, pageSize: 10 },
  });

  useEffect(() => {
    getUserList({ pageNum });
  }, [pageNum, getUserList]);

  const handlePageChange = (pageNum = 1) => {
    setPage(pageNum);
    getUserList({ pageNum });
  };

  const [updateUser] = useMutation(UPDATE_USER, {
    onError: (err) => {
      console.log("更新失败", err);
    },
  });

  // 更新用户角色
  const handleUserUpdate = (user = {}) => {
    updateUser({
      variables: {
        user: {
          id: user.id,
          role: user.role,
        },
      },
    });
  };

  //   详情页面先不做
  //   const handleClickRow = (id) => {
  //     console.log(id);
  //     history.push(`/user/${id}`);
  //   };
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  return (
    <Wrap>
      <Title>用户列表</Title>
      <TableWrap>
        <TableHeader>
          <TableHeaderRow>
            <TableHeaderItem>工号</TableHeaderItem>
            <TableHeaderItem>微信头像</TableHeaderItem>
            <TableHeaderItem>姓名</TableHeaderItem>
            <TableHeaderItem>手机号码</TableHeaderItem>
            <TableHeaderItem>角色</TableHeaderItem>
            <TableHeaderItem>性别</TableHeaderItem>
            <TableHeaderItem noRightBorder>微信昵称</TableHeaderItem>
          </TableHeaderRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.userList.map((v, i) => (
              <TableRow
                key={v.id}
                light={i % 2 === 0}
                // onClick={() => handleClickRow(v.id)} 详情页面先不做
              >
                <TableRowItem>{v.id}</TableRowItem>
                <TableRowItem>
                  <Avatar url={v.avatarUrl}></Avatar>
                </TableRowItem>

                <TableRowItem>{v.realName}</TableRowItem>
                <TableRowItem>{v.username}</TableRowItem>
                {/* <TableRowItem>{ROLE_TABLE[v.role]}</TableRowItem> */}

                <TableRowItem>
                  <Select
                    value={v.role}
                    onChange={(e) =>
                      handleUserUpdate({ ...v, role: e.target.value })
                    }
                  >
                    {Object.entries(ROLE_TABLE).map(([value, label]) => (
                      <option key={value} value={value} label={label}></option>
                    ))}
                  </Select>
                </TableRowItem>

                <TableRowItem>{v.gender === "MAN" ? "男" : "女"}</TableRowItem>
                <TableRowItem noRightBorder>{v.nickName}</TableRowItem>
              </TableRow>
            ))}
        </TableBody>
      </TableWrap>

      <Pages>
        {data &&
          data.pageInfo &&
          Array(data.pageInfo.pages)
            .fill(0)
            .map((_, i) => (
              <PageItem
                active={pageNum === i + 1}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </PageItem>
            ))}
      </Pages>
    </Wrap>
  );
}

export default User;
