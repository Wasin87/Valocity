import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  getVehiclesFromStore, 
  getProductsFromStore, 
  getAllOrdersFromStore, 
  getAllTestDriveBookings, 
  getAllInquiriesFromStore, 
  addVehicleToStore, 
  updateVehicleInStore, 
  deleteVehicleFromStore, 
  addProductToStore, 
  updateProductInStore, 
  deleteProductFromStore, 
  updateOrderStatus, 
  seedFirestoreDatabase 
} from '../services/marketplaceService';
import { 
  ShieldCheck, 
  Car, 
  Smartphone, 
  Package, 
  DollarSign, 
  Plus, 
  Trash2, 
  Edit3, 
  Database, 
  Check, 
  X, 
  RefreshCcw, 
  Tag, 
  Calendar 
} from 'lucide-react';

export default function Admin({ onNavigate, setToast }) {
  const { user, isAdmin } = useAuth();

  const [activeTab, setActiveTab] = useState('overview');
  const [vehicles, setVehicles] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [testDrives, setTestDrives] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Forms modal states
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [vehicleForm, setVehicleForm] = useState({
    title: '',
    brand: '',
    model: '',
    year: 2025,
    category: 'Supercar',
    price: 250000,
    mileage: '0 km',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    horsepower: 500,
    topSpeed: '300 km/h',
    acceleration: '3.2s (0-100 km/h)',
    condition: 'Brand New',
    location: 'Dhaka Showroom, Gulshan 2',
    description: '',
    images: ['/src/assets/images/hero_porsche_911_gt3_1794232705362.jpg'],
    featured: true
  });

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    title: '',
    brand: '',
    category: 'Smartphones',
    price: 999,
    originalPrice: 1099,
    stock: 10,
    rating: 5.0,
    description: '',
    images: ['/src/assets/images/tech_iphone_16_pro_1794232706444.jpg'],
    featured: true
  });

  const [seeding, setSeeding] = useState(false);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    const [v, p, o, td, inq] = await Promise.all([
      getVehiclesFromStore(),
      getProductsFromStore(),
      getAllOrdersFromStore(),
      getAllTestDriveBookings(),
      getAllInquiriesFromStore()
    ]);
    setVehicles(v);
    setProducts(p);
    setOrders(o);
    setTestDrives(td);
    setInquiries(inq);
    setLoading(false);
  };

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-[#0B0B0D] text-[#F5F4F0] pt-32 pb-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white font-display">Administrator Access Restricted</h2>
        <p className="text-xs text-[#A7A9AC] max-w-sm mx-auto">
          You must be logged in as an administrator (wasinahmed807@gmail.com) to access the VELOCITY Executive Control Center.
        </p>
        <button onClick={() => onNavigate('/auth')} className="px-5 py-2.5 bg-[#C5A878] text-[#0B0B0D] font-bold text-xs uppercase rounded-xl cursor-pointer">
          Sign In as Admin
        </button>
      </div>
    );
  }

  // Calculate Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.grandTotal || 0), 0);
  const totalVehiclesCount = vehicles.length;
  const totalProductsCount = products.length;
  const totalOrdersCount = orders.length;

  // Handle Seed Database
  const handleSeedDatabase = async () => {
    setSeeding(true);
    try {
      await seedFirestoreDatabase();
      if (setToast) setToast({ message: 'Firestore DB Seeded with Supercars & Tech Hardware!', type: 'success' });
      await loadAllData();
    } catch (err) {
      if (setToast) setToast({ message: 'Seeding error: ' + err.message, type: 'error' });
    } finally {
      setSeeding(false);
    }
  };

  // Vehicle Submit
  const handleSaveVehicle = async (e) => {
    e.preventDefault();
    try {
      if (editingVehicle) {
        await updateVehicleInStore(editingVehicle.id, vehicleForm);
        if (setToast) setToast({ message: 'Vehicle updated', type: 'success' });
      } else {
        await addVehicleToStore(vehicleForm);
        if (setToast) setToast({ message: 'New vehicle listing added to store', type: 'success' });
      }
      setIsVehicleModalOpen(false);
      setEditingVehicle(null);
      await loadAllData();
    } catch (err) {
      console.error(err);
      if (setToast) setToast({ message: 'Failed to save vehicle: ' + (err?.message || 'Firestore error'), type: 'error' });
    }
  };

  const handleDeleteVehicle = async (id) => {
    if (window.confirm("Are you sure you want to delete this vehicle listing?")) {
      await deleteVehicleFromStore(id);
      if (setToast) setToast({ message: 'Vehicle deleted', type: 'success' });
      await loadAllData();
    }
  };

  // Product Submit
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await updateProductInStore(editingProduct.id, productForm);
        if (setToast) setToast({ message: 'Product updated', type: 'success' });
      } else {
        await addProductToStore(productForm);
        if (setToast) setToast({ message: 'New tech product added', type: 'success' });
      }
      setIsProductModalOpen(false);
      setEditingProduct(null);
      await loadAllData();
    } catch (err) {
      console.error(err);
      if (setToast) setToast({ message: 'Failed to save product: ' + (err?.message || 'Firestore error'), type: 'error' });
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Delete this technology product?")) {
      await deleteProductFromStore(id);
      if (setToast) setToast({ message: 'Product deleted', type: 'success' });
      await loadAllData();
    }
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    await updateOrderStatus(orderId, status);
    if (setToast) setToast({ message: `Order status updated to ${status}`, type: 'success' });
    await loadAllData();
  };

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-[#F5F4F0] pt-28 pb-24 selection:bg-[#C5A878]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Executive Header */}
        <div className="p-8 rounded-3xl bg-[#171719]/90 border border-[#242426] backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-[#C5A878]/20 text-[#C5A878] border border-[#C5A878]/30 font-mono text-[10px] font-bold uppercase rounded-md">
                Admin Control Room
              </span>
              <span className="text-xs font-mono text-[#A7A9AC]">Firestore Connected</span>
            </div>
            <h1 className="text-3xl font-extrabold font-display text-[#F5F4F0] mt-1">VELOCITY Executive Management</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSeedDatabase}
              disabled={seeding}
              className="px-4 py-2.5 bg-[#0B0B0D] hover:bg-[#242426] text-[#C5A878] border border-[#242426] text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 cursor-pointer font-mono"
            >
              <Database className="w-4 h-4" /> {seeding ? 'Seeding Firestore...' : 'Seed Demo Data'}
            </button>
            <button
              onClick={loadAllData}
              className="p-2.5 bg-[#0B0B0D] text-[#A7A9AC] hover:text-white rounded-xl border border-[#242426] cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Executive Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-[#171719]/80 border border-[#242426] space-y-2">
            <div className="flex items-center justify-between text-[#A7A9AC]">
              <span className="text-xs font-mono uppercase">Gross Revenue</span>
              <DollarSign className="w-5 h-5 text-[#C5A878]" />
            </div>
            <p className="text-2xl font-extrabold font-mono text-[#F5F4F0]">${totalRevenue.toLocaleString()}</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#171719]/80 border border-[#242426] space-y-2">
            <div className="flex items-center justify-between text-[#A7A9AC]">
              <span className="text-xs font-mono uppercase">Supercars & Vehicles</span>
              <Car className="w-5 h-5 text-[#C5A878]" />
            </div>
            <p className="text-2xl font-extrabold font-mono text-[#F5F4F0]">{totalVehiclesCount}</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#171719]/80 border border-[#242426] space-y-2">
            <div className="flex items-center justify-between text-[#A7A9AC]">
              <span className="text-xs font-mono uppercase">Tech Products</span>
              <Smartphone className="w-5 h-5 text-[#C5A878]" />
            </div>
            <p className="text-2xl font-extrabold font-mono text-[#F5F4F0]">{totalProductsCount}</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#171719]/80 border border-[#242426] space-y-2">
            <div className="flex items-center justify-between text-[#A7A9AC]">
              <span className="text-xs font-mono uppercase">Total Orders</span>
              <Package className="w-5 h-5 text-[#C5A878]" />
            </div>
            <p className="text-2xl font-extrabold font-mono text-[#F5F4F0]">{totalOrdersCount}</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-[#242426] pb-2 overflow-x-auto text-xs font-mono font-bold uppercase scrollbar-none">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'vehicles', label: `Vehicles (${vehicles.length})` },
            { id: 'products', label: `Tech Products (${products.length})` },
            { id: 'orders', label: `Customer Orders (${orders.length})` },
            { id: 'testdrives', label: `Test Drive Requests (${testDrives.length})` },
            { id: 'inquiries', label: `Inquiries (${inquiries.length})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#C5A878] text-[#0B0B0D] font-bold shadow-[0_0_15px_rgba(197,168,120,0.2)]'
                  : 'text-[#A7A9AC] hover:text-[#F5F4F0] hover:bg-[#171719]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: VEHICLES MANAGEMENT */}
        {activeTab === 'vehicles' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold font-display text-[#F5F4F0]">Automotive Fleet Management</h3>
              <button
                onClick={() => {
                  setEditingVehicle(null);
                  setVehicleForm({
                    title: '', brand: 'Porsche', model: '', year: 2025, category: 'Supercar', price: 300000,
                    mileage: '0 km', fuelType: 'Petrol', transmission: 'Dual-Clutch', horsepower: 600, topSpeed: '320 km/h',
                    acceleration: '2.9s (0-100 km/h)', condition: 'Brand New', location: 'Dhaka Showroom, Gulshan 2', description: '',
                    images: ['/src/assets/images/hero_porsche_911_gt3_1794232705362.jpg'], featured: true
                  });
                  setIsVehicleModalOpen(true);
                }}
                className="px-4 py-2 bg-[#C5A878] text-[#0B0B0D] font-bold text-xs uppercase rounded-xl flex items-center gap-1.5 cursor-pointer font-mono"
              >
                <Plus className="w-4 h-4" /> Add Vehicle Listing
              </button>
            </div>

            <div className="rounded-2xl bg-[#171719]/80 border border-[#242426] overflow-hidden">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#0B0B0D] text-[#A7A9AC] border-b border-[#242426] uppercase">
                  <tr>
                    <th className="p-4">Vehicle</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Power</th>
                    <th className="p-4">Featured</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#242426] text-[#F5F4F0]">
                  {vehicles.map(v => (
                    <tr key={v.id} className="hover:bg-[#242426]/30">
                      <td className="p-4 flex items-center gap-3">
                        <img src={v.images?.[0] || v.image} alt={v.title} className="w-12 h-10 object-cover rounded border border-[#242426]" />
                        <div>
                          <p className="font-bold text-[#F5F4F0] font-sans">{v.title}</p>
                          <span className="text-[10px] text-[#A7A9AC]">{v.brand} {v.model} ({v.year})</span>
                        </div>
                      </td>
                      <td className="p-4 text-[#C5A878]">{v.category}</td>
                      <td className="p-4 font-bold text-[#F5F4F0]">${v.price?.toLocaleString()}</td>
                      <td className="p-4">{v.horsepower} HP</td>
                      <td className="p-4">
                        {v.featured ? <span className="text-emerald-400">Yes</span> : <span className="text-[#A7A9AC]">No</span>}
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setEditingVehicle(v);
                            setVehicleForm(v);
                            setIsVehicleModalOpen(true);
                          }}
                          className="p-1.5 bg-[#0B0B0D] hover:bg-[#242426] text-[#C5A878] rounded-lg border border-[#242426] cursor-pointer"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteVehicle(v.id)}
                          className="p-1.5 bg-[#0B0B0D] hover:bg-rose-500/20 text-rose-400 rounded-lg border border-[#242426] cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: TECH PRODUCTS MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold font-display text-[#F5F4F0]">Technology Products Management</h3>
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setProductForm({
                    title: '', brand: 'Apple', category: 'Smartphones', price: 1299, originalPrice: 1399,
                    stock: 15, rating: 5.0, description: '', images: ['/src/assets/images/tech_iphone_16_pro_1794232706444.jpg'], featured: true
                  });
                  setIsProductModalOpen(true);
                }}
                className="px-4 py-2 bg-[#C5A878] text-[#0B0B0D] font-bold text-xs uppercase rounded-xl flex items-center gap-1.5 cursor-pointer font-mono"
              >
                <Plus className="w-4 h-4" /> Add Tech Item
              </button>
            </div>

            <div className="rounded-2xl bg-[#171719]/80 border border-[#242426] overflow-hidden">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#0B0B0D] text-[#A7A9AC] border-b border-[#242426] uppercase">
                  <tr>
                    <th className="p-4">Item</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#242426] text-[#F5F4F0]">
                  {products.map(p => (
                    <tr key={p.id} className="hover:bg-[#242426]/30">
                      <td className="p-4 flex items-center gap-3">
                        <img src={p.images?.[0] || p.image} alt={p.title} className="w-10 h-10 object-cover rounded border border-[#242426]" />
                        <div>
                          <p className="font-bold text-[#F5F4F0] font-sans">{p.title}</p>
                          <span className="text-[10px] text-[#A7A9AC]">{p.brand}</span>
                        </div>
                      </td>
                      <td className="p-4 text-[#C5A878]">{p.category}</td>
                      <td className="p-4 font-bold text-[#F5F4F0]">${p.price?.toLocaleString()}</td>
                      <td className="p-4 text-emerald-400">{p.stock} units</td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setEditingProduct(p);
                            setProductForm(p);
                            setIsProductModalOpen(true);
                          }}
                          className="p-1.5 bg-[#0B0B0D] hover:bg-[#242426] text-[#C5A878] rounded-lg border border-[#242426] cursor-pointer"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="p-1.5 bg-[#0B0B0D] hover:bg-rose-500/20 text-rose-400 rounded-lg border border-[#242426] cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: CUSTOMER ORDERS */}
        {(activeTab === 'orders' || activeTab === 'overview') && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold font-display text-[#F5F4F0]">Customer Allocations & Escrow Status</h3>
            {orders.length === 0 ? (
              <p className="text-xs text-[#A7A9AC]">No orders placed yet.</p>
            ) : (
              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order.id} className="p-6 rounded-2xl bg-[#171719]/80 border border-[#242426] space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#242426] pb-3 text-xs font-mono">
                      <div>
                        <span className="text-[#A7A9AC] block text-[10px]">Tracking</span>
                        <span className="text-[#C5A878] font-bold">{order.trackingId}</span>
                      </div>
                      <div>
                        <span className="text-[#A7A9AC] block text-[10px]">Customer</span>
                        <span className="text-[#F5F4F0] font-sans font-bold">{order.customerName} ({order.customerPhone})</span>
                      </div>
                      <div>
                        <span className="text-[#A7A9AC] block text-[10px]">Payment Protocol</span>
                        <span className="text-[#F5F4F0]">{order.paymentMethod}</span>
                      </div>
                      <div>
                        <span className="text-[#A7A9AC] block text-[10px] mb-1">Update Status</span>
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                          className="bg-[#0B0B0D] border border-[#242426] text-[#C5A878] font-bold rounded px-2.5 py-1 outline-none cursor-pointer"
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                    <div className="text-xs font-mono text-[#A7A9AC]">
                      <p><strong className="text-[#F5F4F0]">Address:</strong> {order.deliveryAddress}, {order.city}, {order.district}</p>
                      <p><strong className="text-[#F5F4F0]">Grand Total:</strong> <span className="text-[#C5A878] font-bold">${order.grandTotal?.toLocaleString()}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* MODAL: ADD / EDIT VEHICLE */}
      {isVehicleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0B0D]/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#171719] border border-[#242426] rounded-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto scrollbar-none shadow-2xl">
            <h3 className="text-lg font-bold text-[#F5F4F0] font-display">
              {editingVehicle ? 'Edit Vehicle Listing' : 'Add New Vehicle Allocation'}
            </h3>

            <form onSubmit={handleSaveVehicle} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#A7A9AC] mb-1">Listing Title</label>
                  <input
                    type="text"
                    required
                    value={vehicleForm.title}
                    onChange={(e) => setVehicleForm({ ...vehicleForm, title: e.target.value })}
                    className="w-full bg-[#0B0B0D] border border-[#242426] rounded-xl p-2.5 text-[#F5F4F0] outline-none focus:border-[#C5A878]"
                  />
                </div>
                <div>
                  <label className="block text-[#A7A9AC] mb-1">Brand</label>
                  <input
                    type="text"
                    required
                    value={vehicleForm.brand}
                    onChange={(e) => setVehicleForm({ ...vehicleForm, brand: e.target.value })}
                    className="w-full bg-[#0B0B0D] border border-[#242426] rounded-xl p-2.5 text-[#F5F4F0] outline-none focus:border-[#C5A878]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[#A7A9AC] mb-1">Price ($)</label>
                  <input
                    type="number"
                    required
                    value={vehicleForm.price}
                    onChange={(e) => setVehicleForm({ ...vehicleForm, price: Number(e.target.value) })}
                    className="w-full bg-[#0B0B0D] border border-[#242426] rounded-xl p-2.5 text-[#F5F4F0] outline-none focus:border-[#C5A878]"
                  />
                </div>
                <div>
                  <label className="block text-[#A7A9AC] mb-1">Horsepower (HP)</label>
                  <input
                    type="number"
                    required
                    value={vehicleForm.horsepower}
                    onChange={(e) => setVehicleForm({ ...vehicleForm, horsepower: Number(e.target.value) })}
                    className="w-full bg-[#0B0B0D] border border-[#242426] rounded-xl p-2.5 text-[#F5F4F0] outline-none focus:border-[#C5A878]"
                  />
                </div>
                <div>
                  <label className="block text-[#A7A9AC] mb-1">Category</label>
                  <select
                    value={vehicleForm.category}
                    onChange={(e) => setVehicleForm({ ...vehicleForm, category: e.target.value })}
                    className="w-full bg-[#0B0B0D] border border-[#242426] rounded-xl p-2.5 text-[#F5F4F0] outline-none focus:border-[#C5A878] cursor-pointer"
                  >
                    <option value="Supercar">Supercar</option>
                    <option value="Sports">Sports</option>
                    <option value="SUV">SUV</option>
                    <option value="Luxury Sedan">Luxury Sedan</option>
                    <option value="Electric">Electric</option>
                    <option value="Motorcycle">Motorcycle</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#A7A9AC] mb-1">Image URL</label>
                <input
                  type="text"
                  required
                  value={vehicleForm.images?.[0] || ''}
                  onChange={(e) => setVehicleForm({ ...vehicleForm, images: [e.target.value] })}
                  className="w-full bg-[#0B0B0D] border border-[#242426] rounded-xl p-2.5 text-[#F5F4F0] outline-none focus:border-[#C5A878]"
                />
              </div>

              <div>
                <label className="block text-[#A7A9AC] mb-1">Description</label>
                <textarea
                  rows={3}
                  value={vehicleForm.description}
                  onChange={(e) => setVehicleForm({ ...vehicleForm, description: e.target.value })}
                  className="w-full bg-[#0B0B0D] border border-[#242426] rounded-xl p-2.5 text-[#F5F4F0] outline-none focus:border-[#C5A878]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsVehicleModalOpen(false)}
                  className="px-4 py-2 bg-[#0B0B0D] text-[#A7A9AC] hover:text-white font-bold rounded-xl border border-[#242426] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#C5A878] hover:bg-[#dfc498] text-[#0B0B0D] font-bold rounded-xl cursor-pointer"
                >
                  Save Allocation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT PRODUCT */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0B0D]/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#171719] border border-[#242426] rounded-2xl p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-[#F5F4F0] font-display">
              {editingProduct ? 'Edit Tech Product' : 'Add New Hardware Allocation'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-[#A7A9AC] mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={productForm.title}
                  onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                  className="w-full bg-[#0B0B0D] border border-[#242426] rounded-xl p-2.5 text-[#F5F4F0] outline-none focus:border-[#C5A878]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#A7A9AC] mb-1">Price ($)</label>
                  <input
                    type="number"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full bg-[#0B0B0D] border border-[#242426] rounded-xl p-2.5 text-[#F5F4F0] outline-none focus:border-[#C5A878]"
                  />
                </div>
                <div>
                  <label className="block text-[#A7A9AC] mb-1">Stock Count</label>
                  <input
                    type="number"
                    required
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: Number(e.target.value) })}
                    className="w-full bg-[#0B0B0D] border border-[#242426] rounded-xl p-2.5 text-[#F5F4F0] outline-none focus:border-[#C5A878]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#A7A9AC] mb-1">Image URL</label>
                <input
                  type="text"
                  required
                  value={productForm.images?.[0] || ''}
                  onChange={(e) => setProductForm({ ...productForm, images: [e.target.value] })}
                  className="w-full bg-[#0B0B0D] border border-[#242426] rounded-xl p-2.5 text-[#F5F4F0] outline-none focus:border-[#C5A878]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 bg-[#0B0B0D] text-[#A7A9AC] hover:text-white font-bold rounded-xl border border-[#242426] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#C5A878] hover:bg-[#dfc498] text-[#0B0B0D] font-bold rounded-xl cursor-pointer"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
