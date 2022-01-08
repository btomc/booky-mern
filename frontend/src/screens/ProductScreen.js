import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Rating from '../components/Rating'
import { Button } from '../components/Button'
import { listProductDetails, createProductReview } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'


const ProductScreen = ({ history, match }) => {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const { success: successProductReview, error: errorProductReview } = productReviewCreate

    useEffect(() => {
        if(successProductReview) {
            alert('Review Submitted!')
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match, successProductReview])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(match.params.id, {
            rating,
            comment
        }))
    }

    return (
        <ProductContainer>
            <BtnBack to='/products'>Go Back</BtnBack>
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
            <ReviewsContainer>
                <ReviewTitle>Reviews</ReviewTitle>
                {product.reviews.length === 0 && <Message variant='true' width='true'>No Reviews</Message>}
                <ReviewsWrap>
                    {product.reviews.map(review => (
                        <ReviewsItem key={review._id}>
                            <strong>{review.name}</strong>
                            <Rating value={review.rating} />
                            <ReviewP>{review.createdAt.substring(0, 10)}</ReviewP>
                            <ReviewP style={{ marginTop: '1.5rem'}}>{review.comment}</ReviewP>
                        </ReviewsItem>
                    ))}
                    <ReviewsFormWrap>
                        <h3>Write a Customer Review</h3>
                        {errorProductReview && <Message width='true'>{errorProductReview}</Message>}
                        {userInfo ? (
                            <ReviewForm onSubmit={submitHandler}>
                                <FormLabel>Rating</FormLabel>
                                <FormSelect
                                    as='select'
                                    value={rating}
                                    onChange={(e) => setRating(e.target.value)}
                                >
                                    <option value=''>Select...</option>
                                    <option value='1'>1 - Poor</option>
                                    <option value='2'>2 - Fair</option>
                                    <option value='3'>3 - Good</option>
                                    <option value='4'>4 - Very Good</option>
                                    <option value='5'>5 - Excellent</option>
                                </FormSelect>
                                <FormLabel>Comment</FormLabel>
                                <FormComment
                                    as='textarea'
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                ></FormComment>

                                <Button type='submit' primary='true'>Submit</Button>
                            </ReviewForm>
                        ) : (
                            <Message variant='true' width='true'>
                                Please <GoLink to='/login'>sign in</GoLink>{' '}to write a review
                            </Message>
                        )}
                    </ReviewsFormWrap>
                </ReviewsWrap>
            </ReviewsContainer>
        </ProductContainer>
    )
}

export default ProductScreen

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: #171e40;
  background: rgba(124, 121, 178, 0.7);
  /* background: rgba(81, 76, 173, 0.1); */
  background: #dddddd;
`

const BtnBack = styled(Link)`
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
    margin: 2rem 2rem 0 2rem;
    width: 150px;

    &:hover {
        background: #464293;
        transition: 0.2s ease-out;
    }
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
    margin: 2rem 0;
    border-radius: 4px;
    /* min-width: 600px; */

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
    font-size: 2.3rem;
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
    background: #f7f2f7;
    background: #eff1fc;
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
    border: none;
    outline: none;
    cursor: pointer;
`;

const Price = styled.p`
    font-size: 1.5rem;
    font-weight: 700;

    @media screen and (max-width: 700px) {
        margin-bottom: 1rem;
    }
`;

const ReviewsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #f2f2f2;
    border-radius: 4px;
    margin: 0 2rem 2rem 2rem;
    max-width: 700px;
`;

const ReviewTitle = styled.h3`
    font-size: 1.7rem;
    padding: 1.5rem;
    color: #514cad;
`;
const ReviewsWrap = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    min-width: 500px;
    align-items: flex-start;
`;

const ReviewsItem = styled.div`
    margin-top: 1.3rem;
`;

const ReviewsFormWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 1.2rem;
    padding-bottom: 1rem;

    h3 {
        font-size: 1.6rem;
        padding: 1.5rem;
        color: #514cad;
    }
`;

const ReviewP = styled.p``;
const ReviewForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-width: 300px;
    margin: 2rem 0;
`;

const FormLabel = styled.label`
    margin: 10px 0;
    color: #514cad;
    font-weight: 600;
`;

const FormSelect = styled.form`
    padding: 8px;
    font-size: .9rem;
    border-radius: 4px;
    border: none;
    border: 1.5px solid #eee;
    outline: none;
    cursor: pointer;
    /* box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1); */
`;

const FormComment = styled.textarea`
    resize: none;
    height: 90px;

    padding: 14px 32px 14px 16px;
    border-radius: 6px;
    outline: none;
    width: 480px;
    color: #171e40;
    margin-bottom: 1.5rem;
    border: none;
    border: 1.5px solid #eee;
    font-family: inherit;
    /* box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1); */
`;

const GoLink = styled(Link)`
    text-decoration: none;
    border-bottom: 2px solid #fff;
    color: #fff;
    font-weight: 600;
    margin-bottom: 1rem;
`;
