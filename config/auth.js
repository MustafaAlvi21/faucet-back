var basicAuth = require('basic-auth');


/*  ---------------------------------------------  */
/*                   Basic Auth                    */
/*  ---------------------------------------------  */
const auth = async function (req, res, next) {
    var user = basicAuth(req);

    if (!user || !user.name || !user.pass) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      res.sendStatus(401);
      return;
    }
    if (user.name === process.env.User && user.pass === process.env.Pass) {
      console.log("access");

      let isConnected = !!await require('dns').promises.resolve('google.com')
      .then(()=>{
        next();
      })
      .catch(()=>{
        return res.json("No internet connection, please connect to internet");
      });    
    } else {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      res.sendStatus(401);
      return;
    }
}

module.exports = auth;