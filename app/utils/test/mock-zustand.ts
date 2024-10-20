import { act } from "@testing-library/react";
import { vi } from "vitest";
import * as zustand from "zustand";

const storeResetFns = new Set<() => void>();

vi.mock(import("zustand"), async importOriginal => {
  const { create: actualCreate, createStore: actualCreateStore } =
    await importOriginal();

  const createUncurried = <T>(stateCreator: zustand.StateCreator<T>) => {
    const store = actualCreate(stateCreator);
    const initialState = store.getInitialState();
    storeResetFns.add(() => {
      store.setState(initialState, true);
    });
    return store;
  };

  const create = (<T>(stateCreator: zustand.StateCreator<T>) => {
    // to support curried version of create
    return typeof stateCreator === "function"
      ? createUncurried(stateCreator)
      : createUncurried;
  }) as typeof actualCreate;

  const createStoreUncurried = <T>(stateCreator: zustand.StateCreator<T>) => {
    const store = actualCreateStore(stateCreator);
    const initialState = store.getInitialState();
    storeResetFns.add(() => {
      store.setState(initialState, true);
    });
    return store;
  };

  const createStore = (<T>(stateCreator: zustand.StateCreator<T>) => {
    // to support curried version of createStore
    return typeof stateCreator === "function"
      ? createStoreUncurried(stateCreator)
      : createStoreUncurried;
  }) as typeof actualCreateStore;

  return { create, createStore };
});

// reset all stores after each test run
afterEach(() => {
  act(() => {
    storeResetFns.forEach(resetFn => {
      resetFn();
    });
  });
});
