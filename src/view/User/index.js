import React from 'react'
import styled from 'styled-components'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'

import Box from '../../component/Box'

const Wrap = styled(Box)`
    width: 1080px;
    margin: 0 auto;
    /* background-color: #fff; */
`
const Title = styled.div`
    color: #00a6f3;
    text-align: center;
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    background-color: #0b0045;
`
const UserItem = styled.div`
    display: flex;
`
const TableWrap = styled.table`
    width: 100%;
    border-collapse: collapse;
`
const TableHeader = styled.thead``
const TableHeaderRow = styled.tr`
    background-color: #130156;
`
const TableHeaderItem = styled.td`
    text-align: center;
    padding: 16px;
    border-right: ${props =>
        props.noRightBorder ? 'none' : '1px solid #0e195c'};
    color: #377dcd;
`
const TableBody = styled.tbody``
const TableRow = styled.tr`
    background-color: ${props => (props.light ? '#0b0045' : '#130156')};
    transition: all 0.1s ease;
    &:hover {
        background-color: #191966;
    }
`
const TableRowItem = styled.td`
    text-align: center;
    padding: 10px;
    border-right: ${props =>
        props.noRightBorder ? 'none' : '1px solid #0e195c'};
    color: #377dcd;
    user-select: none;
`
const Avatar = styled.div`
    width: 40px;
    height: 40px;
    background-image: url(${props => props.url});
    border-radius: 50%;
    background-size: contain;
    margin: 0 auto;
`

const GET_USER_LIST = gql`
    query userList($pageNum: Int!, $pageSize: Int!) {
        userList(pageQuery: { pageNum: $pageNum, pageSize: $pageSize }) {
            id
            username
            role
            realName
            gender
            nickName
            avatarUrl
        }
    }
`
const ROLE_TABLE = {
    SUPER_ADMIN: '超级管理员',
    ADMIN: '管理员',
    WORKER: '工作人员',
    NORMAL: '客户'
}
function User() {
    const history = useHistory()
    const { loading, error, data } = useQuery(GET_USER_LIST, {
        variables: {
            pageNum: 1,
            pageSize: 10
        },
        onCompleted: data => {
            console.log(data)
        }
    })
    const handleClickRow = id => {
        console.log(id)
        history.push(`/user/${id}`)
    }
    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`
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
                        <TableHeaderItem noRightBorder>
                            微信昵称
                        </TableHeaderItem>
                    </TableHeaderRow>
                </TableHeader>
                <TableBody>
                    {data.userList.map((v, i) => (
                        <TableRow
                            key={v.id}
                            light={i % 2 === 0}
                            onClick={() => handleClickRow(v.id)}
                        >
                            <TableRowItem>{v.id}</TableRowItem>
                            <TableRowItem>
                                <Avatar url={v.avatarUrl}></Avatar>
                            </TableRowItem>

                            <TableRowItem>{v.realName}</TableRowItem>
                            <TableRowItem>{v.username}</TableRowItem>
                            <TableRowItem>{ROLE_TABLE[v.role]}</TableRowItem>
                            <TableRowItem>
                                {v.gender === 'MAN' ? '男' : '女'}
                            </TableRowItem>
                            <TableRowItem noRightBorder>
                                {v.nickName}
                            </TableRowItem>
                        </TableRow>
                    ))}
                </TableBody>
            </TableWrap>
            <div>fenyeqi</div>
        </Wrap>
    )
}

export default User
