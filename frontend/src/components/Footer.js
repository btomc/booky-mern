import React from 'react'
import styled from "styled-components"
import {FaFacebook, FaInstagram} from 'react-icons/fa'
import {GrPinterest} from 'react-icons/gr'
import {ImBooks} from 'react-icons/im'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <FooterContainer>
            <FooterWrap>
                <LogoWrap to='/'>
                    <LogoIcon><ImBooks /></LogoIcon>
                    <p>booky</p>
                </LogoWrap>
                <SocialMedia>
                    <SocialLink href="//www.facebook.com/" target='_blank'><FaFacebook /></SocialLink>
                    <SocialLink href="//www.instagram.com/?hl=en" target='_blank'><FaInstagram /></SocialLink>
                    <SocialLink href="//www.pinterest.com/" target='_blank'><GrPinterest /></SocialLink>
                </SocialMedia>
            </FooterWrap>
            <WebsiteRights>Copyright &copy; {new Date().getFullYear()}</WebsiteRights>
        </FooterContainer>
    )
}

export default Footer

const FooterContainer = styled.div`
    display: flex;
    flex-direction: column;
    background: #171e40;
    color: #fff;
`;

const FooterWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 3rem;
`;

const LogoWrap = styled(Link)`
    display: flex;
    align-items: center;
    font-size: 1.7rem;
    text-decoration: none;
    color: #fff;
`;

const LogoIcon = styled(ImBooks)`
    margin-right: 4px;
    font-size: 2rem;
`;

const SocialMedia = styled.div`
    display: flex;
    padding: 1.6rem 0 1rem 0;
`;

const SocialLink = styled.a`
    color: #fff;
    margin-left: 1.5rem;
    font-size: 1.8rem;
    text-decoration: none;
    transition: .2s ease-out;

    &:hover {
        color: #514cad;
        transition: .2s ease-out;
    }
`;

const WebsiteRights = styled.p`
    text-align: center;
    padding: .5rem 0 1.2rem 0;
`;
