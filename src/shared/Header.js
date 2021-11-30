import React from 'react'
import { Grid, Image, Button } from '../elements'

import { useDispatch, useSelector} from 'react-redux'
import { history } from '../redux/configStore'

import styled from 'styled-components'
import { actionCreators as userAction } from '../redux/modules/user'
import { apiKey } from '../firebase'
import Permit from './Permit'


const Header = React.memo((props) => {
    const dispatch = useDispatch();
    const is_login = useSelector((state) => state.user.is_login);
    
    const _sessionKey = `firebase:authUser:${apiKey}:[DEFAULT]`;
    const is_session = sessionStorage.getItem(_sessionKey) ? true : false

    if(is_session && is_login){
        return(
        <HeaderBox>
            <Grid is_flex width="100%;" margin="0 auto;">
                <Image shape="circle" src={props.logo} size={props.size} />
                <Grid is_flex width="280px;">
                    <Button text="My page" bg="#EC7DB6;" margin="5px;" bold />
                    <Button text="Alert" bg="#f39eb1;" margin="5px;" bold />
                    <Button text="Logout" _onClick={() => {dispatch(userAction.logoutFB());}} bg="#f39eb1;" margin="5px;" bold />
                </Grid>
            </Grid>
        </HeaderBox> 
        )

    }
        


    return(
        <HeaderBox>
            <Grid is_flex width="100%;" margin="0 auto;">
                <Image shape="circle" src={props.logo} size={props.size} />
                
                <Grid is_flex width="160px;">
                    <Button text="Register" bg="#EC7DB6;" margin="5px;" bold _onClick={()=> {history.push('/register');}}/>
                    <Button text="Login" bg="#f39eb1;" margin="5px;" bold _onClick={()=> {history.push('/login');}}/>
                </Grid>
            </Grid>
        </HeaderBox>
        )

})


Header.defaultProps = {
    logo : 'https://t1.daumcdn.net/cfile/blog/225DA5425224837D31',
    size:  50
}

const HeaderBox = styled.div`
background-color: pink;
padding: 1em 1em;
margin: 0 auto;
box-sizing: border-box;


`;

export default Header
