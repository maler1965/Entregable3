
import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Location from './components/Location'
import ResidentList from './components/ResidentList'
import { getRandomIndex } from './util/random'
import Loader from './components/Loader'



function App() {
  const [location, setLocation] = useState(null)


  useEffect(() => {
    const URL = `https://rickandmortyapi.com/api/location/${getRandomIndex()}`

    axios.get(URL)
      .then(({ data }) => setLocation(data))
      .catch((err) => console.log(err))
  }, [])


  return (
    <main className='bg-black min-h-screen text-white '  >
      {location ? <Location setLocation={setLocation} /> : <Loader />}

      {location ? <ResidentList location={location} setLocation={setLocation} residents={location?.residents} /> : <Loader />}

    </main>
  )
}

export default App
