//===========
import axios from 'axios'
import { useEffect, useState } from "react";


const Suggestion = ({ location, setLocation }) => {

    const [suggestions, setSuggestions] = useState([]);
    const [dataApi, setDataApi] = useState()
    const [isClicked, setIsClicked] = useState(false);
    const [text, setText] = useState()
    let specificProperty = []
    let totalSuggestionsUrl = []
    var numTotalSuggestionsUrl = []

    var opcionName = []
    var opcionNameNum = 0

    const handleClick = () => {
        setIsClicked(true);
    };


    useEffect(() => {
        if (text) {
            const URL1 = `https://rickandmortyapi.com/api/character/?name=${text}`
            axios
                .get(URL1)
                .then(({ data }) => setDataApi(data))
                .catch((err) => console.log(err));
        }
    }, [text])


    useEffect(() => {
        if (dataApi) {
            const results = dataApi.results
            let resultsTotal = []
            let resultsTotalNum = 0
            resultsTotalNum = resultsTotal.push(results[0].name)

            console.log('total name  ' + resultsTotal)

            opcionNameNum = opcionName.unshift(resultsTotal)

            console.log('opcionNameA1  ' + resultsTotal)
            setSuggestions(resultsTotal)
        }
    }, [dataApi])


    useEffect(() => {
        if (isClicked) {
            if (opcionNameNum === 0) {
                let initText = "Bienvenido a tu primer busqueda"
                opcionNameNum = opcionName.unshift(initText)
                setSuggestions(opcionName)
            } else {
                setSuggestions(opcionName);
            }
        }
    }, [isClicked])


    const handleChangeInput = (e) => {
        let textIn = e.target.value
        console.log('names1 ' + e.target.value)
        setText(textIn)
    }


    const handleSuggestionClick = (suggestion) => {
        console.log('names3 ' + suggestion)
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

                <div className="flex justify-center items-center  p-2" >
                    <div className="flex margin-botton  ">
                        <input
                            onClick={handleClick}
                            placeholder="type a Name..."
                            onChange={handleChangeInput} value={text}
                            type="text"
                            className="text-white bg-black border border-green-300 text-sm outline-none px-2"
                        />
                        <button onClick={() => handleSuggestionClick(text)} className="bg-green-700  hover:bg-green-300 border border-green-300 text-sm px-5 p-1 "> Search <i className='bx bx-search-alt px-2'></i></button>
                    </div>
                </div>


                <div className='  flex justify-center items-center rounded-md   ' >
                    <ul >
                        <div className=' text-black px-2 rounded-md absolute  z-10 pb-2 flex justify-center items-center left-[50%] -translate-x-1/2'>
                            <li >
                                {suggestions?.map((suggestion) => (
                                    <li className='bg-white px-2  ' absolute key={suggestion} onClick={() => handleSuggestionClick(suggestion)}>
                                        {suggestion}
                                    </li>))}
                            </li>
                        </div>
                    </ul>
                </div>

            </section>


            <div>
                <h1 className='text-green-300 flex justify-center items-center'> !Wellcome to the crazy universe!</h1>

                <h2 className="text-green-300 flex justify-center items-center ">{location?.name}</h2>
                <h2 className="text-green-300 flex justify-center items-center ">poblacion: {location?.residents.length}</h2>


            </div>

        </section>

    )
}

export default Suggestion