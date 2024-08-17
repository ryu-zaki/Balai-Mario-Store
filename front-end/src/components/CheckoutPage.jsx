import React, { useRef } from 'react';
import calendarIcon from '../assets/materials/calendar-icon.png';
import paypalIcon from '../assets/materials/paypal-icon.png';
import gcashIcon from '../assets/materials/gcash-icon.png';
import { useNavigate, useParams } from 'react-router';
import { useCheckoutValidate } from '../context/CheckoutValidate';
import { DeliveryBox, ReservationBox, SpecialEventBox } from './PaymentMethodOptions/FieldBoxes';
import OrderSummary from './OrderSummary/OrderSummary';
import { useCart } from '../context/UserCartContext';
import { useCheckout } from '../context/CheckoutContext';
import { useUserinfo } from '../context/UserInfo';
import SavedMessage from './Modals/SavedMessage';
import saveModalIcon from '../assets/materials/saved-modal-icon.png';

const CheckoutPage  = ({setIsFinish}) => {
    const {mode} = useParams();
    const navigate = useNavigate();
    const [checkoutPages, setCheckoutPages] = React.useState([]);
    const [pagesIndex, setPagesIndex] = React.useState(0);
    const [indexTrigger, setIndexTrigger] = React.useState({trigger: false, buttonCategory: ''});
    const [isLargeScreen, setIsLargeScreen] = React.useState();
    const [loadingVisible, setLoadingVisible] = React.useState(false);
    const { userInfo, orderInfo, setIsValidationClick, typeOrder, setTypeOrder, paymentMethod, handlePassInfo, saveInformation} = useCheckoutValidate();
    const {userGeneralInfo, addHistory} = useUserinfo();
    const {singleOrder} = useCart();
    const {cartProducts} = userGeneralInfo;
    


    const typeOrderBoxes = {
        reservation: <ReservationBox />,
        "special event": <SpecialEventBox />,
        delivery: <DeliveryBox />
    }

    const handleChangePages = (buttonCategory, pageValid) => {
        
        //blocker if the user inputs is not valid
        if (!pageValid) return;

        if (buttonCategory === "add") {
           //to make the loading icon appear
           setLoadingVisible(true);
           const timeout = setTimeout(() => {
            //to make the loading icon disappear
            setLoadingVisible(false);
            
            if (pagesIndex >= checkoutPages.length - 1) {

                const obj = {
                    [mode === "single-dish" ? "product" : "products_arr"]: mode === "single-dish" ? singleOrder : cartProducts,
                    info: {
                        orderedDate: new Date().toISOString(),
                        paymentMethod,
                        orderType: typeOrder,
                        status: "pending",
                        totalPrice: mode === "single-dish" ? 
                        
                        (( (isNaN(singleOrder.price) ?  singleOrder.price[singleOrder.isWhole ? "whole" : "half"] : singleOrder.price) * singleOrder.quantity) + 50) : 
                        
                        cartProducts.map(({price}) => isNaN(price) ? (price[price.isWhole ? "whole" : "half"]) : price).reduce((num, total) => num + total) + 50
                    }
                }
                
            
                //Database Storing
                handlePassInfo(obj, mode)
                .then(newData => {

                    saveInformation()
                    .then(saveInfo => {
                        setIsFinish(true);
                        window.scrollTo({
                            top: 0
                        });
    
                        //User State Storing
                        addHistory(newData, saveInfo);
                    })

                    
                })
            }

            //to next the slide in the pages
            setPagesIndex(prev => prev >= checkoutPages.length - 1 ? prev : prev + 1);

           }, 2000)
           return () => clearTimeout(timeout);
        }

        else if (buttonCategory === "sub") {
           //to next the slide in the pages
           setPagesIndex(prev => !prev ? 0 : prev - 1);
        }
   
    }
     
    React.useEffect(() => {
        const match = window.matchMedia("(min-width: 620px)");

        const handleChangeSize = (e) => {
            setIsLargeScreen(e.matches);
        }

        handleChangeSize(match);

        match.addEventListener('change', handleChangeSize);

        return () => {
            match.removeEventListener("change", handleChangeSize);
        }
        
    }, [])

    const handleIndex = ({target}) => {   
        
        //Use as a trigger in focus method
        setIsValidationClick(true);
    
        const orderOptions = {
            reservation: () => orderInfo.reservation.validateInfo(),
            delivery: () => orderInfo.delivery.validateInfo(),
            "special event": ()=> orderInfo["special event"].validateInfo()
        }

        //use to validate each field in state object
        const pagesValidations = [
            () => userInfo.validateFields(), 
            () => orderOptions[typeOrder](),
            () => null,
        ]
        
        if (target.id === "add") {
            pagesValidations[pagesIndex]();
        }
        
        //use to trigger an effect that can hanlde the validation of the whole page
         
        setIndexTrigger({
            trigger: true, 
            buttonCategory: target.id
        });
    }

    React.useEffect(() => {
        
        if (indexTrigger.trigger) {
          const paymentPanels = []
          const objArr = [userInfo, orderInfo[typeOrder]];
          const allValid = pagesIndex === 2 ? true : objArr[pagesIndex].fields.every(data => !!data.isValid);
          
          handleChangePages(indexTrigger.buttonCategory, allValid);
          

          //to reset the trigger and run this effect once again
          setIndexTrigger(prev => ({...prev, trigger: false}))
        }
        
    }, [indexTrigger.trigger]);

    const handleCancel = () => {
        navigate(-1);
        setPagesIndex(0)
    }

    React.useEffect(() => {
        const pages = [
          <PersonalInfo />, 
          <PaymentMethod 
             typeOrder={typeOrder} 
             setTypeOrder={setTypeOrder} 
             typeOrderBoxes={typeOrderBoxes}
          />, 
          <OrderSummary />];
        setCheckoutPages(pages);

    }, [typeOrder, setTypeOrder]);

    React.useEffect(() => {

        if (!!checkoutPages.length && pagesIndex === checkoutPages.length) {

            setIsFinish(true);
        }


    }, [pagesIndex, checkoutPages])


    React.useEffect(() => {
        window.scrollTo({top: 0}) 
    }, [pagesIndex]);

    const dots = new Array(3).fill("");

    const [saveMessActive, setSaveMessActive] = React.useState(true);

    return (
        <>
         {
            (!!userGeneralInfo?.saveInfo?.personalInfo?.firstName || 
                !!userGeneralInfo?.saveInfo?.shippingInfo?.zip) && (
                <SavedMessage 
                   state={saveMessActive}
                   setState={setSaveMessActive}
                   imgSrc={saveModalIcon}
                   message={"Your information was saved"} /> 
            )
         }

       
        {
            loadingVisible && (
         <div className='fixed z-30 inset-0 h-full w-full bg-darkOverlay flex flex-col gap-3 justify-center items-center'>
             <l-quantum
               size="60"
               speed="1.75"
               color="#f1f1f1" 
             ></l-quantum>
             <h3 className='text-lg font-semibold text-pureWhite animate-pulse'>Validating...</h3>
         </div>
            )
        }
        

        <div className='checkout-section w-full my-12'>
            <div className='flex w-full mb-16 flex-col items-center gap-5 px-7 lg:mb-20 lg:gap-10'>
                <h2 className='text-2xl title-font font-semibold sm:text-3xl lg:text-5xl'>Checkout</h2>
                <div className='flex dot-stages relative justify-between w-full xs:w-80 lg:w-96'>
                    
                    {
                      dots.map((data, index) => {

                        return <div key={index} className={`${index <= pagesIndex && "active"} border-2 border-pureWhite rounded-full w-7 aspect-1 bg-lightGray lg:w-10`}></div>
                      })
                    }
                    
                    {/* Line */}
                    <div className='absolute dots-line -z-10 left-0 h-1 top-1/2 -translate-y-1/2 w-full bg-lightGray lg:h-1.5'></div>
                </div>
            </div>
             
             <div className='stages-container sm:mx-auto'>
             <div className={`px-4 sm:p-7 sm:rounded-xl lg:p-12 ${isLargeScreen && "darker-shadow"}`}>

              {
                (pagesIndex < checkoutPages.length) &&
                checkoutPages[pagesIndex]
              }

              </div>

              <div className='pr-5 flex gap-2 mt-10  justify-end text-xs text-pureWhite sm:text-sm sm:pr-0 lg:text-base lg:gap-4'>
                 {
                    !!pagesIndex ? <button onClick={handleIndex} id="sub" className='rounded-lg bg-lightOrange p-2 px-6 lg:px-9'>Back</button> : <button onClick={handleCancel} className='rounded-lg bg-lightOrange p-2 px-6 lg:px-9'>Cancel</button>
                 }
                 <button id="add" onClick={handleIndex} className='rounded-lg bg-lightOrange p-2 px-6'>{
                    pagesIndex < checkoutPages.length -1 ? "Continue" : "finish"}</button>
              </div>
             </div>
             

        </div>
        </>
    )

    
}



const CreateInfoBox = (label, example) => {

    return (
        {
            label,
            example,
        }
    )
 }

    export const InfoBox = ({data, handleInfo, errMessage}) => {
        const {isValidationClick, setIsValidationClick} = useCheckoutValidate();
        const {label, example, isValid, value, type} = data;
        
        const InputRef = useRef();     

        React.useEffect(() => {

            if (!isValid && isValidationClick) {
                InputRef.current.focus();

                setIsValidationClick(false);
            }
            
        }, [isValid, isValidationClick]);
        
        
        
        
        return (
            <div className={`${label.includes("ZIP") && "w-1/2"} relative flex flex-grow flex-col gap-2 lg:gap-3`}>
                <div className='flex justify-between items-start gap-2 flex-col-reverse sm:flex-row'>
                <label className='text-sm sm:text-sm lg:text-base'>{label}</label>
                <span className={`absolute transition-all duration-500 -bottom-1 text-xxs ${isValid ? "translate-y-0 opacity-0 sm:translate-x-1/2" : "translate-y-full"} font-semibold text-red sm:relative sm:translate-y-0`}>*{errMessage}</span>
                </div>
                <input ref={InputRef} id={type} value={value} onChange={handleInfo} required className={`border ${isValid ? "border-gray" : "border-red"} w-full text-xs p-3 rounded-lg sm:p-3 lg:text-sm lg:p-4`} placeholder={`ex. ${example}`}/>
            </div>
        )
    }

const PersonalInfo = () => {
    const { handleUserInfo , userInfo } = useCheckoutValidate();
    return (
        <section className='personal-info-sec'>
            <h2 className='font-semibold mb-5 sm:text-xl sm:mb-7 lg:text-2xl'>Personal Info</h2>
            <div>
                {
                    userInfo.fields.map((data, index) => {
                      const errMessage = /email/.test(data.type) ? "Invalid Email" : /phoneNumber/.test(data.type) ? "Invalid format" : "Required Information";

                      return <InfoBox
                        errMessage={errMessage} 
                        handleInfo={handleUserInfo} 
                        data={data} 
                        key={index} />
                    })
                }
            </div>
        </section>
    )
}

const PaymentMethod = ({typeOrder, setTypeOrder, typeOrderBoxes}) => {
    const {orderInfo, paymentMethod, setPaymentMethod} = useCheckoutValidate();

    const handleInputClick = ({target}) => {

        target.nextElementSibling.click();

    }

return (
    <div>
        <div>
            <h2 className='font-semibold mb-5 sm:text-xl sm:mb-7 lg:text-2xl lg:mb-10'>Type of Order</h2>
            <div className='mt-5 flex flex-col gap-6 sm:flex-row sm:gap-10 lg:gap-10'>
                <div className='flex flex-col gap-5 text-sm lg:text-base'>
                
                  {/* Reservation */}

                    <div className='flex w-fit gap-2 items-center relative py-3 px-5 rounded-lg border border-lightOrange sm:w-auto'>
                        <div onClick={handleInputClick} className='absolute z-10 cursor-pointer inset-0'></div>
                        <input id="reservation" name='order-type' onChange={() => setTypeOrder("reservation")} checked={typeOrder === "reservation"} className='hidden' type='radio' />
                        <div className='custom-radio'></div>
                        <label htmlFor='reservation whitespace-nowrap'>Reservation</label>
                    </div>

                    {/* Reservation */}

                    <div className='flex gap-2 items-center relative py-3 px-5 rounded-lg border border-lightOrange w-fit sm:w-auto'>
                        <div onClick={handleInputClick} className='absolute z-10 cursor-pointer inset-0'></div>
                        <input id="delivery" name='order-type' onChange={() => setTypeOrder("delivery")} checked={typeOrder === "delivery"} className='hidden' type='radio' />
                        <div className='custom-radio'></div>
                        <label htmlFor='delivery whitespace-nowrap'>Delivery</label>
                    </div>

                    {/* Reservation */}

                    <div className='flex gap-2 items-center relative py-3 px-5 rounded-lg border border-lightOrange w-fit sm:w-auto'>
                        <div onClick={handleInputClick} className='absolute z-10 cursor-pointer inset-0'></div>
                        <input id="special event" name='order-type' onChange={() => setTypeOrder("special event")} checked={typeOrder === "special event"} className='hidden' type='radio' />
                        <div className='custom-radio'></div>
                        <label htmlFor='special event whitespace-nowrap'>Event</label>
                    </div>
                
                </div>
                
                <div className='mt-5 relative flex-grow sm:mt-0 xs:border xs:p-7 xs:border-gray xs:rounded-xl'>
                {
                    (orderInfo[typeOrder].fields.some(data => !data.isValid) && !orderInfo[typeOrder].resetMsg) && <span className="absolute  -top-3 -translate-y-full text-red font-semibold text-xs">*Please Complete the Info</span>
                }
                  {typeOrderBoxes[typeOrder]}
                </div>
            </div>
        </div>

        <div className='mt-7 border-t-2 pt-7 border-darkBrown lg:mt-16 lg:pt-16'>
            <h2 className='font-semibold mb-5 sm:text-xl sm:mb-7 lg:text-2xl lg:mb-10'>Payment Method</h2>
            <div className='flex items-start flex-row justify-between gap-6'>
                <div className='flex flex-col gap-3 text-sm sm:gap-6 lg:text-lg'>
                    <div className='flex gap-2 items-center relative py-3 px-5 rounded-lg border border-lightOrange w-fit sm:w-auto lg:gap-3'>
                        <div onClick={handleInputClick} className='absolute z-10 cursor-pointer inset-0'></div>
                        <input id="paypal" name='payment-method' onChange={() => setPaymentMethod("paypal")} checked={paymentMethod === "paypal"} className='hidden' type='radio' />
                        <div className='custom-radio'></div>
                        <label htmlFor='paypal'>Paypal</label>
                    </div>

                    <div className='flex gap-2 relative items-center py-3 px-5 rounded-lg border border-lightOrange w-fit sm:w-auto lg:gap-3'>
                        <div onClick={handleInputClick} className='absolute z-10 cursor-pointer inset-0'></div>
                        <input id='gcash' name='payment-method' onChange={() => setPaymentMethod("gcash")} checked={paymentMethod === "gcash"} className='hidden' type='radio' />
                        <div className='custom-radio'></div>
                        <label htmlFor='gcash'>GCASH</label>
                    </div>
                </div>
            </div>

            <div className='flex gap-3 text-sm items-center mt-10 bg-lighterOrange p-5 rounded-xl text-lightOrange xs:text-base xs:p-7 lg:gap-5 lg:p-10 lg:text-lg'>
                <img className='w-10 lg:w-20' src={paymentMethod === "gcash" ? gcashIcon : paypalIcon} alt='' />
                <p>You will Redirected to your <span className="font-semibold uppercase">{paymentMethod}</span> account after finishing this form, Thankyou.</p>
            </div>
        </div>
    </div>
)
}

export default CheckoutPage;