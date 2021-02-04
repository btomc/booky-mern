import React from 'react'
import styled from 'styled-components'
import Product from '../components/Product'
import { ProductsData} from '../data/ProductsData'

const OfferedProductsScreen = () => {
    return (
        <ProductsContainer>
            <ProductsRow>
                {ProductsData.map(product => {
                    return (
                        <Product product={product} key={product._id} />
                    )
                })}
            </ProductsRow>
        </ProductsContainer>
    )
}

export default OfferedProductsScreen


const ProductsContainer = styled.div`
    padding: 2rem 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(180deg, rgba(81,76,173,0.7) 0%, rgba(129,76,173,0.6) 100%),
                linear-gradient(180deg, rgba(0,0,0,0.2) 0%, transparent 100%);
`;

const ProductsRow = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    text-align: center;
    grid-gap: 2rem;

    @media screen and (max-width: 1250px) {
        grid-template-columns: repeat(3, 1fr);
    }
`;

