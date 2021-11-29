import React from 'react'
import styled from 'styled-components'

const Button = (props) => {
    const { margin, padding, bg, bold, children, _onClick, text} = props
    const styles = {
        margin: margin,
        padding: padding,
        bg: bg,
        bold: bold,
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


export default Button
