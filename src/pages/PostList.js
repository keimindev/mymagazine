import React from 'react'
import {Link} from 'react-router-dom'
import Post from '../components/Post'
import { Button } from '../elements'
import styled from 'styled-components'
import { Add } from '@material-ui/icons'

const PostList = () => {
    return (
        <Container>
          <Post/>
          <Post/>
          <Link to="/write">
          <Btn><Button bg="#EC7DB6;" bold><Add className="icon"/></Button></Btn>
          </Link>
        </Container>
    )
}

const Container = styled.div`
max-width: 1280px;
min-width: 400px;
margin: 0 auto;
padding: 1em 0em;

`;


const Btn = styled.div`
  width: 70px;
  height: 70px;
  position: fixed;
  bottom: 2em;
  right: 2.5em;
  transition: all 0.5s ease;
  border-radius: 10px;

  &:hover{
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
    }

  button{
    width: 100%;
    height: 100%;
    color: #fff;
  }

  
  .icon{
      font-size: 45px;
      font-weight: bold;
    }
`;
export default PostList
