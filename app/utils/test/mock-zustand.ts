import { act } from "@testing-library/react";
import * as zustand from "zustand";

let storeResetFns: Set<() => void>;

export const mockZustand: () => void = () => {
  vi.mock(import("zustand"), async importOriginal => {
    const { create: actualCreate, createStore: actualCreateStore } =
      await importOriginal();

    // a variable to hold reset functions for all stores declared in the app
    storeResetFns = new Set<() => void>();

    const createUncurried = <T>(stateCreator: zustand.StateCreator<T>) => {
      const store = actualCreate(stateCreator);
      const initialState = store.getInitialState();
      storeResetFns.add(() => {
        store.setState(initialState, true);
      });
      return store;
    };

    // when creating a store, we get its initial state, create a reset function and add it in the set
    const create = (<T>(stateCreator: zustand.StateCreator<T>) => {
      console.log("zustand create mock");

      // to support curried version of create
      return typeof stateCreator === "function"
        ? createUncurried(stateCreator)
        : createUncurried;
    }) as typeof zustand.create;

    const createStoreUncurried = <T>(stateCreator: zustand.StateCreator<T>) => {
      const store = actualCreateStore(stateCreator);
      const initialState = store.getInitialState();
      storeResetFns.add(() => {
        store.setState(initialState, true);
      });
      return store;
    };

    // when creating a store, we get its initial state, create a reset function and add it in the set
    const createStore = (<T>(stateCreator: zustand.StateCreator<T>) => {
      console.log("zustand createStore mock");

      // to support curried version of createStore
      return typeof stateCreator === "function"
        ? createStoreUncurried(stateCreator)
        : createStoreUncurried;
    }) as typeof zustand.createStore;

    return { useTranslation: mockedUseTranslation };
  });
};

// reset all stores after each test run
afterEach(() => {
  act(() => {
    storeResetFns.forEach(resetFn => {
      resetFn();
    });
  });
});
