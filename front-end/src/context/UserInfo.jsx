import React from 'react';

const ComponentContext = React.createContext(null);

const UserInfo = ({children}) => {
    const defaultInfo = {
        //login info
        email: '', 
        password: '',

        //reservation or order info
        cartProducts: [],

        //checkout info
        saveInfo: {
            personalInfo: {
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: ""
            },
            shippingInfo: {
                streetAddress: "",
                province: "",
                city: "",
                zip: ""
            }
        }
        
    }

    const [isLogin, setIsLogin] = React.useState(false);
    const [userGeneralInfo, setUserGeneralInfo] = React.useState(defaultInfo);

    const [displayHistory, setDisplayHistory] = React.useState([]);
    React.useEffect(() => {
        
        if (!!userGeneralInfo?.orderHistory)
        setDisplayHistory(userGeneralInfo.orderHistory)
    }, [userGeneralInfo.orderHistory]);

    //Date Filter 
    const [fromDate, setFromDate] = React.useState("");
    const [toDate, setToDate] = React.useState("");

    React.useEffect(() => {
    
        if (!!fromDate && !!toDate) {
            
            setDisplayHistory(() => {
                const updated = [...userGeneralInfo.orderHistory].filter(order => {
                    const formattedDate = order.info.orderedDate.split('T')[0];


                    const orderDate = new Date(formattedDate).getTime();
                    console.log(formattedDate);
                    console.log(toDate);

                    const from = new Date(fromDate).getTime();
                    const to = new Date(toDate).getTime();
                    
                    return orderDate >= from && orderDate <= to
                });

                return updated
            })
        }

    }, [fromDate, toDate, userGeneralInfo.orderHistory]);

    const addHistory = (newHistory, saveInfo) => {
       setUserGeneralInfo(prev => ({
        ...prev,
        saveInfo,
        orderHistory: [...prev.orderHistory, newHistory]
       }))  
    }

    const removeHistory = (_id) => {
        setUserGeneralInfo(prev => ({
            ...prev,
            orderHistory: prev.orderHistory.filter(data => data._id !== _id)
        }))
    }

    const resetInfo = () => {
        setUserGeneralInfo(defaultInfo);
    }

    const updateSaveInfo = (newInfo) => {

        setUserGeneralInfo(prev => ({
            ...prev,
            saveInfo: newInfo
        }))
    }

    return (

        <ComponentContext.Provider value={{
            updateSaveInfo,
            isLogin, 
            setIsLogin, 
            addHistory, resetInfo,
            setFromDate, setToDate,
            fromDate, toDate,
            userGeneralInfo, setUserGeneralInfo, removeHistory, displayHistory
        }}>
         {children}
        </ComponentContext.Provider>

    )
}

export const useUserinfo  = () => {

    return React.useContext(ComponentContext);
}

export default UserInfo;