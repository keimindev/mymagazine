import React, {useState} from 'react'
import {useDispatch}  from 'react-redux'
import {actionCreators as userActions, signupFB} from '../redux/modules/user'

import { emailCheck, pwCheck } from '../shared/common'
import {Text, Input, Button, Grid} from './../elements'



const Register = () => {
    const dispatch = useDispatch();

    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [pwCheck, setPwCheck] = useState('');
    const [userName, setUserName] = useState('');

    const signup = () => {
        if(id === '' || pw === '' || userName === ""){
            window.alert("아이디, 패스워드, 닉네임을 모두 입력해주세요");
            return;
        }

        if(!emailCheck(id)){
            window.alert("이메일 형식이 맞지 앖습니다!");
            return ;
        }


        if(pw !== pwCheck){
            window.alert("패스워드와 패스워드 확인이 일치하지 않습니다");
            return ;
        }

        dispatch(userActions.signupFB(id, pw, userName))
    }


    return (
        <Grid padding="1em;" width="400px;" margin="0 auto;">
        <Text size="3em;" margin="0.8em 0;" bold>Register</Text>
        <Input 
        type="text"
        label="아이디"
        placeholder="아이디를 입력해주세요"
        _onChange={(e) => setId(e.target.value)}
        value={id}
        />
        <Input 
        type="text"
        label="닉네임"
        placeholder="닉네임을 입력해주세요"
        _onChange={(e) => setUserName(e.target.value)}
        value={userName}
        />
        <Input 
        type="password"
        label="비밀번호"
        placeholder="페스워드를 입력해주세요"
        _onChange={(e) => setPw(e.target.value)}
        value={pw}
        />
        <Input 
         type="password"
        label="비밀번호 확인"
        placeholder="패스워드를 재입력해주세요"
        _onChange={(e) => setPwCheck(e.target.value)}
        value={pwCheck}
        />
        <Button width="100%;" height="50px;" bg="#f8c2cf;" bold _onClick={() => {signup()}}>Create Account</Button>
        </Grid>
    )
}


export default Register
