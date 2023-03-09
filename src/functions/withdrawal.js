import {
db, collection, setDoc, doc, signOut, auth, addDoc
} from '../firebase/configs'
import store from '../redux/store'

const withdraw = async (bankName, accNumber, branchCode, amount, method)=>{

    let errorMsg = null

    const userId = store.getState().authState.token
    const date = new Date()
    const dateRequested = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`

    try {
    
        const docRef = await addDoc(collection(db, "withdrawals"), {
            userId, bankName, accNumber, branchCode, amount, method, dateRequested
        });

    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        errorMsg=errorMessage
    }

    return errorMsg
}

export {withdraw}