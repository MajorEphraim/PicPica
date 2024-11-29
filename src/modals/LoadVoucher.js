import React,{ useState } from "react";
import ReactDOM from 'react-dom';
import '../styles/LoadVoucher.css'
import { BiCaretDown, BiX } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux'

const LoadVoucher = ()=>{

    const [selectedVoucher, setSelectedVoucher] = useState('')
    const [isOpened, setIsOpened] = useState(false)
    const [voucher, setVoucher] = useState(null)

    const balance = useSelector(state=>state.accountState.balance)

    const voucherList = ["1Voucher", "Blu voucher"]

    const closeModal = ()=>{
        const container = document.getElementById('container')
        const innerContainer = document.getElementById('inner-container')

        container.style.display = 'none'
        innerContainer.style.display = 'none'
    }

    const updateList =()=>{
        setIsOpened(true)

        setTimeout(()=>{
            setIsOpened(false)
        },200)
    }

    return(
        <>
        <div className="container" id="container"/>
        <div className="inner-container" id="inner-container">
            <div className="close-modal">
                <BiX className="close-icon" onClick={closeModal}/>
            </div>
            <div className="lower-part">
                <h6 className="balance-text">Balance: R {balance}</h6>
                {/* <div> */}
                    <select required name="vouchers" id="vouchers" className="choose-voucher">
                        {/* {isOpened ? null : <option value={"choose-voucher"} className="choose-text">Choose voucher</option>} */}
                        <option value="" className="choose-text">Choose voucher</option>
                        {
                            voucherList.map(item=><option key={item} value={item} className="choose-text">{item}</option>)
                        }
                    </select>
                {/* </div> */}

                <input className="enter-voucher" placeholder="Enter voucher number here"/>
                
                <div className="load-voucher">
                    <h2 className="load-text">LOAD</h2>
                </div>
                
            </div>
        </div>
        </>
    )
}

export default LoadVoucher