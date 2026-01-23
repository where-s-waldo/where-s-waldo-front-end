const Header = ({ topRight }) => {
  return (
    <header>
      <h1>Where's Waldo?</h1>
      <div className="topRight">{topRight}</div>
    </header>
  )
}

export default Header