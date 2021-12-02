import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

import {Text, Input, Button, Grid} from './../elements'
import {emailCheck} from '../shared/common'

const Login = () => {
    const dispatch = useDispatch();

    const [id, setId] = useState()
    const [pw, setPw] = useState()

    const login = () =>{

        console.log(id);

        if(id===""|| pw===""){
            window.alert("아이디 혹은 비밀번호가 공란입니다. 채워주세요");
            return ;
        }

        if(!emailCheck(id)){
            window.alert("이메일 형식이 맞지 않습니다");
            return ;
        }
        dispatch(userActions.loginFB(id, pw))

    }

    const disableBtn = () =>{

    }
    return (
        <>
        <Grid padding="1em;" width="400px;" margin="0 auto;">
            <Text size="3em;" margin="0.8em auto;" bold center>mitter</Text>
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
            <Button 
            bg="#f8c2cf;" 
            bold text="Sign in" 
            width="100%;"
            _onClick={() => {login()}} disabled/>
        </Grid>
        </>
    )
}



export default Login
