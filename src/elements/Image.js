import React from 'react'
import styled from 'styled-components'

const Image = (props) => {
    const { shape, src, size} = props;

    const styles = {
        src: src,
        size: size,
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
        <div>
        </div>
    )
}

Image.defaultProps = {
    shape: "circle",
    src: 'https://jjalbot.com/media/2018/12/kPq_-2zCE/zzal.jpg',
    size: 36,
}

const ImageCircle = styled.div`
 --size: ${(props) => props.size}px;
 width: var(--size);
 height: var(--size);
 border-radius: var(--size);

 background-image : url("${(props) => props.src}");
 background-size: cover;
 margin: 0.5em;
`;


const AspectOutter = styled.div`
width: 100%;
min-width: 260px;
`;


const AspectInner = styled.div`
position: relative;
padding-top: 75%;
overflow: hidden;
background-image: url("${props => props.src}");
background-size: cover;

`;


export default Image
