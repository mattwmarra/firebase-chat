import {React, useState} from 'react';
import styled from 'styled-components';
import {db, auth} from '../firebase';
import firebase from 'firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Modal from './Modal';

function ChatInput({channelName, channelId, bottomRef}) {
    const [user] = useAuthState(auth);
    const [message, setMessage] = useState("");
    const sendMessage = e =>{
        e.preventDefault();
        if(!channelId || message.length === 0){
            return false;
        }
        db.collection("channels").doc(channelId).collection("messages").add({
            message: message,
            timeStamp:  firebase.firestore.FieldValue.serverTimestamp(),
            user: user.displayName,
            image: user.photoURL,
            userId: user.uid
        });
        setMessage("");
        bottomRef?.current.scrollIntoView({
            behavior: "smooth"
        })
    }
    return (
        <ChatInputConatainer>
            <form>
                <button hidden type="submit" onClick={sendMessage}>SEND</button>
                <input type="text" onChange={e => setMessage(e.target.value)} placeholder={`Message #${channelName}`} value={message}/>
            </form>
        </ChatInputConatainer>
    )
}

export default ChatInput


const ChatInputConatainer = styled.div`
    border-radius: 20px;
    background-color: var(--primary-white);
    display: flex;
    flex-direction: column;
    margin-left: 0px;
    > form {
        position: relative;
        display: flex;
        justify-content: flex-start;
    }
    
    >form > input {
        box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
        background-color: var(--primary-white);
        position: fixed;
        left: 250px;
        bottom: 30px;
        width: 75%;
        margin: 30px;
        right: 2vh;
        border: 0px solid gray;
        border-radius: 99px;
        padding: 20px;
        outline: none;
        }
    >form > button {
        display: none !important;
    }
`;