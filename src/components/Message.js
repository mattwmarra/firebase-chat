import React from 'react'
import styled from 'styled-components';

function Message({message, timeStamp, user, image, isUserMessage}) {
    return (
        <MessageContainer className={isUserMessage ? "sent" : "received"}>
            {isUserMessage ? null : <img src={image} alt="profile" />}
            <MessageInfo>
                {isUserMessage ? null :
                <h4>
                    {isUserMessage ? 'me' : user}{' '}
                </h4>}
                <p>{message}</p>
                <span>{new Date(timeStamp?.toDate()).toUTCString()}</span>
            </MessageInfo>
        </MessageContainer>
    )
}

export default Message

const MessageContainer = styled.div`
    background: ${props => props.className === "sent" ? "#4289f3" : "#383f6d"};
    float: ${props => props.className === 'sent' ? "right" : "left"};
    color: var(--primary-white);
    display: flex;
    width: 60%;
    align-items: center;
    padding: 20px;
    border-radius: 8px;
    margin: 16px 24px;
    > img {
        height: 50px;
        border-radius:8px;
    }
`;

const MessageInfo = styled.div`
    padding-left: 10px;
    span {
        color: var(--primary-white);
        font-weight: 300;
        margin-left: 4px;
        font-size: 10px;
        text-align: right;
    }
    > p {
        color: var(--primary-white);
        font-size: 16px;
    }
`;