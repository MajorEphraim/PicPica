import React from "react";
import { useDispatch, useSelector } from 'react-redux'

const Card = ({item,chooseAnimal,isShown,animal})=>{
const windowSize = useSelector(state=>state.windowState.windowSize)
const windowWidth = windowSize.innerWidth

    return(
            
            windowWidth > 400 ?(
                <div style={{border:isShown && item.name == animal ?'red 2px solid' : 'none'}} className='empty-card' id={item.id} onClick={()=>chooseAnimal(item.id, item.name)}>
                <img className='picture' src={item.source} id={'pic'+item.id} height={'100%'} width={'100%'}/>
                <div className='card' id={'card'+item.id}/>
            </div>



            ):(
                <div style={{border:isShown && item.name == animal ?'red 2px solid' : 'none',width:.25*windowWidth,height:.25*windowWidth, margin:0.015*windowWidth}} className='empty-card' id={item.id} onClick={()=>chooseAnimal(item.id, item.name)}>
                    <img className='picture' src={item.source} id={'pic'+item.id} height={'100%'} width={'100%'}/>
                    <div className='card' id={'card'+item.id}/>
                </div>
            
            )
    )
}

export default Card