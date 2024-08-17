import React from 'react';
import warningIcon from '../assets/materials/warning-icon.png';

const NoteModal = () => {

    const [modalVisible, setModalVisible] = React.useState(true);

    const [isBtActive, seIsBtnActive] = React.useState(false);

    React.useEffect(() => {

     if (modalVisible) {
        const activator = setTimeout(() => {
            seIsBtnActive(true);
        }, 8000);

        return () => clearTimeout(activator);
     }

    }, [modalVisible]);

    const handleModalVisible = () => {
        if (!isBtActive) return;

        setModalVisible(false)
    }

    return;


    return (
        <>
          {
            modalVisible && <div onClick={handleModalVisible} className='fixed z-50 inset-0 w-full h-full bg-blur bg-lightOverlay'></div>
          }

          <div className={`${!modalVisible && "scale-0"} z-50 p-6 transition-all duration-700 flex note-modal flex-col gap-5 fixed w-11/12 bg-pureWhite top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 max-w-80 md:p-10 md:gap-8`}>
            <div className='relative pb-4 flex justify-between items-center'>
                <div>
                <h2 className='text-2xl font-semibold md:text-3xl'>Important Note</h2>
                <span className='text-sm text-lightOrange font-semibold'>Read Carefully</span>
                </div>

                <img src={warningIcon} alt='' />
                
            </div>

            <p className='text-sm leading-7 md:text-base md:leading-8'>This website is for demonstration purposes only, and all the features, data processing, and functionality <b>have not been fully developed</b>. The designs, layout and contents are just drafts and we can actually change or alter it based on the needs and preference of your business. Thank you and have a nice day!</p>

            <button className={`${isBtActive ? "bg-lightOrange" : "bg-lightGray cursor-not-allowed"} self-center py-2 rounded-lg transition-all w-11/12 text-pureWhite md:self-start md:w-1/2 md:py-3`} onClick={handleModalVisible} >continue</button>
            
          </div>
        </>
    )
}

export default NoteModal;