import React from 'react';
import './Header.css';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import {ethers} from "ethers"
import $ from 'jquery';

const Header = () => {

    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const handleFormSubmit = (event) => {
        event.preventDefault();
        navigate(`/search/${search}`);
    }
    const [account, setAccount] = useState('');

    const connectHandler = async () => {
        if (window.ethereum) {
          try {
            const res = await window.ethereum.request({
              method: "eth_requestAccounts",
            });
            setAccount(res[0]);
            const headers = { 'Content-Type': 'application/json' };

            fetch('http://localhost:5000/user', { body: JSON.stringify({walletAddress: res[0]}), method: 'POST', headers: headers})
            .then((data) => {
                if(data.status === 200) {
                    return;
                } else {
                    setErrorMessage('Some Error Found');
                }
            })
            .catch((err) => {
                console.log(err);
                setErrorMessage('Some API ERROR');
            });
            // await accountChange(res[0]);
          } catch (err) {
            console.error(err);
            setErrorMessage("There was a problem connecting to MetaMask");
          }
        } else {
          setErrorMessage("Install MetaMask");
        }
      };

    const handleLogin = () => {
        connectHandler();
    }

    const handleAdmin = () => {
        setAccount('');
        navigate('/admin');
    }

    return (
        <div className='headerContainer'>
            <span className='headerText'>
                <NavLink to="/" className='headerText'>NeoShop</NavLink>
            </span>
            <form onSubmit={handleFormSubmit} className="formContainer">
                <TextField
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder='Search Anything'
                    className='headerSearchBar'
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                            <SearchIcon />
                            </InputAdornment>
                            )
                        }}
                />
            </form>
            <span className='adminPanel' onClick={handleAdmin}>
                Admin Panel
            </span>
            {
                account === '' ?
                <span className='loginButton'>
                    <button className="loginBtn" onClick={handleLogin}>Login</button>
                </span>
                :
                <span className='accountAddress'>
                    {account}
                </span>
            }

        </div>
    )
};

export default Header;