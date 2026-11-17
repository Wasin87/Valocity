export const INITIAL_VEHICLES = [
  {
    id: "veh-porsche-911-gt3-rs",
    title: "2025 Porsche 911 GT3 RS",
    brand: "Porsche",
    model: "911 GT3 RS",
    year: 2025,
    category: "Supercar",
    price: 345000,
    mileage: "450 km",
    fuelType: "Petrol",
    transmission: "Dual-Clutch",
    horsepower: 518,
    topSpeed: "296 km/h",
    acceleration: "3.0s (0-100 km/h)",
    condition: "Brand New",
    location: "Dhaka Showroom, Gulshan 2",
    featured: true,
    description: "The peak of atmospheric performance. Featuring active aerodynamics with DRS, carbon-fiber reinforced lightweight construction, magnesium center-lock wheels, and a 4.0-liter naturally aspirated flat-six engine revving to 9,000 RPM.",
    images: [
      "/src/assets/images/hero_porsche_911_gt3_1794232705362.jpg",
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: {
      engine: "4.0L Naturally Aspirated Flat-6",
      drivetrain: "Rear-Wheel Drive (RWD)",
      torque: "465 Nm @ 6,300 rpm",
      weight: "1,450 kg",
      color: "Obsidian Black & Champagne Gold accents"
    }
  },
  {
    id: "veh-ferrari-sf90-stradale",
    title: "2024 Ferrari SF90 Stradale Assetto Fiorano",
    brand: "Ferrari",
    model: "SF90 Stradale",
    year: 2024,
    category: "Supercar",
    price: 585000,
    mileage: "1,200 km",
    fuelType: "Hybrid",
    transmission: "Dual-Clutch",
    horsepower: 986,
    topSpeed: "340 km/h",
    acceleration: "2.5s (0-100 km/h)",
    condition: "Certified Pre-Owned",
    location: "Dhaka Showroom, Banani",
    featured: true,
    description: "Maranello's flagship plug-in hybrid supercar. Twin-turbocharged V8 engine combined with three electric motors producing a staggering 986 total horsepower with all-wheel drive stability.",
    images: [
      "/src/assets/images/car_ferrari_sf90_1794232705765.jpg",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: {
      engine: "4.0L Twin-Turbo V8 + 3 Electric Motors",
      drivetrain: "eAWD",
      torque: "800 Nm",
      weight: "1,570 kg",
      color: "Titanium Silver Metalized"
    }
  },
  {
    id: "veh-mercedes-g63-amg",
    title: "2025 Mercedes-AMG G63 Mansory Edition",
    brand: "Mercedes-Benz",
    model: "G63 AMG",
    year: 2025,
    category: "SUV",
    price: 295000,
    mileage: "0 km",
    fuelType: "Petrol",
    transmission: "Automatic",
    horsepower: 585,
    topSpeed: "240 km/h",
    acceleration: "4.5s (0-100 km/h)",
    condition: "Brand New",
    location: "Chittagong Showroom, Agrabad",
    featured: true,
    description: "The ultimate luxury icon. Satin matte black finish, forged carbon fiber aerodynamic body kit, Burmester 3D Surround Sound System, and hand-built AMG 4.0L Biturbo V8 engine.",
    images: [
      "/src/assets/images/car_mercedes_g63_1794232705817.jpg",
      "https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: {
      engine: "4.0L Handcrafted AMG Biturbo V8",
      drivetrain: "AMG Performance 4MATIC+",
      torque: "850 Nm",
      weight: "2,560 kg",
      color: "Satin Matte Night Black"
    }
  },
  {
    id: "veh-tesla-cybertruck-cyberbeast",
    title: "2025 Tesla Cybertruck Cyberbeast",
    brand: "Tesla",
    model: "Cybertruck Cyberbeast",
    year: 2025,
    category: "Electric",
    price: 135000,
    mileage: "100 km",
    fuelType: "Electric",
    transmission: "Automatic",
    horsepower: 845,
    topSpeed: "210 km/h",
    acceleration: "2.6s (0-100 km/h)",
    condition: "Mint Condition",
    location: "Dhaka Showroom, Uttara",
    featured: true,
    description: "Built for any planet. Ultra-hard 30X cold-rolled stainless-steel exoskeleton, armor glass, tri-motor all-wheel drive, and steer-by-wire precision technology.",
    images: [
      "/src/assets/images/car_tesla_cybertruck_1794232706141.jpg",
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: {
      engine: "Tri-Motor All-Wheel Drive",
      drivetrain: "AWD",
      range: "515 km EPA est.",
      towing: "4,990 kg",
      color: "Polished Raw Stainless Steel"
    }
  },
  {
    id: "veh-bmw-m5-competition",
    title: "2025 BMW M5 Touring Hybrid",
    brand: "BMW",
    model: "M5 Touring",
    year: 2025,
    category: "Luxury Sedan",
    price: 148000,
    mileage: "0 km",
    fuelType: "Hybrid",
    transmission: "Automatic",
    horsepower: 717,
    topSpeed: "305 km/h",
    acceleration: "3.5s (0-100 km/h)",
    condition: "Brand New",
    location: "Dhaka Showroom, Gulshan 2",
    featured: false,
    description: "High performance meets executive luxury. V8 hybrid power system delivering 717 HP, panoramic glass roof, M Carbon bucket seats, and Bowers & Wilkins Diamond surround sound.",
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: {
      engine: "4.4L M TwinPower Turbo V8 + Electric Motor",
      drivetrain: "M xDrive",
      torque: "1,000 Nm",
      weight: "2,435 kg",
      color: "Frozen Deep Green Metallic"
    }
  },
  {
    id: "veh-ducati-panigale-v4-sp2",
    title: "2025 Ducati Panigale V4 SP2 30th Anniversary",
    brand: "Ducati",
    model: "Panigale V4 SP2",
    year: 2025,
    category: "Motorcycle",
    price: 49500,
    mileage: "0 km",
    fuelType: "Petrol",
    transmission: "Manual",
    horsepower: 215,
    topSpeed: "315 km/h",
    acceleration: "2.8s (0-100 km/h)",
    condition: "Brand New",
    location: "Dhaka Showroom, Banani",
    featured: true,
    description: "The ultimate track weapon. Carbon fiber rims, dry clutch, Öhlins NPX pressurized fork, Brembo Stylema R calipers, and winter test black livery.",
    images: [
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: {
      engine: "1,103 cc Desmosedici Stradale V4",
      drivetrain: "Chain drive with STM-EVO SBK dry clutch",
      weight: "173 kg dry",
      color: "Winter Test Matte Black"
    }
  }
];

export const INITIAL_PRODUCTS = [
  {
    id: "prod-iphone-16-pro-max",
    title: "Apple iPhone 16 Pro Max (1TB) Desert Titanium",
    brand: "Apple",
    category: "Smartphones",
    price: 1599,
    originalPrice: 1699,
    stock: 14,
    rating: 4.9,
    reviewsCount: 128,
    featured: true,
    description: "Forged in Grade 5 titanium with an exquisite refined micro-blasted finish. Features the A18 Pro chip, 48MP Fusion camera with 5x Telephoto optical zoom, and 4K 120 fps Dolby Vision recording.",
    images: [
      "/src/assets/images/tech_iphone_16_pro_1794232706444.jpg",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80"
    ],
    specs: {
      display: "6.9-inch Super Retina XDR OLED 120Hz ProMotion",
      chip: "A18 Pro 3nm Silicon",
      storage: "1TB NVMe",
      camera: "48MP Main + 48MP Ultra Wide + 12MP 5x Telephoto",
      finish: "Desert Titanium Gold"
    }
  },
  {
    id: "prod-macbook-pro-16-m4-max",
    title: "MacBook Pro 16\" M4 Max (128GB RAM, 8TB SSD)",
    brand: "Apple",
    category: "Laptops",
    price: 4899,
    originalPrice: 5199,
    stock: 6,
    rating: 5.0,
    reviewsCount: 64,
    featured: true,
    description: "Unprecedented computational power for creators and engineers. M4 Max with 16-core CPU, 40-core GPU, 128GB unified memory, and Liquid Retina XDR display with up to 1600 nits peak brightness.",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80"
    ],
    specs: {
      chip: "Apple M4 Max (16-Core CPU, 40-Core GPU)",
      ram: "128GB Unified Memory",
      storage: "8TB Superfast SSD",
      display: "16.2-inch Liquid Retina XDR (3456 x 2234)",
      battery: "Up to 24 hours battery life"
    }
  },
  {
    id: "prod-hasselblad-x2d-100c",
    title: "Hasselblad X2D 100C Medium Format Camera",
    brand: "Hasselblad",
    category: "Cameras",
    price: 8199,
    originalPrice: 8499,
    stock: 4,
    rating: 4.9,
    reviewsCount: 32,
    featured: true,
    description: "An exceptional medium format mirrorless camera. 100-megapixel BSI CMOS sensor featuring 15 stops of dynamic range, 16-bit color depth, and 1TB built-in SSD storage.",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80"
    ],
    specs: {
      sensor: "100MP Medium Format BSI CMOS (43.8 × 32.9mm)",
      dynamicRange: "15 Stops",
      colorDepth: "16-Bit Hasselblad Natural Colour Solution",
      storage: "Built-in 1TB SSD + CFexpress Type B",
      stabilization: "5-axis 7-stop In-body Image Stabilization"
    }
  },
  {
    id: "prod-apple-watch-ultra-2",
    title: "Apple Watch Ultra 2 Titanium Titanium Milanese Loop",
    brand: "Apple",
    category: "Smartwatches",
    price: 899,
    originalPrice: 949,
    stock: 18,
    rating: 4.8,
    reviewsCount: 95,
    featured: false,
    description: "The ultimate sports and adventure smartwatch now in Black Titanium with a custom woven Titanium Milanese Loop. Precision dual-frequency GPS and 3000 nits display.",
    images: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80"
    ],
    specs: {
      case: "49mm Grade 5 Black Titanium",
      brightness: "3,000 Nits Always-On Retina Display",
      waterResistance: "100m Water Resistant (EN13319 Dive Certified)",
      battery: "Up to 72 hours in Low Power Mode"
    }
  },
  {
    id: "prod-sony-wh1000xm5-custom",
    title: "Sony WH-1000XM5 Custom Gold & Carbon Wireless Headphones",
    brand: "Sony",
    category: "Accessories",
    price: 449,
    originalPrice: 499,
    stock: 25,
    rating: 4.9,
    reviewsCount: 210,
    featured: false,
    description: "Industry-leading noise canceling headphones customized with matte black carbon fiber texture and champagne gold accents. 8 microphones with Auto NC Optimizer.",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80"
    ],
    specs: {
      audio: "30mm Precision Driver Units with LDAC High-Res Audio",
      battery: "30-hour Battery Life with Fast Charging",
      noiseCanceling: "Dual Processor V1 + Integrated QN1"
    }
  }
];

export const INITIAL_COUPONS = [
  { code: "VELOCITY10", discountPercent: 10, active: true },
  { code: "SUPERCAR50", discountPercent: 15, active: true }
];
