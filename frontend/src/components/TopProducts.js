import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listTopProducts } from '../actions/productActions'
import { Link } from 'react-router-dom'
import Rating from './Rating'
import {FaStar} from 'react-icons/fa'
import {BsArrowRightShort} from 'react-icons/bs'

const TopProducts = () => {
    const dispatch = useDispatch()

    const productTopRated = useSelector((state => state.productTopRated))
    const { loading, error, products } = productTopRated

    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch])

    return (
        <TopContainer>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message>{error}</Message>
            ) : (
                <>
                    <TopTitle>Now Trending</TopTitle>
                    <TopContent>
                        {products.map((product) => (
                            <TopItem key={product._id}>
                                <TopBadge><FaStar  style={{ fontSize:'12px'}}/> TOP <FaStar style={{ fontSize:'12px'}} /></TopBadge>
                                <ProductImg to={`/product/${product._id}`}><ImgCard src={product.image} /></ProductImg>
                                <CardTitle to={`/product/${product._id}`}>{product.title}</CardTitle>
                                <CardAuthor>{product.author}</CardAuthor>
                                <Rating 
                                    value={product.rating} 
                                    text={`${product.numReviews} reviews`} 
                                />
                                <CardPrice>${product.price}</CardPrice>
                            </TopItem>
                        ))}

                    </TopContent>
                    <BtnWrap to='/products'><BtnOther>View other <BsArrowRightShort /></BtnOther></BtnWrap>
                </>
            )}
        </TopContainer>
    )
}

export default TopProducts


const TopContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #f2f2f2;
    padding-top: 2.7rem;
`;

const TopContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const TopTitle = styled.h2`
    text-align: center;
    font-size: 2.3rem;
    margin-bottom: 2rem;
`;
const TopItem = styled.div`
    border-radius: 4px;
    width: 280px;
    min-height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #f7f7f7;
    box-shadow: 0 1.5rem 4rem rgba(0,0,0, .15);
    color: #171e40;
    margin: 1rem;
`;

const TopBadge = styled.p`
    font-size: 1.1rem;
    padding: .8rem;
    background: #514cad;
    color: #fff;
    border-radius: 4px;
    font-weight: 700;
    width: 90%;
    margin-top: 1rem;
    text-align: center;
`;


const ProductImg = styled(Link)`
    width: 200px;
    height: 280px;
    margin-top: 2rem;
`;

const ImgCard = styled.img`
    width: 100%;
    height: 100%;
`;

const CardTitle = styled(Link)`
    text-decoration: none;
    font-size: 1.5rem;
    margin: 1rem 0 .5rem 0;
    color: #514cad;
    font-weight: 600;
`;

const CardAuthor = styled.p`
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 5px;
`;

const CardPrice = styled.p`
    font-size: 1.5rem;
    margin: .5rem 0 2rem 0;
    color: #3e3a7f;
`;

const BtnWrap = styled(Link)`
    display: flex;
    justify-content: flex-end;
    text-decoration: none;
    margin: 1rem 1.5rem;
`;

const BtnOther = styled.button`
    border: none;
    color: #514cad;
    transition: 0.2s ease-out;
    cursor: pointer;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    background: transparent;
    font-size: 1.1rem;

    &:hover {
        background: #464293;
        transition: 0.2s ease-out;
        color: #fff;
    }
`;

