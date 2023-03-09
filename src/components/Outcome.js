import React, { useEffect, useState } from "react";
import '../styles/Outcome.css'
import { wonEmojis, lostEmojis } from '../data'
import { useSelector, useDispatch } from 'react-redux'

const Outcome = ({isWon})=>{
    const windowSize = useSelector(state=>state.windowState.windowSize)
    const windowWidth = windowSize.innerWidth

    const [wonEmoji, setWonEmoji] = useState(0)
    const [lostEmoji, setLostEmoji] = useState(0)

    useEffect(()=>{
        let range = wonEmojis.length - 1
        let range2 = lostEmojis.length - 1

        let ind = Math.round(Math.random()*range)
        setWonEmoji(wonEmojis[ind].source)

        let ind2 = Math.round(Math.random()*range2)
        setLostEmoji(lostEmojis[ind2].source)

    },[isWon])

    return(
        <>
            <div className='outcome' style={windowWidth > 400 ? {}:{width:.78*windowWidth, height:.8*windowWidth}}>
            {
                isWon ?(
                    <>
                    <img src={wonEmoji}   height={'50%'} width={'50%'}/>
                    <h1 className="outcome-text" style={windowWidth > 400 ?{}:{fontSize:'99%', fontWeight:.8*windowWidth, marginTop:.07*windowWidth}}>Hooray!!! You won</h1>
                </>
                ):(
                    <>
                    <img src={lostEmoji}   height={'50%'} width={'50%'}/>
                    <h1 className="outcome-text" style={windowWidth > 400 ?{}:{fontSize:'99%', fontWeight:.8*windowWidth,marginTop:.07*windowWidth}}>Oops!!! You lost</h1>
                </>
                )
            }
        
            </div>
            <div style={{position:'absolute', zIndex:2, width:'100%', height:'100%', backgroundColor:'black', opacity:.5}}/>
        </>
    )
}

export default Outcome