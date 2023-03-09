import React from "react";
import { useDispatch, useSelector } from 'react-redux'

const Amounts = ({currency, balance, attempt, stake, updateStake})=>{
    const windowSize = useSelector(state=>state.windowState.windowSize)
    const windowWidth = windowSize.innerWidth
    const style1 = windowWidth > 400 ? {} : {width:.35*windowWidth, height:.09*windowWidth}
    const style2 = windowWidth > 400 ? {} : {fontSize:.023*windowWidth, fontWeight:300, marginTop:.005*windowWidth}
    const style3 = windowWidth > 400 ? {} : {fontSize:.032*windowWidth, fontWeight:700, marginBottom:.005*windowWidth}

    return(
        <div className='amounts'>

          <div className='balance' style={style1}>
              <h4 className="amount-heading" style={style2}>Balance</h4>
              <h3 className="amount-text" style={style3}>{currency +" "+balance}</h3>
          </div>
    
          <div className='stake' style={style1}>
              <h4 className="amount-heading" style={style2}>Stake</h4>
              {
                attempt == 1 ?(
                <div className='stake-amount'>
                    <h3 className='currency' >{currency}</h3>
                    <input className='stake-input' type={'number'} value={stake} onChange={(e)=>updateStake(e.target.value)}/>
                </div>
    
                ):(
                  // <div className='stake-amount'>
                    <h3 className='currency' style={style3}>{currency +" "+stake}</h3>
                  // </div>
                )
              }
          </div>
      </div>
    )
}

export default Amounts