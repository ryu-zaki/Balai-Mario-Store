import React, { ReactElement } from 'react';
import searchIcon from '../../assets/materials/search-icon.png';
import emptyIcon from '../../assets/materials/not-found.png';
import crossIcon from '../../assets/materials/cross-icon.png';
import source from './source';
import style from './style.module.css';

const FaqComp = ({setFaqsVisible}):ReactElement => {

  interface Field {
     question: string,
     answer: string
  }

  const [faqs, setFaqs] = React.useState<Field[]>(source);  

  const [searchText, setSearchText] = React.useState("");
  
  const handleSearch = ({target}) => {
    setSearchText(target.value.toLowerCase());
  }

  React.useEffect(() => {
   
    if (!!searchText) {
      setFaqs((prev) => {
        const newFill = prev.filter(data => {
         return data.question.toLowerCase().includes(searchText);
        })
 
        return newFill;
     })

     return;
    }

    setFaqs(source);

    

  }, [searchText])

  return (
    <>
     <div onClick={() => setFaqsVisible(false)} className='fixed z-50 inset-0 bg-darkOverlay h-full w-full'></div>
     
     <div className={`${style.card} fixed faqs-card z-50 bg-pureWhite rounded-xl w-11/12 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 p-5 flex flex-col gap-5 xxs:w-96 xxs:p-7 md:p-10`}>
     <img onClick={() => setFaqsVisible(false)} className='w-6 absolute top-3 right-3 cursor-pointer xl:top-4 xl:right-4' src={crossIcon} alt="" />

       <div>
        <h2 className='text-xl font-bold md:text-3xl'>Frequently Questions</h2>
        <p className='text-sm font-semibold text-lightOrange md:text-base md:mt-2'>Help and support</p>
       </div>

       <div>
          {/* Searh Bar */}
          <div className='h-10 mb-8 rounded-full relative border border-gray overflow-hidden xxs:h-12 md:w-96'>
            <input onChange={handleSearch} value={searchText} className='py-2 px-4 text-sm outline-0 absolute inset-0 border-0 md:text-base' placeholder='Search any keywords' />
            <img className='w-5 -translate-y-1/2 absolute top-1/2 right-3 xxs:w-6' src={searchIcon} alt='' />
          </div>

          <div className={`${style.questions_list} rounded-xl flex flex-col gap-4 pr-4 md:gap-5 md:pr-10`}>
            {
                !!faqs.length ?
                faqs.map(({question, answer}, index) => {
                    return <Field 
                      searchText={searchText}
                      key={index}
                      question={question} 
                      answer={answer} 
                    />
                }) : <EmptyIcon />
            }
            
          </div>
       </div>
     </div>
    </>
  )
}

const Field = ({question, answer, searchText}):ReactElement => {

    const quesTitle = question.split("").map((text, index) => {
      return (searchText.includes(text)) ? <span key={index} className='text-lightOrange'>{text}</span> : text
     })

    return (
        <div className='transition-all duration-300 flex items-start flex-col'>
            <div className='w-fit flex relative gap-2 text-sm items-center mb-4 md:text-lg'>
              <h3 className='font-semibold'>{quesTitle}</h3>
            </div>
            

            <p className={`border border-lightGray p-3 rounded-lg text-xs md:text-base`}>{answer}</p>
        </div>
    )
}

const EmptyIcon = ():ReactElement => {

  return (
  <div className='flex flex-col w-full h-full items-center justify-center gap-2'>
   <img src={emptyIcon} alt="" />    
   <h2>Item Not Found</h2>
  </div>)

}

export default FaqComp
