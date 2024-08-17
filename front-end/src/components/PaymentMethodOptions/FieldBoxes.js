import React from 'react';
import { useCheckoutValidate } from "../../context/CheckoutValidate";
import chevronDown from '../../assets/materials/chevron-down.png';
import { InfoBox } from "../CheckoutPage";
import { useRef } from "react";

const OptionalMessage = ({data, handleReservationField}) => {
    const {label, type, value} = data;

    return (
        <div>
        <h3 className='mb-3 text-sm lg:text-base lg:mb-5'>{label}<span className='text-lightOrange font-semibold'>&nbsp;(Optional)</span></h3>
        <textarea onChange={handleReservationField} value={value} id={type} className='dark-shadow resize-none rounded-lg min-h-32 w-full p-3 text-sm' placeholder='Write your message here..'></textarea>
    </div>
    )
}

const ReservationBox = () => { 
    const {orderInfo, handleReservationField} = useCheckoutValidate();

    const DateBox = ({data}) => {
        const {type, label, value, isValid} = data;
        return (
            <div>
                <h3 className="mb-3 text-sm lg:text-base lg:mb-5">{label}</h3>
                <input onChange={handleReservationField} value={value} id={type} className={`cursor-pointer rounded-lg items-center text-xs ${isValid ? "border-gray" : "border-red"} border py-2 px-4 w-fit lg:text-sm lg:px-6 lg:py-3`} type='date' />
            </div>
        )
    }
    
    return (
        <div className='text-darkBrown flex flex-col gap-4 sm:gap-7'>
            
            <DateBox 
              data={orderInfo.reservation.fields[0]} />

            <OptionalMessage 
              handleReservationField={handleReservationField}
              data={orderInfo.reservation.fields[1]}/>
        </div>
    )
}

//Special Event Section

const EventTypeBox = ({data, handleInfo, isValidationClick, setIsValidationClick, effectHandler}) => {
    const {type, value, isValid, label} = data;
    const InputRef = useRef();

    React.useEffect(() => {

        effectHandler(isValid, InputRef, setIsValidationClick);

    }, [isValid, isValidationClick])

    return (
        <div>
            <h3 className="mb-2 sm:mb-4">{label}</h3>
                   
            <select ref={InputRef} onChange={handleInfo} id={type} value={value} className={`${!isValid ? "border-2 border-red" : "dark-shadow"} w-fit cursor-pointer rounded-lg py-3 px-2`}>
                <option disabled value={""}>Select an Event</option>
                <option value={"wedding"}>Wedding</option>
                <option value={"birthday"}>Birthday</option>
                <option value={"anniversarry"}>Anniversarry</option>
                <option value={"graduation"}>Graduation</option>
            </select>
            </div>
    )
};

const EventDateBox = ({data, handleInfo, isValidationClick, setIsValidationClick, effectHandler}) => {
    const {type, value, isValid, label} = data;
    const InputRef = useRef();

    React.useEffect(() => {
        effectHandler(isValid, InputRef, setIsValidationClick)

    }, [isValid, isValidationClick])

    return (
        <div>
            <h3 className='mb-2 sm:mb-4'>{label}</h3>
            <input ref={InputRef} onChange={handleInfo} id={type} value={value} className={`${!isValid ? "border-2 border-red" : "dark-shadow"} cursor-pointer flex py-2 px-4 rounded-lg items-center text-xs gap-2 sm:py-3 sm:px-6 sm:text-sm`} type='date' />
        </div>
    )
}


const EventDesc = ({data, handleInfo, effectHandler, isValidationClick, setIsValidationClick}) => {

    const {type, value, isValid, label} = data;
    const InputRef = useRef();

    React.useEffect(() => {
        effectHandler(isValid, InputRef, setIsValidationClick)

    }, [isValid, isValidationClick])

    return (
      <div className='mt-7 flex flex-col gap-4 sm:mt-10'>
        <label>{label}</label>
        <textarea ref={InputRef} onChange={handleInfo} id={type} value={value} className={`${!isValid ? "border-2 border-red" : "dark-shadow"} resize-none rounded-lg p-4 min-h-32`} placeholder='Write your Message'></textarea>
      </div>
    )
}


const SpecialEventBox = () => {
    const {orderInfo, handleEventInfo, isValidationClick, setIsValidationClick} = useCheckoutValidate();
    const [eventTypeData, eventDateData, eventDescData] = orderInfo["special event"].fields;
    
    const effectHandler = (isValid, InputRef, setIsValidationClick) => {
        if (!isValid) {
            InputRef.current.focus();
            setIsValidationClick(false)
        }
    }

    return (
        <div className='text-sm lg:text-base'>
            <div className='flex gap-10 sm:justify-start sm:gap-8 lg:gap-14'>
              
              <EventTypeBox 
                 isValidationClick={isValidationClick} 
                 setIsValidationClick={setIsValidationClick}
                 handleInfo={handleEventInfo}
                 data={eventTypeData}
                 effectHandler={effectHandler}
              />
              
              <EventDateBox 
                isValidationClick={isValidationClick} 
                setIsValidationClick={setIsValidationClick}
                 handleInfo={handleEventInfo}
                 data={eventDateData}
                 effectHandler={effectHandler}
              />
            
            </div>
           
           <EventDesc 
             isValidationClick={isValidationClick} 
             setIsValidationClick={setIsValidationClick}
            handleInfo={handleEventInfo}
            data={eventDescData} 
            effectHandler={effectHandler}
           />
        </div>
    )
}

const DeliveryBox = () => {

    const {orderInfo, handleOrderType} = useCheckoutValidate();
    
    return (
        <div className='flex flex-col gap-5 sm:gap-7'>
            {
                orderInfo.delivery.fields.map((data, index) => {
                    const errMessage = "Invalid Info";
                    
                    return (
                        <InfoBox
                           errMessage={errMessage} 
                           handleInfo={handleOrderType} 
                           data={data} 
                           key={index} 
                           />
                    )
                })
            }
        </div>
    )
}


export {DeliveryBox, ReservationBox, SpecialEventBox}