import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where
} from 'firebase/firestore';
import { db } from './firebase';
import { handleFirestoreError, OperationType } from './errorHandling';
import { INITIAL_VEHICLES, INITIAL_PRODUCTS, INITIAL_COUPONS } from '../data/seedData';

function stripUndefined(obj) {
  if (Array.isArray(obj)) {
    return obj.map((item) => stripUndefined(item));
  }
  if (obj && typeof obj === 'object') {
    const clean = {};
    for (const [key, value] of Object.entries(obj)) {
      if (value !== undefined) {
        clean[key] = stripUndefined(value);
      }
    }
    return clean;
  }
  return obj;
}

// VEHICLES SERVICE
export async function getVehiclesFromStore() {
  try {
    const snap = await getDocs(collection(db, 'vehicles'));
    if (snap.empty) {
      return INITIAL_VEHICLES;
    }
    const list = [];
    snap.forEach((docSnap) => {
      list.push({ id: docSnap.id, ...docSnap.data() });
    });
    return list;
  } catch (error) {
    console.warn("Using fallback local vehicles due to Firestore offline or rules:", error);
    return INITIAL_VEHICLES;
  }
}

export async function getVehicleById(id) {
  try {
    const docRef = doc(db, 'vehicles', id);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return { id: snap.id, ...snap.data() };
    }
    return INITIAL_VEHICLES.find(v => v.id === id) || null;
  } catch {
    return INITIAL_VEHICLES.find(v => v.id === id) || null;
  }
}

export async function addVehicleToStore(vehicleData) {
  try {
    const payload = stripUndefined({
      ...vehicleData,
      year: Number(vehicleData.year) || 2025,
      price: Number(vehicleData.price) || 0,
      horsepower: Number(vehicleData.horsepower) || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    const docRef = await addDoc(collection(db, 'vehicles'), payload);
    return { id: docRef.id, ...payload };
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, 'vehicles');
  }
}

export async function updateVehicleInStore(id, vehicleData) {
  try {
    const payload = stripUndefined({
      ...vehicleData,
      year: Number(vehicleData.year) || 2025,
      price: Number(vehicleData.price) || 0,
      horsepower: Number(vehicleData.horsepower) || 0,
      updatedAt: new Date().toISOString()
    });
    const docRef = doc(db, 'vehicles', id);
    await updateDoc(docRef, payload);
    return { id, ...payload };
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `vehicles/${id}`);
  }
}

export async function deleteVehicleFromStore(id) {
  try {
    await deleteDoc(doc(db, 'vehicles', id));
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `vehicles/${id}`);
  }
}

// TECH PRODUCTS SERVICE
export async function getProductsFromStore() {
  try {
    const snap = await getDocs(collection(db, 'products'));
    if (snap.empty) {
      return INITIAL_PRODUCTS;
    }
    const list = [];
    snap.forEach((docSnap) => {
      list.push({ id: docSnap.id, ...docSnap.data() });
    });
    return list;
  } catch (error) {
    console.warn("Using fallback local products:", error);
    return INITIAL_PRODUCTS;
  }
}

export async function getProductById(id) {
  try {
    const snap = await getDoc(doc(db, 'products', id));
    if (snap.exists()) {
      return { id: snap.id, ...snap.data() };
    }
    return INITIAL_PRODUCTS.find(p => p.id === id) || null;
  } catch {
    return INITIAL_PRODUCTS.find(p => p.id === id) || null;
  }
}

export async function addProductToStore(productData) {
  try {
    const payload = stripUndefined({
      ...productData,
      price: Number(productData.price) || 0,
      originalPrice: Number(productData.originalPrice) || Number(productData.price) || 0,
      stock: Number(productData.stock) || 0,
      rating: Number(productData.rating) || 5.0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    const docRef = await addDoc(collection(db, 'products'), payload);
    return { id: docRef.id, ...payload };
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, 'products');
  }
}

export async function updateProductInStore(id, productData) {
  try {
    const payload = stripUndefined({
      ...productData,
      price: Number(productData.price) || 0,
      originalPrice: Number(productData.originalPrice) || Number(productData.price) || 0,
      stock: Number(productData.stock) || 0,
      rating: Number(productData.rating) || 5.0,
      updatedAt: new Date().toISOString()
    });
    await updateDoc(doc(db, 'products', id), payload);
    return { id, ...payload };
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `products/${id}`);
  }
}

export async function deleteProductFromStore(id) {
  try {
    await deleteDoc(doc(db, 'products', id));
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `products/${id}`);
  }
}

// ORDERS SERVICE
export async function createOrderInStore(orderData) {
  const orderDoc = stripUndefined({
    userId: String(orderData.userId || 'guest').slice(0, 128),
    customerName: String(orderData.customerName || '').trim().slice(0, 128),
    customerEmail: String(orderData.customerEmail || '').trim().slice(0, 256),
    customerPhone: String(orderData.customerPhone || '').trim().slice(0, 32),
    deliveryAddress: String(orderData.deliveryAddress || '').trim().slice(0, 512),
    city: String(orderData.city || '').trim().slice(0, 64),
    district: String(orderData.district || '').trim().slice(0, 64),
    paymentMethod: String(orderData.paymentMethod || '').trim().slice(0, 64),
    items: Array.isArray(orderData.items) ? orderData.items.slice(0, 100) : [],
    subtotal: Number(orderData.subtotal) || 0,
    discount: Number(orderData.discount) || 0,
    grandTotal: Number(orderData.grandTotal) || 0,
    status: 'Confirmed',
    trackingId: 'VEL-' + Math.floor(100000 + Math.random() * 900000),
    createdAt: new Date().toISOString()
  });

  try {
    const docRef = await addDoc(collection(db, 'orders'), orderDoc);
    return { id: docRef.id, ...orderDoc };
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, 'orders');
  }
}

export async function getOrdersForUser(userId) {
  try {
    const q = query(collection(db, 'orders'), where('userId', '==', userId));
    const snap = await getDocs(q);
    const list = [];
    snap.forEach(docSnap => list.push({ id: docSnap.id, ...docSnap.data() }));
    list.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
    return list;
  } catch (error) {
    console.warn("Could not fetch user orders:", error);
    return [];
  }
}

export async function getAllOrdersFromStore() {
  try {
    const snap = await getDocs(collection(db, 'orders'));
    const list = [];
    snap.forEach(docSnap => list.push({ id: docSnap.id, ...docSnap.data() }));
    list.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
    return list;
  } catch (error) {
    console.warn("Could not fetch all orders:", error);
    return [];
  }
}

export async function updateOrderStatus(id, newStatus) {
  try {
    await updateDoc(doc(db, 'orders', id), { status: newStatus });
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `orders/${id}`);
  }
}

// TEST DRIVE & INQUIRY SERVICES
export async function createTestDriveBooking(bookingData) {
  const payload = stripUndefined({
    userId: String(bookingData.userId || 'guest').slice(0, 128),
    userName: String(bookingData.userName || '').trim().slice(0, 128),
    userEmail: String(bookingData.userEmail || '').trim().slice(0, 256),
    userPhone: String(bookingData.userPhone || '').trim().slice(0, 32),
    vehicleId: String(bookingData.vehicleId || '').trim().slice(0, 128),
    vehicleTitle: String(bookingData.vehicleTitle || '').trim().slice(0, 128),
    preferredDate: String(bookingData.preferredDate || '').trim().slice(0, 32),
    preferredTime: String(bookingData.preferredTime || '').trim().slice(0, 32),
    status: 'Pending',
    createdAt: new Date().toISOString()
  });

  try {
    const docRef = await addDoc(collection(db, 'testDriveBookings'), payload);
    return { id: docRef.id, ...payload };
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, 'testDriveBookings');
  }
}

export async function getAllTestDriveBookings() {
  try {
    const snap = await getDocs(collection(db, 'testDriveBookings'));
    const list = [];
    snap.forEach(docSnap => list.push({ id: docSnap.id, ...docSnap.data() }));
    return list;
  } catch {
    return [];
  }
}

export async function createInquiryInStore(inquiryData) {
  const payload = stripUndefined({
    userId: String(inquiryData.userId || 'guest').slice(0, 128),
    userName: String(inquiryData.userName || '').trim().slice(0, 128),
    userEmail: String(inquiryData.userEmail || '').trim().slice(0, 256),
    userPhone: String(inquiryData.userPhone || '').trim().slice(0, 32),
    vehicleId: String(inquiryData.vehicleId || '').trim().slice(0, 128),
    vehicleTitle: String(inquiryData.vehicleTitle || '').trim().slice(0, 128),
    message: String(inquiryData.message || '').trim().slice(0, 1000),
    status: 'New',
    createdAt: new Date().toISOString()
  });

  try {
    const docRef = await addDoc(collection(db, 'inquiries'), payload);
    return { id: docRef.id, ...payload };
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, 'inquiries');
  }
}

export async function getAllInquiriesFromStore() {
  try {
    const snap = await getDocs(collection(db, 'inquiries'));
    const list = [];
    snap.forEach(docSnap => list.push({ id: docSnap.id, ...docSnap.data() }));
    return list;
  } catch {
    return [];
  }
}

// SEED FIRESTORE UTILITY
export async function seedFirestoreDatabase() {
  try {
    for (const v of INITIAL_VEHICLES) {
      await setDoc(doc(db, 'vehicles', v.id), stripUndefined({
        ...v,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));
    }
    for (const p of INITIAL_PRODUCTS) {
      await setDoc(doc(db, 'products', p.id), stripUndefined({
        ...p,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));
    }
    for (const c of INITIAL_COUPONS) {
      await setDoc(doc(db, 'coupons', c.code), stripUndefined({
        ...c,
        createdAt: new Date().toISOString()
      }));
    }
    return true;
  } catch (error) {
    console.error("Seed firestore failed:", error);
    throw error;
  }
}
