import React from 'react'
import '../Comp CSS/ToDo.css'
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react'
import { TaskList, TaskListElse } from './DisplayTasks';

const ToDo = () => {
     const [ToDo, setToDo] = useState("")

     const HandleText = (e) => {
          console.log(e);
          setToDo(e.target.value)

     }

     const [Tasks, setTasks] = useState([])
    

     useEffect(() => {
          let storage = localStorage.getItem("Tasks")
          if (storage) {
               let todos = JSON.parse(localStorage.getItem("Tasks"))
               setTasks(todos)
               console.log("added")
          }
     }, [])

     const addToLocal = () => {
          localStorage.setItem("Tasks", JSON.stringify(Tasks))
     }
     const HandleAdd = () => {

          // setTasks([...Tasks, { id: uuidv4(), ToDo, isCompleted: false }])
      
          setTasks(prevTasks => {
               const newItems = [...prevTasks, { id: uuidv4(), ToDo, isCompleted: false }];
               console.log(newItems); // Logs the new state
               localStorage.setItem("Tasks", JSON.stringify(newItems))

               return newItems;
             });
            
             console.log(Tasks)
             
          setToDo("")
          // addToLocal()
     }

    

    
     const HandleDelete = (e, id) => {

          let updatedTodo = Tasks.filter((val) => {
               return val.id !== id
          })

          setTasks(updatedTodo)
          localStorage.setItem("Tasks", JSON.stringify(updatedTodo))
     }

     const HandleEdit = (e, id) => {
          let editable = Tasks.filter((i) => {
               return i.id === id
          })
          setToDo(editable[0].ToDo)
          let update = Tasks.filter((i) => {
               return i.id !== id
          })
          setTasks(update)
          
          addToLocal()
     }

     

     const HandleCheckBox = (e) => {
          console.log(e);
          const Index = Tasks.findIndex(it => {
               return it.id === e.target.value
          })
          let allTasks = [...Tasks]
          allTasks[Index].isCompleted = !allTasks[Index].isCompleted
          setTasks(allTasks)
          console.log(Tasks)
          addToLocal()
     }

     console.log(Tasks)

     const [ShowFinished, setShowFinished] = useState(false)

     const HandleFinishedTasks = () => {
          setShowFinished(!ShowFinished)
     }

     console.log(Tasks)
     console.log("Updated...")

     return (
          <>

          
               <div className="container">
                    <div className="child">
                         <h1 className="heading">Write your Todo's</h1>
                         <div className="input-field">
                              <input type="text" name="" id="" value={ToDo} onChange={HandleText} className='input-text' />
                              <button disabled={ToDo.length <= 0} onClick={HandleAdd}>Add</button>
                         </div>
                         <div className="task-list">
                              <button className={ShowFinished ? "finishedtask" : ""} onClick={HandleFinishedTasks}>Show Finished</button>
                              {Tasks.length === 0 && <h3>List is Empty</h3>}

                              {ShowFinished
                                   ? Tasks.filter(item => {
                                        return item.isCompleted
                                   }).map(item => {
                                        return <TaskList key={item.id} onChange={HandleCheckBox} item={item} onDelete={(e) => { HandleDelete(e, item.id) }} />
                                   })
                                   : Tasks.map(item => {
                                        return <TaskListElse key={item.id} onChange={HandleCheckBox} item={item} onDelete={(e) => { HandleDelete(e, item.id) }} onEdit={(e) => { HandleEdit(e, item.id) }} />
                                   })
                              }
                         </div>
                    </div>
               </div>

          </>
     )
}

export default ToDo