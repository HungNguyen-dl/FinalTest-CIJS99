import React, { useState } from 'react'
import './TodoApp.css'

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const handleAddTask = () => {
    if (inputValue.trim()) {
      setTasks([...tasks, { text: inputValue, active: true }]);
      setInputValue(''); 
    }
  };

  const handleToggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].active = !newTasks[index].active;
    setTasks(newTasks);
  };

  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const handleDeleteCompletedTasks = () => {
    const activeTasks = tasks.filter(task => task.active);
    setTasks(activeTasks);
  };

  const filteredTasks = tasks.filter(task => {
    if (activeTab === 'Active') return task.active;
    if (activeTab === 'Completed') return !task.active;
    return true;
  });

  return (
    <div className="todo-app">
      <h1>#todo</h1>

      <div className="tabs">
        <button onClick={() => setActiveTab('All')}>All</button>
        <button onClick={() => setActiveTab('Active')}>Active</button>
        <button onClick={() => setActiveTab('Completed')}>Completed</button>
      </div>

      {activeTab !== 'Completed' && (
        <div className="add-task">
          <input 
            className='form-control'
            type="text" 
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)} 
            placeholder="Add details"
          />
          <button className='btn btn-primary' onClick={handleAddTask}>Add</button>
        </div>
      )}

      <ul>
        {filteredTasks.map((task, index) => (
          <li key={index} style={{ textDecoration: task.active ? 'none' : 'line-through' }}>
            <input 
              className='form-check-input'
              type="checkbox" 
              checked={!task.active} 
              onChange={() => handleToggleTask(index)} 
            />
            {task.text}
            {!task.active && activeTab === 'Completed' && (
              <button className='btn btn-primary' onClick={() => handleDeleteTask(index)}>Delete</button>
            )}
          </li>
        ))}
      </ul>

      {activeTab === 'Completed' && tasks.some(task => !task.active) && (
        <button className='btn btn-danger' onClick={handleDeleteCompletedTasks}>Delete all</button>
      )}
    </div>
  )
}

export default TodoApp