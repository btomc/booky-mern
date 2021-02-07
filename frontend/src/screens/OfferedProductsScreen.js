import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Product from '../components/Product'
import { listProducts } from '../actions/productActions'

const OfferedProductsScreen = () => {
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    return (
        <ProductsContainer>
            {loading ? (
                <h3>Loading...</h3>
            ) : error ? (
                <h4>{error}</h4>
            ) : (
                <Row>
                    {products.map((product) =>  (
                        <Col key={product._id}>
                            <Product product={product}  />
                        </Col>
                    ))}
                </Row>
            )}
        </ProductsContainer>
    )
}

export default OfferedProductsScreen


const ProductsContainer = styled.div`
    padding: 2rem 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    /* background: #ceccfc; */
    background: rgba(129,76,173,0.3);
`;

const Row = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    text-align: center;
    grid-gap: 2rem;

    @media screen and (max-width: 1250px) {
        grid-template-columns: repeat(3, 1fr);
    }
`;

const Col = styled.div``;

