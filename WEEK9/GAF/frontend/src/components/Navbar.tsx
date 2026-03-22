import { FiBox, FiShield, FiUser } from 'react-icons/fi'
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { formatAddress } from "../utils";

type NavbarProps = {
  activePage: 'user' | 'admin'
  onNavigate: (page: 'user' | 'admin') => void
}

function Navbar({ activePage }: NavbarProps) {
  const { open } = useAppKit();
  const { address } = useAppKitAccount();

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">

        
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-lg">
            <FiBox size={20} />
          </div>
          <div>
            <p className="text-lg font-semibold">GAF Protocol</p>
            <p className="text-xs text-slate-500">GFT · ERC-20 Token</p>
          </div>
        </div>

       
        <div
          className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold ${
            activePage === 'admin'
              ? 'border-purple-200 bg-purple-50 text-purple-700'
              : 'border-blue-200 bg-blue-50 text-blue-700'
          }`}
        >
          {activePage === 'admin' ? <FiShield size={13} /> : <FiUser size={13} />}
          {activePage === 'admin' ? 'Admin Dashboard' : 'User Dashboard'}
        </div>

       
        <button
          className="rounded-full bg-blue-50 px-5 py-2 text-sm font-semibold text-blue-700 shadow-sm"
          onClick={() => open()}
        >
          {address ? formatAddress(address) : 'Connect Wallet'}
        </button>

      </div>
    </header>
  )
}

export default Navbar