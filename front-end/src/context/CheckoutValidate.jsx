import React, { createContext, useContext, useRef } from 'react'
import { useUserinfo } from './UserInfo';

const ComponentContext = createContext(null);

const CheckoutValidate = ({children}) => {
 
  const [isValidationClick, setIsValidationClick] = React.useState(false);
  const [paymentMethod, setPaymentMethod] = React.useState("paypal");
  const [typeOrder, setTypeOrder] = React.useState("reservation");  
  const {userGeneralInfo} = useUserinfo();

  const [userInfo, setUserInfo] = React.useState({
    fields: [
    {
      type: "firstName",
      value: '',
      isValid: true,
      label: "First Name",
      example: "Jhonwell"
    },
    {
      type: "lastName",
      value: '',
      isValid: true,
      label: "Last Name",
      example: "Española"
    },
    {
      type: "email",
      value: '',
      isValid: true,
      label: "Email",
      example: "jhonwellespanola4@gmail.com"
    },
    {
      type: "phoneNumber",
      value: '',
      label: 'Phone Number',
      isValid: true,
      example: "09514406062"
    },
   ],

   validateFields() {
    setUserInfo(prev => {
      const fields = [...prev.fields];

      for (let i = 0; i < fields.length; i++) {
          const {value, type} = fields[i];
          fields[i].isValid = !!value;
          
          //patterns
          const emailPattern = /.*@.*\.+.*/g.test(value);
          const phonePattern = /\d{11}/.test(value);
          if (type === "email") {
            fields[i].isValid = emailPattern;
          }
           
           
          if (type === "phoneNumber") {
            fields[i].isValid = phonePattern;
          }
          
      }
      return {...prev, fields};
    })
   } 

});

  const saveInformation = async () => {
    const saveInfo = { personalInfo: {}, shippingInfo: {} }
  
    userInfo.fields.forEach(field => {
    saveInfo.personalInfo[field.type] = field.value;
    })

    orderInfo.delivery.fields.forEach(field => {
      saveInfo.shippingInfo[field.type] = field.value;
    })
    
    
    const accessToken = localStorage.getItem("accessToken");
   
    try {

      await fetch('http://localhost:2000/users/save-info', {
        method: "POST",
        credentials: 'include',
        headers: {
          authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(saveInfo)
      })

      return saveInfo
    }

    catch(err) {
      console.log(err);
      window.alert(err.message);
    }

    
  } 


  const [orderInfo, setOrderInfo] = React.useState({
    reservation: {
      resetMsg: false,
      fields: [
         {
          type: 'arrivalDate',
          label: 'Date of Arrival at Balai Mario',
          value: new Date().toISOString().split("T")[0],
          isValid: true
         },
         {
          type: 'optionalMessage',
          label: 'Optional Message',
          value: "",
          isValid: true,
          isOptional: true
         },

      ],
      validateInfo() {
        setOrderInfo(prev => {
          
          const fields = [...prev.reservation.fields];
          let resetMsg = true
          for (let i = 0; i < fields.length; i++) {
            let boolValue = !!fields[i].value;
             fields[i].isValid = !!fields[i].isOptional ? true : boolValue;

             if (!boolValue) resetMsg = false;
          }

          return (
            {
              ...prev,
              reservation: {
              ...prev.reservation,
              fields,
              resetMsg
              
              }
            }
          )
        })
      }
    },
    delivery: {
      resetMsg: false,
      fields: [
        {
          type: "streetAddress",
          value: '',
          isValid: true,
          label: "Street Address",
          example: "Blk 50 Lot 9 Northville 2b, Bagumbong"
        },
        {
          type: "province",
          value: '',
          isValid: true,
          label: "State/Province",
          example: "Metro Manila"
        },
        {
          type: "city",
          value: '',
          isValid: true,
          label: "City",
          example: "Caloocan City"
        },
        {
          type: "zip",
          value: '',
          isValid: true,
          label: "ZIP/Postal Code",
          example: "1400"
        },
      ],

      validateInfo() {
         setOrderInfo(prev => {
           const arr = [...prev.delivery.fields];
           let resetMsg = true;
           for (let i = 0; i < arr.length; i++) {
            let boolValue = !!arr[i].value;
            arr[i].isValid = boolValue;

            if (!boolValue) resetMsg = false
           } 
          
          return ({
            ...prev,
            delivery: {
              ...prev.delivery,
              fields: arr,
              resetMsg
            }
          });
         })
      }
    },
    
    "special event": {
      resetMsg: false,
      fields: [
        {
          type: "event",
          value: "",
          isValid: true,
          label: "Type of event",
        },
        {
          type: "eventDate",
          value: new Date().toISOString().split("T")[0],
          isValid: true,
          label: "Date of this Event",
        },
        {
          type: "description",
          value: '',
          isValid: true,
          label: "Description of an actual event",
        },
      ],
      validateInfo() {
         setOrderInfo(prev => {
           const fields = [...prev["special event"].fields];
           let resetMsg = true;

           for (let i = 0; i < fields.length; i++) {
            const valueBool = !!fields[i].value
            fields[i].isValid = valueBool;
            
            if (!valueBool) resetMsg = false;
           }

           return ({
            ...prev,
            "special event": {
              ...prev["special event"],
              fields,
              resetMsg
            }
           })

         })    
      }
    }
  })


  const handleInfoGetter = (target, setState, category) => {

    const {id, value} = target;
    const isUserInfo = category === "userInfo";

    setState(prev => {
      const fields = isUserInfo ? [...prev.fields] : [...prev.delivery.fields];
 
      for (let i = 0; i < fields.length; i++) {
        if (fields[i].type === id) {
          
             fields[i] = {
             ...fields[i],
             isValid: true,
             value: value,
           }
        }
      }
 
      return isUserInfo ? 
      ({
        ...prev,
        fields
      }) : 
      ({
       ...prev,
       delivery: {
          ...prev.delivery,
          fields,
          resetMsg: true
       },
       
      })
     })
  }
  
  React.useEffect(() => { 
    const {saveInfo} = userGeneralInfo;


    if (!!saveInfo?.personalInfo?.firstName) {
      
      for (let key in saveInfo.personalInfo) {
        
        handleInfoGetter({
          id: key, 
          value: saveInfo.personalInfo[key]
        }, 
          setUserInfo, "userInfo");
      }
      
    }

    if (!!saveInfo?.shippingInfo?.zip) {
      for (let key in saveInfo.shippingInfo) {
        handleInfoGetter({
          id: key, 
          value: saveInfo.shippingInfo[key]
        }, 
          setOrderInfo, "orderInfo");
      }
    }


    

  }, [userGeneralInfo.saveInfo]);
 
  const handleUserInfo = ({target}) => {
    handleInfoGetter(target, setUserInfo, "userInfo");
  }

  const handleOrderType = ({target}) => {
    
    handleInfoGetter(target, setOrderInfo, "delivery");
  }

  const handleReservationField = ({target}) => {
    const {id, value} = target;
    setOrderInfo(prev => {
      const fields = [...prev.reservation.fields];
      for (let i = 0; i < fields.length; i++) {
    
        if (fields[i].type === id) {
          fields[i].value = value;
          fields[i].isValid = true;
        }

      }
    

      return ({
        ...prev, 
        reservation: {
          ...prev.reservation,
          fields,
          resetMsg: true
        }
      })
    })
  }

  const handleEventInfo = ({target}) => {

   const {id, value} = target;

   setOrderInfo(prev => {
    
    const fields = [...prev["special event"].fields];

    for (let i = 0; i < fields.length; i++) {
      const item = fields[i];
      if (item.type === id) {
        fields[i].value = value;
        fields[i].isValid = true;
      }
      
    }

    return({
      ...prev,
      "special event": {
        ...prev["special event"],
        fields,
        resetMsg: true
      }
    })
   })
    
  }

  //Storing in database

  const handlePassInfo = async (info, category) => {
    
    try {
      const result = await fetch('http://localhost:2000/cart/checkout', {
        method: "POST",
        credentials: 'include',
        headers: {
         Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
         'Content-Type': "application/json"
         },
        body: JSON.stringify({info, category})
      })

      const {accessToken, newData} = await result.json();

      if (!!accessToken) {
       localStorage.setItem("accessToken", accessToken);
      }

      return newData;
    }

    catch(err) {
      window.alert(err.message);
    }
  }

  const clearAllFields = () => {
    setUserInfo(prev => {
      const newFields = [];

      for (let i = 0; i < prev.fields.length; i++) {
       newFields.push({...prev.fields[i], value: ''})
      }

      return ({
        ...prev,
        fields: newFields
      })
    })

    setOrderInfo(prev => {
      const prevFields = prev[typeOrder].fields;
      const newFields = [];

      for (let i = 0; i < prevFields.length; i++) {   

        newFields.push({...prevFields[i], value: ""})

      }

      return ({
        ...prev,
        [typeOrder]: {
          ...prev[typeOrder],
          fields: newFields
        }
      })
    })

    setPaymentMethod("paypal");

  }


  return (
    <ComponentContext.Provider 
      value={
        { 
          userInfo, 
          handleUserInfo, 
          handleOrderType,
          saveInformation,
          orderInfo, 
          handleReservationField,
          handleEventInfo,
          isValidationClick, 
          setIsValidationClick,
          paymentMethod, 
          setPaymentMethod,
          typeOrder, setTypeOrder,
          handlePassInfo, clearAllFields
        }}>
      {children}
    </ComponentContext.Provider>
  )
}

export const useCheckoutValidate = () => {
  return useContext(ComponentContext);
}

export default CheckoutValidate
