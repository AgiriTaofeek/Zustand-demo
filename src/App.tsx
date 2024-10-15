import { Cart } from "./components/Cart";
import { ChangeQtyButtons } from "./components/ChangeQtyButtons";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "./components/ui/card";
import { User } from "./components/User";
import { PRODUCTS_DATA } from "./lib/mockData";
import { useStore } from "./store/store";

function App() {
  const addProduct = useStore((state) => state.addProduct);
  const cartProducts = useStore((state) => state.products);

  return (
    <main className="space-y-2 xdark h-screen bg-background max-w-sm mx-auto mt-2">
      <div className="flex justify-between">
        <User />
        <Cart />
      </div>
      <h1 className="text-2xl">Products:</h1>
      <div className="space-y-2">
        {PRODUCTS_DATA.map((product) => (
          <Card key={product.id}>
            <CardHeader>{product.title}</CardHeader>
            <CardContent>{product.price}$</CardContent>
            <CardFooter>
              {cartProducts.find((item) => item.id === product.id) ? (
                <ChangeQtyButtons productId={product.id} />
              ) : (
                <Button onClick={() => addProduct(product)} variant="default">
                  Add to Cart
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}

// import { create } from "zustand";
// import { Button } from "./components/ui/button";

// import { useShallow } from "zustand/shallow";
// import { useStore } from "./store/store";

// function App() {
//This approach to subscribing to the store is very non-performant as it causes this component to re-render even when a state that we are not using in this component changes
// const store = useStore();

//Better approach to get the specific state that is needed in this component but if i have multiple, the last approach is the best

// const address = useStore((state) => state.address);

// const { address, userName } = useStore(
//   useShallow((state) => ({
//     address: state.address,
//     userName: state.userName,
//   }))
// );
//   return <></>;
// }

// type StateAndAction = {
//   count: number;
//   inc: () => void;
//   dec: () => void;
// };
//STEPS TO USING ZUSTAND
//(1) Create the Zustand store with the create function from zustand and it accepts a callback function which is passed a setter function as parameter and it returns an object with the initial state and actions to set the state. Zustand works on the same principle of immutability also hence the setter function must always return a new object. We must also name the store with the prefix use because we directly call this create function in whatever component we want to use the state.
// const useStore = create<StateAndAction>((set) => ({
//   count: 0, //Initial state
//   inc: () => set((state) => ({ count: state.count + 1 })), //Action that set the
//   dec: () => set((state) => ({ count: state.count - 1 })),
// }));

// function App() {
//   const store = useStore();
//   console.log("rendered");
//   return (
//     <>
//       <Button onClick={store.inc}>+</Button>
//       <Count />
//       <Button onClick={store.dec}>-</Button>
//     </>
//   );
// }

// function Count() {
//   const store = useStore();
//   return <h1>{store.count}</h1>;
// }
export default App;
