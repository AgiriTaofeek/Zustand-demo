import { StateCreator } from "zustand";
import { CartSlice } from "./cart-slice";

type UserState = {
  userName: string;
  fullName: string;
  age: number;
  address: string;
};
type UserActions = {
  setAddress: (address: string) => void;
  fetchUser: () => Promise<void>;
};

export type UserSlice = UserState & UserActions;

//StateCreator is typescript specific
export const createUserSlice: StateCreator<
  UserSlice & CartSlice,
  [["zustand/immer", never]],
  [],
  UserSlice
> = (set) => ({
  userName: "",
  fullName: "",
  age: 0,
  address: "",
  setAddress: (address) =>
    set((state) => {
      state.address = address;
    }),
  fetchUser: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set({
      address: "",
      fullName: "Joh Doe",
      userName: "JohDoe@test.com",
      age: 32,
    });
  },
  // setAddress: (address) => set(() => ({ address })), We won't use this approach also because we are using immer package to mutate the state object directly
  //   setAddress: (address) => set((state) => ({ ...state, address })), It should have been like this but Zustand merges the prevState object with the newState here automatically
});
