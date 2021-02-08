import React from 'react'
import styled from 'styled-components'

const Message = ({ children, variant, width }) => {
    return (
        <MessageContainer>
            <MessageText variant={variant} width={width}>{children}</MessageText>
        </MessageContainer>
    )
}

export default Message

const MessageContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const MessageText = styled.p`
    font-size: 1.2rem;
    padding: 1rem;
    background: ${({ variant }) => variant ? '#814cad' : '#e84040'};
    color: #fff;
    border-radius: 4px;
    font-weight: 700;
    width: 90%;
    width: ${({ width }) => width ? '90%' : '100%'};
`;
