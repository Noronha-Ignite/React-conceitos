import { FormEvent, useState } from 'react';

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function checkIfIdExists(id: number): boolean {
    return tasks.some(task => task.id === id);
  }

  function generateId() {
    let randomId = Math.round(Math.random() * 10000);

    while (checkIfIdExists(randomId)) {
      randomId = Math.round(Math.random() * 10000);
    }

    return randomId;
  }

  function handleCreateNewTask(event: FormEvent) {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    
    event.preventDefault();

    if (!newTaskTitle.trim()) return;

    let randomId = generateId();

    setTasks(previewTasks => [...previewTasks, { 
      id: randomId, 
      isComplete: false, 
      title: newTaskTitle 
    }]);
    setNewTaskTitle('');
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    setTasks(tasks => {
      return tasks.map(task => {
        if (task.id !== id) return task;

        return { ...task, isComplete: !task.isComplete };
      });
    });
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    
    setTasks(tasks => {
      return tasks.filter(task => task.id !== id);
    });
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <form className="input-group" onSubmit={handleCreateNewTask}>
          <input 
            type="text" 
            placeholder="Adicionar novo todo"
            required
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button">
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </form>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}