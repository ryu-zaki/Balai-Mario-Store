import React from 'react'
import style from '../style.module.css';
import filterIcon from '../../assets/admin_panel/filter-dark.png';
import listIcon from '../../assets/admin_panel/list-dark.png';
import chevron from '../../assets/materials/chevron-left.png';
import {useLocation} from 'react-router';
import {divideArr} from '../../components/CategoryProducts';
import { useAdminAnim } from '../AnimationGSP_Admin';


function InfoListPreview({listName, items, modalVisible, PageTable, InfoModal, setModalVisible}) {

  const controlledItems = divideArr(items, 7);
  

  const [controlIndex, setControlIndex] = React.useState(0);
  const [animateTrigger, setAnimateTrigger] = React.useState(false); 

  return (
    <> 
    {
      modalVisible && (InfoModal)
    }
    
    <div className={`${ style.upper_line } relative md:pt-5 lg:pt-7`}>
      <div className='flex flex-col gap-5 mt-2 md:flex-row md:items-start md:justify-between md:gap-10 xl:items-center'>
          <div className='sub_text1'>
             <h2 className='text-2xl font-semibold md:text-3xl xl:text-3xl'>{listName}</h2>
             <div className='text-lightOrange text-sm font-semibold mt-5'>
              <span className='sub_text1 opacity-0 inline-block -translate-x-10'>Total of</span>&nbsp;&nbsp;
              <span className='bg-lighterOrange opacity-0 inline-block -translate-x-10 px-3 py-2 rounded-full sub_text2 capitalize'>{items.length} active {listName.split(" ")[1]}</span>
             </div>
          </div>

          <div className='flex gap-2 md:gap-5'>
             <ControlButton imgSrc={filterIcon} label={"Filter"} />
             <ControlButton imgSrc={listIcon} label={"View More"} />
          </div>
          
      </div>
      
      
      <SliderButtons setAnimateTrigger={setAnimateTrigger} controlIndex={controlIndex} setControlIndex={setControlIndex} itemsLen={controlledItems.length} />

       <PageTable animateTrigger={animateTrigger} setModalVisible={setModalVisible} list={controlledItems[controlIndex]} />

      <SliderButtons setAnimateTrigger={setAnimateTrigger} controlIndex={controlIndex} setControlIndex={setControlIndex} itemsLen={controlledItems.length}/>
      


    </div>
    </>
  )
}

const ControlButton = ({imgSrc, label}) => {

  return (
    <button className='border border-lightGray p-2 rounded-full'>
      <img className='w-6' src={imgSrc} alt="" />
      <span className='hidden'>{label}</span>
    </button>
  )
}




const SliderButtons = ({setControlIndex, itemsLen, controlIndex, setAnimateTrigger}) => {
  const {pathname} = useLocation();
  const {setTriggerAnim} = useAdminAnim();

  if (pathname == "/") return;

  const handleControls = ({target}) => {

    if (target.id === "add") {
      setControlIndex(prev => prev >= itemsLen - 1 ? prev : prev + 1);
      
    } else {
      setControlIndex(prev => !prev ? 0 : prev - 1);
    }

    setAnimateTrigger(prev => !prev);
    setTriggerAnim(prev => !prev);

  }

  return (
    <div className='flex w-full justify-between text-xs mt-10 items-center md:text-sm xl:mt:14'>
      <div className='flex gap-5'>

      <div className={`flex items-center gap-2 border relative ${!controlIndex ? "opacity-40 cursor-not-allowed" : "cursor-pointer"} border-gray  rounded-md px-3 py-2`}>
          <div id="sub" onClick={handleControls} className='absolute z-10 inset-0'></div>
          <img width={15} src={chevron} alt='' />
          <p>Previous</p>
        </div>

        <div className={`${controlIndex >= itemsLen - 1 ? "opacity-40 cursor-not-allowed" : "cursor-pointer"} flex items-center gap-2 border-gray border relative rounded-md px-3 py-2`}>
          <div id="add"  onClick={handleControls} className='absolute z-10 inset-0'></div>
          <p>Next</p>
          <img width={15} className='-rotate-180' src={chevron} alt='' />
        </div>
      </div>


      <p className='font-semibold'>{controlIndex + 1} of {itemsLen}</p>
    </div>
  )
}

export default InfoListPreview;
