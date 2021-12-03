import React from 'react'
import Text from './Text'
import Grid  from './Grid';
import styled from 'styled-components';

const Input = (props) => {
    const {label, placeholder, _onChange, type, textarea, value } = props;


    if(textarea){
        return(
            <Grid>
                <Text size="1.5em" bold>{label}</Text>
                <TextArea 
                row={20} 
                placeholder={placeholder} 
                onChange={_onChange} 
                ></TextArea>
            </Grid>
        )
    }
    return(
    <InputForm>
        <Text>{label}</Text>
        <input type={type} placeholder={placeholder} onChange={_onChange} value={value} /> 
     </InputForm>
    )

}

Input.defaultProps = {
    label: "텍스트",
    placeholder: "텍스트를 입력해주세요.",
    type: "text",
    _onChange: () => {},
    textarea: false,
    value: "",
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


const TextArea = styled.textarea`
    width: 100%;
    height: 150px;
    max-height: 150px;
    padding: 1em 0.5em;
    margin: 1em 0;
    box-sizing: border-box;
    border: 1px solid #ddd;
    outline: 0;
 `;

export default Input
