import React from 'react'
import { FaTrashAlt } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import '../Comp CSS/DisplayTasks.css'
import { useState, useEffect } from 'react';

export function TaskList({ onChange, item, onDelete }) {



     return (
          <div className="list">
               <div className="only-task">
                    <input value={item.id} onChange={onChange} type="checkbox" checked/>
                    <p>{item.ToDo}</p>
               </div>
               <div className="only-button">
                    <button className="trash" onClick={onDelete}><FaTrashAlt /></button>
               </div>
          </div>

     )
}

export function TaskListElse({ onChange, item, onDelete, onEdit }) {
     const [Visible, setVisible] = useState(true)

     console.log({ onChange, item, onDelete, onEdit });


     useEffect(() => {
          console.log("UseEffect1");
          if (item.isCompleted) {
               console.log("UseEffect if condition");
               setTimeout(() => {
                    setVisible(false)
               }, 500);
          }
     }, [item.isCompleted])

     return (

          
          Visible && <div className="list">
               {console.log("Return", { onChange, item, onDelete, onEdit })}
               <div className="only-task">
                    <input type="checkbox" value={item.id} onChange={onChange} />
                    <p className={item.isCompleted ? "strike" : ""} >{item.ToDo}</p>
               </div>
               <div className="only-button">
                    <button className="trash" onClick={onDelete}><FaTrashAlt /></button>
                    <button className="trash" onClick={onEdit}><MdModeEditOutline /></button>
               </div>
          </div>

     )

}