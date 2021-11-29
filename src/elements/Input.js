import React from 'react'
import Text from './Text'
import styled from 'styled-components';

const Input = (props) => {
    const {label, placeholder, _onChange, type, } = props;

    return(
    <InputForm>
        <Text>{label}</Text>
        <input type={type} placeholder={placeholder} onChange={_onChange} /> 
     </InputForm>
    )

}

Input.defaultProps = {
    label: "텍스트",
    placeholder: "텍스트를 입력해주세요.",
    type: "text",
    _onChange: () => {},
}

const InputForm = styled.div`
padding: 0.8em 0em;

input{
    display: block;
    margin: 0.8em 0;
    padding: 0.5em 0.8em;
    height: 40px;
    width: 100%;
    min-width: 300px;
    border-radius: 5px;
    
    outline: none;
    border: 1px solid #888;

}
`;

export default Input
