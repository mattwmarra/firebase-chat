import React from 'react'
import styled from "styled-components"
import {FaSignOutAlt} from "react-icons/fa";
import {auth} from "../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';

function Header() {
    const [user] = useAuthState(auth);
    
    const signOutUser = () => {
        auth.signOut();
    }
    
    return (
        <HeaderContainer>
            <HeaderLeft>
                 <h2>LAZY CHAT</h2>
            </HeaderLeft>
            <HeaderRight>
                <div>
                    <label>Logout</label>
                    <FaSignOutAlt onClick={signOutUser} />
                </div>
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
    div {
        display: flex;
        align-items: center;
        > svg, label {
            text-align: right;
            color: white;
            opacity: 0.8;
            transition: all .2s ease-out;
            padding: 0 .5rem;
        }
        cursor: pointer;
        transition: all .2s ease-out;
        border-radius: 3rem;
        padding: .9rem;
        margin-right: 2rem;

        &:hover {
            opacity: 1;
            background: #45508D;
        }
    }
`;