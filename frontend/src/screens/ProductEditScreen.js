import React,{ useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { BtnSubmit } from '../components/BtnSubmit'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'


const ProductEditScreen = ({ match, history }) => {
    const productId = match.params.id

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [genre, setGenre] = useState('')
    const [plot, setPlot] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [publicationDate, setPublicationDate] = useState('')
    const [binding, setBinding] = useState('')
    const [pages, setPages] = useState(0)
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

    useEffect(() => {
        if(successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            history.push('/admin/productlist')
        } else {
            if(!product.title || product._id !== productId) {
                dispatch(listProductDetails(productId))
            } else {
                setTitle(product.title)
                setAuthor(product.author)
                setPrice(product.price)
                setImage(product.image)
                setGenre(product.genre)
                setPlot(product.plot)
                setCountInStock(product.countInStock)
                setPublicationDate(product.publicationDate)
                setBinding(product.binding)
                setPages(product.pages)
            }
        }
        
    }, [product, dispatch, history, productId, successUpdate])

    const uploadFileHandler = async(e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/upload', formData, config)

            setImage(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            title,
            author,
            price,
            image,
            genre,
            plot,
            countInStock,
            publicationDate,
            binding,
            pages
        }))
    }

    return (
        <EditContainer>
            <BtnWrap>
                <LinkBack to='/admin/productlist'>Go Back</LinkBack>
            </BtnWrap>
            <EditContent>
                <h2>Edit Product</h2>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message>{errorUpdate}</Message>}
                {loading ? (
                    <Loader /> 
                ) : error ? (
                    <Message>{error}</Message>
                ) : (
                    <EditForm onSubmit={submitHandler}>
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormInput 
                                type='text'
                                placeholder='Enter title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            ></FormInput>
                        </FormItem>

                        <FormItem>
                            <FormLabel>Author</FormLabel>
                            <FormInput 
                                type='text'
                                placeholder='Enter author'
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                            ></FormInput>
                        </FormItem>

                        <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormInput 
                                type='number'
                                placeholder='Enter price'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            ></FormInput>
                        </FormItem>

                        <FormItem>
                            <FormLabel>Image</FormLabel>
                            <FormInput 
                                type='text'
                                placeholder='Enter image url'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            ></FormInput>
                            <FormInput
                                type='file'
                                onChange={uploadFileHandler}
                            ></FormInput>
                            {uploading && <Loader />}
                        </FormItem>

                        <FormItem>
                            <FormLabel>Genre</FormLabel>
                            <FormInput 
                                type='text'
                                placeholder='Enter genre'
                                value={genre}
                                onChange={(e) => setGenre(e.target.value)}
                            ></FormInput>
                        </FormItem>

                        <FormItem>
                            <FormLabel>Plot</FormLabel>
                            <FormText
                                type='text'
                                placeholder='Enter plot'
                                value={plot}
                                onChange={(e) => setPlot(e.target.value)}
                            ></FormText>
                        </FormItem>

                        <FormItem>
                            <FormLabel>Count In Stock</FormLabel>
                            <FormInput 
                                type='number'
                                placeholder='Enter count in Stock'
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                            ></FormInput>
                        </FormItem>

                        <FormItem>
                            <FormLabel>Publication Date</FormLabel>
                            <FormInput 
                                type='text'
                                placeholder='Enter publication date'
                                value={publicationDate}
                                onChange={(e) => setPublicationDate(e.target.value)}
                            ></FormInput>
                        </FormItem>

                        <FormItem>
                            <FormLabel>Binding</FormLabel>
                            <FormInput 
                                type='text'
                                placeholder='Enter binding'
                                value={binding}
                                onChange={(e) => setBinding(e.target.value)}
                            ></FormInput>
                        </FormItem>

                        <FormItem>
                            <FormLabel>Pages</FormLabel>
                            <FormInput 
                                type='number'
                                placeholder='Enter pages'
                                value={pages}
                                onChange={(e) => setPages(e.target.value)}
                            ></FormInput>
                        </FormItem>

                        <BtnSubmit type='submit'>Submit</BtnSubmit>
                    </EditForm>

                )}
            </EditContent>
        </EditContainer>
    )
}

export default ProductEditScreen

const EditContainer = styled.div`
    background: #514cad;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #f2f2f2;
    min-height: 600px;
`;

const EditContent = styled.div`
    display: flex;
    flex-direction: column;
    padding-bottom: 1.5rem;

    h2 {
        font-size: 2rem;
    }
`;
const BtnWrap = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 1.5rem;
`;

const LinkBack = styled(Link)`
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
        background: rgb(23,30,64, 0.7);
        transition: 0.2s ease-out;
    }
`;

const EditForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 500px;
`;
const FormItem = styled.div`
    margin: 1rem;
    display: flex;
    flex-direction: column;
    width: 100%;
`;
const FormLabel = styled.label`
    margin-bottom: 5px;
    color: #f2f2f2;
    font-weight: 600;
`;

const FormInput = styled.input`
    padding: 12px;
    border-radius: 4px;
    font-size: 1rem;
    border: none;
    outline: none;
    color: #171e40;
`;

const FormText = styled.textarea`
    resize: none;
    height: 140px;
    border-radius: 4px;
    border: none;
    outline: none;
    padding: 12px;
`;


