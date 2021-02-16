import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const SearchBox = ({ history }) => {
    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
        console.log('click')
        e.preventDefault()
        if(keyword.trim()) {
            history.push(`/search/${keyword}`)
        } else {
            history.push('/')
        }
        
    }

    return (
        <SearchContainer>
            <BtnBack to='/products'>Show All</BtnBack>
            <SearchForm onSubmit={submitHandler}>
                <SearchInput
                    type='text'
                    title='q'
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder='Search...'
                />
                <Btn type='submit'>Search</Btn>
            </SearchForm>
        </SearchContainer>
    )
}

export default SearchBox

const SearchContainer = styled.div`
    background: #514cad;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

const SearchForm = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 300px;
    width: 700px;
`;

const SearchInput = styled.input`
    padding: 12px;
    border-radius: 4px;
    font-size: 1rem;
    border: none;
    outline: none;
    color: #171e40;
    width: 90%;
    margin-right: 1.5rem;
`;

const Btn = styled.button`
    padding: .6rem;
    font-size: .9rem;
    border: none;
    color: #f2f2f2;
    background: #171e40;
    transition: 0.2s ease-out;
    cursor: pointer;
`;

 const BtnBack =styled(Link)`
    padding: .6rem;
    font-size: .9rem;
    border: none;
    color: #f2f2f2;
    background: #171e40;
    transition: 0.2s ease-out;
    cursor: pointer;
    text-decoration: none;
    margin-right: 1.5rem;
 `;
