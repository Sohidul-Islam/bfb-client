import { getAuth, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, getIdToken, deleteUser } from "firebase/auth";
import firebaseInitialize from "../firebase/firebase.init";
import axios from 'axios';
import { useEffect, useState } from "react";
const firebase = firebaseInitialize();
// initialize a googleProvider
const googleProvider = new GoogleAuthProvider();
// authenication variable here.
const auth = getAuth();
// custome hook started here
const useFirebase = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState("");
    const [admin, setAdmin] = useState(true);

    const InsertUserTodb = (user) => {
        const data = {
            displayName: user?.displayName,
            email: user?.email,
        }
        let url = "https://certificate-verification-server.vercel.app";
        url += "/users"
        axios.put(`${url}`, data)
            .then(response => {
                console.log("successfull", response.data); // Handle successful response
            })
            .catch(error => {
                console.error(error); // Handle error
            });
    }

    const getAdminUser = (email) => {
        let url = "https://certificate-verification-server.vercel.app";
        url += `/users/admin?email=${email}`;
        // console.log(url);
        axios.get(`${url}`)
            .then(response => {
                // Handle successful response
                if (response.data !== null) {
                    setAdmin(true)
                }
                else {
                    setAdmin(false)
                }
            })
            .catch(error => {
                console.error(error); // Handle error
            });
    }

    // Update user info

    const resetPassword = (email) => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                // Password reset email sent!
                // ..
                setError("");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorMessage);
                // ..
            });
    }


    const updateUserInformation = async (profile) => {
        console.log("profile: ", profile);
        await updateProfile(auth.currentUser, {
            displayName: profile.displayName,
            email: profile.email
        }).then(() => {
            // Profile updated!
            // ...
            console.log("updated successfully");
            setUser({})
            setUser({
                displayName: profile?.displayName,
                email: profile?.email
            })
            setError("")
        }).catch((error) => {
            let errorMessage = error.message;
            errorMessage = errorMessage.slice(9, errorMessage.length - 1)
            setError(errorMessage)
        });
    }
    const updateUser = (profile) => {
        updateProfile(auth.currentUser, {
            displayName: profile.name,
        }).then(() => {
            // Profile updated!
            // ...
            setError("")
        }).catch((error) => {
            let errorMessage = error.message;
            errorMessage = errorMessage.slice(9, errorMessage.length - 1)
            setError(errorMessage)
        });
    }

    // Google sign in
    const signInWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                getAdminUser(user.email);
                InsertUserTodb(user);
                setUser(result.user);
                setError("");
            }).catch((error) => {
                // Handle Errors here.
                console.log("error: ", error.message);
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorMessage)
            });
    }

    // email and password

    const signUpWithEmailandPassword = (email, password, name, Navigate) => {
        console.log("registered functione achi: ");
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                console.log("registered sucessfully");
                const user = userCredential.user;
                // Signed in 
                updateUser({ name: name });
                Navigate('/');
                const newUser = user;
                newUser.displayName = name;
                setUser(newUser);
                setError("");
                InsertUserTodb({ displayName: name, email: email })
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorMessage)
                // ..
            });
    }
    const signInWithEmailandPassword = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                getAdminUser(email);
                setError("");
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorMessage)
            });
    }

    const logout = () => {
        setAdmin(false);
        signOut(auth).then(() => {
            setUser({});
        }).catch((error) => {
            setError(error.message);
        });

    }

    const deleteUserHandler = () => {
        deleteUser(auth.currentUser).then(() => {
            // User deleted.
        }).catch((error) => {
            // An error ocurred
            // ...
        });
    }

    useEffect(() => {
        console.log("user: ", user.uid);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                getIdToken(user).then(token => {
                    localStorage.setItem('IDtoken', token);
                })
                setUser(user);
                getAdminUser(user.email);
            }
            else {
                setUser({})
            }
        }
        )
    }, [])

    return {
        resetPassword,
        user,
        setUser,
        error,
        setError,
        signInWithGoogle,
        logout,
        signUpWithEmailandPassword,
        signInWithEmailandPassword,
        admin,
        setAdmin,
        updateUserInformation,
        deleteUserHandler
    }

}

export default useFirebase





