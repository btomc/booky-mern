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
                        <Product product={product} />
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
    background: #8e88fc;
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

