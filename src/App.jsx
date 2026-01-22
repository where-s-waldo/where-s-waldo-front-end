import { useState } from 'react'
import './css/globle.css'
import './css/header.css'
import { Link } from 'react-router-dom'
import map1 from './assets/waldo-maps/map1.jpg'
import map2 from './assets/waldo-maps/map2.jpg'
import map3 from './assets/waldo-maps/map3.jpg'
import map4 from './assets/waldo-maps/map4.jpg'
import map5 from './assets/waldo-maps/map5.jpg'
import map6 from './assets/waldo-maps/map6.jpg'
import map7 from './assets/waldo-maps/map7.jpg'
import map8 from './assets/waldo-maps/map8.jpg'

const waldoMaps = [
  { id: 1, src: map1, description: 'Find Waldo in the busy street scene.' },
  { id: 2, src: map2, description: 'Find Waldo in the busy street scene.' },
  { id: 3, src: map3, description: 'Find Waldo in the busy street scene.' },
  { id: 4, src: map4, description: 'Find Waldo in the busy street scene.' },
  { id: 5, src: map5, description: 'Find Waldo in the busy street scene.' },
  { id: 6, src: map6, description: 'Find Waldo in the busy street scene.' },
  { id: 7, src: map7, description: 'Find Waldo in the busy street scene.' },
  { id: 8, src: map8, description: 'Find Waldo in the busy street scene.' },
]

const Map = ({ map }) => {
  return (
    <div className='map'>
      <img src={map.src} alt={`Waldo Map ${map.id}`} width="300" />
      <div>{map.description}</div>
      <Link to={`/maps/${map.id}`}>go to map</Link>
    </div>
  )
}

const Header = () => {
  return (
    <header>
      <h1>Where's Waldo?</h1>
      <div>Links</div>
    </header>
  )
}

function App() {

  return (
    <>
      <Header />
      <div className='waldoMaps'>
        {waldoMaps.map((map) => (
          <Map key={map.id} map={map} />
        ))}
      </div>
    </>
  )
}

export default App