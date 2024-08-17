
const User = require('../schemas/User');


const emailAuth = async (email) => {

    try {
      const isExisting = await User.findOne({email});

      return !!isExisting;
    }


    catch({message}) {
        throw new Error(message);
    }
}

const userAccountAuth = async (email, password) => {

    try {
       const userAcc = await User.findOne({email, password});
       return userAcc;
    }
    
    catch({message}) {
        throw new Error(message)
    }
}


module.exports = {emailAuth, userAccountAuth};