import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../services/firebase';

const AuthContext = createContext();

const ADMIN_EMAILS = ['wasinahmed807@gmail.com', 'wartechacademy800@gmail.com'];

function isVerifiedAdminUser(currentUser) {
  const email = currentUser?.email?.toLowerCase() || '';
  return Boolean(currentUser?.emailVerified && ADMIN_EMAILS.includes(email));
}

async function syncUserDocument(currentUser, explicitDisplayName) {
  if (!currentUser?.uid) return 'customer';

  const isVerifiedAdmin = isVerifiedAdminUser(currentUser);
  let resolvedRole = isVerifiedAdmin ? 'admin' : 'customer';

  try {
    const userDocRef = doc(db, 'users', currentUser.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const data = userDoc.data();
      if (data.role) {
        resolvedRole = isVerifiedAdmin ? 'admin' : data.role;
      }
      await setDoc(
        userDocRef,
        {
          email: currentUser.email || data.email || '',
          displayName: explicitDisplayName || currentUser.displayName || data.displayName || 'VIP Collector',
          photoURL: currentUser.photoURL || data.photoURL || '',
          lastLoginAt: new Date().toISOString()
        },
        { merge: true }
      );
    } else {
      await setDoc(userDocRef, {
        uid: currentUser.uid,
        email: currentUser.email || '',
        displayName: explicitDisplayName || currentUser.displayName || 'VIP Collector',
        photoURL: currentUser.photoURL || '',
        role: resolvedRole,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString()
      });
    }
  } catch (err) {
    console.warn('User profile sync warning:', err);
  }

  return resolvedRole;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState('customer');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const role = await syncUserDocument(currentUser);
        setUserRole(role);
      } else {
        setUser(null);
        setUserRole('customer');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    if (result?.user) {
      const role = await syncUserDocument(result.user);
      setUser(result.user);
      setUserRole(role);
    }
    return result.user;
  };

  const loginWithEmail = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email.trim(), password);
    if (result?.user) {
      const role = await syncUserDocument(result.user);
      setUser(result.user);
      setUserRole(role);
    }
    return result.user;
  };

  const registerWithEmail = async (email, password, displayName) => {
    const cleanName = displayName?.trim() || 'VIP Collector';
    const res = await createUserWithEmailAndPassword(auth, email.trim(), password);
    if (res.user) {
      await updateProfile(res.user, { displayName: cleanName });
      const role = await syncUserDocument(res.user, cleanName);
      setUser({ ...res.user, displayName: cleanName });
      setUserRole(role);
    }
    return res.user;
  };

  const logout = async () => {
    await signOut(auth);
  };

  const isAdmin =
    userRole === 'admin' ||
    ADMIN_EMAILS.includes(user?.email?.toLowerCase() || '');

  return (
    <AuthContext.Provider
      value={{
        user,
        userRole,
        isAdmin,
        loading,
        loginWithGoogle,
        loginWithEmail,
        registerWithEmail,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
