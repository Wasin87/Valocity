import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../services/firebase';

const AuthContext = createContext();

const ADMIN_EMAILS = ['wasinahmed807@gmail.com', 'wartechacademy800@gmail.com'];
const inFlightProfileSyncs = new Map();

function isVerifiedAdminUser(currentUser) {
  const email = currentUser?.email?.toLowerCase() || '';
  return Boolean(currentUser?.emailVerified && ADMIN_EMAILS.includes(email));
}

async function performUserDocumentSync(currentUser, explicitDisplayName) {
  const isVerifiedAdmin = isVerifiedAdminUser(currentUser);
  let resolvedRole = isVerifiedAdmin ? 'admin' : 'customer';
  const nowIso = new Date().toISOString();
  const userDocRef = doc(db, 'users', currentUser.uid);

  try {
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const data = userDoc.data();
      if (data.role) {
        resolvedRole = isVerifiedAdmin ? 'admin' : data.role;
      }
      const updatePayload = {
        email: currentUser.email || data.email || '',
        displayName: explicitDisplayName || currentUser.displayName || data.displayName || 'VIP Collector',
        photoURL: currentUser.photoURL || data.photoURL || '',
        lastLoginAt: nowIso
      };
      if (isVerifiedAdmin && data.role !== 'admin') {
        updatePayload.role = 'admin';
      }
      await setDoc(userDocRef, updatePayload, { merge: true });
    } else {
      await setDoc(userDocRef, {
        uid: currentUser.uid,
        email: currentUser.email || '',
        displayName: explicitDisplayName || currentUser.displayName || 'VIP Collector',
        photoURL: currentUser.photoURL || '',
        role: resolvedRole,
        createdAt: nowIso,
        lastLoginAt: nowIso
      });
    }

    return { role: resolvedRole, error: null };
  } catch (err) {
    // Fallback upsert without role field in case getDoc failed due to transient network/cache state
    if (err?.code !== 'permission-denied') {
      try {
        await setDoc(
          userDocRef,
          {
            uid: currentUser.uid,
            email: currentUser.email || '',
            displayName: explicitDisplayName || currentUser.displayName || 'VIP Collector',
            photoURL: currentUser.photoURL || '',
            lastLoginAt: nowIso
          },
          { merge: true }
        );
        return { role: resolvedRole, error: null };
      } catch (fallbackErr) {
        console.error('User profile Firestore sync error:', fallbackErr);
        return { role: resolvedRole, error: fallbackErr };
      }
    }
    console.error('User profile Firestore permission error:', err);
    return { role: resolvedRole, error: err };
  }
}

function syncUserDocument(currentUser, explicitDisplayName) {
  if (!currentUser?.uid) {
    return Promise.resolve({ role: 'customer', error: null });
  }

  const key = `${currentUser.uid}:${explicitDisplayName || ''}`;
  if (inFlightProfileSyncs.has(key)) {
    return inFlightProfileSyncs.get(key);
  }

  const promise = performUserDocumentSync(currentUser, explicitDisplayName).finally(() => {
    inFlightProfileSyncs.delete(key);
  });
  inFlightProfileSyncs.set(key, promise);
  return promise;
}

function syncWithTimeout(currentUser, explicitDisplayName, timeoutMs = 4000) {
  const defaultRole = isVerifiedAdminUser(currentUser) ? 'admin' : 'customer';
  return Promise.race([
    syncUserDocument(currentUser, explicitDisplayName),
    new Promise((resolve) =>
      setTimeout(() => resolve({ role: defaultRole, error: null, timedOut: true }), timeoutMs)
    )
  ]);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState('customer');
  const [loading, setLoading] = useState(true);
  const [redirectError, setRedirectError] = useState(null);
  const [profileSyncError, setProfileSyncError] = useState(null);

  useEffect(() => {
    let active = true;

    getRedirectResult(auth)
      .then(async (result) => {
        if (!active) return;
        if (result?.user) {
          setUser(result.user);
          const { role, error } = await syncWithTimeout(result.user);
          if (!active) return;
          setUserRole(role);
          if (error) {
            setProfileSyncError(error.message || 'Could not save user profile to Firestore.');
          } else {
            setProfileSyncError(null);
          }
        }
      })
      .catch((err) => {
        if (!active) return;
        console.warn('Redirect sign-in check:', err?.code || err?.message);
        if (err?.code && err.code !== 'auth/null-user') {
          setRedirectError(err);
        }
      });

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!active) return;
      if (currentUser) {
        setUser(currentUser);
        const { role, error } = await syncWithTimeout(currentUser);
        if (!active) return;
        setUserRole(role);
        if (error) {
          setProfileSyncError(error.message || 'Could not save user profile to Firestore.');
        } else {
          setProfileSyncError(null);
        }
      } else {
        setUser(null);
        setUserRole('customer');
        setProfileSyncError(null);
      }
      setLoading(false);
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  const loginWithGoogle = async () => {
    setRedirectError(null);
    setProfileSyncError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result?.user) {
        setUser(result.user);
        const { role, error } = await syncWithTimeout(result.user);
        setUserRole(role);
        if (error) {
          setProfileSyncError(error.message || 'Could not save user profile to Firestore.');
        }
      }
      return result.user;
    } catch (err) {
      const isTopLevel = typeof window !== 'undefined' && window.self === window.top;
      if (err?.code === 'auth/popup-blocked' && isTopLevel) {
        await signInWithRedirect(auth, googleProvider);
        return null;
      }
      throw err;
    }
  };

  const loginWithGoogleRedirect = async () => {
    setRedirectError(null);
    setProfileSyncError(null);
    await signInWithRedirect(auth, googleProvider);
  };

  const loginWithEmail = async (email, password) => {
    setRedirectError(null);
    setProfileSyncError(null);
    const result = await signInWithEmailAndPassword(auth, email.trim(), password);
    if (result?.user) {
      setUser(result.user);
      const { role, error } = await syncWithTimeout(result.user);
      setUserRole(role);
      if (error) {
        setProfileSyncError(error.message || 'Could not save user profile to Firestore.');
      }
    }
    return result.user;
  };

  const registerWithEmail = async (email, password, displayName) => {
    setRedirectError(null);
    setProfileSyncError(null);
    const cleanName = displayName?.trim() || 'VIP Collector';
    const res = await createUserWithEmailAndPassword(auth, email.trim(), password);
    if (res.user) {
      await updateProfile(res.user, { displayName: cleanName });
      const activeUser = auth.currentUser || res.user;
      setUser(activeUser);
      const { role, error } = await syncWithTimeout(activeUser, cleanName);
      setUserRole(role);
      if (error) {
        setProfileSyncError(error.message || 'Could not save user profile to Firestore.');
      }
      return activeUser;
    }
    return res.user;
  };

  const logout = async () => {
    setRedirectError(null);
    setProfileSyncError(null);
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
        redirectError,
        profileSyncError,
        loginWithGoogle,
        loginWithGoogleRedirect,
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
