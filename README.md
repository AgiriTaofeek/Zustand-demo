# React + TypeScript + Vite + Zustand Cart demo project

This project was to practice zustand which is a client side state management solution alternative to redux. It has a very simple API but for redux users, you can opt in to the patterns you are already used to i.e the slice pattern

This template provides a minimal setup to zustand

## CODE SAMPLE

```js
import { create } from "zustand";
import { useShallow } from "zustand/shallow";

const useStore = create((set) => ({
  count: 0, //Initial state
  inc: () => set((state) => ({ count: state.count + 1 })), //Action that set the
  dec: () => set((state) => ({ count: state.count - 1 })),
}));

function App() {
  //Ist approach to access the state/action but would cause so many re-rendering if we have many states
  const store = useStore();
  //2nd approach more performant
  const count = useStore((state) => state.count);

  //3rd approach the best usually when you want to get multiple state
  const { count, inc, dec } = useStore(
    useShallow((state) => ({
      count: state.count,
      inc: state.inc,
      dec: state.dec,
    }))
  );
  return (
    <>
      <Button onClick={inc}>+</Button>
      <Count />
      <Button onClick={dec}>-</Button>
    </>
  );
}

function Count() {
  const count = useStore((state) => state.count);
  return <h1>{count}</h1>;
}
```

[Watch the demo video](https://youtu.be/AYO4qHAnLQI?si=dusfEEK8vSyjqPl1)
