import {React, useRef, useEffect, useState} from 'react'
import styled from 'styled-components';
import { selectRoomId } from '../features/appSlice';
import {useSelector} from 'react-redux'
import ChatInput from './ChatInput';
import Message from './Message';
import {FaPencilAlt, FaSave,FaTimesCircle} from 'react-icons/fa';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import {db, auth} from '../firebase';
import ReactLoading from 'react-loading';

function Chat() {
const channelId = useSelector(selectRoomId);
const bottomRef = useRef(null);
const [isEditing, setIsEditing] = useState(false);
const [newDesc, setNewDesc] = useState("")
const [currentUser] = useAuthState(auth);
const [channelDetails] = useDocument(
    channelId && db.collection('channels').doc(channelId)
    );
    console.log(channelDetails)
const [channelMessages, loading] = useCollection(
    channelId && db.collection('channels')
    .doc(channelId).collection("messages")
    .orderBy("timeStamp", "desc")
)

const changeDesc = async () => {
    const channelRef = db.collection("channels").doc(channelId);
    const res = await channelRef.update({
        desc : newDesc
    })
    console.log(res);
    setIsEditing(false);
}

const cancelEdit = () => {
    setIsEditing(false);
}
useEffect(() => {
    bottomRef?.current?.scrollIntoView({
        behavior: "smooth"
    });
}, [channelId, loading, channelMessages]);

    if(loading) {
        return (
            <LoadingWrapper>
                <ReactLoading type={"spin"} width={660} height={200} color={"#383f6d"}/>
            </LoadingWrapper>
        )
    }
    console.log(channelId);
    return (
        <>
        <ChatContainer>
                {channelDetails && channelMessages && (
            <>
            <ChatHeader>
                    <h4><strong>#{channelDetails?.data().name}</strong></h4>
                    {
                        isEditing ? 
                        <>
                            <input type="text" placeholder={channelDetails?.data().desc} autoFocus onChange={(e) => setNewDesc(e.target.value)}/>
                            <div className="desc-buttons">
                                <FaSave onClick={changeDesc}></FaSave>
                                <FaTimesCircle onClick={cancelEdit}></FaTimesCircle>
                            </div>
                        </>
                        :
                        <>
                            <p>{channelDetails?.data().desc} <FaPencilAlt onClick={() => setIsEditing(true)}/></p>
                            
                        </>
                    }
            </ChatHeader>

            <ChatMessages>
                <ChatBottom ref={bottomRef}/>
                {channelMessages?.docs.map(doc => {
                    const {message, timeStamp, user, image, userId} = doc.data();
                    return (
                        <Message key={doc.id} message={message} timeStamp={timeStamp} user={user} isUserMessage={userId === currentUser.uid} image={image} />
                        )
                    })}
            </ChatMessages>
       
            <ChatInput channelId={channelId} channelName={channelDetails?.data().name}/>
            </>
                )}
        </ChatContainer>
        </>
    )
}

export default Chat;

const LoadingWrapper = styled.div`
    margin-top: 30vh;
    margin-left: 30vw;
    display: flex;
    align-content: center;
    justify-content: center;
`

const ChatContainer = styled.div`
    justify-content: flex-end;
    color: var(--primary-white);
    margin-top: 62px;
    width: calc(100% - 180px);
    /* overflow-y: scroll; */
    flex-direction: column-reverse;
    border-bottom: 3px solid #474b67;
`

const ChatHeader = styled.div`
    display: flex;
    width: calc(100% - 304px);
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 3px solid #474b67;
    position: fixed;
    transition: all .2s ease-out;
    background-color: #252947;
    >h4 {
        display: flex;
        text-transform: lowercase;
        font-size: 24px;
        margin-right: 10px;
        margin-bottom: 32px;
    }
    >p {
        opacity: 0.9;
        > svg {
            padding: 0 2%;
            transition: all .2s ease-out;
            cursor: pointer;
            &:hover {
                opacity: 0.7;
            }
        }
    }
    >h4 > .MuiSvgIcon-root {
        margin-left: 10px;
        font-size: 18px;
        cursor: pointer;
    }

    input {
        background:  #252947;
        color: var(--primary-white);
        border: 0;
        padding: 8px;
        ::placeholder {
            color: var(--primary-white);
            opacity: 0.6;
        }
    }
    button {
        width: 240px;
        border-radius: 8px;
        border: 0px;
    }
    .desc-buttons {
        display: flex;
        font-size: 18px;
        >svg {
            margin: 4px 16px 0px;
            transition: all .2s ease-out;
            padding: 12px;
            cursor: pointer;
            &:hover {
                opacity: 0.8;
            }
        }
    }
`;


const ChatMessages = styled.div`
    display: flex;
    flex-direction: column-reverse;
    height: 90%;
    overflow-y: scroll;
    > .sent {
        margin-left: 30%;
    }
`;

const ChatBottom = styled.div`
`;