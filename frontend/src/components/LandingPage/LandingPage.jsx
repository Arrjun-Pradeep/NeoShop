import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import './LandingPage.css';
import {ethers} from "ethers"
import $ from 'jquery';

const LandingPage = () => {
    
    const [subCategoryData, setSubCategoryData] = useState([]);
    const [error, setError] = useState('');
    const [products, setProducts] = useState([]);
    const [listError, setErrorList] = useState('');

    useEffect(() => {
        const headers = { 'Content-Type': 'application/json' };
        fetch('http://localhost:5000/subcategory', {method: 'GET', headers: headers})
        .then((data) => {
            if(data.status === 200) {
                return data.json();
            } else {
                setError('Some Error Found');
            }
        })
        .then((value) => {
            if(value.data.length === 0) {
                setError('No Data Found');
            } else {
                setSubCategoryData(value.data);
                console.log(value.data);
            }
        })
        .catch((err) => {
            console.log(err);
            setError('Some API ERROR');
        });


    }, []);



    const handleSubCategory = (id) => {
        const headers = { 'Content-Type': 'application/json' };
        const body = {
            subCategoryId: id
        };

        fetch('http://localhost:5000/products/get', {method: 'POST', body: JSON.stringify(body) ,headers: headers})
        .then((data) => {
            if(data.status === 200) {
                return data.json();
            } else {
                setErrorList('Some Error Found');
            }
        })
        .then((value) => {
            if(value.data.length === 0) {
                setErrorList('No Data Found');
            } else {
                setProducts(value.data);
                console.log(value.data);
            }
        })
        .catch((err) => {
            console.log(err);
            setErrorList('Some API ERROR');
        });
    }

    const handleBuy = ( quantity, price, sellerWalletAddress) => {
        console.log(quantity, price, sellerWalletAddress);
    } 

    return(
        <div className="landingPage">
            {
                error === '' && subCategoryData.length > 0 ?
                <div className="subCategoryList">
                    {
                        subCategoryData.map((data, index) => {
                            return(
                                <span key={index} className="subCName" onClick={() => handleSubCategory(data._id)}>
                                    {data.name}
                                </span>
                            )
                        })
                    }
                </div>
                :
                <div>
                    <span className="errorText">{error}</span>
                </div>
            }
            <div className="landingPageImage" style={{backgroundImage: `url(/imageshop.png)`}} />
            {
                listError === '' && products.length > 0 ?
                <div className="subCategoryList">
                    {
                        products.map((value, index) => {
                            let quantity;
                            return(
                                <span className="listContainer" key={index}>
                                    <span className="imgContainer" style={{ backgroundImage: `url(${value.imageAddress})`}} />
                                    <div className="listName">
                                        {value.name}
                                    </div>
                                    <div>
                                        <span>
                                            {value.price + " "}
                                        </span>
                                        <span className="maticText">
                                            MATIC
                                        </span>
                                    </div>
                                    <div className="listDescription">
                                        {value.description}
                                    </div>
                                    <div className="maticText">
                                        {value.brandName}
                                    </div>
                                    <div>
                                        {"By " + value.sellerName}
                                    </div>
                                    <div>
                                        <span className="widthDropdownInput">
                                            <input type="number" placeholder="Value" max={2} min={0} onChange={(event) => quantity = event.target.value} className="widthApplyComponent" />
                                        </span>
                                    </div>
                                    <hr />
                                    <div className="buyButton">
                                        <span className="buyBtn" onClick={() => handleBuy(quantity, value.price, value.sellerWalletAddress)}>
                                            Buy
                                        </span>
                                    </div>
                                </span>
                            )
                        })
                    }
                </div>
                :
                <div>
                    <span className="errorText">{listError}</span>
                </div>
            }
        </div>
    )
}

export default LandingPage;