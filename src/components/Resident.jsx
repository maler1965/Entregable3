import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Resident = ({ residentUrl }) => {
    const [residentInfo, setResidentInfo] = useState(null)


    useEffect(() => {
        axios.get(residentUrl)
            .then(({ data }) => setResidentInfo(data))
            .catch((err) => console.log(err))
    }, [])


    //align-items:_flex-end


    return (


        <article>
            <div className='relative'>
                <img className='rounded-md' src={residentInfo?.image} alt="" />

                <div className='flex items-center rounded-md gap-2 bg-red-500/70 p-2 absolute bottom-3 left-[50%] -translate-x-1/2'>
                    <div className='h-3 aspect-square bg-green-500 rounded-full'></div>
                    Dead
                </div>
            </div>

            <section className=' flex   justify-center items-center gap-2 '>
                <h4 className=' mx-auto rounded-md p-2 bg-blue-500/70 '>{residentInfo?.name}</h4>
                <ul className=' mx-auto p-2 bg-blue-500/70 rounded-md mt-4 ' >
                    <li > Species:  <span>{residentInfo?.species} </span>  </li>
                    <div className='h-[1px] bg-blue-400 scroll-mb-4'></div>
                    <li> Origin:  <span>{residentInfo?.origin.name} </span>  </li>
                    <div className='h-[1px] bg-blue-400 scroll-mb-4'></div>
                    <li> Times apper:  <span>{residentInfo?.episode.length} </span>  </li>
                </ul>
            </section>
        </article>


    )
}

export default Resident