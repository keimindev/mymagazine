import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

import {Text, Input, Button, Grid} from './../elements'


const Login = () => {
    const dispatch = useDispatch();

    const [id, setId] = useState()
    const [pw, setPw] = useState()

    const login = () =>{
        if(id===""|| pw===""){
            window.alert("아이디 혹은 비밀번호가 공란입니다. 채워주세요");
            return ;
        }
        dispatch(userActions.loginFB(id, pw))

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
                _onChange = { (e) => setId(e.target.value)}
                />
            </Grid>
            <Grid padding="1em 0;">
                <Input 
                label="비밀번호"
                type="password" 
                placeholder="비밀번호를 입력해주세요"
                _onChange = { (e) => setPw(e.target.value)}
                />
            </Grid>
            <Button bg="#f8c2cf;" bold text="Sign in" width="100%;"_onClick={() => {login()}} />
        </Grid>
        </>
    )
}



export default Login
