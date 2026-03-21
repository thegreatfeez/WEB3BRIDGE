import { FaMoneyBills } from "react-icons/fa6"
import { mockStaff } from '../data/mockData'

const StaffRoster = () => {
    const staffCount = mockStaff.length

    return (
        <div className="bg-gray-100 rounded-box border border-base-content/5">
            <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="font-bold text-base sm:text-lg lg:text-xl">Staff Roster</h3>

                <label className="input w-full bg-white sm:w-auto sm:min-w-[240px]">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input type="search" required placeholder="Search faculty..." />
                </label>
            </div>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-gray-100">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="text-black">
                            <th>FACULTY MEMBER</th>
                            <th>STAFF ID</th>
                            <th>STATUS</th>
                            <th>SALARY</th>
                            <th>WALLET ADDRESS</th>
                            <th>LAST PAID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockStaff.map((staff) => (
                            <tr key={staff.id}>
                                <td className="flex gap-2">
                                    <div className="grid h-10 w-10 place-items-center rounded-full bg-[#f0d7c2] text-[12px] font-semibold text-[#8c5a2d]">
                                        {staff.name
                                            .split(' ')
                                            .slice(0, 2)
                                            .map((part) => part[0])
                                            .join('')
                                            .toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-[#1f2937]">{staff.name}</p>
                                        <span className="text-xs text-gray-500">Faculty Member</span>
                                    </div>
                                </td>
                                <td>#{staff.id}</td>
                                <td>
                                    <span className={`badge ${staff.status === 'active' ? 'badge-accent' : 'badge-secondary'}`}>
                                        {staff.status === 'active' ? 'Active' : 'Suspended'}
                                    </span>
                                </td>
                                <td className="text-bold">
                                    {staff.salary.toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                        minimumFractionDigits: 2,
                                    })}
                                </td>
                                <td className="text-gray-400">{staff.wallet}</td>
                                <td>{staff.lastPaid ?? '—'}</td>
                                <td><FaMoneyBills /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm sm:text-base">Showing {staffCount} of {staffCount} faculty members</p>

                <div className="join w-full bg-transparent sm:w-auto">
                    <button className="join-item btn flex-1 bg-gray-200 border-none shadow-none text-black sm:flex-none">previous</button>
                    <button className="join-item btn flex-1 shadow-none sm:flex-none">1</button>
                    <button className="join-item btn flex-1 bg-gray-200 border-none shadow-none text-black sm:flex-none">next</button>
                </div>
            </div>
        </div>
    )
}

export default StaffRoster
