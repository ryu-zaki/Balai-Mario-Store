import React from 'react';
import truckIcon from '../../assets/admin_panel/truck-dark.png';
import sampleProduct from '../../assets/products/sample-product.jpg';
import checkIcon from '../../assets/admin_panel/check-white.png';
import trashIcon from '../../assets/admin_panel/trash-orange.png';
import { FieldBox } from '../Functionalities';
import style from './style.module.css';
import crossIcon from '../../assets/materials/cross-icon.png'
import AllProductsModal from './AllProductsModal';

function OrderModal({orderType, orderDetailsVisible, setOrderDetailsVisible, orderedProducts}) {
  
  const [InfoComp, setInfoComp] = React.useState(<></>);
  const [viewProducts, setViewProducts] = React.useState(false); 
  console.log(viewProducts);
  React.useEffect(() => {

    switch(orderType) {

      case "delivery":
        setInfoComp(<DeliveryInfo/>);
      break;

      case "reservation":
        setInfoComp(<ReservationInfo/>);
      break;

      default: 
      setInfoComp(<SpecialEventInfo/>);
      break;
    }

  }, [orderType])


  return (
   <>
     <div onClick={() => setOrderDetailsVisible(false)} className={`${style.overlay} fixed z-50 inset-0 h-full w-full bg-imgOverlay`}></div>
    
    {
      viewProducts ? (<AllProductsModal
        orderedProducts={orderedProducts}
        setViewProducts={setViewProducts} />) : 
      (
        <div className={`${style["order_modal"]} fixed bg-pureWhite top-1/2 left-1/2 w-11/12 min-h-96 z-50 p-5 rounded-xl flex flex-col gap-5 md:p-8 md:gap-10 xl:p-10`}>
        
        <div onClick={() => setOrderDetailsVisible(false)} className='absolute top-3 right-3 bg-ash p-1 rounded-full cursor-pointer'>
          <img className='w-5' src={crossIcon} alt='' />
        </div>
        
        
        <div className={`${style["bottom_line"]} relative pb-5 flex gap-5 justify-between md:items-center`}>
          <div data-headings>
            <h2 className='text-2xl font-semibold md:text-3xl'>Order Details</h2>
            <p className='text-sm text-lightOrange font-semibold xl:text-base'>Recipe's Information</p>
          </div>
        
          <div data-category className='flex w-fit rounded-md items-center gap-2 text-gray  text-sm font-semibold md:border md:border-lightGray md:px-4 md:py-2 md:gap-4'>
             <img className='w-7' src={truckIcon} alt="" />
             <p className='hidden md:block'>Delivery</p>
          </div>
        </div>
        
        <div data-infoBox>
           {/* This will be the flexible content */}
           {InfoComp}
        </div>
        
        <div className='flex flex-col gap-3 md:gap-5'>
           <div data-receiptInfo className='flex flex-col text-sm justify-between gap-2 xs:flex-row xs:justify-stretch md:gap-4'>
        
              <div className='flex gap-1 items-center p-2 border border-lightGray rounded-md xs:w-full md:p-3 md:gap-2 xl:gap-3'>
                <img className='w-10 aspect-1 rounded-sm md:w-12 xl:w-14' src={sampleProduct} alt="" />
               <div>
                 <h3 className='font-semibold md:text-lg'>Special Bulalo</h3>
                 <p><span>Starter</span>&nbsp;<span className='text-lightOrange font-semibold'>x2</span></p>
               </div>
              </div>
        
              <div className='bg-dark text-pureWhite p-3 rounded-md xs:w-full md:p-4 xl:p-6'>
                 <h3 className='md:text-lg'>Total of 1200.00</h3>
                 <p onClick={() => setViewProducts(true)} className='underline cursor-pointer text-xs md:mt-1'>View all products</p>
              </div>
        
           </div>
        
           <div data-btns className='flex gap-4 text-sm mt-2 xl:text-base'>
             <button className='flex gap-1 items-center bg-lightOrange text-pureWhite py-1 px-4 rounded-sm xs:rounded-md md:py-2 md:px-6 xl:px-8'>
               <img className='w-5' src={checkIcon} alt="" />
               <span>Accept</span>
             </button>
        
             <button  className='flex gap-1 items-center border border-lightOrange text-lightOrange py-1 px-4 rounded-sm xs:rounded-md md:py-2  md:px-6 xl:px-8'>
               <img className='w-5' src={trashIcon} alt='' />
               <span>Decline</span>
             </button>
           </div>
        </div>
        
        </div>
      )
    }

     
   </>
  )
}


const DeliveryInfo = () => {

  const fields = [
    FieldBox("email", "jhonwellespanola4@gmail.com"),
    FieldBox("street address", "Blk 50 Lot 9 Northville 2b, Bagumbong"),
    FieldBox("Phone Number", "0951440662"),
    FieldBox("State/Province", "Caloocan City"),
  ]

  const [requiredFields, setRequiredFields] = React.useState([]);

  React.useEffect(() => {
    setRequiredFields(fields);
  }, []);

  return (
    <div className='flex flex-col gap-4 xl:gap-6'>
      {
        requiredFields.map(({label, value}, index) => {
          return <FieldBoxComp key={index} label={label} value={value} />
        })
      }
    </div>
  )
}

const FieldBoxComp = ({label, value}) => {
  
  return (
    <div className='flex flex-col gap-2 md:flex-row md:items-center md:gap-5'>
      <label className='text-sm capitalize font-semibold md:text-base md:w-fit md:whitespace-nowrap'>{label}</label>
      <input className='text-xs rounded-md border py-2 px-2 md:text-sm md:w-full' value={value} />
    </div>
  )
}

/* Reservation Section */

const ReservationInfo = () => {
  return (
     <div className='flex flex-col gap-5 text-sm md:text-base'>
        <h2 className='font-semibold text-base md:text-xl'>Dear Balai Mario</h2>
        <p>I would like to reserve a table for <span className='text-lightOrange'>[number of people]</span> at <span className='text-lightOrange'>[time]</span> on <span className='text-lightOrange'>[date]</span> at <span className='text-lightOrange'>[restaurant name]</span>. Please confirm the availability at your earliest convenience.</p>
        
        <div>
          <p>Best regards,</p>
          <p>Jhonwell Espanola</p>
        </div>
     </div>
  )
}


/* Special Event Section */

const SpecialEventInfo = () => {

  return (
    <div className="text-sm md:text-base">
       <h3 className='font-semibold w-fit px-6 bg-lighterOrange text-lightOrange p-2 rounded-md mb-5 md:text-sm md:py-3 md:px-7'>Birthday Party</h3>
       <p className='leading-8'>I am writing to reserve a space for a birthday party on <span className='text-lightOrange'>[date]</span> at <span className='text-lightOrange'>[time]</span> for <span className='text-lightOrange'>[number of people]</span> at <span className='text-lightOrange'>[venue/restaurant name]</span>. We will be celebrating <span className='text-lightOrange'>[Name]’s [age]</span> birthday and would appreciate any special arrangements you can provide, such as a birthday cake, decorations, or a designated area.</p>
    </div>
  )
}

export default OrderModal
