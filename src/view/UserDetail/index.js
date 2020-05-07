import React from 'react'
import styled from 'styled-components'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import { useParams } from 'react-router-dom'

const Wrap = styled.div`
    color: #00a6f3;
`

const GET_USER_DETAIL = gql`
    query getUser($id: Int) {
        user(id: $id) {
            username
            realName
            role
            gender
            nickName
            avatarUrl
            city
            province
            country
            openid
        }
    }
`

function UserDetail() {
    const { userId } = useParams()
    const { loading, error, data } = useQuery(GET_USER_DETAIL, {
        variables: {
            id: userId
        },
        onCompleted: data => {
            console.log(data)
        }
    })
    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`
    return <Wrap>{data.user.username}</Wrap>
}

export default UserDetail
