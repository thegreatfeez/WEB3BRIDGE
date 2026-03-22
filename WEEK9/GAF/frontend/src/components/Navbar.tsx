import { FiBox } from 'react-icons/fi'
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { formatAddress } from "../utils";

type NavbarProps = {
  activePage: 'user' | 'admin'
  onNavigate: (page: 'user' | 'admin') => void
}

function Navbar({ activePage, onNavigate }: NavbarProps) {
  const { open } = useAppKit();
  const { address } = useAppKitAccount();

  const handleConnectWallet = () => {
    open();
  };

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-lg">
            <FiBox size={20} />
          </div>
          <div>
              <p className="text-lg font-semibold">GAF Protocol</p>
              <p className="text-xs text-slate-500">GAFToken Admin Console</p>
          </div>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          <button
            className={`text-sm font-semibold ${
              activePage === 'user' ? 'text-blue-600' : 'text-slate-500'
            }`}
            onClick={() => onNavigate('user')}
          >
            User Dashboard
          </button>
          <button
            className={`text-sm font-semibold ${
              activePage === 'admin' ? 'text-blue-600' : 'text-slate-500'
            }`}
            onClick={() => onNavigate('admin')}
          >
            Admin Panel
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <button className="rounded-full bg-blue-50 px-5 py-2 text-sm font-semibold text-blue-700 shadow-sm"
          onClick={handleConnectWallet}>
            {address ? formatAddress(address) : "Connect Wallet"}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
