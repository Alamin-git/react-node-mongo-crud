import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UpdateUser = () => {
    const {id} = useParams();
    const [user, setUser] = useState({});
    useEffect(() => {
        const url = `http://localhost:5000/user/${id}`;
        fetch(url)
        .then(res => res.json())
        .then(data => setUser(data))
    },[])

    const handelUpdateUser = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const updatedUser = { name, email };
        console.log(name, email);
    
        // send data to server
        const url = `http://localhost:5000/user/${id}`;
        fetch(url, {
            // method GET hole kichu deya lage na. new hole POST , r PUT dile jodi thake tahole update kore na thakle add kore .
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("success", data);
            alert('user updated successfully');
            e.target.reset();
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      };

    return (
        <div>
            <h2>Update user:{user.name} id:{id}</h2>
            <form onSubmit={handelUpdateUser}>
        <input type="text" name="name" placeholder="Name" required />
        <br />
        <input type="email" name="email" placeholder="Email" required />
        <br />
        <input type="submit" value="Update User" />
      </form>
        </div>
    );
};

export default UpdateUser;