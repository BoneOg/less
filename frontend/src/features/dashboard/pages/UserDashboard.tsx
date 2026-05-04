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
        <h2 className="text-6xl font-black text-primary mb-6 tracking-tighter">
          {user?.first_name || 'User'}
        </h2>
        <div className="inline-flex items-center gap-2.5 bg-primary/10 px-5 py-2 rounded-full border border-primary/20 shadow-sm">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <span className="text-[10px] font-black text-primary tracking-[0.15em] uppercase">
            {user?.role || 'Admin'} Account
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard
          icon="solar:user-circle-bold-duotone"
          label="Profile Status"
          value="Active"
          trend="Secure"
          color="primary"
        />
        <StatCard
          icon="solar:shield-check-bold-duotone"
          label="Security Level"
          value="High"
          trend="Protected"
          color="secondary"
        />
        <StatCard
          icon="solar:login-2-bold-duotone"
          label="Last Login"
          value="Today"
          trend="Just now"
          color="tertiary"
        />
        <StatCard
          icon="solar:settings-minimalistic-bold-duotone"
          label="Settings"
          value="Up to date"
          trend="Optimal"
          color="primary"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-surface rounded-[3rem] p-10 shadow-sm border border-outline-variant relative group overflow-hidden min-h-[450px]">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-black text-on-surface tracking-tight">Activity Overview</h3>
              <p className="text-xs text-on-surface-variant font-bold uppercase tracking-widest mt-1">System Usage (30 Days)</p>
            </div>
            <div className="flex bg-surface-container-low p-1.5 rounded-2xl border border-outline-variant">
              <button className="px-5 py-2 bg-white text-primary rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm border border-outline-variant transition-all">Weekly</button>
              <button className="px-5 py-2 text-on-surface-variant rounded-xl text-[10px] font-black uppercase tracking-widest hover:text-on-surface transition-all">Monthly</button>
            </div>
          </div>

          {/* Chart Placeholder */}
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1e293b" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#1e293b" stopOpacity={0}/>
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
                  stroke="#1e293b"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorPrice)"
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-surface rounded-[3rem] p-10 border border-outline-variant relative overflow-hidden flex flex-col shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-black text-on-surface flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Icon icon="solar:history-bold-duotone" className="text-primary" />
              </div>
              History
            </h3>
          </div>

          <div className="space-y-8 relative z-10 flex-1">
            <ActivityItem
              title="Profile Updated"
              category="Settings"
              time="2h ago"
              icon="solar:user-edit-bold-duotone"
            />
            <ActivityItem
              title="Logged In"
              category="Authentication"
              time="5h ago"
              icon="solar:login-2-bold-duotone"
            />
            <ActivityItem
              title="Password Changed"
              category="Security"
              time="1d ago"
              icon="solar:lock-password-bold-duotone"
            />
          </div>
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
  color: 'primary' | 'secondary' | 'tertiary' | 'error';
}

function StatCard({ icon, label, value, trend, color }: StatCardProps) {
  const colors = {
    primary: 'bg-primary/5 text-primary border-primary/10',
    secondary: 'bg-secondary/5 text-secondary border-secondary/10',
    tertiary: 'bg-tertiary/5 text-tertiary border-tertiary/10',
    error: 'bg-error/5 text-error border-error/10',
  }
  return (
    <div className="bg-surface p-8 rounded-[2.5rem] border border-outline-variant shadow-sm hover:shadow-md transition-all duration-300">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border ${colors[color]}`}>
        <Icon icon={icon} className="text-3xl" />
      </div>
      <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-2">{label}</p>
      <div className="flex items-baseline justify-between">
        <h4 className="text-3xl font-black text-on-surface tracking-tighter">{value}</h4>
        <span className={`text-[10px] font-black px-3 py-1 rounded-full border uppercase tracking-wider ${colors[color]}`}>{trend}</span>
      </div>
    </div>
  )
}

interface ActivityItemProps {
  title: string;
  category: string;
  time: string;
  icon: string;
}

function ActivityItem({ title, category, time, icon }: ActivityItemProps) {
  return (
    <div className="flex items-center gap-5 group cursor-default">
      <div className="w-12 h-12 rounded-2xl bg-surface-container-low flex items-center justify-center border border-outline-variant group-hover:border-primary/50 transition-colors">
        <Icon icon={icon} className="text-2xl text-on-surface-variant group-hover:text-primary transition-colors" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-bold text-on-surface">{title}</p>
        <p className="text-[10px] text-on-surface-variant font-bold tracking-wide uppercase">{category} • {time}</p>
      </div>
    </div>
  )
}
