import { Minus, Plus } from "lucide-react";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

import { Button } from "@/components/ui/button";
import { useStore } from "@/store/store";
// import { CartProduct } from "@/types/cart-product";

type Props = { productId: string };

export function ChangeQtyButtons({ productId }: Props) {
  const { getProductById, decQty, incQty, setTotal } = useStore(
    useShallow((state) => ({
      getProductById: state.getProductById,
      decQty: state.decQty,
      incQty: state.incQty,
      setTotal: state.setTotal,
    }))
  );

  const product = getProductById(productId);

  //This useEffect is for subscribing to specifically the products array state to perform an action only when it changes. In our example, we only want the total state to calculated when the products array state changes. This is a very critical optimization technique. It wouldn't make sense for the 'total' state to change when the address state changes for example. The pre-requisite for this is to add subscribeWithSelector in the store
  useEffect(() => {
    const unSub = useStore.subscribe(
      //We are subscribe to the products array state
      (state) => state.products,
      (products) => {
        //This function gets access to the products array state and then we can use it to calculate the total number of qty in each summed up
        setTotal(
          products.reduce((acc, item) => acc + item.price * item.qty, 0)
        );
      },
      { fireImmediately: true }
    );
    return unSub; //We return it here to unsubscribe to it when the component unmounts
  }, [setTotal]);

  return (
    <>
      {product && (
        <div className="flex gap-2 items-center">
          <Button onClick={() => decQty(product.id)} size="icon">
            <Minus />
          </Button>
          <p>{product.qty}</p>
          <Button onClick={() => incQty(product.id)} size="icon">
            <Plus />
          </Button>
        </div>
      )}
    </>
  );
}
