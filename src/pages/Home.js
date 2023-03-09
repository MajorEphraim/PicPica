import '../styles/Home.css';
import React, {useState, useEffect} from 'react';

import won from '../pictures/won.png'
import lost from '../pictures/lost2.png'

import NavBar from '../components/NavBarHome';
import Drawer from '../components/Drawer';
import LoadVoucher from '../modals/LoadVoucher';
import Withdraw from '../modals/Withdraw';
import Account from '../components/Account';
import NetworkStatus from '../components/NetworkStatus';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Outcome from '../components/Outcome';

import {fetchDetails, getDetails} from '../functions/fetchDetails'
import updateDetails from '../functions/updateDetails'
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

import {animalsList} from '../data';

function Home() {
  const balance = useSelector(state=>state.accountState.balance)
  const token = useSelector(state=>state.authState.token)

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

     const ind = Math.round(Math.random()*11)
     setAnimal(animals[ind].name)
  }

  const chooseData = ()=>{
    let counter = 0;
    let chosenData = []

    while(counter<12){
      let ind = Math.round(Math.random()*11)
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
    setIsLoading2(true)
    
    try {

      const token = localStorage.getItem("token")
      dispatch(updateToken(token))
      if(token == null){
        navigate('/login')
        return
      }
      fetchDetails()
      const errorM = await getDetails()
      setErrorMsg2(errorM)
      setIsLoading2(false)
      
    } catch (e) {
      setErrorMsg2(e.message)
      setIsLoading2(false)
    }

  }

  const startBetting = async(balance)=>{

    try {
      await updateDetails({balance})
      setIsLoading(false)
    } catch (error) {
      setErrorMsg(error.message)
      setIsLoading(false)
    }
  }

  const chooseAnimal = async(id,name)=>{
    
    setErrorMsg(null)

    if (attempt ==1) {
      if(stake <1){
        setErrorMsg("Put a stake of at least R 1")
        setTimeout(()=>{
          setErrorMsg(null)
          setStake(0)
        },2000)
        return
      }
      
      if(stake >balance){
        setErrorMsg("Top up your account for such a stake")
        setTimeout(()=>{
          setErrorMsg(null)
          setStake(0)
        },2000)
        return
      }
      setIsLoading(true)
      await startBetting(balance - stake)
      setIsLoading(false)
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
        
        await startBetting(newBalance)
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
   // setBalance(balance-val)
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

  if (isLoading2) {
    return <Loader/>
  }

  if (errorMsg2) {
    return <Error initializeAccount={initializeAccount}/>
  }
  return (
    <>
   <div style={{ position:'absolute', width:'100%', height:'100vh', zIndex: errorMsg !=null || isLoading ? 3:-3, display:'flex', justifyContent:'center', alignItems:'center', backgroundColor:'#000', opacity:.5}}> 
      
      <div style={{backgroundColor:'#ffffff'}}>
        <h1 style={{color:'red', fontSize:'20px' }}>{errorMsg}</h1>
      </div>
    </div>

    <div style={{ position:'absolute', width:'100%', height:'100vh', zIndex: errorMsg !=null ? 3:-3, display:'flex', justifyContent:'center', alignItems:'center'}}> 
      <div style={{backgroundColor:'#ffffff', padding:'10px'}}>
        <h1 style={{color:'black', fontSize:'20px' }}>{errorMsg}</h1>
      </div>
    </div>

    
    <div style={{ position:'absolute', width:'100%', height:'100%', zIndex: isLoading ? 3:-3, display:'flex', justifyContent:'center', alignItems:'center'}}> 
      <div style={{backgroundColor:'#ffffff', padding:'10px'}}>
        <h1 style={{color:'black', fontSize:'20px' }}>...Loading</h1>
      </div>
    </div>

    <div style={{ position:'absolute', width:'100%', height:'100%', zIndex: isAnimating ? 3:-3, display:'flex', justifyContent:'center', alignItems:'center'}}/> 

    {
      isVisible ?(
        <Outcome isWon={isWon}/>
      ):null
      
    }

    <div className="App">
      <NavBar attemptsLeft={showAttemptsLeft()} isDemo ={false}/>
      <Drawer/>
      <LoadVoucher/>
      <Withdraw/>
      <Account isDemo={false} amount={null}/>
      <NetworkStatus/>
      
      <div className="app-content" onClick={hidePopups}>
      <div className='text'>
        <div className='level-coins'>
          <div >
            <h3></h3>
          </div>
          <div className='attempts-container'>
            <div className='first-attempt'>
              <h6>Attempt 1</h6>
              <h5>x5 = R {stake*5}</h5>
            </div>
            <div className='sec-attempt'>
              <h6>Attempt 2</h6>
              <h5>x3 = R {stake*3}</h5>
            </div>
            <div className='last-attempt'>
              <h6>Attempt 3</h6>
              <h5>x2 = R {stake*2}</h5>
            </div>
          </div>
          {/* <div className='levels-coins-container'>
            <h3 className='amount-won'>Amount won: {coins}</h3>
          </div> */}
          <div/>
        </div>
        
        <div className='instruction'>
            <h2 className='pick-animal'>Pick the card of the following animal</h2>
        </div>
        <div className='animal_name_container'>
            <h1 className='animal_name'>{animal}</h1>
        </div>
      </div>
     <div className='cards-container'>
        <div className='grouped-cards'>
          {
            animals
            .filter((item,index)=>index<4)
            .map(item=>(
              <div style={{border:isShown && item.name == animal ?'red 2px solid' : 'none'}} className='empty-card' id={item.id} onClick={()=>chooseAnimal(item.id, item.name)}>
                  <img className='picture' src={item.source} id={'pic'+item.id} height={'100%'} width={'100%'}/>
                  <div className='card' id={'card'+item.id}/>
                
              </div>
            ))
          }
    
        </div>

        <div className='grouped-cards'>
        {
          animals
          .filter((item,index)=>index>3 && index<8)
          .map(item=>(
            <div style={{border:isShown && item.name == animal ?'red 2px solid' : 'none'}} className='empty-card' id={item.id} onClick={()=>chooseAnimal(item.id, item.name)}>
                <img className='picture' src={item.source} id={'pic'+item.id} height={'100%'} width={'100%'}/>
                <div className='card' id={'card'+item.id}/>
            </div>
            ))
          }
        </div>

        <div className='grouped-cards'>
        {
          animals
          .filter((item,index)=>index>7)
          .map(item=>(
            <div style={{border:isShown && item.name == animal ?'red 2px solid' : 'none'}} className='empty-card' id={item.id} onClick={()=>chooseAnimal(item.id,item.name)}>
                <img className='picture' src={item.source} id={'pic'+item.id} height={'100%'} width={'100%'}/>
                <div className='card' id={'card'+item.id}/>
            </div>
            ))
          }
        </div>
    </div>
    <div className='amounts'>

      <div className='balance'>
          <h4>Balance</h4>
          <h3>R {balance}</h3>
      </div>

      <div className='stake'>
          <h4>Stake</h4>
          {
            attempt == 1 ?(
            <div className='stake-amount'>
                <h3 className='currency'>R</h3>
                <input className='stake-input' type={'number'} value={stake} onChange={(e)=>updateStake(e.target.value)}/>
            </div>

            ):(
              <div className='stake-amount'>
                <h3 className='currency'>R {stake}</h3>
          </div>
            )
          }
      </div>

      <div/>
    </div>
    </div>
    </div>
  </>
  );
}

export default Home;
