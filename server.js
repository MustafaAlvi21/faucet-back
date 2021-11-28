if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
  
const express = require("express");
const app = express();
const logger  = require("morgan");
const Web3  = require("web3");
const bodyParser = require("body-parser")
const cors = require('cors')


/*  ---------------------------------------------  */
/*                     MongoDB                     */
/*  ---------------------------------------------  */
console.log('process.env.DATABASE_URL ' + process.env.DATABASE_URL)
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection;
db.on('error', error => console.error(error))
db.once('open',()  => console.log('Connected Mongo'))




/*  ---------------------------------------------  */
/*            App Use And Set Methods              */
/*  ---------------------------------------------  */
app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


/*  ---------------------------------------------  */
/*              Route  Middleware                  */
/*  ---------------------------------------------  */
const indexRouter = require('./routes/index')
app.use(('/'), indexRouter);

const testRouter = require('./routes/test')
app.use(('/'), testRouter);


/*  ---------------------------------------------  */
/*                  listening Port                 */
/*  ---------------------------------------------  */  
const port1 = 4000
app.listen(process.env.PORT || port1, async () => {
  console.log('Prot is running at : ' + process.env.PORT || port1);
});