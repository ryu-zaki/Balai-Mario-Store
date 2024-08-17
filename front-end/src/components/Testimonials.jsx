import React, { memo } from  'react';
import messageIcon from '../assets/materials/message-icon.png';
import starFill from '../assets/materials/star-fill.png';

import customers from '../info/CustomersTestimonials';

/* Customers */
import jhonwellIcon from '../assets/materials/customer-icon.jpg';

const Testimonials = () => {

    const [testimonialIndex, setTestimonialIndex] = React.useState(0);
    const [testimonialBoxes, setTestimonialBoxes] = React.useState([]);

    const MessageBox = ({data}) => {

        const {position, name, rates, message, userIcon} = data;

        return (
            <div className={`${position} testimonial-box opacity-1 bg-pureWhite border-lightOrange border absolute flex flex-col gap-4 p-4 rounded-xl pt-10 lg:pt-14 xl:p-5 xl:pt-14`}>
                <img draggable="false" className='w-12 select-none -translate-y-1/2 left-4 border border-lightOrange bg-pureWhite p-2 absolute top-0 rounded-full top-0 lg:w-16' src={userIcon} alt='' />

                <div className='flex flex-col gap-2 lg:gap-4'>
                    <h3 className='font-bold text-sm xs:text-base lg:text-lg'>{name}</h3>
                    <div className='max-h-16 pr-3 overflow-y-auto xs:max-h-24 xl:leading-8'>
                      <p>{message}</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <img className='w-4 lg:w-5' src={starFill} alt='' />
                        <img className='w-4 lg:w-5' src={starFill} alt='' />
                        <img className='w-4 lg:w-5' src={starFill} alt='' />
                        <img className='w-4 lg:w-5' src={starFill} alt='' />
                        <img className='w-4 lg:w-5' src={starFill} alt='' />
                    </div>
                </div>
            </div>
        )
    }

    React.useEffect(() => {

    const testimonials = setTimeout(() => {

            setTestimonialIndex(prev => {
                if (prev < customers.length - 1) {
                    return prev + 1;
                }

                return 0;
            })

        }, 8000)

    return () => {
        clearTimeout(testimonials);
    }

    
    }, [testimonialIndex])


    React.useEffect(() => {


        setTestimonialBoxes(() => {
            return customers[testimonialIndex].map((data, index) => {
                return  <MessageBox key={index} data={data} />
            })
        })

    }, [testimonialIndex]);
    

    return (
        <div className='flex text-darkBrown testimonials-container w-full flex-col gap-20 items-center sm:gap-20 xl:flex-row'>   
          <div className='flex flex-col items-center text-center xl:items-start xl:text-left xl:gap-6'>
            <span className='text-sm mb-3'>TESTIMONIALS</span>
            <h2 className='title-font testimonial-title responsive-title'>What People Thinks About Us</h2>
            <div className='flex mt-3 items-center gap-2 xl:gap-4'>
                <img className='w-7 msg-icon' src={messageIcon} alt='' />
                <p className='text-lightOrange font-semibold'>Feedbacks of our customers</p>
            </div>
          </div>


          <div className='relative testimonials-circular'>
              {testimonialBoxes}
          </div>
        </div>
    )
}


export default memo(Testimonials);