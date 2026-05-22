import { useState, FormEvent } from 'react';
import { 
  Coffee, 
  ArrowRight, 
  Check, 
  MapPin, 
  Clock, 
  Instagram, 
  Phone, 
  ShoppingBag, 
  X, 
  Trash2, 
  CalendarDays,
  Menu,
  Info
} from 'lucide-react';

// Live generated image paths
const HERO_IMAGE_PATH = "/src/assets/images/hero_coffee_shop_1779459402631.png";
const BEANS_IMAGE_PATH = "/src/assets/images/coffee_beans_bag_1779459423691.png";

interface MenuItem {
  id: number;
  name: string;
  category: 'coffee' | 'milk' | 'seasonal' | 'pastry' | 'beans';
  price: number;
  desc: string;
  volumeOrWeight: string;
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'coffee' | 'milk' | 'seasonal' | 'pastry' | 'beans'>('all');
  
  // Clean, realistic shopping cart state
  const [cart, setCart] = useState<{ item: MenuItem; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Booking workspace / table
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('11:00 AM');
  const [bookingPref, setBookingPref] = useState('Quiet window table with outlets');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // General feedback contact form
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Simple, realistic cafe menu items (prices in US Dollars - $)
  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "Double Espresso",
      category: "coffee",
      price: 3.25,
      desc: "Classic espresso double shot pulled from 100% freshly roasted single-origin Arabica. Rich body with subtle notes of cocoa and dried fruits.",
      volumeOrWeight: "2 oz"
    },
    {
      id: 2,
      name: "Filter Coffee",
      category: "coffee",
      price: 3.75,
      desc: "Daily drip coffee lovingly brewed with seasonal beans. We cycle our origin selection every few days to highlight bright berry qualities.",
      volumeOrWeight: "8 oz"
    },
    {
      id: 3,
      name: "Cappuccino",
      category: "milk",
      price: 4.50,
      desc: "Equal parts double shot espresso, hot steamed milk, and velvety foam micro-texture. Balanced natural sweetness.",
      volumeOrWeight: "6 oz"
    },
    {
      id: 4,
      name: "Flat White",
      category: "milk",
      price: 4.75,
      desc: "Bold coffee forward texture. A velvety double ristretto base topped with a pristine, thin layer of steamed whole milk.",
      volumeOrWeight: "6 oz"
    },
    {
      id: 5,
      name: "Lavender Honey Latte",
      category: "milk",
      price: 5.25,
      desc: "Our seasonal specialty. Steamed oat milk sweetened gently with organic honey and steeped French lavender buds.",
      volumeOrWeight: "8 oz"
    },
    {
      id: 6,
      name: "Cold Brew Tonic",
      category: "seasonal",
      price: 5.50,
      desc: "Refreshing carbonated pick-me-up. Slow-steeped cold brew served over carbonated premium tonic water and a fresh orange slice.",
      volumeOrWeight: "10 oz"
    },
    {
      id: 7,
      name: "Ceremonial Uji Matcha Latte",
      category: "seasonal",
      price: 5.25,
      desc: "Stone-ground ceremonial grade Japanese matcha whisked lovingly to a rich froth and topped with steamed milk.",
      volumeOrWeight: "8 oz"
    },
    {
      id: 8,
      name: "Butter Croissant",
      category: "pastry",
      price: 3.50,
      desc: "Traditional flaky French pastry crafted with pure butter. Crispy external layers with a airy, tender structure inside.",
      volumeOrWeight: "3 oz"
    },
    {
      id: 9,
      name: "Banana Walnut Bread",
      category: "pastry",
      price: 3.25,
      desc: "Moist, lightly sweetened homemade slice baked with ripe sweet bananas and toasted premium walnuts.",
      volumeOrWeight: "4 oz"
    },
    {
      id: 10,
      name: "Ethiopia Jasmine Gedeo (Whole Beans)",
      category: "beans",
      price: 18.50,
      desc: "Freshly roasted single-origin whole beans. Light roast. Flavor profile notes: sweet apricot, bergamot, jasmine tea.",
      volumeOrWeight: "250g bag"
    },
    {
      id: 11,
      name: "Panama Geisha Soberania (Whole Beans)",
      category: "beans",
      price: 24.00,
      desc: "A strictly limited micro-lot of incredible elegance. Floral, delicate experience with hints of peach, rose, and white tea.",
      volumeOrWeight: "250g bag"
    }
  ];

  const filteredMenuItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const addToCart = (item: MenuItem) => {
    setOrderSuccess(false);
    setCart(prev => {
      const existing = prev.find(p => p.item.id === item.id);
      if (existing) {
        return prev.map(p => p.item.id === item.id ? { ...p, quantity: p.quantity + 1 } : p);
      }
      return [...prev, { item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: number) => {
    setCart(prev => prev.filter(p => p.item.id !== itemId));
  };

  const updateQuantity = (itemId: number, delta: number) => {
    setCart(prev => {
      return prev.map(p => {
        if (p.item.id === itemId) {
          const newQty = p.quantity + delta;
          return newQty > 0 ? { ...p, quantity: newQty } : p;
        }
        return p;
      }).filter(p => p.quantity > 0);
    });
  };

  const getCartTotal = () => {
    return cart.reduce((acc, p) => acc + p.item.price * p.quantity, 0);
  };

  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
  };

  const handleFeedbackSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFeedbackSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf5f0] via-[#f2e8dc] to-[#ece1d2] text-[#2a1a11] font-sans selection:bg-[#c9a677] selection:text-[#2a1a11] overflow-x-hidden relative">
      
      
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-50/60 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-stone-100/80 rounded-full blur-[100px] pointer-events-none" />

      
      <header id="header" className="sticky top-0 z-40 bg-[#faf9f6]/95 border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-[#2b1f14] border border-[#6d5140] flex items-center justify-center shadow-sm">
              <Coffee className="w-4 h-4 text-[#f7efe5]" />
            </div>
            <div className="leading-tight">
              <p className="text-xs uppercase tracking-[0.4em] text-[#6d5140]">Roastery & Studio</p>
              <span className="text-2xl font-semibold tracking-tight text-[#2b1f14] font-serif">Roast & Read</span>
            </div>
          </a>

          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
            <a href="#about" className="hover:text-[#2b1f14] transition-colors">Story</a>
            <a href="#menu" className="hover:text-[#2b1f14] transition-colors">Drinks</a>
            <a href="#beans" className="hover:text-[#2b1f14] transition-colors">Beans</a>
            <a href="#booking" className="hover:text-[#2b1f14] transition-colors">Studio</a>
            <a href="#contacts" className="hover:text-[#2b1f14] transition-colors">Reserve</a>
          </nav>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl border border-stone-200 bg-white text-stone-800 hover:border-stone-400 flex items-center justify-center transition-colors"
              title="Open shopping cart"
              id="cart-toggle-btn"
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#a16244] text-white text-[10px] w-5 h-5 font-bold rounded-full flex items-center justify-center">
                  {cart.reduce((acc, p) => acc + p.quantity, 0)}
                </span>
              )}
            </button>

            <a href="#booking" className="hidden md:block px-6 py-2.5 rounded-xl text-sm font-semibold bg-[#2b1f14] hover:bg-[#25170f] text-[#f9efe2] transition-colors">
              Reserve Studio
            </a>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2.5 rounded-xl text-stone-600 hover:bg-stone-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        
        {isMenuOpen && (
          <div className="md:hidden border-b border-stone-250 bg-[#faf9f6] px-6 py-6 space-y-4 flex flex-col">
            <a onClick={() => setIsMenuOpen(false)} href="#about" className="text-base font-medium text-[#4f3d34] hover:text-[#2b1f14]">Story</a>
            <a onClick={() => setIsMenuOpen(false)} href="#menu" className="text-base font-medium text-[#4f3d34] hover:text-[#2b1f14]">Drinks</a>
            <a onClick={() => setIsMenuOpen(false)} href="#beans" className="text-base font-medium text-[#4f3d34] hover:text-[#2b1f14]">Beans</a>
            <a onClick={() => setIsMenuOpen(false)} href="#booking" className="text-base font-medium text-[#4f3d34] hover:text-[#2b1f14]">Studio</a>
            <a onClick={() => setIsMenuOpen(false)} href="#contacts" className="text-base font-medium text-[#4f3d34] hover:text-[#2b1f14]">Reserve</a>
            <div className="pt-4 border-t border-stone-200">
              <a onClick={() => setIsMenuOpen(false)} href="#booking" className="block text-center py-3 rounded-xl bg-[#2b1f14] text-[#f9efe2] text-sm font-semibold">
                Reserve Studio
              </a>
            </div>
          </div>
        )}
      </header>

      
      <section className="relative py-12 md:py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          <div className="md:col-span-6 space-y-6 text-left">
          

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#2a1a11] leading-tight">
              A quiet coffee studio<br />
              for slow mornings,<br />
              unfinished pages and fresh beans.
            </h1>

            <p className="text-base text-[#5a4a3d] leading-relaxed max-w-lg">
              We roast on site, keep the menu focused, and curate a low-key studio where your laptop, notebook, or conversation blends with warm light and plain good coffee.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <a href="#menu" className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold bg-[#2b1f14] hover:bg-[#25170f] text-[#f9efe2] flex items-center justify-center gap-2 transition-colors">
                <span>View the Drink List</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#booking" className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-[#4f3d34] border border-[#d9c6b0] bg-[#fbf4ec] hover:bg-[#f2e6d7] text-center transition-all">
                Reserve a Table
              </a>
            </div>

            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-6 text-xs text-stone-500 border-t border-stone-200">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#a16244] shrink-0" />
                <span>144 Canvas Lane, SoHo, New York, NY 10012</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#a16244] shrink-0" />
                <span>Mon – Sun: 8:00 AM – 9:00 PM</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-6">
            <div className="border border-stone-200 p-2.5 bg-white rounded-2xl shadow-sm">
              <img 
                src={HERO_IMAGE_PATH} 
                alt="A beautiful ceramic latte coffee with detailed art" 
                className="w-full h-[360px] md:h-[420px] object-cover rounded-xl"
                referrerPolicy="no-referrer"
              />
              <div className="p-4 flex items-center justify-between text-left">
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">Weekly Roast Highlight</h4>
                  <p className="text-xs text-stone-500">Ethiopia Gedeo • Delicate jasmine notes & wild peach</p>
                </div>
                <span className="text-[11px] font-semibold px-2 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-md">
                  Fresh Crop
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      
      <section id="about" className="py-16 bg-white border-y border-[#d8c8ba] px-6">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#8b6144]">OUR VALUES</h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#2a1a11]">Coffee that feels personal</h3>
            <p className="text-[#5e4d41] text-sm">
              We keep the menu small, the roast schedule honest, and the space calm. Everything is aimed at making a simple coffee visit feel like a thoughtful pause in your day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="p-7 rounded-xl border border-stone-200/80 bg-[#faf9f6] text-left">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-850 flex items-center justify-center mb-5 font-bold text-sm">
                1
              </div>
              <h4 className="text-base font-bold text-stone-900 mb-2">Direct Trade Philosophy</h4>
              <p className="text-stone-600 text-xs leading-relaxed font-normal">
                We bridge relationships directly with cooperatives. Better sourcing structures translate to liveable wages and beautiful harvests season after season.
              </p>
            </div>

            <div className="p-7 rounded-xl border border-stone-200/80 bg-[#faf9f6] text-left">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-850 flex items-center justify-center mb-5 font-bold text-sm">
                2
              </div>
              <h4 className="text-base font-bold text-stone-900 mb-2">Micro-Lot Accuracy</h4>
              <p className="text-stone-600 text-xs leading-relaxed font-normal">
                We craft light-to-medium roasting schedules specific to every seed's density. We want you to trace natural sweetness without heavy bitterness.
              </p>
            </div>

            <div className="p-7 rounded-xl border border-stone-200/80 bg-[#faf9f6] text-left">
              <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-850 flex items-center justify-center mb-5 font-bold text-sm">
                3
              </div>
              <h4 className="text-base font-bold text-stone-900 mb-2">Workspace Comfort</h4>
              <p className="text-stone-600 text-xs leading-relaxed font-normal">
                Generous acoustic barriers, comfortable solid oak seating arrangements, proper ventilation, and high-speed fiber wi-fi keep you focused.
              </p>
            </div>

          </div>

        </div>
      </section>

      
      <section id="menu" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-10">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#a16244]">ON THE COUNTER</h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-stone-900">Our Daily Menu</h3>
            <p className="text-stone-600 text-sm">
              Artisanal classic double-shots, custom botanical milk recipes, and sweet morning bakes delivered warm from our local neighborhood bakery.
            </p>

            <div className="flex justify-center items-center gap-2 pt-6 flex-wrap">
              {[
                { id: 'all', label: 'All Selections' },
                { id: 'coffee', label: 'Black Coffee' },
                { id: 'milk', label: 'Milk Drinks' },
                { id: 'seasonal', label: 'Seasonal Picks' },
                { id: 'pastry', label: 'Baked Goods' },
                { id: 'beans', label: 'Bean Bags' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as any)}
                  className={`px-4 py-2 text-xs font-bold rounded-full border transition-colors ${
                    selectedCategory === cat.id 
                      ? 'bg-stone-900 text-white border-stone-900' 
                      : 'bg-white text-stone-600 border-stone-200 hover:text-stone-950 hover:border-stone-300'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filteredMenuItems.map((item) => (
              <div 
                key={item.id} 
                className="p-6 rounded-2xl bg-white border border-stone-200 hover:border-stone-300 transition-all text-left flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-stone-900 text-base">{item.name}</h4>
                    <span className="text-stone-900 font-bold font-mono text-sm shrink-0">${item.price.toFixed(2)}</span>
                  </div>
                  <p className="text-stone-500 text-xs mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] text-stone-400 font-mono">
                    Serving size: {item.volumeOrWeight}
                  </span>
                  
                  <button 
                    onClick={() => addToCart(item)}
                    className="px-3 py-1.5 rounded-lg text-[#6b4f3f] text-[11px] font-bold bg-[#f4e7db] hover:bg-[#ebdccf] border border-[#e1c9b0] transition-colors"
                  >
                    Add to order
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      
      <section id="beans" className="py-16 bg-white border-t border-stone-200 px-6">
        <div className="max-w-4xl mx-auto">
          
          <div className="p-8 bg-amber-50/40 rounded-2xl border border-amber-200 text-left flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-lg">
              <span className="text-[15.5px] font-bold text-[#a16244] uppercase tracking-widest block">Featured Harvest</span>
              <h4 className="text-2xl font-bold text-stone-900 font-serif">Ethiopia Jasmine Sidamo</h4>
              <p className="text-stone-600 text-xs leading-relaxed">
                Direct trade relationship via micro cooperative producers. Handpicked and wet-processed, roasted exquisitely soft on our state of the art Loring roaster. Tastes wonderfully complex with highlights of fresh peach, flowery jasmine garden, and clean sweet honey.
              </p>
              <div className="flex gap-4 items-center">
                <span className="text-lg font-bold text-stone-900">$18.50 <span className="text-xs text-stone-500 font-normal">/ 250g bag</span></span>
                
              </div>
              <button
                onClick={() => {
                  const targetItem = menuItems.find(i => i.id === 10);
                  if (targetItem) addToCart(targetItem);
                }}
                className="inline-flex px-5 py-2.5 rounded-xl text-xs font-bold bg-[#a16244] hover:bg-[#8c4f32] text-white transition-colors"
              >
                Add Bag to Order
              </button>
            </div>
            
            <div className="w-40 h-40 shrink-0 overflow-hidden rounded-xl border border-stone-200 bg-white">
              <img 
                src={BEANS_IMAGE_PATH} 
                alt="Minimally structured kraft paper coffee bean packaging bag from Roast & Read"
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

        </div>
      </section>

      
      <section id="booking" className="py-16 px-6 border-t border-stone-200">
        <div className="max-w-3xl mx-auto">
          
          <div className="text-center space-y-4 mb-10">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#8b6144]">STUDIO PASS</h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#2a1a11] font-serif">Reserve your workspace</h3>
            <p className="text-[#5e4d41] text-sm font-normal">
              Reserve a calm corner with Wi-Fi, a outlet, and a quiet view.
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-stone-200 bg-white relative text-left shadow-sm">
            {!bookingSubmitted ? (
              <form onSubmit={handleBookingSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-500 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      className="w-full p-3 rounded-lg border border-stone-200 bg-stone-50/50 text-sm focus:border-stone-400 focus:outline-none"
                      placeholder="Name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-500 mb-2">Email address</label>
                    <input 
                      type="email" 
                      required
                      value={bookingEmail}
                      onChange={(e) => setBookingEmail(e.target.value)}
                      className="w-full p-3 rounded-lg border border-stone-200 bg-stone-50/50 text-sm focus:border-stone-400 focus:outline-none"
                      placeholder="example@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-500 mb-2">Target Date</label>
                    <input 
                      type="date" 
                      required
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full p-3 rounded-lg border border-stone-200 bg-stone-50/50 text-sm focus:border-stone-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-500 mb-2">Booking Hours Range</label>
                    <input 
                      type="text" 
                      required
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      placeholder="e.g., 9:00 AM – 1:00 PM"
                      className="w-full p-3 rounded-lg border border-stone-200 bg-stone-50/50 text-sm focus:border-stone-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-500 mb-2">Desired Workspace Style</label>
                  <select 
                    value={bookingPref}
                    onChange={(e) => setBookingPref(e.target.value)}
                    className="w-full p-3 rounded-lg border border-stone-200 bg-stone-50/50 text-sm focus:border-stone-400 focus:outline-none bg-white"
                  >
                    <option>Quiet single window station (Natural day-light)</option>
                    <option>Large wooden meeting workbench (Laptop friendly)</option>
                    <option>Cozy reading armchair near the library</option>
                    <option>Private acoustic work niche with extra power-brick</option>
                  </select>
                </div>

                

                <button 
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-stone-900 hover:bg-stone-850 text-white font-semibold text-sm cursor-pointer transition-colors"
                >
                  Confirm Reservation Inquiry
                </button>
              </form>
            ) : (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600">
                  <Check className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-stone-900">Workspace Inquiry Submitted!</h4>
                <p className="text-stone-600 text-xs max-w-sm mx-auto">
                  Thank you, {bookingName}. We've saved your slot parameters for {bookingDate} around {bookingTime}. Our bar manager will shoot over a quick verification email to {bookingEmail} within several minutes.
                </p>
                <button 
                  onClick={() => setBookingSubmitted(false)}
                  className="mt-4 px-4 py-2 border border-stone-200 text-xs text-stone-600 rounded-lg hover:bg-stone-50 transition-colors"
                >
                  Submit another booking
                </button>
              </div>
            )}
          </div>

        </div>
      </section>

     
      <section id="contacts" className="py-16 bg-stone-100 border-t border-stone-200 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 text-left">
          
          <div className="md:col-span-12 lg:col-span-5 space-y-6">
            <h3 className="text-2xl font-bold text-[#2a1a11] font-serif">Stop in for a cup or a quiet hour</h3>
            

            <div className="space-y-4 text-xs font-medium text-stone-700">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4.5 h-4.5 text-[#a16244]" />
                <span>144 Canvas Lane, SoHo, New York, NY 10012</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4.5 h-4.5 text-[#a16244]" />
                <span>Weekdays: 8:00 AM – 9:00 PM / Weekends: 9:00 AM – 10:00 PM</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4.5 h-4.5 text-[#a16244]" />
                <span>+1 (000) 000-0000</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[10px] text-stone-400 block uppercase font-mono tracking-wider">Social Channels</span>
              <a href="#" className="inline-flex items-center gap-1.5 text-[#2a1a11] hover:text-[#8b6144] font-bold text-xs mt-1.5">
                <Instagram className="w-4 h-4" />

                @example
              </a>
            </div>
          </div>

          <div className="md:col-span-12 lg:col-span-7 bg-white p-7 rounded-xl border border-stone-200">
            <h4 className="font-bold text-stone-900 text-sm mb-4">Send us feedback or comments</h4>
            
            {!feedbackSubmitted ? (
              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10.5px] font-bold text-stone-500 mb-1.5">Your Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Name"
                    className="w-full p-2.5 text-xs rounded-lg border border-stone-200 bg-stone-50 focus:border-stone-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10.5px] font-bold text-stone-500 mb-1.5">Contact Detail (Email / Mobile)</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="example@example.com"
                    className="w-full p-2.5 text-xs rounded-lg border border-stone-200 bg-stone-50 focus:border-stone-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10.5px] font-bold text-stone-500 mb-1.5">Message / Suggestion</label>
                  <textarea 
                    rows={3}
                    required 
                    placeholder="Message"
                    className="w-full p-2.5 text-xs rounded-lg border border-stone-200 bg-stone-50 focus:border-stone-400 focus:outline-none resize-none"
                  />
                </div>
                <button 
                  type="submit" 
                  className="px-4 py-2.5 bg-stone-900 text-white rounded-lg text-xs font-bold hover:bg-stone-800 transition-colors"
                >
                  Send Message
                </button>
              </form>
            ) : (
              <div className="py-8 text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-5 h-5" />
                </div>
                <h5 className="font-bold text-stone-900 text-sm">Message Transmitted!</h5>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">We review comments each Monday morning. Thank you for keeping our independent small store robust and comfortable.</p>
                <button 
                  onClick={() => setFeedbackSubmitted(false)}
                  className="text-xs text-[#a16244] font-bold underline cursor-pointer"
                >
                  Write another note
                </button>
              </div>
            )}
          </div>

        </div>
      </section>

      
      {isCartOpen && (
        <div className="fixed inset-0 bg-stone-950/40 z-50 flex justify-end">
          <div className="relative w-full max-w-md bg-white h-full flex flex-col justify-between text-left shadow-2xl p-6 overflow-y-auto">
            
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-150">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#a16244]" />
                  <h3 className="text-base font-bold text-stone-900 font-serif">Selected Cups</h3>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 px-2.5 border border-stone-200 rounded-lg text-xs hover:bg-stone-50 text-stone-605 text-stone-600 transition-colors"
                  id="close-cart-btn"
                >
                  Close ✕
                </button>
              </div>

              
              {cart.length === 0 ? orderSuccess ? (
                <div className="py-20 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#e9f4ea] flex items-center justify-center mx-auto text-[#2f4f38]">
                    <Check className="w-5 h-5" />
                  </div>
                  <p className="text-[#2f4f38] text-sm font-semibold">Order received.</p>
                  <p className="text-[11px] text-[#5e5a52] max-w-xs mx-auto">We are preparing your cups now and your pick-up will be ready at the counter in a few minutes.</p>
                </div>
              ) : (
                <div className="py-20 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#f8ebe0] flex items-center justify-center mx-auto text-[#7b5c45]">
                    <Coffee className="w-5 h-5" />
                  </div>
                  <p className="text-[#7b5c45] text-xs">Your basket is currently empty.</p>
                  <p className="text-[11px] text-[#8b6c53] max-w-xs mx-auto">Explore the menu or roasted beans to add items to your custom order!</p>
                </div>
              ) : (
                <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto pr-1">
                  {cart.map((p) => (
                    <div key={p.item.id} className="flex gap-4 items-center justify-between p-3 border border-[#e6d7c8] rounded-xl bg-[#fbf4ec]">
                      <div className="text-xs">
                        <h4 className="font-bold text-stone-900">{p.item.name}</h4>
                        <div className="text-[11px] text-stone-400 mt-0.5 font-mono">
                          ${p.item.price.toFixed(2)} ea • {p.item.volumeOrWeight}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-stone-200 rounded-lg bg-white overflow-hidden">
                          <button 
                            onClick={() => updateQuantity(p.item.id, -1)}
                            className="px-2 py-1 text-xs text-stone-600 hover:bg-stone-50 font-bold"
                          >
                            –
                          </button>
                          <span className="px-2 text-xs font-bold text-stone-800">
                            {p.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(p.item.id, 1)}
                            className="px-2 py-1 text-xs text-stone-600 hover:bg-stone-50 font-bold"
                          >
                            +
                          </button>
                        </div>

                        <button 
                          onClick={() => removeFromCart(p.item.id)}
                          className="p-1.5 text-stone-400 hover:text-stone-900 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            
            {cart.length > 0 && (
              <div className="pt-4 border-t border-stone-200 space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-stone-500">Total Order Sum:</span>
                  <span className="text-xl font-bold text-stone-900 font-mono">${getCartTotal().toFixed(2)}</span>
                </div>

                <div className="p-3 bg-amber-50 rounded-lg text-[10.5px] text-amber-900 leading-normal border border-amber-100 font-normal">
                  Reserve a desktop desk space beforehand if you plan to stay inside our slow studio bar workspace to drink!
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <a 
                    href="#booking"
                    onClick={() => setIsCartOpen(false)}
                    className="flex justify-center items-center gap-1 py-3 text-xs font-bold border border-stone-300 rounded-xl hover:bg-stone-50 text-stone-700 text-center transition-all"
                  >
                    <CalendarDays className="w-3.5 h-3.5" /> Book Table
                  </a>
                  <button 
                    onClick={() => {
                      setOrderSuccess(true);
                      setCart([]);
                    }}
                    className="py-3 px-4 rounded-xl bg-[#2b1f14] hover:bg-[#25170f] text-[#f9efe2] font-bold text-xs transition-colors"
                  >
                    Order To Go
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      
      <footer className="py-12 border-t border-stone-200 bg-stone-50 text-left">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#2b1f14] flex items-center justify-center">
                <Coffee className="w-3.5 h-3.5 text-[#f9efe2]" />
              </div>
              <span className="text-base font-bold text-[#2a1a11] tracking-tight font-serif">Roast & Read</span>
            </div>
            <p className="text-[#5e4d41] text-xs leading-relaxed max-w-xs font-normal">
              Micro-batch coffee roasting, window bars and quiet sunny studios for work and reservations.
            </p>
          </div>

          <div>
            <h5 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-4">Craft</h5>
            <ul className="space-y-2 text-xs text-stone-500">
              <li><a href="#menu" className="hover:text-stone-900 transition-colors">Classics & seasonal sips</a></li>
              <li><a href="#beans" className="hover:text-stone-900 transition-colors">Purchase fresh beans</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-4">Reservation</h5>
            <ul className="space-y-2 text-xs text-stone-500">
              <li><a href="#booking" className="hover:text-stone-900 transition-colors">Workspace slots</a></li>
              <li><a href="#contacts" className="hover:text-stone-900 transition-colors">Location map</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-4">Location</h5>
            <p className="text-xs text-stone-500 leading-normal">
              144 Canvas Lane, SoHo,<br />
               New York, NY 10012<br />
              <span className="text-[#8b6144] text-[11px] font-bold font-mono">example@example.com</span>
            </p>
          </div>

        </div>

          <div className="max-w-6xl mx-auto px-6 mt-12 pt-8 border-t border-[#d8c8ba] flex flex-col sm:flex-row items-center justify-between text-xs text-[#6d5a4c]">
          <span>&copy; {new Date().getFullYear()} Roast & Read. Crafted for slow mornings.</span>
          <span className="mt-2 sm:mt-0 flex gap-4">
            <a href="#" className="hover:text-[#2b1f14] flex items-center gap-1 transition-colors"><Instagram className="w-3 h-3" /> @example</a>
            <span className="text-[#c7b2a0]">|</span>
            <span>Built with a human touch from beans to layout.</span>
          </span>
        </div>
      </footer>

    </div>
  );
}
