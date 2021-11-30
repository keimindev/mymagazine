import React from 'react'
import styled from 'styled-components'
import { Add } from '@material-ui/icons'

const Button = (props) => {
    const { margin, padding, bg, bold, children, _onClick, text, is_float} = props
    const styles = {
        margin: margin,
        padding: padding,
        bg: bg,
        bold: bold,
    }

    if(is_float){
        return (
            <>
            <FloatButton onClick={_onClick} {...styles}><Add className="icon" /></FloatButton>
            </>
        )
    }

    return (
        <>
        <Btn {...styles} onClick={_onClick}>{text? text : children}</Btn>
        </>
    )
}


Button.defaultProps = {
    children: null,
    margin: false,
    color: false,
    bg : false,
    bold: false,
    text: false,
    is_float:false,
    _onClick: () => {},
}

const Btn = styled.button`
    width: 100%;
    height: 50px;
    border-radius: 10px;
    padding: 0.9em 1em;
    ${(props) => props.margin ? `margin: ${props.margin}`: ''}
    ${(props) => props.bg ? `background-color: ${props.bg}`: ''}
    font-weight: ${(props) => (props.bold ? "700" : "400")};


    border: 0;
    outline: 0;
    cursor: pointer;
`;

const FloatButton = styled.button`
  width: 60px;
  height: 60px;
  position: fixed;
  bottom: 2em;
  right: 2em;
  transition: all 0.5s ease;
  border-radius: 10px;
  background-color: #EC7DB6;
  color: #fff;
  cursor: pointer;
  border: 0;
  outline: 0;

  &:hover{
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
    }

  
  .icon{
      font-size: 45px;
      font-weight: bold;
    }
`;
export default Button
