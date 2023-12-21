import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";

const TodoList = ({
    todos,
    setTodos,
    CompletedTodos,
    setCompletedTodos,
  }) => {

    console.log(todos);

    return (
      <div className="container">
        <Droppable droppableId="TodosList">
          {(provided, snapshot) => (
            <div
              className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <span className="todos__heading">Active Tasks</span>
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
        <Droppable droppableId="TodosRemove">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`todos  ${
                snapshot.isDraggingOver ? "dragcomplete" : "remove"
              }`}
            >
              <span className="todos__heading">Completed Tasks</span>
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