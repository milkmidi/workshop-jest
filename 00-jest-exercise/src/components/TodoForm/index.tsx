import React, { useState } from 'react';

type TodoFormProps = {
  onAddItem: (text: string) => void;
};

const TodoForm: React.FC<TodoFormProps> = (props) => {
  const { onAddItem } = props;
  const [input, setInput] = useState('');

  const atSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (input === '') {
      return;
    }
    setInput('');
    onAddItem(input);
  };

  return (
    <section className="style-1" data-name="TodoForm.js">
      <form className="todo-form" onSubmit={atSubmit} data-testid="form">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} data-testid="input" />
      </form>
    </section>
  );
};

export default TodoForm;
