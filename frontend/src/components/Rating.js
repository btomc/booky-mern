import React from 'react'
import styled from 'styled-components'
import {FaStar, FaStarHalfAlt, FaRegStar} from 'react-icons/fa'

const Rating = ({ value, text }) => {
    return (
        <RatingContainer>
            <IconSpan>
                <Icon>
                    {value >= 1 
                        ? <FaStar /> 
                        : value >= 0.5 
                        ? <FaStarHalfAlt /> 
                        : <FaRegStar />
                    }
                </Icon>
                <Icon>
                    {value >= 2 
                        ? <FaStar /> 
                        : value >= 1.5 
                        ? <FaStarHalfAlt /> 
                        : <FaRegStar />
                    }
                </Icon>
                <Icon>
                    {value >= 3 
                        ? <FaStar /> 
                        : value >= 2.5 
                        ? <FaStarHalfAlt /> 
                        : <FaRegStar />
                    }
                </Icon>
                <Icon>
                    {value >= 4 
                        ? <FaStar /> 
                        : value >= 3.5 
                        ? <FaStarHalfAlt /> 
                        : <FaRegStar />
                    }
                </Icon>
                <Icon>
                    {value >= 5 
                        ? <FaStar /> 
                        : value >= 4.5 
                        ? <FaStarHalfAlt /> 
                        : <FaRegStar />
                    }
                </Icon>
            </IconSpan>
            <TextSpan>{text && text}</TextSpan>
        </RatingContainer>
    )
}

export default Rating


const RatingContainer = styled.div`
    margin-top: 4px;
    display: flex;
    align-items: center;
`;

const IconSpan = styled.span`
    margin-right: 4px;
`;
const TextSpan = styled.span`
    font-weight: 500;
`;

const Icon = styled.i`
    font-size: 22px;
    color: #e5c409;
`;