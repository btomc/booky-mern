import React from 'react'
import styled from 'styled-components'
// import spinner from '../images/loader-1.gif'

const Loader = () => {
  return (
    <Container>
      <Wrapper>
        <Item></Item>
        <Item></Item>
        <Item></Item>
        <Item></Item>
        <Item></Item>
        {/* <Text>Loading...</Text> */}
      </Wrapper>
    </Container>
  )
}

export default Loader

const Container = styled.div`
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;
  height: 100vh;
  /* background: rgba(81, 76, 173, 0.1); */
  background-color: transparent;
  z-index: 100000;
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Item = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  /* background-color: dodgerblue; */
  display: inline-block;
  margin: 0.5rem;
  animation: scaling 2.5s ease-in-out infinite;

  :nth-child(1) {
    animation-delay: 0.2s;
  }

  :nth-child(2) {
    animation-delay: 0.4s;
  }

  :nth-child(3) {
    animation-delay: 0.6s;
  }

  :nth-child(4) {
    animation-delay: 0.8s;
  }

  :nth-child(5) {
    animation-delay: 1s;
  }

  @keyframes scaling {
    0%,
    100% {
      transform: scale(0.2);
      background-color: #171e40;
    }
    40% {
      transform: scale(1);
      background: #464293;
    }
    50% {
      transform: scale(1);
      background-color: #4659ba;
    }
  }
`

// const Text = styled.span`
//     font-size: 1.6rem;
//     color: #524cad;
//     font-weight: bold;
//     margin: 1rem 0;
// `;
