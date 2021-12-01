import React from 'react'
import styled from 'styled-components'

const Text = (props) => {
    const { bold, color, size, margin, children, center} = props;

    const styles = {bold: bold, color: color, size: size, margin: margin, center:center};

    return (
        <P {...styles}>
            {children}
        </P>
    )
}


Text.defaultProps = {
    children: null,
    bold: false,
    color: '#222222',
    size: '0.8em',
    margin: false,
    center: false,
}


const P = styled.p`
color: ${(props) => props.color};
font-size: ${(props) => props.size};
font-weight: ${(props) => (props.bold ? "600" : "400")};
margin: ${(props) => (props.margin)};
${(props) => (props.center ? "text-align:center" : "")};

display:flex;
align-items: center;
`;

export default Text
