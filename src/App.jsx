
import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Location from './components/Location'
import ResidentList from './components/ResidentList'
import { getRandomIndex } from './util/random'



function App() {
  const [location, setLocation] = useState(null)


  useEffect(() => {
    const URL = `https://rickandmortyapi.com/api/location/${getRandomIndex()}`

    axios.get(URL)
      .then(({ data }) => setLocation(data))
      .catch((err) => console.log(err))
  }, [])

  console.log(location)

  return (
    <main className='bg-black min-h-screen text-white '  >
      <Location location={location} setLocation={setLocation} />
      <ResidentList residents={location?.residents} />

    </main>
  )
}

export default App
