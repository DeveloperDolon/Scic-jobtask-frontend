
import { useContext, useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { DragDropContext } from "react-beautiful-dnd";
import axios from "axios";
import { AuthContext } from "./Provider/AuthProvider";

function App() {

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [CompletedTodos, setCompletedTodos] = useState([]);
  const [ongoingTodos, setOngingTodos] = useState([]);
  const {mainUrl, user} = useContext(AuthContext);

  const handleAdd = (e) => {
    e.preventDefault();
    const timeID = Date.now();
    axios.post(`${mainUrl}/tasks`, {
      id: timeID,
      todo:todo,
      userEmail : user?.email
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))

    if (todo) {
      setTodos([...todos, { id: timeID, todo, isDone: false }]);
      setTodo("");
    }
  };

  const onDragEnd = (result) => {
    console.log(result);

    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = todos;
    let complete = CompletedTodos;
    let ongoing = ongoingTodos;
    // Source Logic
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else if (source.droppableId === "TodosOngoing") {
      add = ongoing[source.index];
      ongoing.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else if(destination.droppableId === "TodosOngoing") {
      ongoing.splice(destination.index, 0, add); 
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);
    setOngingTodos(ongoing)
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App pt-20">
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          CompletedTodos={CompletedTodos}
          setCompletedTodos={setCompletedTodos}
          setOngoingTodos={setOngingTodos}
          ongoingTodos={ongoingTodos}
        />
      </div>
    </DragDropContext>
  );
}

export default App;
