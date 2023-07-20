import { create } from 'zustand';
import { uuid } from 'uuidv4';

interface ITask {
    id: string;
    task: string;
    state: boolean;
}
interface ITodoState {
    tasks: ITask[],
    addTask: (task: ITask) => void,
    updateTask: (task: ITask) => void,
    deleteTask: (task: ITask) => void,
    changeTaskState: (task: ITask) => void,
}

const TodoState = create<ITodoState>()((set) => ({
    tasks: [],
    addTask: (tempTask) => set((state) => { 
        const id = uuid()
        tempTask.id = id; 
        const tasks = [...state.tasks, tempTask]
        return { tasks }
    }),
    updateTask: (tempTask) => set((state) => { 
        const tasks = state.tasks.map((task) => {
            if (task.id === tempTask.id) {
                task.task = tempTask.task
                task.state = tempTask.state
            }

            return task
        })
        return { tasks }
    }),
    deleteTask: (tempTask) => set((state) => { return { tasks: state.tasks.filter((task) => task.id !== tempTask.id)}}),
    changeTaskState: (tempTask) => set((state) => { 
        const tasks = state.tasks.map((task) => {
            if (task.id === tempTask.id) {
                task.state = !task.state
            }
            return task
        })
        return { tasks }
    })
}))

export default TodoState;
