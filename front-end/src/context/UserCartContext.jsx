import React, { createContext, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useUserinfo } from './UserInfo';

const ComponentContext = createContext(null);

const UserCartContext = ({children}) => {
  
  const {setUserGeneralInfo, userGeneralInfo} = useUserinfo();
  
  const [singleOrder, setSingleOrder] = React.useState({
  });
  const [notifVisible, setNotifVisible] = React.useState(false);

  React.useEffect(() => {
  
    if (notifVisible) {
        const timeout = setTimeout(() => {
            setNotifVisible(false)
        }, 2000);

        return () => clearTimeout(timeout);
    }

  }, [notifVisible])
  
  const handleAddProCart = (product, setIsLoading, setCartNotif, setNotifVisible) => {

    const productObj = {
      ...product,
      price: (isNaN(product.price) ? product.price[product.isWhole ? "whole" : "half"] : product.price ),

      limit: (isNaN(product.price) ? product.limit[product.isWhole ? "whole" : "half"] : product.limit ),

    }

    setCartNotif("Added to your cart");
    setNotifVisible(true);
    setIsLoading(true);
    const accessToken = localStorage.getItem("accessToken");

    //the fetch request
    fetch('http://localhost:2000/cart/add-dish', {
      method: "POST",
      credentials: "include",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({...productObj})
    })
    .then(data => data.json())
    .then(({accessToken, newProduct}) => {

      //condition for renewal of token
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
      }

      setUserGeneralInfo(prev => ({
        ...prev,
        cartProducts: [{
          ...newProduct,
        }, ...prev.cartProducts]
      }));

      //for modal
      setCartNotif("Added to your cart");
      setNotifVisible(true);
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => setIsLoading(false))


  }

  const handleDeleteProCart = (id, setIsLoading, setCartNotif = () => {}, setNotifVisible = () => {}) => {
    setIsLoading(true);

    fetch('http://localhost:2000/cart/remove-dish', {
        method: "POST",
        credentials: "include",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({_id: id})
      })
      .then(() => {
        setCartNotif("Removed from your cart")
        setNotifVisible(true);
    
        setUserGeneralInfo(prev => ({
          ...prev,
          cartProducts: prev.cartProducts.filter(data => data._id !== id)
        }));
      })
      .catch(err => {
        console.log(err);
        return err
      })
      .finally(() => setIsLoading(false));



  }

  const clearAllProducts = () => {
    setUserGeneralInfo(prev => ({
      ...prev,
      cartProducts: []
    }))
  }

  return (
    <ComponentContext.Provider value={{
          notifVisible,
          handleAddProCart, 
          handleDeleteProCart,
          clearAllProducts,
          handleDeleteProCart,
          singleOrder, setSingleOrder,
          totalProducts: userGeneralInfo?.cartProducts?.length}}>
      {children}
    </ComponentContext.Provider>
  )
}

export const useCart = () => {
    return useContext(ComponentContext);
}

export default UserCartContext
