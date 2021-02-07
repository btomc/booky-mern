import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Rating from '../components/Rating'
import { Button } from '../components/Button'
import { listProductDetails } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'


const ProductScreen = ({ history, match }) => {
    const [qty, setQty] = useState(0)

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    return (
        <ProductContainer>
            <BtnWrap><Button to='/products' primary='true' >Go Back</Button></BtnWrap>
            {loading ? ( <Loader /> ) : error ? ( <Message>{error}</Message> ) : (
                <ProductContent>
                    <PictureWrap>
                        <ProductImg><Img src={product.image} alt={product.name} /></ProductImg>
                    </PictureWrap>
                    <ProductDetails>
                        <ProductInfo>
                            <InfoWrap>
                                <Title>{product.title}</Title>
                                <Author>{product.author}</Author>
                                <Genre>{product.genre}</Genre>
                                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                            </InfoWrap>
                            <Plot>{product.plot}</Plot>
                        </ProductInfo>
                        <ProductWrap>
                            <ProductItem>Publication Date 
                                <span>{product.publicationDate}</span>
                            </ProductItem>
                            <ProductItem>Binding: {product.binding}</ProductItem>
                            <ProductItem>Pages: {product.pages}</ProductItem>
                            <ProductItem>Status: {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</ProductItem>
                            {product.countInStock > 0 && (
                                <Qty>
                                    <QtyP>Qty:</QtyP>
                                    <Form as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                                        {[...Array(product.countInStock).keys()].map(x => (
                                            <option key={x + 1}>
                                                {x + 1}
                                            </option>
                                        ))}
                                    </Form>
                                </Qty>
                            )}
                            <Price>${product.price}</Price>
                            <Button onClick={addToCartHandler} type='button' disabled={product.countInStock === 0}>Add to Cart</Button>
                        </ProductWrap>
                    </ProductDetails>
                </ProductContent>
            )}
        </ProductContainer>
    )
}

export default ProductScreen

const ProductContainer = styled.div`
    display: flex;
    flex-direction: column;
    color: #171e40;
    /* background: #bebafc; */
    background: rgba(129,76,173,0.5);
`;

const ProductContent = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin: 0 2rem 2rem 2rem;

    @media screen and (max-width: 999px) {
        flex-direction: column;
        align-items: center;
    }
`;

const PictureWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 460px;
    width: 340px;
    border-radius: 4px;
    margin: 2rem 1rem 1rem 0;
    background: #f7f7f7;
    box-shadow: 0 1.5rem 4rem rgba(0,0,0, .15);

    @media screen and (max-width: 920px) {
        margin-right: 0;
    }
`;

const ProductImg = styled.div`
    width: 280px;
    height: 400px;
    margin: 2rem;
`;

const Img = styled.img`
    height: 100%;
    width: 100%;
`;

const BtnWrap = styled.div`
    margin: 2rem 2rem 0 2rem;
    width: 150px;
`;

const ProductDetails = styled.div`
    display: flex;
    min-height : 524px;

    @media screen and (max-width: 700px) {
        flex-direction: column;
    }
`;

const ProductInfo = styled.div`
    display: flex;
    flex-direction: column;
    background: #f7f7f7;
    box-shadow: 0 1.5rem 4rem rgba(0,0,0, .15);
    margin: 2rem 0;
    border-radius: 4px;

    @media screen and (max-width: 920px) {
        margin-right: 1rem;
    }

    @media screen and (max-width: 700px) {
        margin: 2rem 0 1rem 0;
    }
`;

const InfoWrap = styled.div`
    margin: 1rem 0 0 1rem;
`;

const Title = styled.p`
    color: #514cad;
    font-weight: 700;
    font-size: 2.7rem;
    margin-right: 1rem;
`;

const Author = styled.p`
    font-weight: 600;
    font-size: 1.7rem;
    margin: 2px 0 6px 0;
`;
const Genre = styled.p`
    margin-bottom: 10px;
`;

const Plot = styled.p`
    line-height: 1.5;
    margin: 1rem;
`;

const ProductWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    margin: 2rem 0 2rem 1rem;
    /* background: #dddbfc; */
    background: #e7e5fc;
    min-width: 200px;
    border-radius: 4px;

    @media screen and (max-width: 700px) {
        padding: 2rem 0;
        margin-left: 0;
    }
`;

const ProductItem = styled.p`
    font-weight: 600;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media screen and (max-width: 700px) {
        margin-bottom: 1rem;
    }
`;

const Qty = styled.div`
    display: flex;
    align-items: center;

    @media screen and (max-width: 700px) {
        margin-bottom: 1rem;
    }
`;

const QtyP = styled.p`
    font-weight: 600;
    margin-right: .8rem;
`;

const Form = styled.form`
    padding: 8px;
    font-size: 1rem;
    border-radius: 4px;
    border: 1.5px solid #514cad;
`;

const Price = styled.p`
    font-size: 1.5rem;
    font-weight: 700;

    @media screen and (max-width: 700px) {
        margin-bottom: 1rem;
    }
`;

