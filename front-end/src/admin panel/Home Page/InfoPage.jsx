import React from 'react';
import InfoListPreview from './InfoListPreview';

const InfoPage = ({categoryBoxes, listName, items, totalList, modalVisible, PageTable, InfoModal}) => {

    return (
        <div>
        <div className='w-full flex flex-col mb-16 gap-7 sm:flex-row sm:gap-5 md:gap-3 lg:justify-start xl:gap-5'>

            {
                categoryBoxes.map(({color, category, itemsNum, imgSrc, iconBgColor}, index) => {
                    return (
                        <CategoryBox
                             key={index}
                             color={color}
                             category={category}
                             itemsNum={itemsNum}
                             imgSrc={imgSrc}
                             iconBgColor={iconBgColor}
                        />
                    )
                })
            }
        </div>

        <InfoListPreview 
          listName={listName} 
          items={items} 
          totalList={totalList} 
          modalVisible={modalVisible} 
          PageTable={PageTable} 
          InfoModal={InfoModal}
        />
    </div>
    )

}


const CategoryBox = ({color, category, itemsNum, imgSrc, iconBgColor}) => {


    return (
        <div className='register_box -translate-x-10 opacity-0 flex items-center border border-gray rounded-lg p-5 gap-5 sm:flex-col sm:gap-7 sm:w-full md:flex-row md:gap-5 lg:w-fit lg:px-8 lg:pr-10 xl:px-5 xl:pr-8'>
            <div className={`register_icon opacity-0 -translate-y-10 ${iconBgColor} p-3 rounded-full sm:p-5 md:p-3`}>
              <img width={32} src={imgSrc} alt='' />
            </div>
            <div>
                <h3 className={`text-${color} text-xl mb-3 font-semibold sm:text-lg md:text-base`}>{category}</h3>
                <span className={`bg-${color} text-sm text-pureWhite rounded-full py-2 px-4`}>{itemsNum} Accounts</span>
            </div>
        </div>
    )
}

export default InfoPage;