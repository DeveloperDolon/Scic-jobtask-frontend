import { useContext, useEffect } from "react";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";
import axios from "axios";
import { AuthContext } from "../Provider/AuthProvider";

const TodoList = ({
    todos,
    setTodos,
    setOngoingTodos,
    CompletedTodos,
    setCompletedTodos,
    ongoingTodos
  }) => {
    const {mainUrl, user} = useContext(AuthContext);

    useEffect(() => {
      axios.get(`${mainUrl}/tasks?email=${user?.email}`, {withCredentials: true})
      .then(res => {
        setTodos(res.data);
      }).catch(err => console.log(err.message));
    }, []);

    return (
      <div className=" containerd grid md:grid-cols-3 grid-cols-1">
        <Droppable droppableId="TodosList">
          {(provided, snapshot) => (
            <div
              className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <span className="todos__heading w-full">TO-DO</span>
              {todos?.map((todo, index) => (
                <SingleTodo
                  index={index}
                  todos={todos}
                  todo={todo}
                  key={index}
                  setTodos={setTodos}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="TodosOngoing">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`todos  ${
                snapshot.isDraggingOver ? "dragongoing" : "remove"
              }`}
            >
              <span className="todos__heading">Ongoing</span>
              {ongoingTodos?.map((todo, index) => (
                <SingleTodo
                  index={index}
                  todos={ongoingTodos}
                  todo={todo}
                  key={index}
                  setTodos={setOngoingTodos}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        
        <Droppable droppableId="TodosComplete">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`todos  ${
                snapshot.isDraggingOver ? "dragcomplete" : "remove2"
              }`}
            >
              <span className="todos__heading bg-green-500">Completed</span>
              {CompletedTodos?.map((todo, index) => (
                <SingleTodo
                  index={index}
                  todos={CompletedTodos}
                  todo={todo}
                  key={index}
                  setTodos={setCompletedTodos}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  };
  
  export default TodoList;