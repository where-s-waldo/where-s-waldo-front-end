import Header from "../components/Header"
import { Link, useParams } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { fetchSingleMap, checkCoordinates, startMapTimer, finishMapTimer } from "../../fetch"
import { imageMap, charMap, optionsMap } from "../components/ImgPreload"
import Spinner from "../components/Spinner"
import Message from "../components/Message"
import ChooseColor from "../components/ChoseColor"
import GameStats from "../components/GameStats"
import formatTime from "../components/formatTime"

function Timer({ setTimer, gameOver, timer }) {
  useEffect(() => {
    if (gameOver) return;

    const start = performance.now();

    const id = setInterval(() => {
      const elapsed = (performance.now() - start) / 1000;
      setTimer(elapsed);
    }, 75);

    return () => clearInterval(id);
  }, [gameOver, setTimer]);

  return (
    <div className="timer">
      <img src={`${optionsMap['timer']}`} alt="" height={30} />
      <div>{formatTime(timer)}</div>
    </div>
  )
}




const Map = () => {
  const { id } = useParams()
  const [color, setColor] = useState("black")
  const [isVisible, setIsVisible] = useState(false)
  const [clickPercent, setClickPercent] = useState([0, 0]) // [x%, y%]
  const [clickSideX, setClickSideX] = useState(null)
  const [clickSideY, setClickSideY] = useState(null)
  const imgRef = useRef(null)
  const [map, setMap] = useState(null)
  const [mapLoading, setMapLoading] = useState(true)
  const [message, setMessage] = useState({ name: '', isOpen: null, success: null })
  const [characters, setCharacters] = useState(null)
  const [timer, setTimer] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
    const load = async () => {
      setMapLoading(true)
      await startMapTimer(id)

      const data = await fetchSingleMap(id)
      setMap(() => data.map)

      const charArr = []
      data.map.characters.forEach((char) => {
        charArr.push({ char, found: false })
      })

      setCharacters(() => charArr)
      setMapLoading(false)
    }

    load()
  }, [])


  useEffect(() => {
    const endGame = async () => {
      if (!characters) return
      let i = 0

      characters.forEach((char) => {
        if (char.found) i++
        if (!char.found) return
      })

      if (i === characters.length) {
        const data = await finishMapTimer(id)
        setGameOver(true)
        setTimer(data.endTime / 1000)
      }
    }

    endGame()
  }, [characters])


  const handleCharClick = async (charObj) => {
    const [x, y] = clickPercent
    if (x === 0 && y === 0) return
    const data = await checkCoordinates(id, charObj.name, clickPercent[0], clickPercent[1])

    if (data.success) {
      setMessage({ name: data.name, isOpen: true, success: data.success })
      setCharacters((prev) =>
        prev.map((c) =>
          c.char.name === charObj.name ? { ...c, found: true } : c
        )
      );
    } else {
      setMessage({ name: data.name, isOpen: true, success: data.success })
    }

    setIsVisible(false)
  }

  const handleClick = (e) => {
    if (isVisible === true) {
      setIsVisible(false)
      setClickPercent([0, 0])
      return
    }

    const img = imgRef.current
    if (!img) return

    const rect = img.getBoundingClientRect()

    const xPx = e.clientX - rect.left
    const yPx = e.clientY - rect.top

    if (xPx < 0 || yPx < 0 || xPx > rect.width || yPx > rect.height) return


    const xPercent = (xPx / rect.width) * 100
    const yPercent = (yPx / rect.height) * 100

    setClickPercent([
      Number(xPercent.toFixed(2)),
      Number(yPercent.toFixed(2))
    ])

    setClickSideX(Number(xPercent) < 50 ? "left" : "right")
    setClickSideY(Number(yPercent) < 50 ? "top" : "bottom")
    setIsVisible(true)
  }

  return (
    <>
      {gameOver && timer && id &&
        <GameStats time={timer} mapId={id} />
      }
      <Header link={<Link className="goToMap" to="/">Home</Link>} />
      <Message setMessage={setMessage} name={message.name} success={message.success} isOpen={message.isOpen} />
      {mapLoading && <Spinner />}
      {map && !mapLoading &&
        <>
          {characters &&
            <>
              <div className="findChar">
                <h2>Find These Characters!</h2>
                <div className="options">
                  <ChooseColor color={color} setColor={setColor} />
                  <Timer timer={timer} setTimer={setTimer} gameOver={gameOver} />
                </div>
              </div>
              <div className="characterBox">
                {characters.map((obj, index) => (
                  <div style={{ textDecoration: obj.found ? "line-through" : "none" }} key={index}>
                    <img src={charMap[obj.char.src]} alt="" height={50} />
                    {obj.char.name}
                  </div>
                ))}
              </div>
            </>
          }
          <div onClick={handleClick} className={`mapOverlay ${color}`}>
            <div className='map'>
              <img ref={imgRef} src={imageMap[map.src]} alt={`Waldo Map ${map.id}`} />

              {isVisible && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="clickMenu"
                  style={{
                    position: "absolute",
                    left: `${clickPercent[0]}%`,
                    top: `${clickPercent[1]}%`,
                    transform: "translate(-50%, -50%)"
                  }}
                >
                  <div className="targetBox"></div>
                  <ul
                    className="charMenu"
                    style={{
                      transform: `translateX(${clickSideX === "left" ? "100%" : "-100%"}) translateY(${clickSideY === "top" ? "-25%" : "-75%"})`
                    }}
                  >
                    {characters.filter((obj) => obj.found === false).map((obj, index) => (
                      <li
                        onClick={() => handleCharClick(obj.char)}
                        className="menu-item" key={obj.char.id}>
                        <img src={charMap[obj.char.src]} alt="" height={100} />
                        {obj.char.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </>
      }
    </>
  )
}

export default Map
