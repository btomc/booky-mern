import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Product = ({ product}) => {
    return (
        <Card>
            <ProductImg to={`/products/${product._id}`}><ImgCard src={product.image} /></ProductImg>
            <CardTitle to={`/products/${product._id}`}><p>{product.title}</p></CardTitle>
            <CardAuthor>{product.author}</CardAuthor>
            <CardReviews>{product.rating} from {product.numReviews}</CardReviews>
            <CardPrice>${product.price}</CardPrice>
        </Card>
    )
}

export default Product

const Card = styled.div`
    /* border: 2.5px solid #e0e0e0;  */
    border-radius: 4px;
    width: 280px;
    min-height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #f2f2f2;
    color: #171e40;
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

    p {
    font-size: 1.5rem;
    margin: 1rem 0 .5rem 0;
    color: #514cad;
    }
`;

const CardAuthor = styled.p`
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 5px;
`;

const CardReviews = styled.p`
    margin-bottom: 4px;
`;

const CardPrice = styled.p`
    font-size: 1.5rem;
    margin: .5rem 0 2rem 0;
    color: #3e3a7f;
`;
