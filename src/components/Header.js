import React from 'react'
import styled from "styled-components"
import {Avatar} from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import SearchIcon from "@material-ui/icons/Search";
import { HelpOutline } from '@material-ui/icons';

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
    align-items: center;
    margin-left: 20px;
    > h2 {
        font-size: 36px;
        color: var(--primary-white);
    }
`

const HeaderSearch = styled.div`
    flex: 0.4;
    border-radius: 6px;
    display: flex;
    text-align: center;
    padding: 0 50px;
    color: gray;
    border: 1px solid gray;
    >input {
        background-color: transparent;
        border-radius: 3px;
        border: none;
        min-width: 30vw;
        color: white;
        outline: 0;
    }
`;

const HeaderRight = styled.div`
    display: flex;
    flex: 0.3;
    align-items: flex-end;
    > .MuiSvgIcon-root {
        cursor: pointer;
        margin-left: auto;
        margin-right: 20px;
    }
`;