import { useState } from "react"
import Resident from "./Resident"
import { paginationLogic } from "../util/pagination"



const ResidentList = ({ residents }) => {

    const [currentPage, setCurrentPage] = useState(1)

    const { pages, residentsInPage } = paginationLogic(currentPage, residents)



    return (
        <section className="px-3">

            <section className="grid gap-8 grid-cols-[repeat(auto-fill,_280px)] justify-center max-w-[1024px] mx-auto py-6">
                {residentsInPage?.map((resident) =>
                    <Resident key={resident} residentUrl={resident} />)
                }
            </section>

            {/*Paginacion   */}

            <section className="flex justify-center gap-4 flex-wrap pb-8">
                {pages.map((page) => (
                    <button
                        key={page} onClick={() => setCurrentPage(page)}
                        className={`p-2 px-3 rounded-md ${currentPage === page ? 'bg-green-300' : 'bg-green-700'
                            }`} > {page}</button>))}
            </section>


        </section>

    )
}
export default ResidentList