import {auth, updateProfile, db, collection,doc, setDoc, getDoc, where, query, onSnapshot, getDocs} from '../firebase/configs'
import { updatePayments } from '../redux/slices/paymentsSlice'
import store from '../redux/store'


const fetchPayments = ()=>{
        try {
                console.log("STARTED")
                const accountQuery = query(collection(db, "withdrawals"))

                const unsubscribe = onSnapshot(accountQuery, (querySnapshot) => {
                    let payments = []
                    querySnapshot.forEach((doc) => {
                    payments.push([...{id:doc.id},...doc.data()])
                    console.log("DOCCC ", doc.data())

                }); 
                store.dispatch(updatePayments(payments))  
                });
        } catch (error) {
            console.log(error.message)
        }

    
        return null
}

export default fetchPayments