import React from 'react'
import {useDispatch} from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

import {Text, Input, Button, Grid} from './../elements'


const Login = () => {
    const dispatch = useDispatch();


    const login = () =>{
        dispatch(userActions.loginAction({user_name: "min"}))

    }
    return (
        <>
        <Grid padding="1em;">
            <Text size="3em;" margin="0.8em 0;" bold>Login</Text>
            <Grid padding="1em 0">
                <Input 
                label="아이디"
                type="text"
                placeholder="아이디를 입력해주세요"
                />
            </Grid>
            <Grid padding="1em 0;">
                <Input 
                label="비밀번호"
                type="password" 
                placeholder="비밀번호를 입력해주세요"
                />
            </Grid>
            <Button bg="#f8c2cf;" bold text="Sign in" _onClick={() => {login();}} />
        </Grid>
        </>
    )
}



export default Login
