import {FiShield,FiBox,FiCopy,FiExternalLink,FiCheckCircle,FiActivity} from 'react-icons/fi'
import Navbar from '../components/Navbar'
import { useToken } from "../hooks/useToken";
import { useReadToken } from '../hooks/specific/useReadToken';
import { formatUnits } from 'ethers';
import { formatAddress } from '../utils';

type AdminPageProps = {
  onNavigate: (page: 'user' | 'admin') => void
}

function AdminPage({ onNavigate }: AdminPageProps) {
  const {
    inputAmount,
    setInputAmount,
    error,
    handleMintToken,
  } = useToken();
  const { totalSupply, maxSupply, owner, mintHistory } = useReadToken();
  const totalSupplyDisplay = totalSupply ? Number(formatUnits(totalSupply, 18)).toLocaleString() : '--';
  const maxSupplyDisplay = maxSupply ? Number(formatUnits(maxSupply, 18)).toLocaleString() : '--';
  const contractAddress = import.meta.env.VITE_TODO_CONTRACT_ADDRESS as string | undefined;

  return (
    <div className="min-h-screen bg-[#f7f9fc] text-slate-900">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.08),_transparent_55%)]" />
      <Navbar activePage="admin" onNavigate={onNavigate} />
      <main className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-semibold">The GAF Vault</h1>
            <p className="text-sm text-slate-500">GAFToken administrative console</p>
          </div>
          <span className="hidden rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-600 md:inline-flex">
            Admin Panel
          </span>
        </div>
        <div className="mb-8 flex items-center gap-3 rounded-2xl border border-purple-100 bg-purple-50 px-5 py-4 text-sm text-purple-700">
          <FiShield />
          <p>Admin actions are restricted to the contract owner.</p>
        </div>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,_1.2fr)_minmax(0,_0.8fr)]">
          <section className="space-y-8">
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <FiBox />
                </div>
                <div>
                  <h2 className="font-display text-xl font-semibold">Mint Tokens</h2>
                  <p className="text-sm text-slate-500">Distribute GFT to verified recipients</p>
                </div>
              </div>
              <div className="space-y-5">
                <label className="block text-sm font-medium text-slate-700">Amount</label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <FiActivity className="text-slate-400" />
                  <input
                    placeholder="0.0"
                    className="w-full bg-transparent text-sm text-slate-600 outline-none"
                    value={inputAmount}
                    onChange={(event) => setInputAmount(event.target.value)}
                  />
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    GFT
                  </span>
                </div>
                {error && <p className="text-xs font-semibold text-rose-600">{error}</p>}
                <button
                  type="button"
                  className="w-full rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-sky-400 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-200"
                  onClick={handleMintToken}
                >
                  Mint GFT
                </button>
              </div>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold">Minting History</h3>
                <button className="text-xs font-semibold text-blue-600">Export CSV</button>
              </div>
              <div className="grid grid-cols-4 gap-4 border-b border-slate-100 pb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                <span>Status</span>
                <span>Recipient</span>
                <span>Amount</span>
                <span>Tx Hash</span>
              </div>
              <div className="divide-y divide-slate-100">
                {mintHistory.length === 0 && (
                  <div className="py-6 text-center text-sm text-slate-500">
                    No on-chain mint history yet.
                  </div>
                )}
                {mintHistory.map((item) => (
                  <div
                    key={item.txHash}
                    className="grid grid-cols-4 items-center gap-4 py-4 text-sm"
                  >
                    <span className="flex items-center gap-2 font-medium text-emerald-700">
                      <span className="h-2 w-2 rounded-full bg-emerald-600" />
                      Success
                    </span>
                    <span className="text-slate-700">{formatAddress(item.recipient)}</span>
                    <span className="font-semibold text-slate-800">
                      {Number(formatUnits(item.amount, 18)).toLocaleString()} GFT
                    </span>
                    <span className="text-slate-500">{formatAddress(item.txHash)}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <aside className="space-y-6">
            <div className="rounded-3xl bg-gradient-to-br from-blue-50 to-blue-100 p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase text-blue-700">Total minted to date</p>
              <p className="mt-3 text-4xl font-semibold text-blue-800">{totalSupplyDisplay}</p>
              <p className="text-sm text-blue-600">of {maxSupplyDisplay} max supply</p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h3 className="font-display text-lg font-semibold">Contract Identity</h3>
              <div className="mt-4 space-y-4 text-sm">
                <div>
                  <p className="text-xs font-semibold text-slate-400">Contract owner address</p>
                  <div className="mt-2 flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3">
                    <span className="text-blue-600">
                      {owner ? formatAddress(owner) : 'Not available'}
                    </span>
                    <button className="text-slate-400">
                      <FiCopy />
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400">Smart contract hash</p>
                  <div className="mt-2 flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3">
                    <span className="text-slate-500">
                      {contractAddress ? formatAddress(contractAddress) : 'Not available'}
                    </span>
                    <button className="text-slate-400">
                      <FiExternalLink />
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-200 text-emerald-700">
                  <FiCheckCircle />
                </div>
                <div>
                  <p className="font-semibold text-emerald-800">Ownership Verified</p>
                  <p className="text-xs text-emerald-700">Confirmed on Ethereum Mainnet</p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-blue-600 to-blue-500 p-6 text-white shadow-lg">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(255,255,255,0.2),_transparent_60%)]" />
              <div className="relative">
                <h3 className="font-display text-xl font-semibold">Enterprise Vault</h3>
                <p className="mt-3 text-sm text-blue-100">
                  Level 4 Multi-sig enabled. All administrative minting requires
                  triple-key validation for amounts exceeding 1,000 GFT.
                </p>
                <button className="mt-5 rounded-full border border-white/40 px-4 py-2 text-xs font-semibold">
                  Learn More
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}

export default AdminPage