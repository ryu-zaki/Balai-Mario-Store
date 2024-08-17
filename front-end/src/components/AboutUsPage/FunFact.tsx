import React from 'react'

function FunFact() {

    interface FactObj {
        quantity: string,
        category: string
      }

  const CreateFact = (quantity:string, category:string):FactObj => {

    return ({
        quantity, category
    })

  }

  const Measurement = ({quantity, category}) => {
    return (
        <div className='flex gap-2 items-end md:items-center md:h-fit'>
            <h3 className='font-bold text-3xl sm:text-5xl md:text-4xl xl:text-5xl'>{quantity}</h3>
            <p className='sm:text-sm sm:whitespace-nowrap xl:text-lg'>{category}</p>
        </div>
    )
  }

  

  const facts:FactObj[] = [
    CreateFact("20k", "Happy Clients"),
    CreateFact("115", "Employees"),
    CreateFact("700", "Available Recipes")
  ];
    
  return (
    <div className='bg-lightOrange text-pureWhite rounded-xl relative p-7 pt-8 flex flex-col gap-5 text-sm sm:text-base sm:p-10 sm:pt-12 md:flex-row md:gap-8 md:items-start xl:w-11/12 xl:mx-auto xl:text-lg xl:pt-14'>
       
       {/* Absolute text */}
       <p className='bg-pureWhite text-darkBrown absolute top-0 -translate-y-1/2 border border-lightOrange font-semibold py-3 px-6 rounded-lg text-xl sm:text-3xl sm:px-8 xl:px-10 xl:py-4'>Our Fan Facts</p>

      <p className='leading-7 sm:text-base sm:leading-8 md:w-3/5 xl:text-lg xl:leading-9'>Dive into the stories behind your favorite treats, discover interesting ingredients, and learn about the rich cultural heritage that makes filipino cuisine so unique.</p>

      <div className='flex flex-col gap-7 sm:flex-row sm:flex-wrap md:gap-8 md:items-start md:justify-end'>
        {
          facts.map(({quantity, category}, index) => {
            return <Measurement 
               quantity={quantity} 
               category={category} 
               key={index} 
              />
          })
        }
      </div>
    </div>
  )
}

export default FunFact
