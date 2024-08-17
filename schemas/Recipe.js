const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
   recipeName: String,
   price: {
    type: mongoose.Schema.Types.Mixed,
    validate: {
        validator: value => {
            return typeof value === 'object' || typeof value === 'number';
        },
        message: props => `Invalid value: ${props.value}. Must be an object or a number`
    }
   },

   image: String,
   category: String,
   limit: {
    type: mongoose.Schema.Types.Mixed,
    validate: {
        validator: value => {
          return typeof value === "object" || typeof value === "string"
        },

        message: props =>  `Invalid value: ${props.value}. Must be an object or a string`
    }
   },
   hearts: Number
});


module.exports = mongoose.model("Recipes", RecipeSchema);