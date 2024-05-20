export default function Footer(props) {
    const {showModal, handleToggleModal, data} = props
  return (
    <footer>
        <div className='bgGradient'></div>
        <h1>APOD PROJECT</h1>
        <h2>{data?.title}</h2>
        <button onClick={() => {
            handleToggleModal(showModal)
        }}><i className='fa-solid fa-circle-info'></i></button>
    </footer>
  )
}
