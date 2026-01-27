import '../css/globle.css'
import '../css/header.css'
import '../css/map.css'
import Header from '../components/Header.jsx'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchAllMaps } from '../../fetch.js'
import Spinner from '../components/Spinner.jsx'
import { imageMap } from '../components/ImgPreload.jsx'

const MapList = ({ map }) => {

  return (
    <div className='mapItem'>
      <img src={imageMap[map.src]} alt={`Waldo Map ${map.id}`} />
      <div className='mapDescription'>{map.description}</div>
      <Link className='goToMap' to={`/maps/${map.id}`}>go to {map.src}</Link>
    </div>
  )
}

function App() {
  const [maps, setMaps] = useState(null)
  const [loadingMaps, setLoadingMaps] = useState(true)

  useEffect(() => {
    const load = async () => {
      setLoadingMaps(true)
      const data = await fetchAllMaps()
      setMaps(data.maps)
      setLoadingMaps(false)
    }

    load()
  }, [])


  return (
    <>
      <Header />
      {loadingMaps && <Spinner />}
      {maps && !loadingMaps &&
        <>
          <div className='waldoMaps'>
            {maps.map((map) => (
              <MapList key={map.id} map={map} />
            ))}
          </div>
        </>
      }
    </>
  )
}

export default App