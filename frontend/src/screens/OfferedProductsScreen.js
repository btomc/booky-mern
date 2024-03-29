import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Product from '../components/Product'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productActions'
import Message from '../components/Message'
import SearchBox from '../components/SearchBox'

const OfferedProductsScreen = ({ match, history }) => {
    const keyword = match.params.keyword

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    useEffect(() => {
        dispatch(listProducts(keyword))
    }, [dispatch, keyword])

    return (
        <>
        <SearchBox history={history} />
        <ProductsContainer>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message>{error}</Message>
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
        </>
    )
}

export default OfferedProductsScreen


const ProductsContainer = styled.div`
    padding: 2rem 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(81,76,173,0.1);
    min-height: 375px;
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

