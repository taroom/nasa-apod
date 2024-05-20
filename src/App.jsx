import {useState, useEffect} from "react"
import Footer from "./components/Footer"
import Main from "./components/Main"
import SideBar from "./components/SideBar"

function App() {
  const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
  const [data,setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const today = (new Date()).toDateString()
  const localKey = `NASA-${today}`

  useEffect(() => {
    async function fetchAPIData() {
      const url = `https://api.nasa.gov/planetary/apod`+`?api_key=${NASA_KEY}`

      if(localStorage.getItem(localKey)){
        const apiData = JSON.parse(localStorage.getItem(localKey))
        setData(apiData)
        console.log(`Fetch dari cache`);
        return
      }
    
      localStorage.clear()
      
      try {
        const res = await fetch(url)
        const apiData = await res.json()
        localStorage.setItem(localKey, JSON.stringify(apiData))
        console.log(`Fetch Dari API`);
        setData(apiData)
        console.log('Data\n', apiData);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchAPIData()
  }, [])
  

  function  handleToggleModal() {
    setShowModal(!showModal)
  }
  return (
    <>
      {data ? (<Main data={data} />) : (
        <div className="loadingState">
          <i className="fa-solid fa-gear"></i>
        </div>
      )}
      {showModal && (<SideBar data={data} handleToggleModal={handleToggleModal} />)}
      {data && (
        <Footer data={data} handleToggleModal={handleToggleModal} />
      )}
    </>
  )
}

export default App
