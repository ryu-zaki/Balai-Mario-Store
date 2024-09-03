import React from 'react'
import InfoPage from '../Home Page/InfoPage'
import { Box } from '../Functionalities'

/* Assets */
import trashIcon from '../../assets/admin_panel/trash-red.png';
import truckIcon from '../../assets/admin_panel/truck-green.png';
import productIcon from '../../assets/admin_panel/product-violet.png';
import OrderTable from './OrderTable';
import OrderModal from './OrderModal';

const orderCategoryBoxes = [
  Box("green", "Delivered Items", 200, truckIcon, "bg-lighterGreen"),
  Box("pitch", "Pending Request", 100, productIcon, "bg-lighterPitch"),
  Box("red", "Cancelled Orders", 100, trashIcon, "bg-lighterRed")
]

function OrderPage() {
    
  return (
   <InfoPage 
      listName={"All Orders"}
      categoryBoxes={orderCategoryBoxes}
      items={[]}
      totalList={200}

      modalVisible={false}
      PageTable={OrderTable}
      InfoModal={<OrderModal />}
   />
  )
}

export default OrderPage
