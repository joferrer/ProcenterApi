
const { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } = require( 'firebase/auth')

const { FireBaseAuth } = require( './config')

const googleProvider = new GoogleAuthProvider();

const singInWithGoogle = async ()=>{

    try{
        const result = await signInWithPopup( FireBaseAuth, googleProvider );

        const credentials = GoogleAuthProvider.credentialFromResult(result);

        const {displayName, email, photoURL, uid } = result.user;
        
        return {
            ok: true,
            //userInfo
            displayName, email, photoURL, uid
        }

    } catch (error){

        const errorCode = error.code;
        const errorMessage= error.message;       

        return {
            ok: false,

            errorCode, errorMessage

        }
    }

}

 const registerUserWithEmailPassword = async ({email,password,displayName})=>{

    try {
        
       const resp = await createUserWithEmailAndPassword(FireBaseAuth,email, password);

       const {uid,photoURL} = resp.user;
       await updateProfile(FireBaseAuth.currentUser, { displayName });

       return {
        ok: true,
        email,
        password,
        uid,
        photoURL
       }

    } catch (error) {
        let errorMessage = error.message;
        if( error.message === 'Firebase: Error (auth/email-already-in-use).')
            errorMessage = 'Ese correo ya esta registrado.'

        return {
            ok: false,
            errorMessage
        }
    }

}

 const loginWithEmailPassword = async({email, password})=>{

    try {
        const resp = await signInWithEmailAndPassword(FireBaseAuth, email, password);
        console.log(resp);
        const {displayName, photoURL, uid } = resp.user;

        return {
            ok: true,
            uid,
            displayName,
            email,
            photoURL
        }
        
    } catch (error) {
        const errorMessage = 'Su correo o contraseña es incorrecto.';
        return {
            ok: false,
            errorMessage
        }
    }

}

 const logoutFireBase = async()=>{

    return await FireBaseAuth.signOut();
}

const probando = () =>{
    console.log('Probando el export de modulos! ... Funcina!! :D \n')
}

module.exports = {
    probando
}