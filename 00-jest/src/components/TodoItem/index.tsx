/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
type TodoItemProps = {
  id?: string;
  done?: boolean;
  onToggleItem?: (id: string) => void;
};

const TodoItem: React.FC<TodoItemProps> = (props) => {
  const { id, done = false, onToggleItem, children } = props;
  const onClick = () => {
    if (id && onToggleItem) {
      onToggleItem(id);
    }
  };
  let className = 'todo-item';
  if (done) {
    className += ' done';
  }
  return (
    <section data-name="TodoItem.js" className="style-2">
      <li className={className} onClick={onClick} data-testid="li">
        {children}
      </li>
    </section>
  );
};

export default TodoItem;
