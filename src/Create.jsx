import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Create() {
  const [priority, setPriority] = useState("Moyenne")
  const [values,setValues] = useState({
    title:'',
    priority:priority,
    description:''
  })

  const navigate = useNavigate();

  const handleSubmit =(event) =>{
    if (!values.title.trim() || !values.description.trim()) {
    alert("Le titre et la description sont obligatoires !");
    return; 
  }
    event.preventDefault(); 
    axios.post('http://localhost:3000/tasks', values)
    .then(res =>{
      console.log(res);
      navigate('/')
    })
    .catch(err => console.log(err));
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen"> 
      <div className="w-1/2 px-5 pt-3 pb-5 rounded shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
        <h1 className="text-xl font-semibold mb-4">Add Tasks</h1>
        <form onSubmit={handleSubmit}>
          
         
          <div className="mb-3">
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title:
            </label>
            <input
              type="text"
              name="title"
              onChange={e=>{setValues({...values,title:e.target.value})}}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          
          <div className="mb-3">
            <label htmlFor="priority" className="block text-sm font-medium mb-1">
              Priority:
            </label>
            <select
              value={priority}
              id="priority"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={e=>{
                setPriority(e.target.value); 
                setValues({...values,priority:e.target.value}); 
              }}
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
              type="text"
              name="description"
              onChange={e=>{setValues({...values,description:e.target.value})}}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

      
          <button
            type="submit"
            className="px-4 py-2 btn btn-success text-white text-sm rounded m-1"
          >
            Create Task
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
  )
}

export default Create
