import React from 'react'
import styled from 'styled-components'
import bg from '../images/bg-1.jpg'
import { IoMdArrowRoundForward } from 'react-icons/io'

const Hero = () => {
    return (
        <HeroContainer>
            <HeroBg><ImgBg src={bg} /></HeroBg>
            <HeroContent>
                <HeroItems>
                    <HeroH1>Books are a uniquely portable magic</HeroH1>
                    <HeroBtn>See more<Arrow /></HeroBtn>
                </HeroItems>
            </HeroContent>
        </HeroContainer>
    )
}

export default Hero


const HeroContainer = styled.div`
    background: #222;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 480px;
    position: relative;
    color: #f2f2f2;
    overflow: hidden;

    :before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        z-index: 2;
        background: linear-gradient(180deg, rgba(81,76,173,0.7) 0%, rgba(129,76,173,0.6) 100%),
                    linear-gradient(180deg, rgba(0,0,0,0.2) 0%, transparent 100%);
    }
`;

const HeroBg = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

const ImgBg = styled.img`
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
`;

const HeroContent = styled.div`
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const HeroItems = styled.div`
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`;

const HeroH1 = styled.h1`
    font-size: 3rem;
    letter-spacing: .8px;
    text-align: center;
    margin-bottom: 3rem;
`;
const HeroBtn = styled.button`
    font-size: 1.4rem;
    padding: 1rem 4rem;
    border: none;
    background: #171e40;
    color: #f2f2f2;
    transition: 0.2s ease-out;
    cursor: pointer;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background: #464293;
        transition: 0.2s ease-out;
    }
`;

const Arrow = styled(IoMdArrowRoundForward)`
    margin-left: .5rem;
`;