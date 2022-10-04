const ConditionalWrapper = ({ condition, wrapper, children }) =>
  condition ? wrapper(children) : children;

const Overlay = (children) => {
  return (
    <div className="overlay">
      {children}
    </div>
  )
}

function CharDiv ({ char }) {
  const className = char.found ? 'charDiv found' : 'charDiv';
  return (
    <a href={char.url} target="_blank">
      <div className={className}>
        <img src={char.img}/>
        <div className="name">
          {char.name}
        </div>
      </div>
    </a>
  )
}

export default CharDiv;