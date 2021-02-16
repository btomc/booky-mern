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
    margin-top: 1rem;
`;

const MessageText = styled.p`
    font-size: 1.1rem;
    padding: .8rem;
    background: ${({ variant }) => variant ? '#23208c' : '#e84040'};
    color: #fff;
    border-radius: 4px;
    font-weight: 700;
    /* width: 90%; */
    width: ${({ width }) => width ? '100%' : '90%'};
`;
