import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Read() {
  const [data, setData] = useState([])
    const {id} = useParams();
    useEffect(()=>{
        axios.get('http://localhost:3000/tasks/'+id)
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    },[])
    const navigate = useNavigate();
  return (
    <>
     <div className='flex flex-col w-full h-screen justify-center items-center'>
      <div className='w-1/2 px-5 pt-3 pb-5 rounded shadow bg-white text-black justify-center'>
        <h1><strong>Details of tasks</strong></h1>
      <div className='mb-3'>
          <strong>ID:{data.id}</strong>
        </div>
         <div className='mb-3'>
           <strong>Title:{data.title}</strong>
         </div>
           <div className='mb-3'>
            <strong>Priority: <span className={`badge badge-sm badge-soft 
                                    ${data.priority ==="Urgente"
                                        ? "badge-error"
                                        : data.priority ==="Moyenne"
                                            ?"badge-warning"
                                            : "badge-success"
                                        }`}>
                                        {data.priority} 
                                    </span></strong>
          </div>
          <div className='mb-3'>
            <strong>Description:{data.description}</strong>
          </div>
          
         <Link to={`/update/${data.id}`} className='btn btn-neutral'>Edit</Link>
          <button
            type="button" 
            onClick={() => navigate('/')} 
            className="px-4 py-2 btn btn-info m-1 text-white text-sm rounded"
          >
            Back
          </button>
      </div>
     </div>
    </>
  )
}

export default Read