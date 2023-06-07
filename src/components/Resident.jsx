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


        <article className="relative">


            <div className='relative'>
                <img className='rounded-md relative  z-0' src={residentInfo?.image} alt="" />

                {residentInfo?.image ? <div className='flex items-center rounded-md gap-2 bg-blue-300/70 p-2 absolute  z-0 bottom-3 left-[50%] -translate-x-1/2'>
                    <div className={`h-3 aspect-square ${statusStyles[residentInfo?.status]} rounded-full`}></div>
                    {residentInfo?.status}
                </div> : <Loader />}

            </div>

            {residentInfo?.image ? <section className=' flex   justify-center items-center gap-2 relative z-0 '>
                <h4 className=' mx-auto rounded-md p-2 bg-blue-500/70 '>{residentInfo?.name}</h4>
                <ul className=' mx-auto p-2 bg-blue-500/70 rounded-md mt-4 ' >
                    <li > Species:  <span>{residentInfo?.species} </span>  </li>
                    <div className='h-[1px] bg-blue-400 scroll-mb-4'></div>
                    <li> Origin:  <span>{residentInfo?.origin.name} </span>  </li>
                    <div className='h-[1px] bg-blue-400 scroll-mb-4'></div>
                    <li> Times apper:  <span>{residentInfo?.episode.length} </span>  </li>
                </ul>
            </section> : <Loader />}


        </article>


    )
}

export default Resident