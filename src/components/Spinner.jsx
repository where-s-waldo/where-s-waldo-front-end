const Spinner = ({ size = 40 }) => {
  return (
    <div
      style={{
        margin: '20px',
        width: size,
        height: size,
        border: `${size / 8}px solid #e5e7eb`,
        borderTop: `${size / 8}px solid #3b82f6`,
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
      }}
    />
  )
}

export default Spinner
