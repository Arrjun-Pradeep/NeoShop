import React, { useEffect, useState } from "react";
import './Admin.css';
import { Box, TextField , InputLabel, MenuItem, FormControl, Select, Button} from "@material-ui/core";

const Admin = () => {

    const [productName, setProductName] = useState('');
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [categoryData, setCategoryData] = useState([]);
    const [subCategoryData, setSubCategoryData] = useState([]);
    const [error, setError] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [wallet, setWallet] = useState('');
    const [brandName, setBrandName] = useState('');
    const [sellerName, setSellerName] = useState('');
    const [file, setFile] = useState();


    const headers = { 'Content-Type': 'application/json' };

    useEffect(() => {

        fetch('http://localhost:5000/category', {method: 'GET', headers: headers})
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
                setCategoryData(value.data);
            }
        })
        .catch((err) => {
            console.log(err);
            setError('Some API ERROR');
        });
    }, []);

    const handleCategoryChange = (value) => {
        console.log(value);
        setCategory(value);
        const body = {
            categoryId: value
        };
        fetch('http://localhost:5000/subcategory/sub', {method: 'POST', body: JSON.stringify(body), headers: headers})
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
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData();
        data.append('file', file);
        data.append('productName', productName);
        data.append('categoryId', category);
        data.append('subCategoryId', subCategory);
        data.append('description', description);
        data.append('price', price);
        data.append('sellerWalletAddress', wallet);
        data.append('brandName', brandName);
        data.append('sellerName', sellerName);
        data.append('quantity', quantity);

        console.log(data);

        fetch('http://localhost:5000/products/', {method: 'POST', body: data })
        .then((data) => {   
            if(data.status === 200) {
                return data.json();
            } else {
                setError('Some Error Found');
            }
        })
        .then((value) => {
            // if(value.data.length === 0) {
            //     setError('No Data Found');
            // } else {
            //     setSubCategoryData(value.data);
            //     console.log(value.data);
            // }
            setBrandName('');
            setCategory('');
            setDescription('');
            setFile(null);
            setPrice(0);
            setProductName('');
            setQuantity(0);
            setSellerName('');
            setSubCategory('');
            setWallet('');
        })
        .catch((err) => {
            console.log(err);
            setError('Some API ERROR');
        });
    }

    const handleFile = (event) => {
        setFile(event.target.files[0]);
    }


    return(
        <div className="adminContainerBody">
            <div className="productAddContainer">
                <span className="productAddText">
                    Add a Product: 
                </span>
            </div>
            <div className="productAddForm">
                <Box 
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },                        
                    }}
                    noValidate
                    autoComplete="off"
                >   
                    <div>
                    <TextField label="Product Name" variant="standard" 
                        value={productName} onChange={(event) => setProductName(event.target.value)}
                    />
                    </div>
                    <div>
                    <FormControl>
                        <InputLabel>Select Category</InputLabel>
                        <Select
                            value={category}
                            onChange={(event) => handleCategoryChange(event.target.value)}                            
                        >
                            {
                                categoryData.map((data, index) => {
                                    return(
                                        <MenuItem value={data._id} key={index}>{data.name}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                    </div>
                    <div>
                    <FormControl>
                        <InputLabel>Select Subcategory</InputLabel>
                        <Select
                            value={subCategory}
                            onChange={(event) => setSubCategory(event.target.value)}                            
                        >
                            {
                                subCategoryData.map((data, index) => {
                                    return(
                                        <MenuItem value={data._id} key={index}>{data.name}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                    </div>
                    <div>
                    <TextField label="Description" variant="standard" 
                        value={description} onChange={(event) => setDescription(event.target.value)}
                    />
                    </div>
                    <div>
                    <TextField
                        type="number"
                        label="Price"
                        value={price}
                        onChange={(event) => setPrice(event.target.value)}
                    />
                    </div>
                    <div>
                    <TextField label="Seller Wallet Address" variant="standard" 
                        value={wallet} onChange={(event) => setWallet(event.target.value)}
                    />
                    </div>
                    <div>
                    <TextField label="Brand Name" variant="standard" 
                        value={brandName} onChange={(event) => setBrandName(event.target.value)}
                    />
                    </div>
                    <div>
                    <TextField label="Seller Name" variant="standard" 
                        value={sellerName} onChange={(event) => setSellerName(event.target.value)}
                    />
                    </div>
                    <div>
                    <TextField
                        type="number"
                        label="Quantity"
                        value={quantity}
                        onChange={(event) => setQuantity(event.target.value)}
                    />
                    </div>
                    <div>
                        <input type="file" name="file" onChange={handleFile} />
                    </div>
                    <div>
                        <button type="submit" onClick={handleSubmit}>Submit</button>
                    </div>
                </Box>
            </div>
        </div>
    )
};

export default Admin;