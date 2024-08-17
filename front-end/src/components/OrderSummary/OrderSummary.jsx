import { useParams } from "react-router";
import heartFill from '../../assets/materials/heart-fill.png';
import { useAvailableRecipes } from "../../context/AvailableRecipes"
import { useCheckoutValidate } from "../../context/CheckoutValidate";
import { useCart } from "../../context/UserCartContext";
import { useUserinfo } from "../../context/UserInfo";

const OrderSummary = () => {
    const {mode} = useParams();
    const {userInfo} = useCheckoutValidate();
    const {singleOrder} = useCart();
    
    const [firstName , lastName, email, phoneNumber] = userInfo.fields;

    const InfoBox = ({label, value}) => {
        return (
            <div className="max-w-80">
                <span className='font-semibold'>{label}</span>
                <p className='xs:mt-2'>{!!value ? value : <i>No Content</i>}</p>
            </div>
        )
    }


    const SingleOrderBox = ({data}) => {
       
        const {recipeName, image, category, quantity, limit, price, hearts, isWhole} = data;
        
        return (
          <div className="dark-shadow rounded-2xl p-5 xs:p-8 xs:w-96 xs:mx-auto lg:p-7 sm:w-96 lg:mx-0">
             <h2 className="text-xl font-semibold mb-4 xs:text-2xl">Your Order</h2>

             <div>
                <img className="rounded-lg" src={image} alt="" />
                
                <div className="mt-5 flex flex-col gap-2">
                    <span className="capitalize text-xs font-semibold xs:text-sm">{category}</span>
                    <div className="flex items-center justify-between">
                        <h2 className="capitalize xs:text-lg">{recipeName} <span className="font-semibold text-lightOrange">({!!limit.whole ? limit[isWhole ? "whole" : "half"] : limit})</span></h2>
                        <p className="text-sm bg-lightOrange text-pureWhite py-2 px-3 rounded-full xs:text-base">x{quantity}</p>
                    </div>

                    <div className="flex gap-1 mt-3 items-center justify-between">
                        <p className="dark-shadow text-lightOrange py-2 px-4 rounded-full xs:px-7">&#8369;{(!!price.whole ? price[isWhole ? "whole" : "half"] : price).toFixed(2)}</p>

                        <div className="text-sm flex text-lightOrange gap-1 items-center"><img src={heartFill} alt=""/><span>{hearts}</span></div>
                    </div>
                </div>
             </div>
          </div>
        )
    }

    const PersonalInfoSum = () => {

        return (
            <div className='lg:max-w-80'>
                <h3 className='text-lightOrange font-semibold lg:text-xl'>Personal Info</h3>
                <div className='mt-5 flex flex-wrap gap-10 sm:gap-12 xl:flex-col lg:gap-8'>
                    <InfoBox 
                      label={"Full Name"}  
                      value={`${firstName.value} ${lastName.value}`}/>

                    <InfoBox 
                      label={"Email"}  
                      value={email.value}/>

                    <InfoBox 
                       label={"Phone Number"}  
                       value={phoneNumber.value}/>
                </div>
            </div>
        )
    }

    const DishSum = () => {
        const {userGeneralInfo} = useUserinfo();

        const {cartProducts} = userGeneralInfo;

        const Dish = ({data}) => {

            const {recipeName, price, image, category, quantity, isWhole} = data;

            return (
                <div className='flex justify-between items-center w-full'>
                   <div className='flex gap-3 items-center xs:gap-4'>
                      <img draggable={false} className='object-cover aspect-1 w-12 rounded-lg xs:w-16 sm:w-12 lg:w-16' src={image} alt='' />
                      <div>
                        <span className='text-xs uppercase font-semibold text-gray'>{category}</span>
                        <h3 className='font-semibold capitalize'>{recipeName}</h3>
                        <p className='mt-1 text-xs text-lightOrange'>&#8369;{(!!price.whole ? price[isWhole ? "whole" : "half"] : price).toFixed(2)}</p>
                      </div>
                   </div>

                   <span className='text-xl text-lightOrange font-semibold'>x{quantity}</span>
                </div>
            )
        }

        return (
            <div className='p-5 rounded-2xl dark-shadow xs:w-96 xs:mx-auto xs:p-7 lg:mx-0'>
              <h3 className='text-xl font-semibold mb-5 lg:text-2xl'>Your Dish</h3>
              <div className='max-h-64 summary-dish-con overflow-auto text-sm flex pr-4  flex-col gap-5 xs:text-base sm:text-sm lg:text-base'>
                 {
                    cartProducts.filter((_, index) => index < 8)
                    .map((data, index) => {
                       return <Dish data={data} key={index} />
                    }) 
                 }
              </div>
            </div>
        )
    }

    const PaymentMethodSum = () => {
       
        const {paymentMethod, typeOrder, orderInfo} = useCheckoutValidate();
        
        return (
            <div className='sm:max-w-80'>
                <h2 className='text-lightOrange font-semibold lg:text-lg'>Payment Method</h2>
                <div className='my-5 text-sm border border-gray py-3 p-5 w-fit rounded-xl xs:py-4 xs:px-6'>
                    <p className="uppercase">{paymentMethod}</p>
                </div>
                
                 <div className='flex flex-col gap-5'>
                     {
                         orderInfo[typeOrder].fields.map(({label, value}, index) => {
                             return (
                                 <InfoBox 
                                   key={index}
                                   label={label} 
                                   value={value} 
                                 />
                             )
                         })
                     }
                </div>
                  
                
                
            </div>
        )
    }

    const TypeOrderSum = () => {
        const {mode} = useParams();
        const {typeOrder} = useCheckoutValidate();
        const {singleOrder} = useCart();
        const {userGeneralInfo} = useUserinfo();
        const {cartProducts} = userGeneralInfo;

        const FlatInfo = ({label, value}) => {
            return (
                <div className='flex gap-2'>
                    <p>{label}:</p>
                    <p className='font-semibold'>&#8369;{value}</p>
                </div>
            )
        }

        const total = mode === "cart-dish" ? cartProducts.filter((_, index) => index < 8).map(({price, quantity, isWhole}) => {
            return (!!price.whole ? 
            (price[isWhole ? "whole" : "half"]) : 
            price) * quantity;
        }).reduce((total, num) => total + num) : (!!singleOrder.price.whole ? singleOrder.price[singleOrder.isWhole ? "whole" : "half"] : singleOrder.price) * singleOrder.quantity

        return (
            <div>
                <h2  className='text-lightOrange font-semibold lg:text-lg'>Type of Order</h2>
                <div className='mt-2 xs:mt-4 lg:mt-5'>
                    <h3 className='capitalize font-semibold mb-2 lg:mb-5'>{typeOrder}</h3>
                    <div className='xs:flex xs:flex-col xs:gap-3'>
                        <FlatInfo label={"Delivery Fee"} value={"50.00"} />
                        <FlatInfo label={mode === "single-dish" ? "Product Price" : "Total"} value={total.toFixed(2)} />
                        <FlatInfo label={mode === "single-dish" ? "Total" : "Grand Total"} value={(total + 50).toFixed(2)} />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <section>
            <h2 className='font-semibold mb-5 text-lg text-center sm:text-xl sm:mb-14 lg:text-2xl lg:mb-10 lg:text-left'>Order Summary</h2>

            <div className='flex flex-col gap-10 xs:px-5 lg:flex-row lg:gap-8 sm:px-0 sm:justify-between'>
                <PersonalInfoSum />
                {
                    mode == "single-dish" ? (<SingleOrderBox data={singleOrder} />) : (<DishSum />)
                }
            </div>

            <div className='flex flex-col gap-7 mt-10 xs:px-5 sm:flex-row sm:px-0 sm:gap-12 sm:mt-16 lg:gap-42 lg:mt-20'>
                <PaymentMethodSum />
                <TypeOrderSum />
            </div>
        </section>
    )
} 

export default OrderSummary;