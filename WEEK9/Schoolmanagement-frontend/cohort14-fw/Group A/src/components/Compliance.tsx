const Compliance = () => {
  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className="card w-full bg-white card-md shadow-none lg:basis-[70%] lg:max-w-[70%]">
        <div className="flex h-full flex-col gap-4 p-6">
          <h2 className="card-title text-gray-700 text-base lg:text-lg">Institutional Compliance</h2>
          <p className="text-sm text-gray-500 lg:text-base">
            Ensure all staff wallets are verified before monthly disbursement. The next automated payment cycle begins in 14 days.
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            <button className="btn bg-white rounded-lg shadow-none text-black btn-sm lg:btn-md">View Audit Logs</button>
            <button className="btn btn-outline btn-sm lg:btn-md rounded-lg text-[#004AC6] bg-[#004AC61A]">Policy Update</button>
          </div>
        </div>
      </div>

      <div className="card w-full bg-[#0F172A] card-md shadow-none lg:basis-[30%] lg:max-w-[30%]">
        <div className="flex h-full flex-col gap-5 p-6">
          <h2 className="card-title text-white text-base lg:text-lg">Faculty Growth</h2>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-white">
              <span>Retainment rate</span>
              <span className="font-semibold text-white">94%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-100">
              <div className="h-2 w-[74%] rounded-full bg-[#004AC6]" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-white">
              <span>Satisfaction index</span>
              <span className="font-semibold text-white">4.8/5</span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-100">
              <div className="h-2 w-[26%] rounded-full bg-[#60A5FA]" />
            </div>
          </div>
          <button className="btn btn-neutral btn-sm lg:btn-md mt-2 w-fit self-center">View Details</button>
        </div>
      </div>
    </div>
  )
}

export default Compliance
