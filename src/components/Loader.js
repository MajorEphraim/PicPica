import React, {useState} from "react";
import logo from '../pictures/icon.png'

const Loader =()=>{
    const [counter, setCounter] = useState(1)
    const [text, setText] = useState('Initializing PicPica.')


    const continueLoading = ()=>{
        if (counter == 1) {
            setText('Initializing PicPica.  ')
        }else if(counter == 2){
            setText('Initializing PicPica.. ')
        }else if(counter == 3){
            setText('Initializing PicPica...')
        }

    }   
    
    setTimeout(()=>{
        continueLoading()
        if (counter >= 3) {
            setCounter(1)
        } else {
            setCounter(prev=>prev+1)
        }
    },1000)

    return(
        <div style={{display:'flex', flexDirection:'column', width:'100%', flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'white'}}>
            <img src={logo} height='280px'/>
          <h1 style={{fontWeight:'500', fontSize:'15px', marginTop:'20px'}}>{text}</h1>
        </div>
    )
}

export default Loader