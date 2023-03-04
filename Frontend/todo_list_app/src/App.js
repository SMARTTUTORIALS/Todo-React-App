import './App.css';
import {
  MDBInputGroup,
  MDBBtn
} from 'mdb-react-ui-kit';

import { useEffect, useState } from 'react';

function App() {

  const [taskList, updateList] = useState([]);

  const initialize = async function () {
    console.log("called");
    //fetch the data from backend API and load to taskList
    const response = await fetch("http://localhost:5000/tasklist", { method: "GET" });
    updateList(await response.json());

    console.log(await response.json());
  }

  const addTask = async (e) => {
    e.preventDefault();

    const taskInput = document.getElementById('taskInput');
    const task_value = taskInput.value;


    //push the value to backend using API
    try {
      const body = { task_value };
      const response = await fetch("http://localhost:5000/addtask",
        {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });

      console.log(task_value);
      updateList([...taskList, task_value]);

    } catch (error) {
      alert(error.message);
      console.log(error.message)
    }
  }

  useEffect(() => {
    initialize();
  }, []);

  return (
    <div className="App" >
      <main className='container p-5'>
        <h1>To Do List App</h1>
        <form className='mt-5 mb-3' onSubmit={addTask}>

          <MDBInputGroup className='mb-3' >
            <MDBBtn color='light' rippleColor='dark' disabled>Enter the task:</MDBBtn>
            <input className='form-control' type='text' placeholder='Get groceries' id='taskInput' />
            <MDBBtn color='success'>Add Task</MDBBtn>
          </MDBInputGroup>

        </form>
        <div className='p-3 d-flex flex-column gap-2'>

          {taskList.map((taskItem) => <MDBBtn color='light' rippleColor='dark'>{taskItem}</MDBBtn>)}

        </div>
      </main>
    </div>
  );
}

export default App;
