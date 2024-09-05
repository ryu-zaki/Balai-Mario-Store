import React from 'react'
import InfoPage from '../Home Page/InfoPage'
import { Box, Order, OrderedProduct } from '../Functionalities'
import jhonwell from '../../assets/icons/jhonwell.jpg';

/* Assets */
import trashIcon from '../../assets/admin_panel/trash-red.png';
import truckIcon from '../../assets/admin_panel/truck-green.png';
import productIcon from '../../assets/admin_panel/product-violet.png';
import OrderTable from './OrderTable';
import OrderModal from './OrderModal';
import sampleProduct from '../../assets/products/sample-product.jpg';

const orderCategoryBoxes = [
  Box("green", "Delivered Items", 200, truckIcon, "bg-lighterGreen"),
  Box("lightOrange", "Pending Request", 100, productIcon, "bg-lighterOrange"),
  Box("red", "Cancelled Orders", 100, trashIcon, "bg-lighterRed")
];

const orders = [
  Order(jhonwell, "Reservation", "Delivered", "1hr ago", "Sun June 22, 2004"),
  Order(jhonwell, "Reservation", "Delivered", "1hr ago", "Sun June 22, 2004"),
  Order(jhonwell, "Reservation", "Delivered", "1hr ago", "Sun June 22, 2004"),
  Order(jhonwell, "Reservation", "Delivered", "1hr ago", "Sun June 22, 2004"),
  Order(jhonwell, "Reservation", "Delivered", "1hr ago", "Sun June 22, 2004"),
  Order(jhonwell, "Reservation", "Delivered", "1hr ago", "Sun June 22, 2004"),
  Order(jhonwell, "Reservation", "Delivered", "1hr ago", "Sun June 22, 2004"),
  Order(jhonwell, "Reservation", "Delivered", "1hr ago", "Sun June 22, 2004"),
];

const orderedProducts = [
  OrderedProduct(sampleProduct, "Special Bulalo", "Starter", 5, 200, "3 to 5 PAX"),
  OrderedProduct(sampleProduct, "Special Bulalo", "Starter", 5, 200, "3 to 5 PAX"),
  OrderedProduct(sampleProduct, "Special Bulalo", "Starter", 5, 200, "3 to 5 PAX"),
  OrderedProduct(sampleProduct, "Special Bulalo", "Starter", 5, 200, "3 to 5 PAX"),
  OrderedProduct(sampleProduct, "Special Bulalo", "Starter", 5, 200, "3 to 5 PAX"),
  OrderedProduct(sampleProduct, "Special Bulalo", "Starter", 5, 200, "3 to 5 PAX"),
]

function OrderPage() {
  
  const [orderDetailsVisible, setOrderDetailsVisible] = React.useState(false);

  return (
   <InfoPage 
      listName={"All Orders"}
      categoryBoxes={orderCategoryBoxes}
      items={orders}
      totalList={200}

      modalVisible={orderDetailsVisible}
      setModalVisible={setOrderDetailsVisible}
      PageTable={OrderTable}
      InfoModal={<OrderModal 
        orderDetailsVisible={orderDetailsVisible} 
        setOrderDetailsVisible={setOrderDetailsVisible} 
        orderType={"reservation"} 
        orderedProducts={orderedProducts}
        />}
   />
  )
}

export default OrderPage
