import { useEffect } from "react";
import styled from "styled-components";
import { auth, provider } from '../firebase';
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { selectUserName, selectUserPhoto, setUserLoginDetails, setSignOutState } from '../store';



function Header(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userName = useSelector(selectUserName);
    const userPhoto = useSelector(selectUserPhoto);

    //This function redirects us to home page in case there is a user
    //There is Async error somewhere
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                navigate('/home');
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userName]);

    //For storing login in credentials
    const setUser = (user) => {
        dispatch(setUserLoginDetails({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
        }));
    }

    //For login
    const handleAuth = () => {
        if (!userName) {
            signInWithPopup(auth, provider).then(result => {
                setUser(result.user);
            }).catch(error => alert(error.message));
        } else if (userName) {
            signOut(auth).then(() => {
                dispatch(setSignOutState());
                navigate('/');
            }).catch((error) => {
                alert(error.message);
            });
        }
    };

    return <Nav>
        <Logo>
            <img src='/images/logo.svg' alt='Disney+' />
        </Logo>

        {!userName ? <Login onClick={handleAuth}>Login</Login> :
            <>
                <NavMenu>
                    <a href="/home">
                        <img src="/images/home-icon.svg" alt="HOME" />
                        <span>HOME</span>
                    </a>
                    <a href=".search">
                        <img src="/images/search-icon.svg" alt="SEARCH" />
                        <span>SEARCH</span>
                    </a>
                    <a href="/watchlist">
                        <img src="/images/watchlist-icon.svg" alt="WATCHLIST" />
                        <span>WATCHLIST</span>
                    </a>
                    <a href="/originals">
                        <img src="/images/original-icon.svg" alt="ORIGINALS" />
                        <span>ORIGINALS</span>
                    </a>
                    <a href="/movies">
                        <img src="/images/movie-icon.svg" alt="MOVIES" />
                        <span>MOVIES</span>
                    </a>
                    <a href="/series">
                        <img src="/images/series-icon.svg" alt="SERIES" />
                        <span>SERIES</span>
                    </a>
                </NavMenu>
                <SignOut>
                    <UserImg src={userPhoto} alt="UserName" />
                    <DropDown onClick={handleAuth}>Sign Out</DropDown>
                </SignOut>
            </>}
    </Nav>
}

const Nav = styled.nav`
    position:fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 70px;
    background-color: #090b13;
    padding: 0 36px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    letter-spacing: 16px;
    z-index: 3;
`;

const Logo = styled.a`
    padding: 0;
    width: 80px;
    margin-top: 4px;
    max-height: 70px;
    font-size: 0;
    display: inline-block;

    img{
        display: block;
        width: 100%;
    }
`;

const NavMenu = styled.div`
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    height: 100%;
    justify-content: flex-end;
    padding: 0px;
    position: relative;
    margin: 0;
    margin-right: auto;
    margin-left: 25px;
    
    a{
        display: flex;
        align-items:center;
        padding: 0 12px;

        img{
            height: 20px;
            width: 20px;
            min-width: 20px;
            z-index: auto;
        }

        span{
            color: rgb(249, 249, 249);
            font-size: 13px;
            letter-spacing: 1.42px;
            line-height: 1.08;
            padding: 2px 0px;
            white-space: nowrap;
            position: relative;

            &:before{
                content: '';
                position: absolute;
                width: 100%;
                transform: scaleX(0);
                height: 2px;
                bottom: -6px;
                left: 0px;
                opacity: 0;
                background-color: rgb(249, 249, 249);
                border-radius: 0px 0px 4px 4px;
                transform-origin: left center;
                transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
            }
        }

        &:hover{
            span:before{
                transform: scaleX(1);
                transform-origin: bottom left;
                opacity: 1 !important;
            }
        }
    }

    @media (max-width: 768px){
        display: none;
    }
`;

//Login Button
const Login = styled.a`
    background-color: rgba(0, 0, 0, 0.6);
    padding: 8px 16px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    border: 1px solid #f9f9f9;
    border-radius: 4px;
    transition: all 0.2s ease 0s;

    &:hover{
        background-color: #f9f9f9;
        color: #000;
        border-color: transparent;
    }
`;

//For login image
const UserImg = styled.img`
    height: 100%;
    min-height: 48px;
    min-width: 48px;
`;

const DropDown = styled.div`
    position: absolute;
    top: 48px;
    right: 0px;
    background: rgb(19,19,19);
    border: 1px solid rgba(151, 151, 151, 0.34);
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 18px 0px;
    padding: 10px;
    font-size: 12px;
    letter-spacing: 3px;
    width: 100px;
    opacity: 0;
`;

const SignOut = styled.div`
    position: relative;
    height: 48px;
    width: 48px;
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;

    ${UserImg}{
        border-radius: 50%;
        width: 100%;
        height: 100%;
    }

    &:hover{
        ${DropDown}{
            opacity: 1;
            transition-duration: 1s;
        }
    }
`;

export default Header;