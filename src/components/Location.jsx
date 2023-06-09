
import axios from 'axios'
import imageHeader from "/images/bgHeader.png";

const Location = ({ setLocation }) => {

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

            <div className="flex justify-center items-center  overflow-hidden  " style={{
                backgroundImage: `url(${imageHeader})`,
                backgroundSize: 'object-contain',
                backgroundPosition: 'center',
            }}>
            </div>

            <form onSubmit={handleSubmit} className="flex justify-center items-center rounded-md  p-2 "  >
                <div >
                    <input
                        id="newLocation"
                        type="text"
                        placeholder="type a location id..."
                        className="text-white bg-black border border-green-300 text-sm outline-none px-2"
                    />
                    <button className="bg-green-700  hover:bg-green-300 text-sm p-1 px-5 border border-green-300 "> Search <i className='bx bx-search-alt px-2'></i></button>
                </div>
            </form>

        </section>
    )
}

export default Location