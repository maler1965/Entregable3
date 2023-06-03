
import axios from 'axios'
import image1 from "/images/img1.webp";
import image2 from "/images/img2.webp";
import image3 from "/images/th.jpeg";
import image4 from "/images/img3.avif";
import image5 from "/images/img4.jpg";
import image6 from "/images/img5.jpg";
import image7 from "/images/img6.jpg";
import { useEffect, useState } from 'react';




const Location = ({ location, setLocation }) => {

    const [randomImage, setRandomImage] = useState(image1)
    const images = [image2, image3, image1, image4, image5, image6, image7];

    useEffect(() => {

        if (setLocation) {
            const randomImageIndex = Math.floor(Math.random() * images.length);
            const randomImg = images[randomImageIndex];
            setRandomImage(randomImg);
        }

    }, [setLocation])


    const handleSubmit = (e) => {
        e.preventDefault();

        const newLocation = e.target.newLocation.value;

        //if (newLocation === "") return setCity(null)  
        const URL = `https://rickandmortyapi.com/api/location/${newLocation}`

        axios
            .get(URL)
            .then(({ data }) => setLocation(data))
            .catch((err) => console.log(err));
    };

    //style={{ backgroundColor: 'blue/70' }}

    return (
        <section  >

            <form onSubmit={handleSubmit} className="flex justify-center items-center rounded-md overflow-hidden p-4 " style={{
                backgroundImage: `url(${randomImage})`,
                backgroundSize: 'object-contain',
                backgroundPosition: 'center',
            }} >

                <div className="flex  rounded-md overflow-hidden  ">
                    <input
                        id="newLocation"
                        type="text"
                        placeholder="type a location id..."
                        className="text-black outline-none px-2"
                    />
                    <button className="bg-blue-400  hover:bg-red-500 p-2"> Search <i className='bx bx-search-alt'></i></button>
                </div>

                <section className=" bg-white/25">

                    <div >

                    </div>

                </section>



            </form>

            <section className=' justify-center items-center bg-gradient-to-b text-black from-blue-400 to-white'  >
                <h2 className="flex justify-center items-center text-[30px] ">{location?.name}</h2>
                <ul className='  flex justify-center items-center gap-3'>
                    <li className='capitalize p-3 text-blue-800' >type: {location?.type} </li>
                    <li className='capitalize p-3  text-blue-800'>dimension: {location?.dimension}</li>
                    <li className='capitalize p-3 text-blue-800'>population: {location?.residents.length}</li>
                </ul>
            </section>
        </section>
    )
}

export default Location