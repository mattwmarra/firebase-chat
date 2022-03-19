import styled from 'styled-components';
import {db} from '../firebase';
import {useState} from 'react'
import { decomposeColor } from 'material-ui-core';
import { useCollection } from 'react-firebase-hooks/firestore';
import {FaTimes} from 'react-icons/fa';

const Modal = ({active, setActive}) => {
    const [channels, loading, error] = useCollection(db.collection('channels'));
    const [channelName, setChannelName] = useState('');
    const [channelDesc, setChannelDesc] = useState('');
    const [errorText, setErrorText] = useState('');
    const addChannel = ()  => {
        console.log(channels)
        if(channelName.length === 0){
            setErrorText("Oops you forgot to give your channel a name")
            return;
        }
        //TODO: check for duplicate 
        db.collection('channels').add({
            name: channelName,
            desc: channelDesc
        })
        setChannelDesc("");
        setChannelName("");
        setActive(false);
        
    }
    if(!active){
        return <></>;
    }

    return (
    <ModalBackground>
        <ModalWrapper>
            <FaTimes />
            <h2>Add a new Channel</h2>
            <input type="text" placeholder='give it a unique name' onChange={e => setChannelName(e.target.value)}/>
            <label className="error">{errorText}</label>
            <input type="text" placeholder="what's this channel about?" onChange={e => setChannelDesc(e.target.value)} />
            <button onClick={addChannel}>Add Channel</button>
        </ModalWrapper>
    </ModalBackground>
    )
}

export default Modal;

const ModalWrapper = styled.div`
    background-color: var(--primary-red);
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 25vh;
    left: 25vw;
    border-radius: 16px;
    width: 45vw;
    padding: 36px;
    -webkit-box-shadow: 0px 0px 39px 9px rgba(0,0,0,0.36); 
    box-shadow: 0px 0px 39px 9px rgba(0,0,0,0.36);
    .error {
        color: #ff7675;
    }
    > h2 {
        line-height: 2;
    }
    >input {
        margin: 12px 0;
        line-height: 2;
        padding: 6px;
    }
    svg {
        float: right;
    }
    > button {
        line-height: 2.5;
        border-width: 0;
        width: 20%;
        cursor: pointer;
        border-radius: 8px;
        color: var(--primary-white);
        font-weight: 600;
        background: #4289F3;
        transition: background 0.2s ease-out;
        &:hover {
            background: #356ec2;
        }
    }
`

const ModalBackground = styled.div`
    /* position: absolute;
    background-color: #000;
    opacity: 0.3;
    width: 100vh;
    width: 100vw;
    z-index: 99; */
    `