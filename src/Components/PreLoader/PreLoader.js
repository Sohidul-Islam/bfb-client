import React from 'react'
import loeder from '../../assets/loader.png'
import loederInner from '../../assets/loader-inner.png'
import styled from 'styled-components'
const PreLoader = ({ size }) => {

    const OuterContainer = styled.div`
    position: relative;
    top: 0;
    left:0;
    width: ${size}px;
    margin: 0px auto;
    `
    const InnerContainer = styled.div`
    position: absolute;
    top: 0;
    left:0;
    bottom: 0;
    right: 0;
    `

    const OuterImage = styled.img`
    width:100%;
    height:100%;
    animation: spin 3s linear infinite;

    @keyframes spin {
    from {
    transform: rotate(0deg);
    }
    to {
    transform: rotate(360deg);
    }
}
    `
    return (
        <OuterContainer className="preloader-outer--box">
            <OuterImage src={loeder}></OuterImage>
            <InnerContainer className="preloader-inner--box">
                <img src={loederInner}></img>
            </InnerContainer>
        </OuterContainer>
    )
}

export default PreLoader