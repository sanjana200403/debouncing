import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [result, setResult] = useState([])
  const [query,setQuery] = useState("")
   const fetchData = ()=>{
    if(query.trim()==""){
      fetch("https://dummyjson.com/users")
      .then((res)=>res.json())
      .then((response)=>{
        console.log(response,"response")
        setResult(response.users)
      })
      return
    }
    fetch("https://dummyjson.com/users")
      .then((res)=>res.json())
      .then((response)=>{
        let updatedData = response.users.filter((user)=>`${user.firstName}${user.lastName}`.toLowerCase().includes(query.toLowerCase()))
        console.log("updatedData",updatedData)
        setResult(updatedData)
      })

   }
   useEffect(()=>{


    let timer= setTimeout(()=>{
      fetchData()
    },1000)
    return ()=> clearTimeout(timer)
   
   },[query])

  return (
    <> 
   <div className="input-container">

    <input type="text"
    value={query}
    onChange={(e)=>setQuery(e.target.value)}
    placeholder='enter for search'/>
    </div>
    <div className="table-container">
      <table className="user-table">
         <thead>
          <tr>
            <th>id</th>
            <th>firstName</th>
            <th>lastName</th>
            <th>email</th>

          </tr>
         </thead>
         <tbody>
          {
            result?.map((user)=>{
              return (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
             


            </tr>
              )
            })
          }
         </tbody>
      </table>
    </div>
  
     
    </>
  )
}

export default App
