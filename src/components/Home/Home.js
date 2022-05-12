import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [users, setUsers] = useState([]);
    useEffect(() =>{
        fetch('http://localhost:5000/users')
        .then(res => res.json())
        .then(data => setUsers(data))
    },[])

    const handelUserDelete = id =>{
        const proceed = window.confirm('Are you sure you want to delete')
        if(proceed){
            console.log('delete user by id' ,id);
            const url = `http://localhost:5000/user/${id}`;
            fetch(url,{
                method:'DELETE'
            })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0){
                    console.log('deleted');
                    const remaining = users.filter(user => user._id !== id);
                    setUsers(remaining);
                }
            })
        }
    }

    return (
        <div>
            <h2>Home</h2>
            <p>users Available:{ users.length }</p>
            {
                users.map(user => <li 
                key={user._id}>
                    {user.name}
                    <Link to={`/user/update/${user._id}`}><button>Update</button></Link>
                    <button onClick={() => {handelUserDelete(user._id)}}>x</button>
                </li>)
            }
        </div>
    );
};

export default Home;