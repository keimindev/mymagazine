import React from 'react'
import { Grid, Image, Button } from '../elements'

import { useDispatch, useSelector} from 'react-redux'
import { history } from '../redux/configStore'

import { actionCreators as userAction } from '../redux/modules/user'
import { apiKey } from '../firebase'
import Permit from './Permit'

import styled from 'styled-components'
import { Notifications, Person } from '@material-ui/icons'


const Header = React.memo((props) => {
    const dispatch = useDispatch();
    const is_login = useSelector((state) => state.user.is_login);
    
    const _sessionKey = `firebase:authUser:${apiKey}:[DEFAULT]`;
    const is_session = sessionStorage.getItem(_sessionKey) ? true : false

    if(is_session && is_login){
        return(
        <HeaderBox>
            <InnerBox>
            <Grid is_flex width="100%;" margin="0 auto;">
                <Grid _onClick={() => history.push('/')}>
                <Image shape="circle" src={props.logo} size={props.size} cursor/>
                </Grid>
                <Grid is_flex width="190px;">
                    <Button bg="pink;" margin="5px;" bold ><Person/></Button>
                    <Button bg="pink;" margin="5px;" bold><Notifications/></Button>
                    <Button text="Logout" _onClick={() => {dispatch(userAction.logoutFB());}} bg="#EC7DB6;" margin="5px;" bold />
                </Grid>
            </Grid>
            </InnerBox>
        </HeaderBox> 
        )

    }
        


    return(
        <HeaderBox>
            <InnerBox>
            <Grid is_flex width="100%;" margin="0 auto;" >
                <Grid _onClick={() => history.push('/')}>
                <Image shape="circle" src={props.logo} size={props.size} cursor/>
                </Grid>
                <Grid is_flex width="160px;">
                    <Button text="Register" bg="#EC7DB6;" margin="5px;" bold _onClick={()=> {history.push('/register');}}/>
                    <Button text="Login" bg="#f39eb1;" margin="5px;" bold _onClick={()=> {history.push('/login');}}/>
                </Grid>
            </Grid>
            </InnerBox>
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

const InnerBox = styled.div`
max-width: 980px;
min-width: 300px;
margin: 0 auto;
`

export default Header
