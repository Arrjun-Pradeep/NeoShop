const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const bodyParserErrorHandler = require('express-body-parser-error-handler')

mongoose.connect(process.env.MONGO_ENV)
    .then(res => console.log(`connection successfull`))
    .catch(err => console.log(`error connecting ${err}`));  

app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParserErrorHandler());
app.use(cors());

const port = 5000;
const categoryRouter = require('./src/routes/Category');
app.use('/category', categoryRouter);
const subCategoryRouter = require('./src/routes/SubCategory');
app.use('/subcategory', subCategoryRouter);
const productsRouter = require('./src/routes/Products');
app.use('/products', productsRouter);
const userRouter = require('./src/routes/Users');
app.use('/user', userRouter);

app.listen( port , ()=>{
    console.log(`listening on ${port}`);
});