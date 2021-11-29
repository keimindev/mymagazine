import React from 'react'
import styled from 'styled-components'

import {Text, Input, Button} from './../elements'

const Register = () => {
    return (
        <RegisterForm>
        <Text size="3em;" margin="0.8em 0;" bold>Register</Text>
        <Input 
        label="아이디"
        placeholder="아이디를 입력해주세요"
        />
        <Input 
        label="닉네임"
        placeholder="닉네임을 입력해주세요"
        />
        <Input 
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요"
        />
        <Input 
        label="비밀번호 확인"
        placeholder="비밀번호를 재입력해주세요"
        />
        <Button width="100%;" height="50px;" bg="#f8c2cf;" bold>Create Account</Button>
        </RegisterForm>
    )
}

const RegisterForm = styled.div`
width: 500px;
min-width: 300px;
margin: 0 auto;

position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
`;

export default Register
