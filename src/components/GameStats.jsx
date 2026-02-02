import formatTime from "./formatTime";
import { Link, useNavigate } from "react-router-dom";
import { optionsMap } from "./ImgPreload";
import { useState } from "react";
import { Filter } from "bad-words";
import { postTimeToLeaderBoard } from "../../fetch";

const GameStats = ({ time, mapId }) => {
  const navigate = useNavigate();
  const [infoOpen, setInfoOpen] = useState(false)
  const [username, setUsername] = useState('Bob')
  const filter = new Filter()
  filter.addWords('hate', 'stupid', 'dumb')

  const handleChange = (e) => {
    let value = e.target.value
    value = filter.clean(value)
    setUsername(value)
  }

  const onButtonPress = async () => {
    await postTimeToLeaderBoard(username, time, mapId)
  }

  return (
    <div className="screenOverlay">
      <div className="gameStats">
        <div className="flexRow">
          <div>Final time: {formatTime(time)}</div>
          <img src={optionsMap['info']} alt="" height={20} onClick={() => setInfoOpen(!infoOpen)} />
        </div>
        {infoOpen && <small>Time in [m]:ss.00 format</small>}
        <div className="inputBox">
          <label htmlFor="username">Username</label>
          <input placeholder="aka Bob..." type="text" name="username" value={username} onChange={handleChange} />
        </div>
        {username &&
          <div className="statButtons">
            <Link onClick={() => onButtonPress()} className="goToMap" to={`/maps/${mapId}/leaderboard`}>View Leaderboard</Link>
            <Link onClick={() => onButtonPress()} className="goToMap" to='/'>Go Home</Link>
            <button className="goToMap" onClick={() => {
              onButtonPress().then(() => navigate(0))
            }}>Play Again</button>
          </div>
        }
      </div>
    </div>
  )
}

export default GameStats