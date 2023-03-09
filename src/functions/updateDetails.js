import { auth, db, doc, updateDoc } from '../firebase/configs'
import { getDetails } from '../functions/fetchDetails'
import store from '../redux/store'

const updateDetails = async(obj)=>{
    let errorMsg = null
    try {
        const uid = store.getState().authState.token
        const accountRef = doc(db, "account details", uid);
        await updateDoc(accountRef, obj);
        await getDetails()
    } catch (error) {
        errorMsg = error.message
    }

    return errorMsg
}

export default updateDetails

