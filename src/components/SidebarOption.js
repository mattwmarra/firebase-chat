import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import {db} from '../firebase';
import {useDispatch, useSelector} from "react-redux";
import { enterRoom, selectRoomId } from '../features/appSlice';
import { execPath } from 'process';
import  Modal  from './Modal';

function SidebarOption({Icon, title, addChannelOption, id}) {
    const [excerpt, setExcerpt] = useState("")
    const roomId = useSelector(selectRoomId);
    const dispatch = useDispatch();
    const [openChannelModal, setOpenChannelModal] = useState(false);

    const selectChannel = () => {
        if(id){
            dispatch(enterRoom({
                roomId: id
            }))
        }
    }
    return (
        <>
        <SidebarOptionContainer 
            selected={roomId === id}
            onClick={addChannelOption ? () => setOpenChannelModal(!openChannelModal) : selectChannel}>

            {Icon && <Icon fontSize='small' style={{ padding: "10px"}}/>}
            {Icon ? (
            <h3>{title}</h3>)

            : (<SidebarOptionChannel >
                <h3>#{title}</h3>
                <p>{excerpt}</p>
            </SidebarOptionChannel>)}
        </SidebarOptionContainer>
        <Modal active={openChannelModal} setActive={setOpenChannelModal}></Modal>
        </>
    )
}

export default SidebarOption;

const SidebarOptionContainer = styled.div`
    display: flex;
    width: 180px;
    font-size: 12px;
    align-items: center;
    padding: 16px 24px;
    cursor: pointer;
    border-radius: 8px;
    background-color: ${(props) => props.selected ? "#4289f3" : ""};
    margin: 8px;
    transition: all .2s ease-out;
    :hover {
        background-color: ${(props) => props.selected ? "#4289f3" : "#45508d"};
    }

    > h3 {
        font-weight: 500;
    }
    > h3 > span {
        padding: 15px;
    }
`;

const SidebarOptionChannel = styled.h3`
    padding: 10px 0;
    font-weight: 300;
    > p {
        opacity: 0.8;
    }
`;
