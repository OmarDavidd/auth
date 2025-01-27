import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const configDB = {
	apiKey: "AIzaSyBktCNfOCZIEluCzLsj3Ei4jk7zFzkvx2E",
	authDomain: "vuejs-auth-4919b.firebaseapp.com",
	projectId: "vuejs-auth-4919b",
	storageBucket: "vuejs-auth-4919b.firebasestorage.app",
	messagingSenderId: "679444291686",
	appId: "1:679444291686:web:4eed8aeb3142ec25644da7"
};

const app = initializeApp(configDB);
const auth = getAuth(app);

export default auth