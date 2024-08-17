import React from 'react';
import chevron from '../../assets/materials/gray-chevron-down.png'
import clockIcon from '../../assets/materials/clock-icon-gray.png';
import actionBtn from '../../assets/materials/action-btn.png';
import calendarIcon from '../../assets/materials/calendar-icon-outlined.png'
import style from './style.module.css'
import { useUserinfo } from '../../context/UserInfo';
import EmptyMessage from './EmptyMessage';
import DetailsModal from './DetailsModal';
import DeleteConfirmation from './DeleteConfirmation';
import LoadingPage from '../LoadingPage';
import { divideArr } from '../CategoryProducts';
import useDataIdentifyer from '../../custom_hooks/useDateIdentifyer';

const OrderHistory = () => {
  const {userGeneralInfo} = useUserinfo();
  const [ordersCategory, setOrdersCategory] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  /* Details Modal */
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalData, setModalData] = React.useState({});


  /* Delete modal */
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  const [deleteID, setDeleteID] = React.useState("");
  const [deleteTrigger, setDeleteTrigger] = React.useState(false);
  const {removeHistory, displayHistory} = useUserinfo();
  
  const [controlledHistory, setControlledHistory] = React.useState([]);
  const [historyChunks] = React.useState(7);
  const [controlIndex, setControlIndex] = React.useState(0);

  const handleTableControls = ({target}) => {

    const {id} = target;

    if (id == "add") {
      setControlIndex(prev => prev + 1 >= controlledHistory.length ? prev : prev + 1)
    } else {
      setControlIndex(prev => !prev ? 0 : prev - 1);
    }
      
  }

  //for slider functionality
  React.useEffect(() => {
    
    const arr = divideArr(displayHistory, historyChunks);

    setControlledHistory(arr);

  }, [displayHistory]);
  

  React.useEffect(() => {

    window.scrollTo({
      top: 0
    })

  }, []);

  React.useEffect(() => {
    
    const accessToken = localStorage.getItem('accessToken');

    if (deleteTrigger) {
    
      setIsLoading(true);

      fetch('http://localhost:2000/cart/remove-history', {
        method: "POST",
        credentials: "include",
        headers: {
          authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({_id: deleteID})
      })
      .then(data => data.json())
      .then(data => {
        if (data.accessToken) {
          localStorage.setItem("accessToken", data.accessToken)
        }

        //Delete from the state
        removeHistory(deleteID);
      })
      .catch(err => window.alert(err.message))
      .finally(() => {
        setDeleteTrigger(false);
        setIsLoading(false);
      });
      
    }

  }, [deleteTrigger, deleteID])


  return (
    <>
    {isLoading && <LoadingPage />}

    <div className='container mx-auto flex flex-col gap-5 px-3 mb-10 sm:px-7 sm:gap-7 md:mt-10'>
      <h2 className='text-2xl font-semibold sm:text-3xl md:text-4xl md:mb-7 xl:text-6xl lg:mb-4'>Your Orders</h2>

      <div className='flex justify-between items-start gap-5 flex-col-reverse xs:flex-row md:items-center'>
        <div className='relative'>

        <button className='text-gray gap-2 flex border p-2 px-3 rounded-md font-semibold items-center text-xs relative sm:text-sm sm:gap-2 sm:p-3 sm:px-4 lg:hidden '>
          <div onClick={() => setOrdersCategory(prev => !prev)} className='absolute inset-0'></div>
          <span>All Orders</span>
          <img className={`w-4 ${ordersCategory && "-rotate-90"}`} src={chevron} alt='' />
        </button>

        <nav className={`${style.order_nav} absolute z-10 w-36 p-4 px-6 rounded-md dark-shadow bg-ash order-nav text-sm opacity-100 ${ordersCategory ? "flex" : "hidden lg:flex"} flex-col gap-5 -bottom-2 translate-y-full left-0 lg:opacity-100 lg:relative lg:flex-row lg:gap-7 lg:text-gray lg:translate-y-0 lg:w-auto lg:bg-pureWhite lg:px-0 lg:py-0 lg:text-base`}>
          <p className={`${style.active} relative`}><span className="absolute text-xs -top-4 -right-4 bg-lighterOrange text-lightOrange px-3 rounded-full">10</span><span>All Orders</span></p>
          
          <span>Delivered</span>
          <span>Pending</span>
          <span>Cancelled</span>
          <span>Summary</span>
        </nav>
        </div>
      
        <DateFilter />

      </div>
      
      {
        !!controlledHistory[0]?.length ? (
          <>
      <DeleteConfirmation 
        confirmVisible={deleteModalVisible}
        setConfirmVisible={setDeleteModalVisible}
        setEffectTrigger={setDeleteTrigger}
      />
      {
        !!modalData?.info && (
      <DetailsModal 
        modalData={modalData} 
        modalVisible={modalVisible} 
        setModalVisible={setModalVisible} 
      />
        )
      }
      

      <div className='mt-7 min-h-96 xl:mt-3'>
        {/* Table Controls */}
         <TableControls 
           handleTableControls={handleTableControls}
           controlledHistory={controlledHistory} 
           controlIndex={controlIndex} 
          />

         {/* Data Table */}
         <div className='my-10 flex flex-col gap-3 lg:gap-5'>

            {/* Headers */}
            <section className='grid font-bold grid-cols-3 text-sm border rounded-md p-3 border-gray gap-2 sm:text-lg sm:p-4 sm:grid-cols-4 lg:grid-cols-7 lg:text-base lg:mb-2 xl:text-lg xl:p-5'>
              <h3 className='hidden lg:inline-block'>Payment</h3>
              <h3>Order Type</h3>
              <h3>Status</h3>
              <h3 className='hidden sm:inline-block'>Time Passed</h3>
              <h3>Total Price</h3>
              <h3 className='hidden lg:inline-block'>Ordered Date</h3>
              <h3 className='hidden lg:inline-block lg:text-center'>Action</h3>
            </section>
             
            
            {
              controlledHistory[controlIndex].map((data, index) => {
                return <RowData 
                      
                      //Delete State Props 
                      setDeleteModalVisible={setDeleteModalVisible}
                      setDeleteID={setDeleteID} 
                      setModalVisible={setModalVisible} 
                      setModalData={setModalData} 
                      data={data} key={index} />
              })
            }

            
         </div>

         {/* Table Controls */}
         <TableControls 
         handleTableControls={handleTableControls}
           controlIndex={controlIndex}
           controlledHistory={controlledHistory}
         />
      </div>
      </>) : <EmptyMessage />
      }
      

    </div>
    </>
  )
}

const TableControls = ({controlledHistory, controlIndex, handleTableControls}) => {

  return (!!controlledHistory[controlIndex].length > 7) && (
         <div className={`flex justify-between items-center`}>
           <div className='flex gap-3 md:gap-5'>
              <div className='border relative border-gray p-2 px-4 rounded-md cursor-pointer'>
                <div id="sub" onClick={handleTableControls} className='absolute inset-0 z-10'></div>
                <img className='w-4 rotate-90' src={chevron} alt=''  />
              </div>

              <div className='border border-gray p-2 px-4 rounded-md cursor-pointer relative'>
                <div id="add" onClick={handleTableControls} className='absolute inset-0 z-10'></div>
                <img className='w-4 -rotate-90' src={chevron} alt=''  />
              </div>

           </div>

           <div className='flex gap-2 items-center p-2 px-3 border border-gray text-gray text-xs font-semibold rounded-md sm:text-sm sm:p-3 sm:px-5 lg:px-7 lg:py-1'>
            <span>1</span>of<span>10</span>
           </div>
         </div>
  )
}

const RowData = ({data, setModalVisible, setModalData, setDeleteModalVisible, setDeleteID}) => {

  const {info} = data;
  const {paymentMethod, orderedDate, orderType, status, totalPrice} = info;
  const calculatedTime = useDataIdentifyer(orderedDate);
  const [timePassed, setTimePassed] = React.useState(calculatedTime);

  React.useEffect(() => {
    setTimePassed(calculatedTime);
    
   const timeout = setInterval(() => {
    setTimePassed(calculatedTime);
   }, 60000);
  

   return () => clearInterval(timeout)
    

  }, [calculatedTime, orderedDate]);


  const [actionActive, setActionActive] = React.useState(false);

  const handleModalVisibility = () => {
    setModalData(data)
    setModalVisible(true);

    setActionActive(false)
  }

  const handleDeleteHistory = () => {
     setDeleteModalVisible(true);
     setDeleteID(data._id);
     setActionActive(false);
  }

  return (
    
    <section className='grid grid-cols-3 items-center relative text-xs border border-gray p-3 rounded-md gap-2 sm:text-sm sm:p-4 sm:grid-cols-4 lg:grid-cols-7 lg:p-5 xl"p-6'>

              <div onClick={handleModalVisibility} className='absolute inset-0 w-full h-full lg:hidden'></div>

              <span className='hidden lg:inline capitalize'>{paymentMethod}</span>
              <span className='capitalize'>{orderType}</span>
              <StatusBox status={status} />
              <span className='hidden items-center gap-1 sm:flex lg:gap-1'>
                <img className='w-5' src={clockIcon} alt='' />
                <span>{timePassed} ago</span>
              </span>
              <span>₱{totalPrice.toFixed(2)}</span>
              <span className='hidden lg:inline-block'>{new Date(orderedDate).toUTCString().split(" ").slice(0, 4).join(" ")}</span>
              <span className='hidden lg:inline-block'>
                <div className='relative w-fit mx-auto'>
                <img onClick={() => setActionActive(true)} className='cursor-pointer w-5' src={actionBtn} alt="" />
                
                {
                  actionActive && <div onClick={() => setActionActive(false)} className='z-50 fixed inset-0'></div>
                }

                <div className={`${!actionActive && "scale-0"} z-50 transition-all duration-500 bg-pureWhite origin-top-right flex flex-col gap-3 dark-shadow absolute -bottom-2 translate-y-full right-0 p-3 px-5 w-fit whitespace-nowrap rounded-md`}>
                  <span onClick={handleModalVisibility} className="text-dark cursor-pointer">View Product{!!data?.products_arr?.length ? "s" : ""}</span>
                  <span onClick={handleDeleteHistory} className='text-red cursor-pointer'>Delete</span>
                </div>
                </div>
                 

              </span>
      </section>
           
  )
}

const StatusBox = ({status}) => {

  return (
    <div className='text-green font-semibold flex items-center gap-1'>
      <div className={`${style.status_ball} ${style[status]}`}></div>
      <p>{status}</p>
    </div>
  )
}

const DateFilter = () => {
  const {setFromDate, setToDate, fromDate, toDate} = useUserinfo();
  
  const DateBox = ({category, setDate, dateValue}) => {

    const hanldeDate = ({target}) => {
      
      setDate(target.value);
    }

    return (
        <div className='text-gray'>
          <p className='mb-2 xs:hidden'>{category}</p>
          <input value={dateValue} onChange={hanldeDate} className='outline-0 border-gray border  rounded-md p-2 sm:p-3 sm:font-semibold xl:px-5' type='date' />
        </div>
        
    )
}

  return (
    <div className='flex gap-2 text-xs xs:items-center sm:text-sm md:gap-4'>
      <DateBox 
        setDate={setFromDate} 
        category={"From"} 
        dateValue={fromDate}
        /> 

        <span className='hidden xs:inline'>To</span> 

      <DateBox 
        setDate={setToDate} 
        category={"To"} 
        dateValue={toDate}
      />
    </div>
  )
}


export default OrderHistory;