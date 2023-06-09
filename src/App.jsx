
import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import ResidentList from './components/ResidentList'
import { getRandomIndex } from './util/random'
import Loader from './components/Loader'
import imageHeader from "/images/bgHeader.png";
import imagePage from "/images/bgPage.png";
import imagename from "/images/name.png";
import Suggestion from './components/Suggestion'


function App() {

  const [location, setLocation] = useState(null)
  const [images, setImages] = useState(0);
  const [change, setchange] = useState(0)
  const arrayImage = [
    "/images/portal1.jpg",
    "/images/portal2.jpg",
    "/images/portal3.jpg",
    "/images/portal4.jpg",
    "/images/portal5.jpg",
    "/images/portal6.jpg",
  ];

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

  useEffect(() => {
    setImages(0)
    setchange(1)
  }, [location])


  useEffect(() => {
    // Función para cambiar la foto actual
    const cambiarFoto = () => {
      setImages((images + 1) % arrayImage.length);
    };

    // Configurar el temporizador para cambiar la foto cada 3 segundos
    const temporizador = setInterval(cambiarFoto, 500);

    // Limpiar el temporizador al desmontar el componente
    return () => {
      clearInterval(temporizador);
    };
  }, [change]);


  useEffect(() => {
    const URL = `https://rickandmortyapi.com/api/location/${getRandomIndex()}`

    axios.get(URL)
      .then(({ data }) => setLocation(data))
      .catch((err) => console.log(err))
  }, [])


  return (
    <main className='sm:grid-cols-[1fr_auto]  mx-auto bg-black min-h-screen' >

      <div className="min-h-screen flex-col text-white relative flex justify-center items-center font-principal-font p-2" style={{
        backgroundImage: `url(${imageHeader})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>

        <div>
          <img src={arrayImage[images]} style={{ marginTop: '-90px' }} className="w-20p   h-auto" alt="" />
        </div>

        <div className='flex items-center rounded-md gap-2 p-2 absolute  z-0 bottom-15 left-[50%] -translate-x-1/2'>
          <img src={imagename} style={{ marginTop: '-100px' }} className="w-20p  h-auto" alt="" />
        </div>

        <form onSubmit={handleSubmit} className="flex justify-center items-center   p-2"  >
          <div className="flex  z-10 absolute  " style={{ marginBottom: '-90px' }}>
            <input
              id="newLocation"
              type="text"
              placeholder="type a location id..."
              className="text-white bg-black border border-green-300 text-sm outline-none px-2"
            />
            <button className="bg-green-700  hover:bg-green-300 text-sm p-1 px-5 border border-green-300 "> Search <i className='bx bx-search-alt px-2'></i></button>
          </div>
        </form>

        <div className=' justify-center absolute  items-center ' style={{ marginBottom: '-400px' }} >
          {location ? <Suggestion location={location} setLocation={setLocation} /> : <Loader />}
        </div>

      </div >

      <section style={{
        backgroundImage: `url(${imagePage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <div className='bg-black min-h-screen text-white '>
          {location ? <ResidentList location={location} setLocation={setLocation} residents={location?.residents} /> : <Loader />}
        </div>
      </section>

    </main>
  )
}

export default App
