import { useState, useEffect } from 'react'
import {Link, useParams} from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Update() {
 // const [data, setData] = useState([])
  const {id} = useParams();
   const [values,setValues] = useState({
    title:'',
    priority:'',
    description:''
  })
      useEffect(()=>{
        axios.get('http://localhost:3000/tasks/'+id)
        .then(res => setValues(res.data))
        .catch(err => console.log(err));
    },[])
       const handleUpdate = (event) =>{
        event.preventDefault();
            axios.put('http://localhost:3000/tasks/'+id, values)
          .then(res =>{
            console.log(res);
            navigate('/')
          })
      .catch(err => console.log(err));
       }
       const navigate = useNavigate();
  return (
    <>
    <div className="flex flex-col justify-center items-center h-screen"> 
      <div className="w-1/2 px-5 pt-3 pb-5 rounded shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
        <h1 className="text-xl font-semibold mb-4">Update Tasks</h1>
        <form onSubmit={handleUpdate}>
          
         
          <div className="mb-3">
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title:
            </label>
            <input
              type="text"
              name="title"
              value={values.title}
              onChange={e=>{setValues({...values,title:e.target.value})}}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          
          <div className="mb-3">
            <label htmlFor="priority" className="block text-sm font-medium mb-1">
              Priority:
            </label>
            <select
              id="priority"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={values.priority}
              onChange={e=>{ setValues({...values,priority:e.target.value})}}
            >
              <option value="Urgente">Urgente</option>
              <option value="Moyenne">Moyenne</option>
              <option value="Basse">Basse</option>
            </select>
          </div>

        
          <div className="mb-3">
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Description:
            </label>
            <input
              className='w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
              type="text"
              name="description"
              value={values.description}
              onChange={e=>{setValues({...values,title:e.target.value})}}
            />
          </div>

      
          <button
            type='submit'
            className="px-4 py-2 btn btn-success text-white text-sm rounded m-1"
          >
            Update task
          </button>
          <button
            type="button" 
            onClick={() => navigate('/')} 
            className="px-4 py-2 btn btn-info m-1 text-white text-sm rounded"
          >
            Back
          </button>
        </form>
      </div>
    </div>
    </>
  )
}

export default Update