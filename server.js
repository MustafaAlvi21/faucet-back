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
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection;
db.on('error', error => console.error(error))
db.once('open',()  => {
  console.log('Connected to MongoDB')
  console.log('process.env.DATABASE_URL ' + process.env.DATABASE_URL)
})




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
const faucetRouter = require('./routes/faucet')
app.use(('/'), faucetRouter);

const testRouter = require('./routes/test')
app.use(('/'), testRouter);



/*  ---------------------------------------------  */
/*                  listening Port                 */
/*  ---------------------------------------------  */  
const port1 = 4000
app.listen(process.env.PORT || port1, async () => {
  console.log('-------------------------------------------------');
  console.log('TetherMoon Node Server is running on Prot : ' + process.env.PORT || port1);
  console.log('-------------------------------------------------');
});