import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { userHandle } from "utils";

const firebaseConfig = {
  apiKey: "AIzaSyCjJjWzHht1luON6Zk8llINKdbP5UxrWCQ",
  authDomain: "ktc-instagram.firebaseapp.com",
  projectId: "ktc-instagram",
  storageBucket: "ktc-instagram.appspot.com",
  messagingSenderId: "654690557403",
  appId: "1:654690557403:web:cff46f4a9cce26b0775bfe",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

onAuthStateChanged(auth, async (user) => {
  userHandle(user || false);
  if (user) {
    const dbUser = await getDoc(doc(db, "users", user.uid));

    let data = {
      uid: user.uid,
      fullName: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      ...dbUser.data(),
    };
    userHandle(data);
  } else {
    userHandle(false);
  }
});

export const login = async (email, password) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return response;
  } catch (err) {
    toast.error(err.code);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    toast.error(err.code);
  }
};

export const register = async ({ email, password, full_name, username }) => {
  try {
    const user = await getDoc(doc(db, "usernames", username));
    if (user.exists()) {
      toast.error(`${username} username already used`);
    } else {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (response.user) {
        await setDoc(doc(db, "usernames", username), {
          user_uid: response.user.uid,
        });

        await setDoc(doc(db, "users", response.user.uid), {
          full_name,
          username,
          followers: [],
          following: [],
          notifications: [],
        });
        await updateProfile(auth.currentUser, {
          displayName: full_name,
        });
        return response.user;
      }
    }
  } catch (err) {
    toast.error(err.code);
  }
};
