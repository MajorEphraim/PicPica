import React, {useState} from "react";
import logo from '../pictures/icon.png'
import { TbPlugConnectedX } from "react-icons/tb";
import { AiOutlineReload } from "react-icons/ai";

const Error =({initializeAccount})=>{


    return(
        <div style={{display:'flex', flexDirection:'column', alignItems:'center', width:'100%', flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'white'}}>
          <TbPlugConnectedX style={{fontSize:'98px', color:'#192462', fontWeight:300}}/> 
          <h1 style={{fontWeight:400, fontSize:'25px', marginTop:'10px'}}>Oops, you don't have internet connection</h1>
          <div style={{marginTop:'55px', display:'flex', flexDirection:'column', alignItems:'center'}} onClick={initializeAccount}>
            <AiOutlineReload style={{fontSize:'38px', color:'#192462'}}/> 
             <h1 style={{fontWeight:400, fontSize:'20px'}}>Retry</h1>
          </div>
        </div>
    )
}

export default Error