export const Box = (color, category, itemsNum, imgSrc, iconBgColor) => {
    return (
      {color, category, itemsNum, imgSrc, iconBgColor}
    )
};

export const Order = (user, order_type, status, time_passed, ordered_date) => {
  return({
    user, order_type, status, time_passed, ordered_date
  })
}

export const FieldBox = (label, value) => ({
  label, value
});
 
export const OrderedProduct = (imgSrc, productName, category, quantity, price, limit) => {
  return ({imgSrc, productName, category, quantity, price, limit})
}