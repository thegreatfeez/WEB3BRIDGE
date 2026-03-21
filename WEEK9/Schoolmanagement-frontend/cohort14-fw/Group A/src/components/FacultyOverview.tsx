import { mockStaff } from '../data/mockData'

const FacultyOverview = () => {
    const totalDisbursement = mockStaff.reduce((total, staff) => total + staff.salary, 0)
    const activeStaff = mockStaff.filter((staff) => staff.status === 'active').length
    const pendingActions = mockStaff.filter((staff) => staff.status === 'suspended').length

    return (
        <div className="flex flex-col gap-6 lg:flex-row">
            <div className="card w-full bg-white card-md shadow-sm lg:flex-[2]">
                <div className="space-y-6 p-6">
                    <h2 className="card-title text-gray-600 text-sm lg:text-lg">TOTAL DISBURSEMENT</h2>
                    <div className="flex gap-4">
                        <p className="text-2xl lg:text-4xl font-bold">
                            {totalDisbursement.toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD',
                                maximumFractionDigits: 2,
                            })}
                        </p>
                        <span className="text-sm text-green-500 mt-4">+12.5% this month</span>
                    </div>
                </div>
            </div>

            <div className="card w-full bg-white card-md shadow-sm lg:flex-1">
                <div className="space-y-6 p-6">
                    <h2 className="card-title text-gray-600 text-sm lg:text-lg">ACTIVE STAFF</h2>
                    <div className="flex gap-4">
                        <p className="text-2xl lg:text-4xl font-bold">{activeStaff}</p>
                    </div>
                </div>
            </div>

            <div className="card w-full bg-white card-md shadow-sm lg:flex-1">
                <div className="space-y-6 p-6">
                    <h2 className="card-title text-gray-600 text-sm lg:text-lg">PENDING ACTIONS</h2>
                    <div className="flex gap-4">
                        <p className="text-2xl lg:text-4xl font-bold text-[#943700]">{pendingActions}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FacultyOverview;
