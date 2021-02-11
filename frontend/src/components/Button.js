import styled from 'styled-components'

export const Button = styled.button`
    background: ${({ primary }) => (primary ? '#171e40' : '#514cad')};
    border: none;
    color: #f2f2f2;
    transition: 0.2s ease-out;
    cursor: pointer;
    min-width: 100px;
    max-width: 200px;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    padding: ${({ big }) => (big ? '1rem 4rem' : '1rem 2rem')};
    font-size: ${({ bigFont }) => (bigFont ? '1.4rem' : '1.1rem')};

    &:hover {
        background: #464293;
        transition: 0.2s ease-out;
    }
`;