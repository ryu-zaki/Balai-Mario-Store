import React, { useContext } from 'react'
import { useCheckoutValidate } from './CheckoutValidate';

const ComponentContext = React.createContext(null);

function CheckoutContext({children}) {
  
  const {userInfo, orderInfo, paymentMethod} = useCheckoutValidate();
  

  return (
    <ComponentContext.Provider value={{}}>
       {children}
    </ComponentContext.Provider>
  )
}

export const useCheckout = () => {
    return useContext(ComponentContext);
}

export default CheckoutContext
