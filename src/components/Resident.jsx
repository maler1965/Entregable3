import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from './Loader'

const Resident = ({ residentUrl }) => {

    const [residentInfo, setResidentInfo] = useState(null)

    const statusStyles = {
        "Alive": "bg-green-500",
        "Dead": "bg-red-500",
        "unknown": "bg-gray-500"
    }

    useEffect(() => {
        axios.get(residentUrl)
            .then(({ data }) => setResidentInfo(data))
            .catch((err) => console.log(err))
    }, [])



    return (

        <article >

            <section className="p-1 border-2 mt-6 border-green-500">

                <div className='relative border-2 border-green-500'>
                    {residentInfo?.image ? <img className='w-full h-auto   z-0' src={residentInfo?.image} alt="" /> : <Loader />}

                    {residentInfo?.image ? <div className='flex items-center border border-green-300 gap-2 bg-black/70 text-sm px-5 p-1 absolute  z-0 bottom-3 left-[50%] -translate-x-1/2'>
                        <div className={`h-3 aspect-square ${statusStyles[residentInfo?.status]} rounded-full`}></div>
                        {residentInfo?.status}
                    </div> : <Loader />}
                </div>

                {residentInfo?.image ? <section >
                    <h1 className='text-[20px] px-3'>{residentInfo?.name}</h1>
                    <h3 className='text-[10px] text-gray-400 px-3' > Species:  <span className=' text-white text-[15px] px-8'>{residentInfo?.species} </span>  </h3>
                    <h3 className='text-[10px] text-gray-400  px-3'> Origin:    <span className='text-white text-[15px] px-9'>{residentInfo?.origin.name} </span>  </h3>
                    <h3 className='text-[10px] text-gray-400  px-3
                    '> Times apper:   <span className=' text-white text-[15px] px-2'>{residentInfo?.episode.length} </span>  </h3>
                </section> : <Loader />}

            </section>

        </article>
    )
}

export default Resident