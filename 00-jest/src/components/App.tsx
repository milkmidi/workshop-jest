import UseCountDownExample from '@/components/UseCountDownExample';
import TodoListContainer from '@/containers/TodoListContainer';

const App: React.FC = () => {
  return (
    <div className="app container py-5">
      <TodoListContainer />
      <UseCountDownExample />
    </div>
  );
};

export default App;
