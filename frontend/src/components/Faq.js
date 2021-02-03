import React, {useState} from 'react'
import styled from 'styled-components'
import { FiMinus, FiPlus } from 'react-icons/fi'
import { FaqData } from '../data/FaqData'

const Faq = () => {
    const [clicked, setClicked] = useState(false)

    const toggle = index => {
        if(clicked === index) {
            return setClicked(null)
        }

        setClicked(index)
    }

    return (
        <AccordionSection>
            <FaqH2>Frequently Asked Questions</FaqH2>
            <AccordionContent>
                <FaqContainer>
                    {FaqData.map((item, index) => {
                        return (
                            <>
                                <Item onClick={() => toggle(index)} key={index}>
                                    <h3>{item.question}</h3>
                                    <span>{clicked === index ? <FiMinus /> : <FiPlus />}</span>
                                </Item>
                                {clicked === index ? (
                                    <Dropdown>
                                        <p>{item.answer}</p>
                                    </Dropdown>
                                ) : null}
                            </>
                        )
                    })}
                </FaqContainer>
            </AccordionContent>
        </AccordionSection>
    )
}

export default Faq

const AccordionSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 3rem;
    background: #f2f2f2;
`;

const AccordionContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 2rem 0;
    margin: 0 0 2rem 0;
    height: 100%;
`;

const FaqH2 = styled.h2`
    font-size: 2.3rem;
    color: #171e40;
`;

const FaqContainer = styled.div`
    box-shadow: 2px 10px 35px 1px rgba(153, 153, 153, 0.3);
    margin: 0 0 2rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 800px;
    margin-bottom: 10px;
    background: #f2f2f2;
`;

const Item = styled.div`
    color: #514CAD;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    cursor: pointer;
    width: 100%;

    h3 {
        padding: 2rem;
        font-size: 1.5rem;
    }

    span {
        margin-right: 2.5rem;
    }
`;

const Dropdown = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    border-bottom:  2px solid #514cad;
    border-top: 2px solid #524cad;
    padding: 1rem 2rem;
    max-width: 520px;

    p {
        font-size: 1.2rem;
        line-height: 1.4;
    }
`;
