import { Icon } from '@iconify/react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { User } from '../../authentication/context/AuthContext'

const data = [
  { name: 'Day 1', price: 400 },
  { name: 'Day 5', price: 700 },
  { name: 'Day 10', price: 450 },
  { name: 'Day 15', price: 900 },
  { name: 'Day 20', price: 650 },
  { name: 'Day 25', price: 800 },
  { name: 'Day 30', price: 1000 },
]

export default function UserDashboard({ user }: { user: User }) {
  return (
    <div className="space-y-12 animate-in fade-in duration-1000 pb-12">

      {/* Header */}
      <div className="mb-14 animate-in fade-in slide-in-from-top-6 duration-1000">
        <span className="text-slate-400 font-bold text-[11px] uppercase tracking-[0.2em] mb-3 block">
          Good evening,
        </span>
        <h2 className="text-6xl font-black text-slate-900 mb-6 tracking-tighter">
          {user?.first_name || 'User'}
        </h2>
        <div className="inline-flex items-center gap-2.5 bg-emerald-50 px-5 py-2 rounded-full border border-emerald-100 shadow-sm shadow-emerald-500/5">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-black text-emerald-700 tracking-[0.15em] uppercase">
            {user?.role || 'Admin'} Account
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard
          icon="solar:box-bold-duotone"
          label="Total Ingredients"
          value="142"
          trend="+5 new"
          color="emerald"
        />
        <StatCard
          icon="solar:card-2-bold-duotone"
          label="Menu Items"
          value="24"
          trend="85% active"
          color="blue"
        />
        <StatCard
          icon="solar:graph-bold-duotone"
          label="Avg. Profit Margin"
          value="32.4%"
          trend="-1.2% ↓"
          color="amber"
        />
        <StatCard
          icon="solar:shield-warning-bold-duotone"
          label="Cost Alerts"
          value="4"
          trend="Review now"
          color="red"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white rounded-[3rem] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-100 relative group overflow-hidden min-h-[450px]">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Ingredient Price Trends</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Market Fluctuation (30 Days)</p>
            </div>
            <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
              <button className="px-5 py-2 bg-white text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm border border-slate-100 transition-all">Weekly</button>
              <button className="px-5 py-2 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:text-slate-600 transition-all">Monthly</button>
            </div>
          </div>

          {/* Chart Placeholder */}
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }}
                />
                <YAxis
                  hide={true}
                  domain={['dataMin - 100', 'dataMax + 100']}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: '16px',
                    border: 'none',
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#10b981"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorPrice)"
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* OCR History */}
        <div className="bg-[#1E293B] rounded-[3rem] p-10 text-white shadow-2xl shadow-slate-900/10 relative overflow-hidden flex flex-col">
          <div className="absolute -bottom-20 -right-20 opacity-5">
            <Icon icon="solar:scanner-2-bold" className="text-[18rem]" />
          </div>

          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-black flex items-center gap-3">
              <div className="p-2 bg-emerald-500 rounded-xl shadow-lg shadow-emerald-500/20">
                <Icon icon="solar:camera-bold-duotone" className="text-white" />
              </div>
              OCR History
            </h3>
            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">Live</span>
          </div>

          <div className="space-y-8 relative z-10 flex-1">
            <ActivityItem
              supplier="Supplier #402"
              category="Meat & Poultry"
              time="2h ago"
              value="₱12,450"
              alert="+2 Price Hikes"
              alertType="danger"
            />
            <ActivityItem
              supplier="Daily Veggies Inc."
              category="Produce"
              time="5h ago"
              value="₱3,200"
              alert="Stable"
              alertType="safe"
            />
            <ActivityItem
              supplier="Ocean Harvest"
              category="Seafood"
              time="1d ago"
              value="₱8,100"
              alert="Reviewed"
              alertType="neutral"
            />
          </div>

          <p className="mt-8 text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] text-center border-t border-slate-800 pt-8">
            End of Recent Scans
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Menu Recommendations */}
        <div className="bg-white rounded-[3rem] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-100">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Menu Optimization</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Smart Recommendations</p>
            </div>
            <div className="w-14 h-14 bg-emerald-50 rounded-[1.5rem] flex items-center justify-center">
              <Icon icon="solar:magic-stick-3-bold-duotone" className="text-2xl text-emerald-500" />
            </div>
          </div>

          <div className="space-y-4">
            <RecommendationRow
              item="Classic Beef Burger"
              reason="Beef price ↑ 12%"
              action="Increase"
              amount="+₱15.00"
              type="danger"
            />
            <RecommendationRow
              item="Chicken Alfredo"
              reason="Poultry price ↓ 4%"
              action="Keep Price"
              amount="₱0.00"
              type="safe"
            />
            <RecommendationRow
              item="Garden Salad"
              reason="Veg fluctuation"
              action="Monitor"
              amount="±₱2.00"
              type="warning"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-6">
          <ActionCard icon="solar:archive-bold-duotone" label="Update Inventory" />
          <ActionCard icon="solar:shield-user-bold-duotone" label="Staff Permissions" />
          <ActionCard icon="solar:settings-bold-duotone" label="System Settings" />
          <ActionCard icon="solar:chat-round-line-bold-duotone" label="Support Tickets" />
        </div>
      </div>
    </div>
  )
}

interface StatCardProps {
  icon: string;
  label: string;
  value: string;
  trend: string;
  color: 'emerald' | 'blue' | 'amber' | 'red';
}

function StatCard({ icon, label, value, trend, color }: StatCardProps) {
  const colors = {
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100',
    red: 'bg-red-50 text-red-600 border-red-100',
  }
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-50 shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-md transition-all duration-300">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border ${colors[color]}`}>
        <Icon icon={icon} className="text-3xl" />
      </div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{label}</p>
      <div className="flex items-baseline justify-between">
        <h4 className="text-3xl font-black text-slate-900 tracking-tighter">{value}</h4>
        <span className={`text-[10px] font-black px-3 py-1 rounded-full border uppercase tracking-wider ${colors[color]}`}>{trend}</span>
      </div>
    </div>
  )
}

interface ActivityItemProps {
  supplier: string;
  category: string;
  time: string;
  value: string;
  alert: string;
  alertType: 'danger' | 'safe' | 'neutral';
}

function ActivityItem({ supplier, category, time, value, alert, alertType }: ActivityItemProps) {
  const alertColors = {
    danger: 'text-red-400',
    safe: 'text-emerald-400',
    neutral: 'text-slate-500',
  }
  return (
    <div className="flex items-center gap-5 group cursor-default">
      <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center border border-slate-700/50 group-hover:border-emerald-500/50 transition-colors">
        <Icon icon="solar:receipt-bold-duotone" className="text-2xl text-slate-400 group-hover:text-emerald-400" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">{supplier}</p>
        <p className="text-[10px] text-slate-500 font-bold tracking-wide uppercase">{category} • {time}</p>
      </div>
      <div className="text-right">
        <p className="text-xs font-black text-white">{value}</p>
        <p className={`text-[10px] font-black uppercase tracking-widest ${alertColors[alertType]}`}>{alert}</p>
      </div>
    </div>
  )
}

interface RecommendationRowProps {
  item: string;
  reason: string;
  action: string;
  amount: string;
  type: 'danger' | 'safe' | 'warning';
}

function RecommendationRow({ item, reason, action, amount, type }: RecommendationRowProps) {
  const types = {
    danger: 'text-red-600',
    safe: 'text-emerald-600',
    warning: 'text-amber-600',
  }
  return (
    <div className="flex items-center justify-between p-6 bg-slate-50/50 rounded-[2rem] border border-transparent hover:border-emerald-100 hover:bg-white transition-all cursor-default">
      <div>
        <p className="text-sm font-black text-slate-900">{item}</p>
        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">{reason}</p>
      </div>
      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="text-xs font-black text-slate-900 tracking-tight uppercase">{action}</p>
          <p className={`text-[10px] font-black ${types[type]}`}>{amount}</p>
        </div>
        <div className={`w-3 h-3 rounded-full shadow-[0_0_12px_rgba(0,0,0,0.1)] ${
          type === 'danger' ? 'bg-red-500' : type === 'safe' ? 'bg-emerald-500' : 'bg-amber-500'
        }`}></div>
      </div>
    </div>
  )
}

function ActionCard({ icon, label }: { icon: string; label: string }) {
  return (
    <button className="bg-white border border-slate-50 p-10 rounded-[3rem] flex flex-col items-center justify-center gap-6 hover:shadow-xl hover:shadow-emerald-900/5 hover:border-emerald-100 transition-all group active:scale-95">
      <div className="w-20 h-20 rounded-[2rem] bg-slate-50 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-50 transition-all duration-300 shadow-sm border border-slate-100">
        <Icon icon={icon} className="text-4xl text-slate-400 group-hover:text-emerald-600" />
      </div>
      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center group-hover:text-emerald-950">{label}</span>
    </button>
  )
}
