import { IoFilter } from "react-icons/io5";
import FacultyOverview from "../components/FacultyOverview";
import StaffRoster from "../components/StaffRoster";
import Compliance from "../components/Compliance";

const FacultyPortal = () => {
    return (
        <main className="w-full text-black px-5 py-7 sm:px-9 lg:px-[56px] lg:py-7">
            <div className="mx-auto w-full max-w-7xl space-y-10">
                <section className="space-y-3">
                    <h1 className="text-2xl font-semibold md:text-4xl">Faculty Portal</h1>
                    <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                        <p className="text-sm text-gray-600 md:text-lg lg:max-w-4xl">
                            Oversee institutional human resources, manage compensation ledgers,
                            and maintain faculty status records with architectural precision.
                        </p>
                        <div className="flex gap-4 sm:flex-row sm:items-center">
                            <div className="dropdown dropdown-bottom">
                                <div tabIndex={0} role="button" className="btn bg-gray-100 text-black px-6 border-none">
                                    <IoFilter /> Filter
                                </div>
                                <ul
                                    tabIndex={-1}
                                    className="dropdown-content menu z-10 w-52 rounded-box bg-gray-100 p-2 shadow-sm"
                                >
                                    <li><a>Item 1</a></li>
                                    <li><a>Item 2</a></li>
                                </ul>
                            </div>

                            <button className="btn bg-linear-to-r from-[#004AC6] to-[#2563EB] px-6 lg:px-8 text-white">
                                + Add Staff
                            </button>
                        </div>
                    </div>
                </section>

                <section>
                    <FacultyOverview />
                </section>

                <section>
                    <StaffRoster />
                </section>

                <section>
                    <Compliance />
                </section>
            </div>
        </main>
    );
};

export default FacultyPortal;
