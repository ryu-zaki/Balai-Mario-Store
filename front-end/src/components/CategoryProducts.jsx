import { useParams } from 'react-router';
import React from 'react';
import {useAnimationGSAP} from '../context/AnimationGSAP'
import { AvailableDish } from './ProductSection';
import { useAvailableRecipes } from '../context/AvailableRecipes';
import { scroller } from 'react-scroll';
import { SliderController } from '../App';

export const divideArr = (arr, numChunks) => {

  const newArr = [];

  for (let i = 0; i < arr.length; i += numChunks) {

    newArr.push(arr.slice(i, numChunks + i));

  }

  return newArr;

}

const CategoryProducts = () => {
    const params = useParams();
    const {bgTextRef} = useAnimationGSAP();
    const {recipes, invUserProInfo} = useAvailableRecipes();
    const [controlIndex, setControlIndex] = React.useState(0);
    const [isTooLong, setIsTooLong] = React.useState(params.category.split(' ').length >= 2); 
    const [slideNum, setSlideNum] = React.useState(1);

    const [availables, setAvailables] = React.useState([]);
    

      React.useEffect(() => {
        setIsTooLong(params.category.split(' ').length >= 2);
      }, [params]);

      React.useEffect(() => {
        setAvailables(() => {
          const filtered = recipes
          .filter(({category}) => category === params.category)
          .map((data, index) => {
            return <AvailableDish invInfo={invUserProInfo[index]} data={data} key={index} />
          });

          return divideArr(filtered, 9);

        })
    
      }, [recipes, controlIndex, params.category]);

      const handleNext = () => {
        setControlIndex(prev => prev + 1 >= availables.length ? prev : prev + 1 );
        scroller.scrollTo('available-recipe');

       
      }

      const handlePrev = () => {
        setControlIndex(prev => !prev ? 0 : prev - 1 );
        scroller.scrollTo('available-recipe');
      }

     
    return (
      <>

      <div className='w-full pb-32 relative z-10 bg-ash pt-8 sm:pt-0'>
          <div className='relative global-products-container mx-auto flex flex-col mt-32 '>
          <SliderController 
             currentSlide={controlIndex}
             setState={setControlIndex}
             arrLength={availables.length}
             style={"justify-between sm:justify-end mb-36"}
           />
          <div className='relative items-start products-grid-container'>
             {availables[controlIndex]}

              <h2 ref={bgTextRef} className={`w-fit whitespace-nowrap text-nowrap overflow-hidden select-none absolute bg-text -top-24 left-0 capitalize opacity-50 -z-10 text-brown title-font ${params.category.split(" ").length >= 3 ? "-top-32 sm:-top-24 text-3xl xs:text-5xl lg:text-6xl xl:text-7xl" : isTooLong ? "text-4xl xs:text-6xl lg:text-7xl xl:text-8xl" :  "text-6xl xs:text-7xl lg:text-8xl xl:text-9xl"}  lg:-top-32  xl:-top-40 xl:-left-14 2xl:-left-24`}><span className='text-wrap'>{params.category}</span></h2>
           </div> 

           <SliderController 
             currentSlide={controlIndex}
             setState={setControlIndex}
             arrLength={availables.length}
             style={"justify-between xs:justify-center lg:justify-start mt-20"}
           />
           </div>

      </div>

      </>
  
    )
  }

export default CategoryProducts;