import React, { createContext, useContext } from 'react';
import { availRecipes, availCategories } from '../info/RecipesInfo';


const ComponentContext = createContext(null);

const AvailableRecipes = ({children}) => {
    
    const [categories] = React.useState(availCategories);
    const [recipes, setRecipes] = React.useState(availRecipes);

    const [invUserProInfo, setInvUserProInfo] = React.useState([]);

    const handleHeartToggle = (recipeName) => {

      setInvUserProInfo((prev) => {
        const arr = [...prev]
         for (let i = 0; i < arr.length; i++) {

          if (arr[i].recipeName === recipeName) {
              const prevIsLiked = arr[i].isLiked;
              arr[i].isLiked = !prevIsLiked;
              
              break;
          }

         }
         return arr;
      })
    }

    const handleHeartNum = (invInfo) => {
      setRecipes(prev => {
        const arr = [...prev];
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].recipeName === invInfo.recipeName) {
            const prevHeart = arr[i].hearts;

            arr[i].hearts = !!invInfo.isLiked ? prevHeart + 1 : !prevHeart ? 0 : prevHeart - 1;
            break;
          }
        }
        return arr;

      });
    }

    const handleQuanOperation = (recipeName, addOrSub) => {

      setInvUserProInfo((prev) => {
        const arr = [...prev]
         for (let i = 0; i < arr.length; i++) {

          if (arr[i].recipeName === recipeName) {
              const prevQuan = arr[i].quantity;

                arr[i].quantity = addOrSub >= 0 ? 
                prevQuan + 1 : prevQuan <= 1 ? prevQuan : prevQuan - 1;
              
              
              break;
          }

         }
         return arr;
      })
    }

    const handleVariant = (recipeName, variant) => {

      setInvUserProInfo((prev) => {
        const arr = [...prev]
         for (let i = 0; i < arr.length; i++) {

          if (arr[i].recipeName === recipeName) {
              
            if (variant === "whole") {
              arr[i].isWhole = true;
            } else {
              arr[i].isWhole = false;
            }
              
              
              break;
          }

         }
         return arr;
      })

      

    }

    React.useEffect(() => {
      
      const info = recipes.map(({recipeName, price, limit}) => {
        
        return (
          { 
            recipeName, 
            quantity: 1, 
            isLiked: false,
            price: isNaN(price) ? ({whole: price.whole, half: price.half}) : price,

            limit: isNaN(price) ? ({whole: limit.whole, half: limit.half}) : limit,
            
            isWhole: true
          })

       })

      setInvUserProInfo(info);

    }, [recipes, setInvUserProInfo]);

    return (
        <ComponentContext.Provider value={{recipes, categories, setRecipes, invUserProInfo, handleHeartToggle, handleHeartNum, handleQuanOperation, handleVariant}}>
          {children}
        </ComponentContext.Provider>
    )
}

export const useAvailableRecipes = () => {
  return useContext(ComponentContext);
}

export default AvailableRecipes;