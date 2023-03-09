import React from "react";
import { useSelector, useDispatch } from 'react-redux'

const GameError = ({errorMsg}) =>{
    const windowSize = useSelector(state=>state.windowState.windowSize)
    const windowWidth = windowSize.innerWidth
    return(
        <>
            <div style={{ position:'absolute', width:'100%', height:'100%', zIndex: errorMsg !=null ? 3:-3, display:'flex', justifyContent:'center', alignItems:'center', backgroundColor:'#000', opacity:.5}}/> 
            <div style={{ position:'absolute', width:'100%', height:'100%', zIndex: errorMsg !=null ? 3:-3, display:'flex', justifyContent:'center', alignItems:'center'}}> 
                <div style={{backgroundColor:'#ffffff', padding:windowWidth > 400 ? '10px' : .02*windowWidth, width:windowWidth > 400 ? null :.5*windowWidth, display:'flex', flexDirection:'row', justifyContent:'center'}}>
                <h1 style={{color:'black', fontSize:windowWidth > 400 ? '20px' : '80%'}}>{errorMsg}</h1>
                </div>
            </div>
        </>
    )
}

export default GameError