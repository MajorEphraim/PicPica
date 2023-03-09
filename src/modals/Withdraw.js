import React,{ useState, useEffect } from "react";
import '../styles/Withdraw.css'
import { BiCaretDown, BiX } from "react-icons/bi";
import { withdraw } from '../functions/withdrawal'
import { useSelector } from 'react-redux'
import updateDetails from '../functions/updateDetails'

const Withdraw = ()=>{

    const methodsList = ["Banking details", "e-Wallet", "Cash send"]

    const [method, setMethod] = useState('Choose payment method')
    const [amount, setAmount] = useState(0)
    const [bankName, setBankName] = useState('')
    const [accNumber, setAccNumber] = useState('')
    const [branchCode, setBranchCode] = useState('')

    const [errorMsg, setErrorMsg] = useState(null)
    const [resp, setResp] = useState(null)

    const [isConfirmed, setIsConfirmed] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const balance = useSelector(state=>state.accountState.balance)

    const closeModal = ()=>{
        const container = document.getElementById('container-w')
        const innerContainer = document.getElementById('inner-container-w')
        setIsConfirmed(false)

        container.style.display = 'none'
        innerContainer.style.display = 'none'
    }

    const chooseMethod = ()=>{
        if (method == 'Banking details') {
            return(
                <div className="banking-details">
                    <input style={ bankName == '' && isConfirmed ? {borderColor:'red'}:{borderColor:"#38d002"}} type={'text'} placeholder='Bank name' onChange={e=>{setBankName(e.target.value); setErrorMsg(null)}}/>
                    <input style={ accNumber == '' && isConfirmed ? {borderColor:'red'}:{borderColor:"#38d002"}} type={'number'} placeholder='Account number' onChange={e=>{setAccNumber(e.target.value); setErrorMsg(null)}}/>
                    <input style={ branchCode == '' && isConfirmed ? {borderColor:'red'}:{borderColor:"#38d002"}} type={'number'} placeholder='Branch code' onChange={e=>{setBranchCode(e.target.value); setErrorMsg(null)}}/>
                </div>
            )
        }else{
            return <div/>
        }
    }

    const confirm =async()=>{

        if(isLoading){
            return
        }
        setErrorMsg(null)

        setIsConfirmed(true)
        if (method == 'Choose payment method') {
            setErrorMsg("Choose a method of payment")
            return
        }

        if (amount == 0 || amount == '') {
            setErrorMsg("Enter an amount you want to withdraw")
            return
        }

        if (amount == 0 || amount > balance) {
            setErrorMsg("You do not have such an amount in your account")
            return
        }

        if (amount < 20) {
            setErrorMsg("You can only withdraw from R20")
            return
        }



        if (bankName == '' && method =='Banking details') {
            setErrorMsg("Enter the name of the bank")
            return
        }

        if (accNumber == '' && method =='Banking details') {
            setErrorMsg("Your account number is required")
            return
        }

        if (branchCode == '' && method =='Banking details') {
            setErrorMsg("The branch code is required")
            return
        }


        try {
            setIsLoading(true)
            const errorMsg = await withdraw(bankName, accNumber, branchCode, amount, method)
            const errorMsg2 = await updateDetails({balance:balance-amount})
            setErrorMsg(errorMsg)
            setErrorMsg(errorMsg2)
            setIsLoading(false)
            setIsConfirmed(false)
            if(method == 'Banking details'){
                setResp("Your money will be sent in your account within 24hrs")
            }else{
                setResp("A message and email with your withdrawal details will be sent in to you within 24hrs")
            }

            setTimeout(()=>{
                setResp(null)
            },5000)

        } catch (error) {
            setErrorMsg(error.message)
            setIsLoading(false)
            setIsConfirmed(false)
        }
    }

    return(
        <>
        <div className="container-w" id="container-w"/>
        <div className="inner-container-w" id="inner-container-w">
            <div className="close-modal">
                <BiX className="close-icon" onClick={closeModal}/>
            </div>
            <div className="lower-part">
                <h6 className="balance-text">Balance: R {balance}</h6>
                <div className="choose-method">
                    <select required name="vouchers" id="methods" onChange={(e)=>{setMethod(e.target.value);setErrorMsg(null); setIsConfirmed(false)}}>
                        {/* {isOpened ? null : <option value={"choose-voucher"} className="choose-text">Choose voucher</option>} */}
                        <option value="Choose payment method" className="choose-text">Choose payment method</option>
                        {
                            methodsList.map(item=><option value={item} className="choose-text">{item}</option>)
                        }
                    </select>
                </div>
                {
                    method == 'Choose payment method' ? (
                        <div/>
                    ):(
                    <div className="withdrawal-amount">
                        <h4 className="text-amount">Amount to withdraw: R </h4>
                        <input style={ amount == 0 && isConfirmed ? {borderColor:'red'}:{borderColor:"#38d002"}} className="enter-amount" onChange={e=>{setAmount(e.target.value); setErrorMsg(null)}}/>
                    </div>
                    )
                }
              
                {
                    chooseMethod()
                }
                <div className="confirm-action" onClick={confirm}>
                    <h2 className="confirm-text">Confirm</h2>
                </div>
                <h6 className="resp-w">{resp}</h6>
                <h6 className="error-w">{errorMsg}</h6>
                { isLoading ? <h6 className="loading-w">...Loading</h6> : null}
            </div>
        </div>
        </>
    )
}

export default Withdraw