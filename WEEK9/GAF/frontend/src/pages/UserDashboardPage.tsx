import {
  FiShield,
  FiCheckCircle,
  FiClock,
  FiLayers,
  FiLock,
  FiTrendingUp,
  FiBox,
  FiUser,
  FiActivity 
} from 'react-icons/fi'
import Navbar from '../components/Navbar'
import { useToken } from '../hooks/useToken'
import { useReadToken } from '../hooks/specific/useReadToken'
import { formatUnits } from 'ethers'
import { useAppKitAccount } from '@reown/appkit/react'
import { formatAddress } from '../utils'
import { useEffect, useState } from 'react'

type UserDashboardPageProps = {
  onNavigate: (page: 'user' | 'admin') => void
}

const highlights = [
  { label: 'Verified Contract', icon: FiCheckCircle },
  { label: 'Open Source', icon: FiCheckCircle },
  { label: '0% Interest', icon: FiCheckCircle },
]

function UserDashboardPage({ onNavigate }: UserDashboardPageProps) {
  const {
    handleRequestToken,
    transferAmount,
    setTransferAmount,
    transferRecipient,
    setTransferRecipient,
    transferError,
    handleTransferToken,
  } = useToken();
  const { address } = useAppKitAccount();
  const { totalSupply, claimAmount, cooldown, balance, nextClaimTime } = useReadToken();

  const totalSupplyDisplay = totalSupply ? Number(formatUnits(totalSupply, 18)).toLocaleString() : '--';
  const claimAmountDisplay = claimAmount ? Number(formatUnits(claimAmount, 18)).toLocaleString() : '--';
  const cooldownSeconds = cooldown ? Number(cooldown) : null;

  const [nowSeconds, setNowSeconds] = useState(() => Math.floor(Date.now() / 1000));

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNowSeconds(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => window.clearInterval(intervalId);
  }, []);
  const nextClaimSeconds = nextClaimTime ? Number(nextClaimTime) : null;
  const remainingSeconds =
    nextClaimSeconds && nextClaimSeconds > nowSeconds
      ? nextClaimSeconds - nowSeconds
      : 0;

  const formatCountdown = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${secs}s`;
    return `${secs}s`;
  };

  const cooldownDisplay =
    cooldownSeconds !== null ? `${Math.floor(cooldownSeconds / 3600)} Hours` : '--';

  const nextClaimDisplay =
    nextClaimSeconds && nextClaimSeconds > nowSeconds
      ? formatCountdown(remainingSeconds)
      : 'Available now';

  const balanceDisplay = balance ? Number(formatUnits(balance, 18)).toLocaleString() : '0';
  return (
    <div className="min-h-screen bg-[#f7f9fc] text-slate-900">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.08),_transparent_55%)]" />

      <Navbar activePage="user" onNavigate={onNavigate} />

      <main className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,_1.2fr)_minmax(0,_0.8fr)]">
          <section className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
                <FiBox />
              </div>
              <div>
                <h1 className="font-display text-3xl font-semibold">GAFToken</h1>
                <p className="text-sm text-slate-500">GFT · ERC-20 Asset</p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase text-slate-400">Total supply</p>
                <p className="mt-3 text-3xl font-semibold text-blue-700">{totalSupplyDisplay}</p>
                <p className="text-sm text-slate-500">Circulating in the ecosystem</p>
              </div>

              <div className="rounded-3xl bg-blue-50 p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase text-blue-600">Faucet amount</p>
                <p className="mt-3 text-3xl font-semibold text-blue-700">{claimAmountDisplay} GFT</p>
                <p className="text-sm text-blue-600">Per unique claim request</p>
              </div>

              <div className="rounded-3xl bg-green-200/70 p-6 shadow-sm">
                <div className="flex items-center justify-between text-green-900">
                  <p className="text-xs font-semibold uppercase">Cooldown period</p>
                  <FiClock />
                </div>
                <p className="mt-3 text-3xl font-semibold text-green-950">{cooldownDisplay}</p>
                <p className="text-sm text-green-900">Anti-spam protection active</p>
              </div>

              <div className="rounded-3xl bg-purple-100/70 p-6 shadow-sm">
                <div className="flex items-center justify-between text-purple-700">
                  <p className="text-xs font-semibold uppercase">Next claim</p>
                  <FiTrendingUp />
                </div>
                <p className="mt-3 text-3xl font-semibold text-purple-700">{nextClaimDisplay}</p>
                <button className="text-sm font-semibold text-purple-700">View Status</button>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
              <h2 className="font-display text-2xl font-semibold">Ready to claim?</h2>
              <p className="mt-2 text-sm text-slate-500">
                Tokens are dispatched immediately to your connected wallet. Gas fees apply
                on the Sepolia network.
              </p>
              <button
                type="button"
                onClick={handleRequestToken}
                className="mt-6 rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-sky-400 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-200"
              >
                Request {claimAmountDisplay} GFT
              </button>
              <p className="mt-3 text-xs text-slate-400">
                Estimated Transaction Fee: 0.00012 ETH
              </p>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <FiUser />
                </div>
                <div>
                  <h2 className="font-display text-xl font-semibold">Transfer Tokens</h2>
                  <p className="text-sm text-slate-500">Send GFT to another wallet</p>
                </div>
              </div>

              <div className="space-y-5">
                <label className="block text-sm font-medium text-slate-700">Recipient</label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <FiUser className="text-slate-400" />
                  <input
                    placeholder="0x..."
                    className="w-full bg-transparent text-sm text-slate-600 outline-none"
                    value={transferRecipient}
                    onChange={(event) => setTransferRecipient(event.target.value)}
                  />
                </div>

                <label className="block text-sm font-medium text-slate-700">Amount</label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <FiActivity className="text-slate-400" />
                  <input
                    placeholder="0.0"
                    className="w-full bg-transparent text-sm text-slate-600 outline-none"
                    value={transferAmount}
                    onChange={(event) => setTransferAmount(event.target.value)}
                  />
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    GFT
                  </span>
                </div>
                {transferError && (
                  <p className="text-xs font-semibold text-rose-600">{transferError}</p>
                )}

                <button
                  type="button"
                  className="w-full rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-400 py-4 text-sm font-semibold text-white shadow-lg shadow-emerald-200"
                  onClick={handleTransferToken}
                >
                  Transfer GFT
                </button>
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-3xl bg-slate-100 p-6 shadow-sm">
              <div className="flex items-center gap-2 text-slate-700">
                <FiShield />
                <p className="font-semibold">GAF Security</p>
              </div>
              <p className="mt-3 text-sm text-slate-600">
                The GAF Vault uses multi-signature authorization for minting and an
                automated cooling system to ensure fair distribution for all developers.
              </p>
              <div className="mt-4 space-y-3">
                {highlights.map((item) => (
                  <div key={item.label} className="flex items-center gap-2 text-sm text-slate-600">
                    <item.icon className="text-emerald-600" />
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-slate-800 p-6 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <p className="font-semibold">Your GFT Balance</p>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
                  Live
                </span>
              </div>
              <div className="mt-6">
                <p className="text-3xl font-semibold">{balanceDisplay} GFT</p>
                <p className="mt-2 text-xs text-white/60">Connected wallet balance</p>
              </div>
              <div className="mt-6 flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3 text-xs text-white/70">
                <span>Wallet</span>
                <span>{address ? formatAddress(address) : 'Not connected'}</span>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-700 p-6 text-white shadow-lg">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.2),_transparent_55%)]" />
              <div className="relative">
                <div className="flex items-center gap-2 text-white/80">
                  <FiLayers />
                  <p className="text-xs font-semibold uppercase">Global nodes active</p>
                </div>
                <p className="mt-3 text-2xl font-semibold">124 Regions</p>
              </div>
            </div>
          </aside>
        </div>

        <footer className="mt-12 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2024 GAF Protocol</p>
          <div className="flex items-center gap-4">
            <button>Docs</button>
            <button>Terms</button>
            <button>Support</button>
          </div>
          <span className="rounded-full bg-slate-100 px-4 py-2 text-[10px] font-semibold uppercase text-slate-500">
            Network Status: Operational
          </span>
        </footer>
      </main>
    </div>
  )
}

export default UserDashboardPage
