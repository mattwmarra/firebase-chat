
import React from 'react'
import styled from 'styled-components';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import {Avatar} from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create"
import SidebarOption from './SidebarOption';
import { Add} from '@material-ui/icons';
import {db, auth} from '../firebase';
import {useCollection} from "react-firebase-hooks/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSelector } from 'react-redux';
import { selectRoomId } from '../features/appSlice';

function Sidebar() {
    const [channels, loading, error] = useCollection(db.collection("channels"))
    const [user] = useAuthState(auth);
    const roomId = useSelector(selectRoomId);
    return (
        <div>
            <SidebarContainer>
                <SidebarHeader>
                    <SidebarInfo>
                        <h3>
                        <HeaderAvatar
                            alt={user?.displayName}
                            src={user?.photoURL}
                        />
                            {user?.displayName}
                            
                        </h3>
                    </SidebarInfo>
                </SidebarHeader>
                <SidebarOption Icon={Add} addChannelOption title="Add Channel"/>

                {channels?.docs.map(doc => (
                    <SidebarOption key={doc.id} selected={roomId === doc.id} id={doc.id} title={doc.data().name}/>
                    ))}


            </SidebarContainer>
        </div>
    )
}

export default Sidebar;

const SidebarContainer = styled.div`
    background-color: var(--primary-color);
    color: white;
    width: 100%;
    border-top: 1px solid #2290e6;
    border-right: 3px solid #474b67;
    height: 100vh;
    > hr {
        margin-top: 10px;
        margin-bottom: 10px;
        border: 1px solid var(--primary-red);
    }
`;

const SidebarHeader = styled.div`
    margin-top: 60px;
    display: flex;
    border-bottom: 1px solid var(--primary-red);
    padding: 13px;
    > .MuiSvgIcon-root {
        padding: 8px;
        color: #065c9f;
        font-size: 18px;
        background-color: white;
        border-radius: 999px;
    }

`;
const HeaderAvatar = styled(Avatar)`
    margin-right: 8px;
    :hover {
        opacity: 0.8;
    }
`;
const SidebarInfo = styled.div`
    flex: 1;
    flex-direction: row;
    > h2 {
        font-size: 15px;
        font-weight: 900;
        margin-bottom: 5px;
    }
    h3 {
        display: flex;
        font-size: 24px;
        align-items: center;
        justify-content: flex-start;
    }
    > h3 > .MuiSvgIcon-root {
        font-size: 14px;
        margin-top: 1px;
        margin-right: 2px;
        color: green;
        margin-right: 10%;
    }
`;
