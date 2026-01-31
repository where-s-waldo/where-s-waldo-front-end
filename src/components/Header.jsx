const Header = ({ link }) => {
  return (
    <header>
      <h1>Where's Waldo?</h1>
      <div className="topRight">
        {link}
      </div>
    </header>
  )
}

export default Header