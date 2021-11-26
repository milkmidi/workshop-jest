import React from 'react';
import axios from 'axios';
import TodoForm from '@/components/TodoForm';
import TodoItem from '@/components/TodoItem';

type TodoType = {
  id: string;
  text: string;
  done: boolean;
};

const TodoListContainer: React.FC = () => {
  const [list, setList] = React.useState<TodoType[]>([]);

  React.useEffect(() => {
    axios.get('/api/todo').then(({ data }) => {
      // console.log(data);
      setList(data);
    });
  }, []);

  const atAddItem = (text: string) => {
    const item: TodoType = {
      id: new Date().getTime().toString(),
      text,
      done: false,
    };
    setList(list.concat(item));
  };

  const atToggleItem = (id: string) => {
    const newList: TodoType[] = list.map((item: TodoType) => {
      if (item.id === id) {
        return {
          id: item.id,
          text: item.text,
          done: !item.done,
        };
      }
      return item;
    });
    setList(newList);
  };
  return (
    <section data-name="TodoListContainer">
      <TodoForm onAddItem={atAddItem} />
      <ul className="todo-items">
        {list.map((item: TodoType) => (
          <TodoItem key={item.id} id={item.id} done={item.done} onToggleItem={atToggleItem}>
            {item.text}
          </TodoItem>
        ))}
      </ul>
    </section>
  );
};

export default TodoListContainer;
