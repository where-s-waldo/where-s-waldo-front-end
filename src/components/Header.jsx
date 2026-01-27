const Header = ({ link }) => {
  return (
    <header>
      <h1>Where's Waldo?</h1>
      <div className="topRight">
        {link &&
          <button className="goToMap">{link}</button>
        }
      </div>
    </header>
  )
}

export default Header