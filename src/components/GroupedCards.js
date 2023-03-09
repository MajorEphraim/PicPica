import React from "react";
import Card from "./Card";

const GroupedCards = ({animals, chooseAnimal, isShown, animal})=>{
    
    return(
        <div className='grouped-cards'>
        {
          animals
          .map(item=><Card item={item} chooseAnimal={chooseAnimal} isShown={isShown} animal={animal}/>)
        }
  
      </div>
    )
}

export default GroupedCards