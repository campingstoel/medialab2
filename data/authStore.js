import { auth, db, storage } from "./firebase";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  fetchSignInMethodsForEmail,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { Store, registerInDevTools } from "pullstate";

export const AuthStore = new Store({
  isLoggedIn: false,
  user: null,
  initialized: false,
  displayName: "",
  location: "",
});

const registerUser = async (email, password, displayName) => {
  if (!(await inputValidation(email, password))) {
    return null;
  }
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await updateProfile(user, {
      displayName: displayName,
    });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const signInUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getUserFromFirestore = async (user) => {
  try {
    const userRef = doc(db, "users", user.uid);

    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      AuthStore.update((s) => {
        s.location = docSnap.data().location;
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const saveUserToFirestore = async (user, location) => {
  try {
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      location: location,
    });
    AuthStore.update((s) => {
      s.location = location;
    });
  } catch (e) {
    console.log(e);
  }
};

const unsubscribe = onAuthStateChanged(auth, (user) => {
  if (user) {
    getUserFromFirestore(user);
  }
  AuthStore.update((s) => {
    s.user = user;
    s.isLoggedIn = user ? true : false;
    s.initialized = true;
    s.displayName = user ? user.displayName : "";
    s.location = user ? user.location : "";
  });
});

const inputValidation = async (email, password) => {
  // check if email has valid format
  if (email) {
    if (email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return true;
    }
  }
  if (password) {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,20}$/;
    return passwordRegex.test(password);
  }
  return false;
};
