import axios from 'axios'
import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import LogoutForm from './header'
function Home() {
    const [data, setData] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:3000/tasks')
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    },[])
    const handleDelete = (id)=>{
    const confirm = window.confirm("would you like to delete?");
    if(confirm){
        axios.delete('http://localhost:3000/tasks/'+id)
        .then(
            res=>{location.reload()}
        ).catch(err => console.log(err));
    };
  }
  return (
    <>
        <LogoutForm/>
        <div className='flex flex-col justify-center items-center h-screen'>
            <h1>List of tasks</h1>
            <div className='w-3/4 rounded  shadow p-6 bg-base-300'>
            <div className='w-3/4 rounded bg-base-300  shadow p-4'>
                <Link to='/create' className='btn btn-info'>Add +</Link>
            </div>
                <table className='table table-'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Priority</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((task,i)=>(
                                <tr key={i}>
                                    <td>{task.id}</td>
                                    <td>{task.title}</td>
                                    <td>
                                        <span className={`badge badge-sm badge-soft 
                                    ${task.priority ==="Urgente"
                                        ? "badge-error"
                                        : task.priority ==="Moyenne"
                                            ?"badge-warning"
                                            : "badge-success"
                                        }`}>
                                        {task.priority} 
                                    </span>
                                    </td>
                                    <td>{task.description}</td>
                                    <td>
                                        <div className="flex gap-2">
                                            <Link to={`/read/${task.id}`} className='btn btn-neutral'>Read</Link>
                                            <Link to={`/update/${task.id}`} className='btn btn-neutral'>Edit</Link>
                                            <button onClick={e =>handleDelete(task.id)} className="btn btn-error">Delete</button>
                                        </div>

                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </>
  )

}

export default Home