import {auth,createUserWithEmailAndPassword, 
        signInWithEmailAndPassword, sendEmailVerification, 
        updateProfile, db, collection, setDoc, doc, signOut
    } from '../firebase/configs'
import { storeToken, removeToken } from '../redux/slices/authSlice';
import {getDetails} from './fetchDetails'
import store from '../redux/store';

const signIn = async (email, password)=>{
    let errorMsg = null
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password) 
        // Signed in 
        const user = userCredential.user;
        if (user.emailVerified) {
        //     await AsyncStorage.setItem('auth details',JSON.stringify({userToken:user.uid, isSignedIn:true}))
        localStorage.setItem("token", user.uid)
        store.dispatch(storeToken(user.uid)) 
        }else{
            await sendEmailVerification(user)
            alert('Email address not verified, a verification link has been sent to '+email+", click on that link to verify your email address")
            errorMsg = 'Email address not verified, a verification link has been sent to '+email+", click on that link to verify your email address"
        }
        // ...
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        errorMsg=errorMessage
    }
    return errorMsg
}

const signUp = async (username,email, password)=>{

    let errorMsg = null
    
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        // Signed in 
        const user = userCredential.user;

        // await updateProfile(user, {
        //     displayName: username
        // })

        await setDoc(doc(db, "account details", user.uid), {
            username,
            email,
            profilePic: null,
            balance:0
          });

        await sendEmailVerification(user)
        console.log("email sent")
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        errorMsg=errorMessage
    }

    return errorMsg
}

const signOutUser = async()=>{
    let errorMsg = null
    try {
        await signOut(auth)
        store.dispatch(removeToken())
        localStorage.removeItem('token')
    } catch (error) {
        const errorMessage = error.message
        errorMsg=errorMessage
    }
    return errorMsg
}

export {signUp, signIn, signOutUser}