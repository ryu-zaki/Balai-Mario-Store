
const express = require('express');
const router = express.Router();
const {getInfoFromToken, addCartItem, validateCookie} = require('./middlewares');

//database User Schema
const User = require('../schemas/User');

router.post('/add-dish', validateCookie, getInfoFromToken, addCartItem, (req, res) => {

    res.json({accessToken: req.accessToken, newProduct: req.newProduct});
})

router.use(validateCookie);
router.use(getInfoFromToken);

router.post("/remove-dish",  async (req,  res) => {
  const {email, password} = req.user;

  try {

      await User.updateOne({email: email, password: password}, {
        $pull: {
            cartProducts: {
                _id: req.body._id
            }
        }
      })

      return res.json({accessToken: req.accessToken});
  }
  
  
  catch(err) {
    console.log(err.message);
    return res.sendStatus(500)
  }
})


router.post('/checkout', async (req, res) => {
  const {user, body} = req;
  const {email, password} = user;
   
  const {info, category} = body;

  try {
   
    await User.updateOne({email, password}, {
      $push: {
        orderHistory: info
      }
    })
    
    if (category === "cart-dish") {
      await User.updateOne({email, password}, {
        $set: {
          cartProducts: []
        }
      })
    }
    
    const { orderHistory } = await User.findOne({email, password}).select("orderHistory").exec();
    
    res.json({
      accessToken: req.accessToken,
      newData: orderHistory[orderHistory.length - 1]
    });

  }

  catch(err) {
    return res.sendStatus(500) //Intrnal Server Error
  }

})
//http://localhost:3000/
router.post('/remove-history',  async (req, res) => {

  const {_id} = req.body;
  const { email, password } = req.user;
  
  try {
    const result = await User.updateOne({email: "jhonwellespanola4@gmail.com", password: ""}, { $pull: { orderHistory: { _id } } })
    
    res.json({accessToken: req.accessToken});

  }

  catch(err) {
     console.log(err);
     return res.sendStatus(500) //Internal Server Error
  }

})

module.exports = router;