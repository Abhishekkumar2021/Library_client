import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ThemeContext from "../contexts/Theme";
import UserContext from "../contexts/User";
import { useState } from "react";
import { Link } from "react-router-dom";
import mainApi from '../API/Main'

// icons
import {BsFillMoonFill} from 'react-icons/bs';
import {BsFillSunFill} from 'react-icons/bs';
import { RiLockPasswordLine, RiSendPlaneFill } from 'react-icons/ri';
import {MdAlternateEmail} from 'react-icons/md'
import {AiOutlineLoading3Quarters} from 'react-icons/ai'
import useInput from "../hooks/useInput";

const StyledLogin = styled.div`
    width:100%;
    min-height:100vh;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    background-color:${props => props.theme === 'light' ? '#f5f5f5' : '#15151b'};
    color:${props => props.theme === 'light' ? '#181818' : '#eeeeee'};
    #theme{
        z-index:100;
        display: grid;
        place-items: center;
        position:absolute;
        top:1rem;
        right:1rem;
        background-color:${props => props.theme === 'light' ? '#ffffff' : '#202228'};
        border:none;
        font-size:1.6rem;
        cursor:pointer;
        color:${props => props.theme === 'light' ? '#181818' : '#eeeeee'};
        width:60px;
        height:60px;
        border-radius:50%;
        box-shadow:0 4px 5px 0 rgba(0,0,0,0.2);
        border:1px solid ${props => props.theme === 'light' ? '#ececec' : '#2e3032'};
        transition : all 0.2s ease-in-out;
        &:hover{
            background-color:${props => props.theme === 'light' ? '#f4f4f4' : '#292d31'};
        }
        &:active{
            transform: scale(0.96);
        }

    }
    h1{
        font-size:2rem;
        margin-bottom:1rem;
    }
    .form{
        width:100%;
        max-width:400px;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        padding:30px;
        border-radius:10px;
        background-color:${props => props.theme === 'light' ? '#ffffff' : '#202228'};
        box-shadow:0 4px 5px 0 rgba(0,0,0,0.2);
        border:1px solid ${props => props.theme === 'light' ? '#ececec' : '#2e3032'};
        gap:1rem;
        .form-control{
            width:100%;
            display:flex;
            justify-content: space-between;
            .label{
                display:flex;
                align-items: center;
                gap:10px;
                .icon{
                    font-size: 1.5rem;
                    border: 1px solid ${props => props.theme === 'light' ? '#d9d9d9' : '#383a3c'};
                    width:40px;
                    height:40px;
                    padding:5px;
                    border-radius:50%;
                }
            }
            input{
                color-scheme: ${props => props.theme};
                padding:10px;
                border:none;
                border-radius:5px;
                background-color:${props => props.theme === 'light' ? '#f5f5f5' : '#2e3032'};
                color:${props => props.theme === 'light' ? '#181818' : '#eeeeee'};
                outline:none;
                font-size:0.9rem;
                &:focus{
                    outline: 1px solid ${props => props.theme === 'light' ? '#d6d6d6' : '#494b4d'};
                }
                &:hover{
                    outline: 1px solid ${props => props.theme === 'light' ? '#d6d6d6' : '#494b4d'};
                }

            }

        }
        button{
            margin-top:2rem;
            padding:10px 30px;
            border:none;
            border-radius:5px;
            font-size: 1.2rem;
            border-radius: 30px;
            background-color:${props => props.theme === 'light' ? '#112a55' : '#aad5ff'};
            color:${props => props.theme === 'light' ? '#ffffff' : '#181818'};
            display:flex;
            align-items: center;
            gap:10px;
            cursor:pointer;
            transition : all 0.2s ease-in-out;
            .icon{
                width:30px;
                height:30px;
                border-radius:50%;
            }
            &:active{
                transform: scale(0.96);
            } 
        }
        a{
            color:${props => props.theme === 'light' ? '#112a55' : '#aad5ff'};
            text-decoration:none;
            &:hover{
                text-decoration:underline;
            }
        }
    }
    .bottom{
        margin-top: 3rem;
        #loading{
            font-size:5rem;
            color:${props => props.theme === 'light' ? '#112a55' : '#aad5ff'};
            animation: rotate 1s linear infinite;
        }
        #error{
            background-color: ${props => props.theme === 'light' ? '#ff3228' : '#ff4f4f'};
            color:white;
            padding:15px 25px;
            border-radius:25px;
            font-size:1.2rem;
        }
        #success{
            background-color: ${props => props.theme === 'light' ? '#2baf0b' : '#abffa4'};
            padding:15px 25px;
            border-radius:25px;
            font-size:1.2rem;
            color:${props => props.theme === 'light' ? '#ffffff' : '#181818'};
        }

    }

    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);

        }
    }
   
`;

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const {theme, setTheme} = useContext(ThemeContext)
    const {user, setUser} = useContext(UserContext);
    const emailBind = useInput('');
    const passwordBind = useInput('');
    useEffect(() => {
        if(user) navigate('/');
    }, [user, navigate])

    const handleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try{
            const res = await mainApi.post('/api/auth/login', {
                email: emailBind.value,
                password: passwordBind.value,
            });
            setLoading(false);
            const {_id, name, email, role} = res.data.user;
            setUser({
                id: _id,
                name,
                email,
                role
            });
        }catch(err : any){
            setLoading(false);
            setError(err.response.data.error);
            setTimeout(() => {
                setError('');
            }, 2000)
        }
    }

    return (
        <StyledLogin theme={theme} >
            <button id="theme" onClick = {handleTheme}>{ theme === 'light' ? <BsFillMoonFill className='icon'/> : <BsFillSunFill className='icon'/>}</button>
            <h1 className="title">Login</h1>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-control"> 
                    <div className="label">
                        <MdAlternateEmail className='icon'/>
                        <label htmlFor="email">Email</label>
                    </div>
                    <input type="email" id="email" { ...emailBind } required />
                </div>
                <div className="form-control">
                    <div className="label">
                        <RiLockPasswordLine className='icon'/>
                        <label htmlFor="password">Password</label>
                    </div>
                    <input type="password" id="password" {...passwordBind} required/>
                </div>
                <button type="submit" disabled={loading}> <RiSendPlaneFill className='icon'/>Login</button>
                <div className="already">
                    Dont't have an account? <Link to="/register">Register</Link>
                </div>
            </form>

            <div className="bottom">
                {loading && <AiOutlineLoading3Quarters id="loading"/>}
                {error && <div id="error">{error}</div>}
            </div>
        </StyledLogin>
    )
}

export default Login;