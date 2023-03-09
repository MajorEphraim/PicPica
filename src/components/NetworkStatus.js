import React,{useState,useEffect} from "react";
import '../styles/NetworkStatus.css'

const NetworkStatus = ()=>{
    const [status, setStatus] = useState(null)

    window.addEventListener("load", () => {
        // 1st, we set the correct status when the page loads
        navigator.onLine
          ?setStatus(null)
          : setStatus("You are offline");
    
        // now we listen for network status changes
        window.addEventListener("online", () => {
            setStatus(null);
        });
    
        window.addEventListener("offline", () => {
            setStatus("Lost Network Connection !!");
        });
      });
    // const [newStatus, setNewStatus] = useState(status)
    // useEffect(()=>{
    //     setNewStatus(status)
    //     console.log("status changed")
    // },[status])

    // window.addEventListener("load", () => {
    //     // 1st, we set the correct status when the page loads
    //     navigator.onLine
    //       ? NetStatusNotification(true, "You are online")
    //       : NetStatusNotification(false, "You are offline");
    
    //     // now we listen for network status changes
    //     window.addEventListener("online", () => {
    //       NetStatusNotification(true, "You are online back !!");
    //     });
    
    //     window.addEventListener("offline", () => {
    //       NetStatusNotification(false, "Lost Network Connection !!");
    //     });
    //   });
    return(
        <div className='network-status'>
            <h6 className='network-text'>{status}</h6>
        </div>
    )
}

export default NetworkStatus