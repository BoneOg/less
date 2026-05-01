import { Link } from 'react-router-dom';
import heroPreview from '../assets/hero-preview.png';
import testimonialUser from '../assets/testimonial-user.png';

const LandingPage = () => {
  return (
    <div className="bg-background text-on-background min-h-screen">
      {/* TopNavBar */}
      <header className="bg-surface/80 backdrop-blur-md border-b border-outline-variant sticky top-0 z-50 transition-all duration-300 ease-in-out">
        <nav className="flex justify-between items-center w-full px-8 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <img src="/images/logo.png" alt="less. logo" className="h-8 w-auto" />
            <div className="text-2xl font-bold tracking-tighter text-primary">less.</div>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a className="text-sm tracking-tight text-primary font-semibold border-b-2 border-primary" href="#">Features</a>
            <a className="text-sm tracking-tight text-on-surface-variant hover:text-primary transition-colors" href="#">Analysis</a>
            <a className="text-sm tracking-tight text-on-surface-variant hover:text-primary transition-colors" href="#">Inventory</a>
            <a className="text-sm tracking-tight text-on-surface-variant hover:text-primary transition-colors" href="#">Pricing</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="px-5 py-2 text-sm font-semibold text-on-surface-variant hover:bg-surface-container rounded-lg transition-all">Login</Link>
            <Link to="/register" className="px-6 py-2 text-sm font-semibold bg-primary-container text-on-primary-container rounded-lg hover:bg-primary hover:text-on-primary transition-all">Get Started</Link>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-32 px-8 max-w-7xl mx-auto overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container w-fit">
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                <span className="text-label-sm">Essential intelligence for restaurateurs</span>
              </div>
              <h1 className="text-h1 text-on-surface">Make smarter menu pricing decisions with <span className="text-primary italic">less.</span> effort</h1>
              <p className="text-body-lg text-on-surface-variant max-w-xl">
                Streamline your kitchen's profitability with OCR receipt processing and automated food cost analysis. Focus on the craft, we'll handle the margins.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-primary text-on-primary rounded-lg font-semibold hover:bg-on-primary-fixed-variant transition-all flex items-center gap-2 shadow-lg shadow-primary/20">
                  Start Your Analysis
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
                <button className="px-8 py-4 bg-surface-container text-on-surface font-semibold rounded-lg hover:bg-surface-container-highest transition-all border border-outline-variant">
                  View Demo
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-secondary-container/30 to-transparent rounded-full blur-3xl"></div>
              <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl shadow-2xl shadow-primary-container/10">
                <img 
                  src={heroPreview} 
                  alt="App Preview" 
                  className="rounded-lg w-full h-auto object-cover border border-outline-variant" 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Core Process Section */}
        <section className="bg-surface-container-low py-32 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24 max-w-2xl mx-auto">
              <h2 className="text-h2 text-on-surface mb-6">Simplifying your daily workflow</h2>
              <p className="text-on-surface-variant">Automating the tedious math so you can get back to the table. Our three-step process keeps your margins healthy and your data fresh.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-12">
              {/* Step 1 */}
              <div className="bg-surface border border-outline-variant p-10 rounded-xl flex flex-col gap-6 group hover:border-primary-container transition-all hover:shadow-xl hover:shadow-primary/5">
                <div className="w-12 h-12 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-container group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors">
                  <span className="material-symbols-outlined">photo_camera</span>
                </div>
                <h3 className="text-h3 text-on-surface">OCR Scanning</h3>
                <p className="text-on-surface-variant">Snap a photo of your supplier receipts. Our intelligent OCR instantly extracts ingredient prices and updates your database.</p>
              </div>
              {/* Step 2 */}
              <div className="bg-surface border border-outline-variant p-10 rounded-xl flex flex-col gap-6 group hover:border-primary-container transition-all hover:shadow-xl hover:shadow-primary/5">
                <div className="w-12 h-12 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-container group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors">
                  <span className="material-symbols-outlined">calculate</span>
                </div>
                <h3 className="text-h3 text-on-surface">Cost Analysis</h3>
                <p className="text-on-surface-variant">System auto-calculates precise food costs for every dish based on your latest real-time inventory and supplier prices.</p>
              </div>
              {/* Step 3 */}
              <div className="bg-surface border border-outline-variant p-10 rounded-xl flex flex-col gap-6 group hover:border-primary-container transition-all hover:shadow-xl hover:shadow-primary/5">
                <div className="w-12 h-12 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-container group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors">
                  <span className="material-symbols-outlined">monitoring</span>
                </div>
                <h3 className="text-h3 text-on-surface">Price Recommender</h3>
                <p className="text-on-surface-variant">Get smart suggestions to adjust menu prices dynamically, ensuring you always hit your target profit margins.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Analysis View */}
        <section className="py-32 px-8 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative bg-surface p-8 rounded-xl border border-outline-variant overflow-hidden shadow-2xl shadow-primary/5">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h4 className="text-h3 text-on-surface">Profit Margin Trends</h4>
                    <p className="text-on-surface-variant text-sm">Monthly comparison view</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-semibold">Live Data</span>
                  </div>
                </div>
                {/* Placeholder for Data Visualization Graphic */}
                <div className="h-64 flex items-end gap-3 px-4">
                  <div className="flex-1 bg-surface-container-highest rounded-t-lg h-[40%]"></div>
                  <div className="flex-1 bg-surface-container-highest rounded-t-lg h-[55%]"></div>
                  <div className="flex-1 bg-primary-container rounded-t-lg h-[70%]"></div>
                  <div className="flex-1 bg-surface-container-highest rounded-t-lg h-[60%]"></div>
                  <div className="flex-1 bg-primary-container rounded-t-lg h-[85%]"></div>
                  <div className="flex-1 bg-surface-container-highest rounded-t-lg h-[75%]"></div>
                  <div className="flex-1 bg-primary-container rounded-t-lg h-[95%]"></div>
                </div>
                <div className="mt-8 grid grid-cols-3 gap-4 border-t border-outline-variant pt-8">
                  <div>
                    <p className="text-xs text-on-surface-variant uppercase tracking-widest mb-1">Avg Margin</p>
                    <p className="text-xl font-bold text-primary">32.4%</p>
                  </div>
                  <div>
                    <p className="text-xs text-on-surface-variant uppercase tracking-widest mb-1">Cost Delta</p>
                    <p className="text-xl font-bold text-error">-4.2%</p>
                  </div>
                  <div>
                    <p className="text-xs text-on-surface-variant uppercase tracking-widest mb-1">Status</p>
                    <p className="text-xl font-bold text-on-tertiary-container">Optimal</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-8 order-1 lg:order-2">
              <h2 className="text-h2 text-on-surface leading-tight">Master your trends across days, weeks, and months.</h2>
              <p className="text-body-lg text-on-surface-variant">
                Our powerful comparison engine highlights cost shifts before they eat your profit. Track ingredient volatility and identify exactly which menu items need price adjustments for maximum impact.
              </p>
              <ul className="flex flex-col gap-4">
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                  <span className="text-on-surface">Ingredient volatility alerts</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                  <span className="text-on-surface">Historical margin benchmarking</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                  <span className="text-on-surface">Automated seasonal forecasting</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Social Proof/Trust */}
        <section className="py-24 border-y border-outline-variant bg-surface">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col items-center text-center gap-12">
              <div className="flex flex-wrap justify-center gap-16 opacity-40 grayscale contrast-125">
                <div className="text-2xl font-black text-on-surface-variant italic">KITCHEN CO.</div>
                <div className="text-2xl font-black text-on-surface-variant italic">PLATE & FORK</div>
                <div className="text-2xl font-black text-on-surface-variant italic">THE GOURMET</div>
                <div className="text-2xl font-black text-on-surface-variant italic">SAVOR.</div>
              </div>
              <div className="max-w-3xl bg-surface-container-low p-12 rounded-xl border border-outline-variant relative">
                <span className="material-symbols-outlined absolute -top-4 left-10 text-5xl text-primary/20">format_quote</span>
                <p className="text-h3 text-on-surface italic mb-8">
                  "less. changed the way we look at our menu. We found that our signature risotto was losing us money due to rice price shifts we hadn't noticed. Now, we're optimized every single week."
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary-container">
                    <img 
                      src={testimonialUser} 
                      alt="Elena Rodriguez" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-on-surface">Elena Rodriguez</p>
                    <p className="text-sm text-on-surface-variant">Founder, Savor Collective</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 px-8">
          <div className="max-w-5xl mx-auto rounded-3xl bg-on-primary-container p-16 text-center text-on-primary relative overflow-hidden shadow-2xl shadow-primary-container/20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            <div className="relative z-10">
              <h2 className="text-h2 mb-6">Join the future of restaurant management.</h2>
              <p className="text-body-lg text-primary-fixed mb-10 max-w-xl mx-auto opacity-90">
                Stop guessing your food costs. Start maximizing your profit with the tools designed for the modern kitchen.
              </p>
              <div className="flex justify-center gap-4">
                <Link to="/register" className="px-10 py-4 bg-primary-container text-on-primary-container rounded-xl font-bold hover:scale-[1.02] transition-all hover:bg-primary-fixed-dim">Get Started for Free</Link>
              </div>
              <p className="mt-8 text-sm text-primary-fixed/60">No credit card required. Cancel anytime.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low border-t border-outline-variant">
        <div className="max-w-7xl mx-auto px-8 py-16 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-2xl font-black text-primary lowercase">less.</div>
          <div className="flex flex-wrap justify-center gap-8">
            <a className="text-xs uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors underline decoration-primary/30 underline-offset-4" href="#">Terms of Service</a>
            <a className="text-xs uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="text-xs uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors" href="#">Contact Support</a>
          </div>
          <p className="text-xs uppercase tracking-widest text-on-surface-variant opacity-60">© 2026 less. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
