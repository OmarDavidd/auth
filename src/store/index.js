
import { defineStore } from 'pinia';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth';
import auth from '../firebase'

export const useUserStore = defineStore('userState', {
	state: () => ({ user: null, uid: null, error: null }),

	getters: {
		isActiveUser: (state) => ((state.user && state.uid) ? true : false)
	},

	actions: {
		async loginUser(email, password) {
			try {
				const userCredential = await signInWithEmailAndPassword(auth, email, password);
				this.user = userCredential.user;
				this.uid = userCredential.user.uid;
				this.error = null;
				return {
					email: this.user.email,
					uid: this.uid
				}
			} catch (error) {
				switch (error.code) {
					case 'auth/invalid-credential':
						this.error = {
							tipo: 'credencial',
							mensaje: 'Email o Password Incorrectos'
						}
						break;
					case 'auth/missing-password':
						this.error = {
							tipo: 'password',
							mensaje: 'Password Incorrecto'
						}
						break;
					case 'auth/invalid-email':
						this.error = {
							tipo: 'email',
							mensaje: 'Email Incorrecto'
						}
						break;
					default:
						break;
				}
			}
			return;
		},

		async registerUser(email, password) {
			try {
				const userCredential = await createUserWithEmailAndPassword(auth, email, password);
				this.user = userCredential.user;
				this.uid = userCredential.user.uid;
				return {
					email: this.user.email,
					uid: this.uid
				}
			} catch (error) {
				console.log(error);
			}
			return;
		},

		async logoutUser() {
			try {
				await signOut(auth);
				this.user = null;
				this.uid = null;
				return {
					email: null
				}
			} catch (error) {
				console.log(error);

			}
			return;
		},

		async getCurrentUser() {
			try {
				return new Promise((resolve, reject) => {
					onAuthStateChanged(auth, (user) => {
						if (user) {
							this.user = user;
							this.uid = user.uid;
							resolve(true);
						} else {
							this.user = null;
							this.uid = null;
							resolve(false);
						}
					});
				});
			} catch (error) {
				console.log(error);
				this.user = null;
				this.uid = null;
				return false;
			}
		}

	}
});