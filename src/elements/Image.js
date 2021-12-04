import React from 'react'
import styled from 'styled-components'

const Image = (props) => {
    const { shape, src, size, direction, cursor} = props;

    const styles = {
        src: src,
        size: size,
        direction: direction,
        cursor: cursor
    }

    if(shape === "circle"){
        return (
            <ImageCircle {...styles}></ImageCircle>
        )
    }

    if(shape === "rectangle"){
        return (
            <AspectOutter>
                <AspectInner {...styles}></AspectInner>
            </AspectOutter>
        )
    }
    return (
        <Image {...styles}></Image>
    )
}

Image.defaultProps = {
    shape: "circle",
    src: 'https://jjalbot.com/media/2018/12/kPq_-2zCE/zzal.jpg',
    size: 36,
    direction: "center",
    cursor: "pointer"
}

const ImageCircle = styled.div`
 --size: ${(props) => props.size}px;
 width: var(--size);
 height: var(--size);
 border-radius: var(--size);
 cursor: "pointer";

 background-image : url("${(props) => props.src}");
 background-size: cover;
 margin: 0.5em;
`;


const AspectOutter = styled.div`
width: 100%;
min-width: 360px;

`;


const AspectInner = styled.div`
position: relative;
padding-top: 75%;
overflow: hidden;
background-image: url("${props => props.src}");
background-size: cover;



`;

export default Image
