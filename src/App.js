import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleForm = event =>{
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = {name, email}

    fetch('http://localhost:5000/users',{
      method: 'POST',
      headers: {
        'content-type' : 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      const newUsers = [...users, data];
      setUsers(newUsers);
    })
    .catch(err => console.error(err));

    event.target.reset();
    console.log(user)
  }

  return (
    <div className="App">
      <form onSubmit={handleForm}>
        <input style={{marginTop: '20px'}} type="text" name='name' placeholder='name' /><br />
        <input type="email" name='email' placeholder='email' /><br />
        <button type='submit'>Submit</button>

      </form>
      <h2>users:  {users.length}</h2>
      {
        users.map(user => <p key={user.id}> {user.name}: {user.email}</p>)
      }
    </div>
  );
}



export default App;
