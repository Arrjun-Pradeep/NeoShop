import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {  useParams } from "react-router-dom";
import './ListingProduct.css';
import { abi } from "../../abi";
import {ethers} from "ethers"


const ListingProducts = () => {
    const { value } = useParams();
    const [error, setError] = useState('');
    const [data, setData] = useState([]);
    const address = '0xc810D6E3fDe8F1ca263b07B182147b9d93E7a3E2';

    useEffect(() => {
        const body = {
            search: value
        };
        const headers = { 'Content-Type': 'application/json' }
        
        fetch('http://localhost:5000/products/search', {method: 'POST', body: JSON.stringify(body), headers: headers})
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
                setData(value.data);
                console.log(value.data);
            }
        })
        .catch((err) => {
            console.log(err);
            setError('Some API ERROR');
        });
    }, []);

    const handleBuy = async (quantity, price, sellerWalletAddress, id) => {
        const headers = { 'Content-Type': 'application/json' }
        let amount =  quantity * price;
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const body = {
            id,
            quantity
        };
        fetch('http://localhost:5000/products/update/', {method: 'POST', body: JSON.stringify(body), headers: headers})
        .then((data) => {
            if(data.status === 200) {
                console.log('ok');
                // return data.json();
            } else {
                setError('Some Error Found');
            }
        })
        .catch((err) => {
            console.log(err);
            setError('Some API ERROR');
        });
        if(abi !== '{}') {
            const contract = new ethers.Contract(address, abi, signer);
            const newAmount = ethers.utils.formatEther(amount);
            await contract.buy(newAmount, {value: newAmount});
        }
    } 

    return (
        <>
            {
                error === '' && data.length > 0?
                <>
                    <div className="gradientContainer" />
                    <div className="listingContainerSearch">
                    {
                        data.map((value, index) => {
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
                                        <span className="buyBtn" onClick={() => handleBuy(quantity, value.price, value.sellerWalletAddress, value._id)}>
                                            Buy
                                        </span>
                                    </div>
                                </span>
                            )
                        })
                    }
                    </div>
                </>
                : 
                <div>
                    <span className="errorText">{error}</span>
                </div>
            }
        </>
    )
};

export default ListingProducts;