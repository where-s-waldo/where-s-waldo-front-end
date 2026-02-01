import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { Link, useParams } from "react-router-dom"
import Header from "../components/Header";
import { getLeaderboard } from "../../fetch";

const Char = ({ name, time, place }) => {

  return (
    <div className="char">
      <div className="charUsername">{name}</div>
      <div className="charPlace"><strong>#{place}</strong></div>
      <div className="charTime">{time}</div>
    </div>
  )
}

const Leaderboard = () => {
  const { id } = useParams()
  const [leaderboard, setLeaderboard] = useState(null)
  const [skip, setSkip] = useState(0)
  const [loadingChars, setLoadingChars] = useState(true)
  const [loadMoreChars, setLoadMoreChars] = useState(false)
  const [charCount, setCharCount] = useState(null)

  useEffect(() => {
    const load = async () => {
      const data = await getLeaderboard(id, skip)
      if (skip > 0) {
        if (data.leaderboardChars.length == 0) return
        data.leaderboardChars.forEach(char => {
          setLeaderboard(prev => [...prev, char])
        })
      } else {
        setLeaderboard(() => data.leaderboardChars)
        setCharCount(() => data.totalLeaderBoardChars)
      }
      setLoadingChars(false)
      setSkip(() => skip + 10)
    }

    load()
  }, [loadMoreChars])

  return (
    <>
      <Header link={<Link className="goToMap" to="/">Home</Link>} />
      {loadingChars && <Spinner />}
      {leaderboard && !loadingChars &&
        <>
          <div className="chars">
            <div className="title">
              <div className="charUsername">Username</div>
              <div className="charPlace">Place</div>
              <div className="charTime">Time</div>
            </div>
            {leaderboard && leaderboard.length == 0 && <p>No finishes have been made on this map!</p>}
            <div className="leaderboardChars">
              {leaderboard.map((char, index) => (
                <Char key={char.id || index} name={char.name} time={char.time} place={index + 1} />
              ))}
            </div>
          </div>
          {leaderboard.length < charCount &&
            <button onClick={() => setLoadMoreChars(!loadMoreChars)} className="goToMap">Load More</button>
          }
        </>
      }
    </>
  )
}

export default Leaderboard