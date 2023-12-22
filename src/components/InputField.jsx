import "./style.css";
import { useRef } from "react";

const InputField = ({ todo, setTodo, handleAdd }) => {
  const inputRef = useRef();

  return (
    <form
      className="inputd"
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <input
        type="text"
        placeholder="Enter a Task"
        value={todo}
        ref={inputRef}
        onChange={(e) => setTodo(e.target.value)}
        className="input__box"
      />
      <button type="submit" className="input_submit">
        GO
      </button>
    </form>
  );
};

export default InputField;
