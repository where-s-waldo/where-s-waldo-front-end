import Header from "../components/Header"
import { waldoMaps } from "./App"
import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useRef } from "react"


const ChooseColor = ({ color, setColor }) => {
  return (
    <div>
      <div>Cursor Color</div>
      <select
        value={color}
        onChange={(e) => setColor(e.target.value)}
        style={{ marginBottom: "10px" }}
      >
        <option value="black">Black</option>
        <option value="yellow">Yellow</option>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
      </select>
    </div>
  )
}

const Map = () => {
  const { id } = useParams()
  const map = waldoMaps.find((map) => map.id === parseInt(id))
  const [color, setColor] = useState("black")
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState([0, 0])
  const [clickSide, setClickSide] = useState(null)
  const imgRef = useRef(null)

  useEffect(() => {
    console.log(position)
  }, [position])


  const handleClick = (event) => {
    if (isVisible === true) {
      setIsVisible(false)
      return
    }
    const img = imgRef.current
    const rect = img.getBoundingClientRect()

    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height

    // Ignore clicks outside the image
    if (x < 0 || x > 1 || y < 0 || y > 1) return

    setClickSide(event.clientX < window.innerWidth / 2 ? "left" : "right")
    setIsVisible(true)

    setPosition([
      event.clientX,
      event.clientY
    ])

    // setLastClick({ x, y })
  }


  return (
    <>
      <Header topRight={
        <>
          <Link to="/">Home</Link>
          <ChooseColor color={color} setColor={setColor} />
        </>
      } />
      <div onClick={handleClick} className={`mapOverlay ${color}`}>
        <div className='map'>
          <img ref={imgRef} src={map.src} alt={`Waldo Map ${map.id}`} />
        </div>
      </div>

      {isVisible && (
        <div className="clickMenu" style={{
          position: "absolute",
          left: position[0],
          top: position[1],
        }}>
          <div className="targetBox"></div>
          <ul
            className="charMenu"
            style={{ transform: clickSide === "left" ? "translateX(100%) translateY(-50%)" : "translateX(-100%) translateY(-50%)" }}
          >
            {map.characters.map((char, index) => (
              <li className="menu-item" key={index}>{char}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default Map