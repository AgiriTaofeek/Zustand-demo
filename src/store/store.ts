import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";
import { Store } from "@/types/store";
import { createUserSlice } from "@/store/user-slice";
import { createCartSlice } from "@/store/cart-slice";

export const useStore = create<Store>()(
  devtools(
    //After adding this devtool, we can use the redux browser extension with it
    persist(
      //This helps us store data to the localStorage and any other DB that persist data
      subscribeWithSelector(
        //The subscribeWithSelector middleware in Zustand is used to enhance the store's subscription capabilities. It allows you to subscribe to specific parts of the state, rather than the entire state, which can be more efficient and lead to better performance in your application. This is particularly useful when you want to trigger a re-render or perform an action only when a specific part of the state changes.

        immer((...a) => ({
          ...createUserSlice(...a),
          ...createCartSlice(...a),
        }))
      ),
      {
        name: "local-storage", //name for the key value in localStorage because by default zustand uses localStorage
      }
    )
  )
);
