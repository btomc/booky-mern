import React from 'react'
import styled from 'styled-components'
import spinner from '../images/loader-1.gif'

const Loader = () => {
    return (
        <Container>
            <Wrap>
            <ImgSpinner src={spinner} /> 
            </Wrap>
            <Text>Loading...</Text>
        </Container>
    )
}

export default Loader

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Wrap = styled.div`
    width: 100px;
    height: 100px;
    margin: auto;
    display: block;
`;

const ImgSpinner = styled.img`
    width: 100%;
    height: 100%;
    background: transparent;
`;

const Text = styled.span`
    font-size: 1.6rem;
    color: #524cad;
    font-weight: bold;
    margin: 1rem 0;
`;
