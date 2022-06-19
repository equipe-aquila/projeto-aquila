import {initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider, signInWithRedirect, signOut, onAuthStateChanged} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCa0al2rbTgh560-ms6J11ENi_tA4eYSe8",
    authDomain: "aquila-e54aa.firebaseapp.com",
    projectId: "aquila-e54aa",
    storageBucket: "aquila-e54aa.appspot.com",
    messagingSenderId: "112389775118",
    appId: "1:112389775118:web:ac38e48eb26070ee66015f"
};

initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);
export const signOutUser = async () => await signOut(auth);
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);
