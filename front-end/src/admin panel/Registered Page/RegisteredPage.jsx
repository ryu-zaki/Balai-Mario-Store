import React from 'react'
import redImg from '../../assets/admin_panel/user-red.png';
import greenImg from '../../assets/admin_panel/user-green.png';
import orangeImg from '../../assets/materials/user-orange.png'
import InfoPage from '../Home Page/InfoPage';
import detailsIcon from '../../assets/materials/action-btn.png';
import kenzoIcon from '../../assets/icons/kenzo.jpg';
import { Box } from '../Functionalities';
import UserModal from '../Home Page/UserModal';


const User = (name, email_account, status, num_of_orders, details) => {
  return ({name, email_account, status, num_of_orders, details})
}

export const userAccounts = [
  User("Kenzo Shenel Vidal", "kenzo_09876@gmail.com", "active", "24 orders"),
  User("Kenzo Shenel Vidal", "kenzo_09876@gmail.com", "active", "24 orders"),
  User("Kenzo Shenel Vidal", "kenzo_09876@gmail.com", "active", "24 orders"),
  User("Kenzo Shenel Vidal", "kenzo_09876@gmail.com", "active", "24 orders"),
  User("Kenzo Shenel Vidal", "kenzo_09876@gmail.com", "active", "24 orders"),
  User("Kenzo Shenel Vidal", "kenzo_09876@gmail.com", "active", "24 orders"),
]

const RowData = ({data, setUserModalVisible}) => {
  
  const handleViewModal = () => {
    setUserModalVisible(true);

  }

  return (
      <div className='relative -translate-x-10 opacity-0 row_data flex text-sm items-center justify-between border rounded-lg p-2 border-lightGray gap-3 py-3 sm:px-5 sm:pr-8 lg:grid lg:grid-cols-11'>
          <div className='flex gap-3 items-center sm:gap-5 lg:col-span-3'>
              <div className='relative'>
                <img className='w-10 rounded-full sm:w-14 md:w-10' src={kenzoIcon} alt='' />
                <div className='w-3 aspect-1 absolute bottom-0 right-0 rounded-full bg-green sm:bottom-1 sm:right-1 lg:right-0 lg:bottom-0'></div>
              </div>
              <p className='text-base truncate sm:text-lg md:text-base'>kenzo Shenel Vidal</p>
          </div>

          <p className='hidden truncate font-semibold lg:inline-block lg:col-span-3'>kenzo_shenel09876@gmail.com</p>
          <span className='hidden col-span-2 mx-auto px-5 bg-lightGreen text-green rounded-full text-center py-1 font-semibold lg:inline-block'>Active</span>
          <span className='absolute text-xs py-1 px-2 rounded-md top-0 right-3 -translate-y-1/2 bg-lighterOrange text-lightOrange font-semibold sm:text-sm sm:px-4 lg:relative lg:translate-y-0 lg:bg-transparent lg:text-dark lg:whitespace-nowrap lg:col-span-2'>24 orders</span>
          <img onClick={handleViewModal} className='w-5 cursor-pointer sm:w-7 md:w-5' src={detailsIcon} alt='' />
      </div>
  )

}

export const PageTable = ({list}) => {

  return (
    <div className='mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-1'>
    <div className='hidden lg:grid grid-cols-11 border-2 border-lightGray p-4 rounded-md font-semibold text-gray text-sm px-6'>
      <span className='col-span-3'>Name</span>
      <span className='col-span-3'>Email Account</span>
      <span className='text-center col-span-2'>Status</span>
      <span className='col-span-2'># of orders</span>
      <span>Details</span>
    </div>

    {
      list.map((data, index) => {
        return <RowData data={data} key={index} />
      })
    }
    
  </div>
  )
}

export const categoryBoxes = [
  Box("green", "Active", 45, greenImg, "bg-lighterGreen"),
  Box("lightOrange", "Active", 45, orangeImg, "bg-lighterOrange"),
  Box("red", "Active", 45, redImg, "bg-lighterRed"),
];


function RegisteredPage() {

  const [userModalVisible, setUserModalVisible] = React.useState(false);

  return (
    <InfoPage 
      listName={"Registered Accounts"}
      categoryBoxes={categoryBoxes} 
      items={userAccounts}
      totalList={200}

      modalVisible={userModalVisible}
      PageTable={PageTable}
      InfoModal={<UserModal setUserModalVisible={setUserModalVisible}/>}
    />
  )
}


export default RegisteredPage;
