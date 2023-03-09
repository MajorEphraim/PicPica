import React from "react";
import { useDispatch, useSelector } from 'react-redux'

const Attempts = ({currency, stake})=>{
    const windowSize = useSelector(state=>state.windowState.windowSize)
    const windowWidth = windowSize.innerWidth
    const style_ = windowWidth > 400 ? {} : {width:.22*windowWidth, height:.1*windowWidth, borderRadius:0.1*windowWidth}
    const style2 = windowWidth > 400 ? {} : {width:.9*windowWidth}
    const textStyle1 = windowWidth > 400 ? {} : {fontSize:.023*windowWidth}
    const textStyle2 = windowWidth > 400 ? {} : {fontSize:.025*windowWidth}


    return(
        <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}} className='level-coins'>
            <div className='attempts-container' style={style2}>
                <div className='first-attempt' style={style_}>
                    <h6 className="attempt-text1" style={textStyle1}>Attempt 1</h6>
                    <h5 className="attempt-text2" style={textStyle2}>x5 =  {currency + " "+stake*5}</h5>
                </div>
                <div className='sec-attempt'style={style_}>
                    <h6 className="attempt-text1" style={textStyle1}>Attempt 2</h6>
                    <h5 className="attempt-text2" style={textStyle2}>x3 = {currency + " "+stake*3}</h5>
                </div>
                <div className='last-attempt' style={style_}>
                    <h6 className="attempt-text1" style={textStyle1}>Attempt 3</h6>
                    <h5 className="attempt-text2" style={textStyle2}>x2 = {currency + " "+stake*2}</h5>
                </div>
                </div>
            <div/>
      </div>
    )
}

export default Attempts