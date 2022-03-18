import React from 'react'
import styled from "styled-components"
import {Avatar} from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import SearchIcon from "@material-ui/icons/Search";
import { HelpOutline } from '@material-ui/icons';
import {FaSignOutAlt} from "react-icons/fa";
import {auth} from "../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
function Header() {
    const [user] = useAuthState(auth);
    return (
        <HeaderContainer>
            <HeaderLeft>
                 <h2>LAZY CHAT</h2>
            </HeaderLeft>
            <HeaderRight>
                <FaSignOutAlt />
            </HeaderRight>

        </HeaderContainer>
    )
}

export default Header

const HeaderContainer = styled.div`
    display: flex;
    position: fixed;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    background-color: var(--primary-red);
`;

const HeaderLeft = styled.div`
    display: flex;
    flex: 0.7;
    align-items: center;
    margin-left: 20px;
    > h2 {
        font-size: 36px;
        color: var(--primary-white);
    }
`

const HeaderRight = styled.div`
    display: flex;
    flex: 0.3;
    justify-content: flex-end;
    > svg {
        text-align: right;
        margin-right: 12px;
        color: white;
        opacity: 0.8;
        transition: all .2s ease-out;
        cursor: pointer;
        padding: 12px;
        &: hover {
            opacity: 1;
        }
    }
`;