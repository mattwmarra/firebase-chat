import { InfoOutlined, StarBorderOutlined } from '@material-ui/icons';
import {React, useRef, useEffect, useState} from 'react'
import styled from 'styled-components';
import { selectRoomId } from '../features/appSlice';
import {useSelector} from 'react-redux'
import ChatInput from './ChatInput';
import Message from './Message';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import {db, auth} from '../firebase';

function Chat() {
const channelId = useSelector(selectRoomId);
const bottomRef = useRef(null);
const [isEditing, setIsEditing] = useState(false);
const [newDesc, setNewDesc] = useState("")
const [currentUser] = useAuthState(auth);
const [channelDetails] = useDocument(
    channelId && db.collection('channels').doc(channelId)
);
const [channelMessages, loading] = useCollection(
    channelId && db.collection('channels')
    .doc(channelId).collection("messages")
    .orderBy("timeStamp", "asc")
)

const changeDesc = async () => {
    const channelRef = db.collection("channels").doc(channelId);
    const res = await channelRef.update({
        desc : newDesc
    })
    console.log(res);
    setIsEditing(false);
}

useEffect(() => {
    bottomRef?.current?.scrollIntoView({
        behavior: "smooth"
    });
}, [channelId, loading])
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
                            <input type="text" placeholder={channelDetails?.data().desc} onChange={(e) => setNewDesc(e.target.value)}/>
                            <button onClick={changeDesc}>Save</button>
                        </>
                        :
                        <>
                            <p>{channelDetails?.data().desc}</p>
                            <button onClick={() => setIsEditing(true)}>Edit channel details</button>
                        </>
                    }
            </ChatHeader>

            <ChatMessages>
                {channelMessages?.docs.map(doc => {
                    const {message, timeStamp, user, image, userId} = doc.data();
                    return (
                        <Message key={doc.id} message={message} timeStamp={timeStamp} user={user} isUserMessage={userId === currentUser.uid} image={image} />
                    )
                })}
                <ChatBottom ref={bottomRef}/>
            </ChatMessages>
       
            <ChatInput channelId={channelId} channelName={channelDetails?.data().name}/>
            </>
                )}
        </ChatContainer>
        </>
    )
}

export default Chat

const ChatContainer = styled.div`
    justify-content: flex-start;
    color: var(--primary-white);
    margin-top: 62px;
    width: calc(100% - 180px);
    overflow-y: scroll;
    flex-direction: column;
    margin-bottom: 160px;
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
    }
    >h4 > .MuiSvgIcon-root {
        margin-left: 10px;
        font-size: 18px;
    }
    button {
        width: 240px;
        border-radius: 8px;
        border: 0px;
    }
`;


const ChatMessages = styled.div``;

const ChatBottom = styled.div`
    padding-bottom: 200px;
`;