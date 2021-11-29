import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import { Grid, Image, Button } from '../elements'
import {getCookie, deleteCookie} from "../shared/Cookie"

import { useSelector , useDispatch} from 'react-redux'

import styled from 'styled-components'
import { actionCreators as userAction } from '../redux/modules/user'


const Header = (props) => {
    const dispatch = useDispatch();
    const is_login = useSelector((state) => state.user.is_login )

    if(is_login){
        return(
            <HeaderBox>
            <Grid is_flex width="100%;" margin="0 auto;">
                <Image shape="circle" src={props.logo} size={props.size} />
                <Grid is_flex width="160px;">
                    <Button text="My page" bg="#EC7DB6;" margin="5px;" bold />
                    <Button text="Alert" bg="#f39eb1;" margin="5px;" bold />
                    <Button text="Logout" _onClick={() => {dispatch(userAction.logOut())}} bg="#f39eb1;" margin="5px;" bold />
                </Grid>
            </Grid>
        </HeaderBox>      
        )
      
    }

    return (
        <HeaderBox>
            <Grid is_flex width="100%;" margin="0 auto;">
                <Image shape="circle" src={props.logo} size={props.size} />
                
                <Grid is_flex width="160px;">
                    <Button text="Register" bg="#EC7DB6;" margin="5px;" bold />
                    <Button text="Login" bg="#f39eb1;" margin="5px;" bold />
                </Grid>
            </Grid>
        </HeaderBox>
    )
}


Header.defaultProps = {
    logo : 'https://t1.daumcdn.net/cfile/blog/225DA5425224837D31',
    size:  50
}

const HeaderBox = styled.div`
background-color: pink;
padding: 1em 1em;
margin: 0 auto;


`;

export default Header
