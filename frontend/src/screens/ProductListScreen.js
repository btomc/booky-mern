import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts, deleteProduct, createProduct } from '../actions/productActions'
import {BsPlus} from 'react-icons/bs'
import {FaTrash} from 'react-icons/fa'
import {AiTwotoneEdit} from 'react-icons/ai'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const ProductListScreen = ({ history, match }) => {
    const dispatch = useDispatch()

    const productList = useSelector((state) => state.productList)
    const { loading, error, products } = productList

    const productDelete = useSelector((state) => state.productList)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

    const productCreate = useSelector((state) => state.productCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })

        if(!userInfo.isAdmin) {
            history.push('/login')
        }

        if(successCreate) {
            history.push(`/admin/product${createdProduct._id}/edit`)
        } else {
            dispatch(listProducts())
        }

    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct])

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure?')) {
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = (product) => {
        dispatch(createProduct())
    }

    return (
        <ProductListContainer>
            <ContainerTop>
                <h2>Products</h2>
                <BtnCreate onClick={createProductHandler}><BsPlus style={{ fontSize: '1.5rem'}} /> Create Product</BtnCreate>
            </ContainerTop>
            {loadingDelete && <Loader />}
            {errorDelete && <Message>{errorDelete}</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message>{errorCreate}</Message>}
            {loading ? <Loader /> : error ? <Message>{error}</Message>
            : (
                <ProductsWrap>
                    <ProductsTitle>
                        <TitleId>ID</TitleId>
                        <ProductP>TITLE</ProductP>
                        <ProductP>AUTHOR</ProductP>
                        <ProductPrice>PRICE</ProductPrice>
                        <ProductP>GENRE</ProductP>
                        <ProductsBtns></ProductsBtns>
                    </ProductsTitle>
                    <ProductsItems>
                        {products.map(product => (
                            <ItemsWrap key={product._id}>
                                <ItemId>{product._id}</ItemId>
                                <Item>{product.title}</Item>
                                <Item>{product.author}</Item>
                                <ItemPrice>${product.price}</ItemPrice>
                                <Item>{product.genre}</Item>
                                <Btns>
                                    <BtnLink to={`/admin/product/${product._id}/edit`}>
                                        <BtnEdit><Icon style={{ background: '#f7d600', color: '#514cad'}}><AiTwotoneEdit /></Icon></BtnEdit>
                                    </BtnLink>
                                    <BtnDelete onClick={() => deleteHandler(product._id)}><Icon><FaTrash /></Icon></BtnDelete>
                                </Btns>
                            </ItemsWrap>
                        ))}
                    </ProductsItems>
                </ProductsWrap>
            )}
        </ProductListContainer>
    )
}

export default ProductListScreen

const ProductListContainer = styled.div`
    background: #514cad;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #f2f2f2;
    min-height: 600px;
`;

const ContainerTop = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 2rem;
    padding: 0 2rem;
    width: 100%;

    h2 {
        font-size: 2rem;
    }
`;

const BtnCreate = styled.button`
    border: none;
    color: #f2f2f2;
    transition: 0.2s ease-out;
    cursor: pointer;
    max-width: 200px;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    background: #171e40;
    padding: 1rem;
    font-size: 1rem;

    &:hover {
        background: rgb(23,30,64, 0.7);
        transition: 0.2s ease-out;
    }
`;

const ProductsWrap = styled.div`
    margin: 1.5rem 0;
    display: flex;
    flex-direction: column;
    width: 90%;
    align-items: center;
`;

const ProductsTitle = styled.div`
    display: flex;
    max-width: 1000px;
    margin-bottom: 1rem;
    text-align: left;
`;

const TitleId = styled.p`
    width: 270px;
`;

const ProductP = styled.p`
    width: 160px;
`;

const ProductPrice = styled.p`
    width: 90px;
`;

const ProductsItems = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 1000px;
    text-align: left;
`;

const ItemsWrap = styled.div`
    display: flex;
    margin-bottom: 1rem;
`;

const Item = styled.p`
    width: 160px;
`;

const ItemPrice = styled.p`
    width: 90px;
`;

const ItemId = styled.p`
    width: 270px;
`;

const Icon = styled.i`
    font-size: 1.2rem;
    color: #fff;
    background: #e84040;
    border: none;
    padding: .5rem 1rem;
    border-radius: 3px;
`;

const ProductsBtns = styled.div`
    min-width: 100px;
    margin-left: 30px;
`;
const Btns = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 100px;
    margin-left: 10px;
`;

const BtnLink = styled(Link)``;

const BtnDelete = styled.button`
    cursor: pointer;
    border: none;
    outline: none;
    margin: .5rem ;
`;
const BtnEdit = styled.button`
    cursor: pointer;
    border: none;
    outline: none;
`;