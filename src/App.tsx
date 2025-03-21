import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addTodo, toggleTodo, removeTodo } from "@/store/todoSlice";

export default function TodoApp() {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("Work");
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos.items);

  const handleAddTodo = () => {
    if (text.trim()) {
      dispatch(addTodo({ text, category }));
      setText("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>
      <div className="flex gap-2 mb-4">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new todo..."
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Shopping">Shopping</option>
        </select>
        <Button onClick={handleAddTodo}>Add</Button>
      </div>
      <div className="space-y-4">
        {todos.map((todo) => (
          <Card key={todo.id} className="flex items-center p-4 justify-between">
            <div className="flex items-center gap-4">
              <Switch
                checked={todo.completed}
                onCheckedChange={() => dispatch(toggleTodo(todo.id))}
              />
              <CardContent
                className={todo.completed ? "line-through text-gray-500" : ""}
              >
                {todo.text} ({todo.category})
              </CardContent>
            </div>
            <Button
              variant="destructive"
              onClick={() => dispatch(removeTodo(todo.id))}
            >
              Remove
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
