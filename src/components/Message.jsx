import { useEffect } from "react"

const Message = ({ success, name, isOpen, setMessage }) => {

  useEffect(() => {
    if (!isOpen) return;

    const timeout = setTimeout(() => {
      setMessage(prev => ({ ...prev, isOpen: false }));
    }, 2000);

    return () => clearTimeout(timeout);
  }, [isOpen]);

  return (
    <div className="popUpWrapper">
      <div className={`popUpMessage ${success ? 'green' : 'red'} ${isOpen === null ? 'start' : isOpen ? 'open' : 'close'}`}>
        {success ?
          <Found name={name} />
          :
          <NotFound name={name} />
        }
      </div>
    </div>
  )
}

const Found = ({ name }) => {
  return (
    <div>
      You found {name}!
    </div>
  )
}

const NotFound = ({ name }) => {
  return (
    <div>
      That's not {name}...
    </div>
  )
}

export default Message