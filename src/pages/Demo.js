import '../styles/Home.css';
import React, {useState, useEffect} from 'react';

import NavBar from '../components/NavBarHome';
import Drawer from '../components/Drawer';
import LoadVoucher from '../modals/LoadVoucher';
import Withdraw from '../modals/Withdraw';
import Account from '../components/Account';
import NetworkStatus from '../components/NetworkStatus';
import Loader from '../components/Loader';
import Outcome from '../components/Outcome';
import GameError from '../components/GameError';
import Attempts from '../components/Attempts';
import GroupedCards from '../components/GroupedCards';
import Amounts from '../components/Amounts';

import {fetchDetails, getDetails} from '../functions/fetchDetails'
import { useDispatch, useSelector } from 'react-redux'
import { closeDrawer } from '../redux/slices/drawerSlice'
import { updateToken } from '../redux/slices/authSlice'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useNavigate
} from "react-router-dom";

import { animalsList } from '../data';

function Demo() {

  const dataRange = animalsList.length - 1
  const [balance, setBalance] = useState(800)
  const token = useSelector(state=>state.authState.token)
  const windowSize = useSelector(state=>state.windowState.windowSize)

  const currency = token == null ? "R" : "R"
  const [animals, setAnimals] = useState([])

  const [animal, setAnimal] = useState('')
  const [attempt, setAttempt] = useState(1)
  const [stake, setStake] = useState(0)
  const [isWon, setIsWon] = useState(false)
  const [isNew, setIsNew] = useState(false)
  const [isShown, setIsShown] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoading2, setIsLoading2] = useState(false)

  const [clicked, setClicked] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const [errorMsg, setErrorMsg] = useState(null)
  const [errorMsg2, setErrorMsg2] = useState(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const displayAnimal = (animals)=>{
    setIsNew(true)
    setTimeout(()=>{
      setIsNew(false)
    },1500)

     const ind = Math.round(Math.random()*12)
     const animal = animals[ind]
     setAnimal(animal.name)
  }

  const chooseData = ()=>{
    let counter = 0;
    let chosenData = []

    while(counter<12){
      let ind = Math.round(Math.random()*dataRange)
      let currentAnimal = animalsList[ind]

      if (counter==0 || !chosenData.map(item=>item.name).includes(currentAnimal.name)) {
          chosenData.push(currentAnimal)
          counter++
      }
    }

    setAnimals(chosenData)
    return chosenData
  }

  const initializeAccount = async()=>{
    
    try {
      setIsLoading(true)

      setTimeout(()=>{
        setIsLoading(false)
      }, 500)
      const token = localStorage.getItem("token")
      dispatch(updateToken(token))
      if(token != null){
        setIsLoading(true)
        fetchDetails()
        const errorM = await getDetails()
        setErrorMsg2(errorM)
        setIsLoading(false)
    
      }
      
    } catch (e) {
      setErrorMsg2(e.message)
      setIsLoading2(false)
    }

  }

  const rotateCard = (animalId)=>{
    const card = document.getElementById('card'+animalId)
    const pic = document.getElementById('pic'+animalId)

    card.style.transform = "rotateY(180deg)"
    pic.style.transform = "rotateY(180deg)"
    card.style.zIndex = -1
    pic.style.zIndex = 1
    
  }

  const chooseAnimal = async(id,name)=>{
    
    setErrorMsg(null)

    if (attempt ==1) {
      if(stake <1){
        // alert("Put a stake of atleast R 1")
        setErrorMsg("Put a stake of atleast R 1")

        setTimeout(()=>{
          setErrorMsg(null)
        },2000)
        return
      }
      
      if(stake >balance){
        // alert("You do not enough balance for such a stake")
        setErrorMsg("Top up your account for such a stake")

        setTimeout(()=>{
          setErrorMsg(null)
        },2000)
        setStake(0)
        return
      }
      setBalance(prev=>prev - stake)
    }


    if(animal != name && attempt == 3){

      setTimeout(()=>{
        animals.forEach(animal=>{

          const animalId  = animal.id
          if (animalId != id) {
            const card = document.getElementById('card'+animalId)
            const pic = document.getElementById('pic'+animalId)
        
            card.style.transform = "rotateY(180deg)"
            pic.style.transform = "rotateY(180deg)"
            card.style.zIndex = -1
            pic.style.zIndex = 1
            
          }
        })

        setIsShown(true)
      },1000)

      setTimeout(()=>{
        setIsVisible(true)
      },4000)

      setTimeout(()=>{

        animals.forEach(animal=>{
          const id  = animal.id

          const card = document.getElementById('card'+id)
          const pic = document.getElementById('pic'+id)
      
          card.style.transform = "rotateY(0deg)"
          pic.style.transform = "rotateY(0deg)"
          card.style.zIndex = 1
          pic.style.zIndex = -1

        })

        setIsVisible(false)
        setIsShown(false)

      },5000)

      setTimeout(()=>{
        setIsAnimating(false)
      },5500)


      setTimeout(()=>{
        setIsVisible(false)
        setAttempt(1) 
        setIsWon(false)
        setStake(0)
        const animals = chooseData()
        displayAnimal(animals)
        return
      },6000)
    }

    setIsAnimating(true)
    const card = document.getElementById('card'+id)
    const pic = document.getElementById('pic'+id)
    const newAnimal = animals

    card.style.transform = "rotateY(180deg)"
    pic.style.transform = "rotateY(180deg)"
    card.style.zIndex = -1
    pic.style.zIndex = 1

    if(animal != name && attempt !=3){
      setTimeout(()=>{
        card.style.transform = "rotateY(0deg)"
        pic.style.transform = "rotateY(0deg)"
        card.style.zIndex = 1
        pic.style.zIndex = -1

      },1000)

      setTimeout(()=>{
        setIsAnimating(false)
      },1500)

    }

    if(animal == name){
      setTimeout(async()=>{
        setIsVisible(true)
        setIsWon(true)

        let newBalance = 0
        switch (attempt){
          case 1:
            newBalance = balance + (stake*5)
            break
          case 2:
            newBalance = balance + (stake*3)
            break
          default:
            newBalance = balance + (stake*2)
            break
        }
        
        setBalance(newBalance)
        setAttempt(1)
      },1000)
      
      setTimeout(()=>{
        setIsVisible(false)
        setAttempt(1) 
        setIsWon(false)
        setStake(0)
        
        card.style.transform = "rotateY(0deg)"
        pic.style.transform = "rotateY(0deg)"
        card.style.zIndex = 1
        pic.style.zIndex = -1
        const animals = chooseData()
        displayAnimal(animals)
        return
      },2200)

      setTimeout(()=>{
        setIsAnimating(false)
      },2700)

    }

    setAnimals(newAnimal)
    setClicked(!clicked)
    setAttempt(prevState=>prevState+1) 
  }
  
  const updateStake =(val)=>{
    setErrorMsg(null)
    setStake(val)
  }

  const hidePopups = ()=>{
    const accountContainer = document.getElementById("account")
    const drawer = document.getElementById("drawer")
    drawer.style.animationName = "close-drawer"
    drawer.style.animationDuration = ".7s"
    accountContainer.style.display = "none"
    dispatch(closeDrawer())
  }

  const showAttemptsLeft = ()=>{

    if(attempt == 4){
      return "You used up all your attempts"
    }else if(attempt == 1){
      return "You have 3 attempts"
    }else{
      return (4-attempt) + " attempts left"
    }
  }

  useEffect(()=>{
    const newAnimals = chooseData()
    displayAnimal(newAnimals)
    
  },[])

  useEffect(()=>{
    initializeAccount()
  },[])

  const reset = ()=>{
        setBalance(800)
        setAttempt(1)
        setStake(0)
        setIsAnimating(false)
  }

  // console.log("sizeeee ", windowSize)

  if (isLoading2) {
    return <Loader/>
  }

  return (
    <>

    <GameError errorMsg={errorMsg}/>

    <div style={{ position:'absolute', width:'100%', height:'100%', zIndex: isAnimating ? 3:-3, display:'flex', justifyContent:'center', alignItems:'center'}}/> 

    {
      isVisible ?(
        <Outcome isWon={isWon}/>
      ):null
      
    }

    <div className="App" style={{display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
      <NavBar attemptsLeft={showAttemptsLeft()} isDemo ={true} reset={reset}/>
      <Drawer/>
      <LoadVoucher/>
      <Withdraw/>
      <Account isDemo={true} amount={balance}/>
      {/* <NetworkStatus/> */}
      <div className="app-content" onClick={hidePopups} style={{display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
        <div className='text'>
        <Attempts currency={currency} stake={stake}/>
          <div className='instruction'>
              <h2 className='pick-animal' style={windowSize.innerWidth  > 400 ? {  } : { fontSize:.036*windowSize.innerWidth, fontWeight:500 }}>Pick the card of the following animal</h2>
          </div>
          <div className='animal_name_container' style={windowSize.innerWidth  > 400 ? {  } : { width:.4*windowSize.innerWidth }}>
              <h1 className='animal_name' style={windowSize.innerWidth  > 400 ? {  } : { fontSize:.037*windowSize.innerWidth, fontWeight:500 }}>{animal}</h1>
          </div>
        </div>
      <div className='cards-container'>
        {
        windowSize.innerWidth > 400 ? (
            <>
              <GroupedCards animals ={animals.filter((item,index)=>index<4)} chooseAnimal={chooseAnimal} isShown={isShown} animal={animal}/>
              <GroupedCards animals ={animals.filter((item,index)=>index>3 && index<8)} chooseAnimal={chooseAnimal} isShown={isShown} animal={animal}/>
              <GroupedCards animals ={animals.filter((item,index)=>index>7)} chooseAnimal={chooseAnimal} isShown={isShown} animal={animal}/>
            </>
        ):(
            <>
              <GroupedCards animals ={animals.filter((item,index)=>index<3)} chooseAnimal={chooseAnimal} isShown={isShown} animal={animal}/>
              <GroupedCards animals ={animals.filter((item,index)=>index>2 && index<6)} chooseAnimal={chooseAnimal} isShown={isShown} animal={animal}/>
              <GroupedCards animals ={animals.filter((item,index)=>index>5 && index<9)} chooseAnimal={chooseAnimal} isShown={isShown} animal={animal}/>
              <GroupedCards animals ={animals.filter((item,index)=>index>8)} chooseAnimal={chooseAnimal} isShown={isShown} animal={animal}/>
            </>
        )
        }
      </div>
      <Amounts currency={currency} balance={balance} attempt={attempt} stake={stake} updateStake={updateStake}/>
    </div>
    </div>
  </>
  );
}

export default Demo;
