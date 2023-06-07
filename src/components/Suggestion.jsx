//===========
import axios from 'axios'
import image1 from "/images/img1.webp";
import image2 from "/images/img2.webp";
import image3 from "/images/th.jpeg";
import image4 from "/images/img3.avif";
import image5 from "/images/img4.jpg";
import image7 from "/images/img6.jpg";
import { useEffect, useState } from "react";

let specificProperty = []
let totalSuggestionsUrl = []
let numTotalSuggestionsUrl = []
let Names = [' ']
//=================

const Suggestion = ({ location, setLocation }) => {


    const [randomImage, setRandomImage] = useState(image1)
    const [suggestions, setSuggestions] = useState([]);
    const [text, setText] = useState()

    const images = [image2, image3, image1, image4, image5, image7];
    var opcionName = ['Attila Starwar', 'Abadango Cluster Princess', 'Arthricia', 'Crocubot', 'Tuberculosis']


    useEffect(() => {
        if (setLocation) {
            const randomImageIndex = Math.floor(Math.random() * images.length); //
            const randomImg = images[randomImageIndex];
            setRandomImage(randomImg);
        }
    }, [setLocation])



    useEffect(() => {
        if (text) {
            const searchTerm = text;
            let results = [];
            let resultsNum = [];
            let count2 = 0

            opcionName.forEach(name => {
                if (name.includes(searchTerm)) {
                    resultsNum = results.unshift(name)
                    Names = results
                    count2 = 1
                }
            });

            if (Names) {
                Names = opcionName
            }

            let num = []

            if (count2 === 0) {
                num = results.unshift('No hay coincidencias, Intenta con estas: ')
                Names.unshift(results)
            }

            setSuggestions(Names);

        } else {
            setSuggestions([]);
        }

    }, [text]);


    const handleChangeInput = (e) => {
        let textIn = e.target.value
        setText(textIn)
    }


    const handleSuggestionClick = (suggestion) => {
        setText('');
        setSuggestions([])
        const URL2 = `https://rickandmortyapi.com/api/character/?name=${suggestion}`

        axios
            .get(URL2)
            .then(({ data }) => {
                specificProperty = data.results
                numTotalSuggestionsUrl = totalSuggestionsUrl.push(specificProperty[0].location['url'])
                const URL3 = totalSuggestionsUrl
                axios
                    .get(URL3)
                    .then(({ data }) => setLocation(data))
                    .catch((err) => console.log(err));

                specificProperty = []
                totalSuggestionsUrl = []
            })

            .catch((err) => console.log(err));
    };



    return (
        <section  >

            <section >

                <div className="flex justify-center items-center  overflow-hidden p-2 " style={{
                    backgroundImage: `url(${randomImage})`,
                    backgroundSize: 'object-contain',
                    backgroundPosition: 'center',
                }}>
                    <div className="flex  rounded-md overflow-hidden ">
                        <input
                            placeholder="type a Name..."
                            onChange={handleChangeInput} value={text}
                            type="text"
                            className="text-black outline-none px-2"
                        />
                        <button onClick={() => handleSuggestionClick(text)} className="bg-red-500  hover:bg-blue-400 p-2"> Search <i className='bx bx-search-alt'></i></button>
                    </div>
                </div>


                <div className='  flex justify-center items-center rounded-md   ' >
                    <ul >
                        <div className=' text-black px-2 rounded-md absolute  z-10 pb-2 flex justify-center items-center left-[50%] -translate-x-1/2'>
                            <li >
                                {suggestions.map((suggestion) => (
                                    <li className='bg-white px-2  ' absolute key={suggestion} onClick={() => handleSuggestionClick(suggestion)}>
                                        {suggestion}
                                    </li>))}
                            </li>
                        </div>
                    </ul>
                </div>

            </section>


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

export default Suggestion