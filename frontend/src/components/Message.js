import React from 'react'
import styled from 'styled-components'

const Message = ({ children, variant }) => {
    return (
        <MessageText variant={variant}>{children}</MessageText>
    )
}

export default Message

const MessageText = styled.p`
    font-size: 1.2rem;
    padding: 1rem;
    background: ${({ variant }) => variant ? '#7dc442' : '#e84040'};
    color: #fff;
    border-radius: 4px;
    font-weight: 700;
`;
