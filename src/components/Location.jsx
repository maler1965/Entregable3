
import axios from 'axios'
import image1 from "/images/img1.webp";
import image2 from "/images/img2.webp";
import image3 from "/images/th.jpeg";
import image4 from "/images/img3.avif";
import image5 from "/images/img4.jpg";
import image6 from "/images/img5.jpg";
import image7 from "/images/img6.jpg";
import { useEffect, useState } from 'react';


const Location = ({ setLocation }) => {

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
        const URL = `https://rickandmortyapi.com/api/location/${newLocation}`

        e.target.reset();

        axios
            .get(URL)
            .then(({ data }) => setLocation(data))
            .catch((err) => console.log(err));
    };



    return (
        <section  >

            <form onSubmit={handleSubmit} className="flex justify-center items-center rounded-md overflow-hidden p-2 " style={{
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
            </form>

        </section>
    )
}

export default Location