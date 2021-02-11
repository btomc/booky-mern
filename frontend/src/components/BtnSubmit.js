import styled from 'styled-components'

export const BtnSubmit = styled.button`
    background: #171e40;
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
    padding: 1rem 2rem;
    font-size: 1.1rem;

    &:hover {
        background: #464293;
        background: rgb(23,30,64, 0.7);
        transition: 0.2s ease-out;
    }
`;