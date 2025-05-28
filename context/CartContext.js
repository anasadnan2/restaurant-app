// src/context/CartContext.js
import React, { createContext, useState, useReducer } from "react";

export const CartContext = createContext({
  items: [],
  addItemToCart: (item) => {},
  updateItemQuantity: (itemId, quantity) => {},
  removeItemFromCart: (itemId) => {},
  clearCart: () => {},
  getCartTotal: () => 0,
});

// Reducer function to manage cart state
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      const existingItem = state.items[existingItemIndex];
      let updatedItems;
      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + (action.payload.quantity || 1),
        };
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
      }
      return { ...state, items: updatedItems };

    case "UPDATE_QUANTITY":
      const itemToUpdateIndex = state.items.findIndex(
        (item) => item.id === action.payload.itemId
      );
      const itemToUpdate = state.items[itemToUpdateIndex];
      if (action.payload.quantity <= 0) {
        // Remove if quantity is 0 or less
        updatedItems = state.items.filter(
          (item) => item.id !== action.payload.itemId
        );
      } else {
        const updatedSingleItem = {
          ...itemToUpdate,
          quantity: action.payload.quantity,
        };
        updatedItems = [...state.items];
        updatedItems[itemToUpdateIndex] = updatedSingleItem;
      }
      return { ...state, items: updatedItems };

    case "REMOVE_ITEM":
      updatedItems = state.items.filter(
        (item) => item.id !== action.payload.itemId
      );
      return { ...state, items: updatedItems };

    case "CLEAR_CART":
      return { ...state, items: [] };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, {
    items: [],
  });

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD_ITEM", payload: item });
  };

  const updateItemQuantityHandler = (itemId, quantity) => {
    dispatchCartAction({
      type: "UPDATE_QUANTITY",
      payload: { itemId, quantity },
    });
  };

  const removeItemFromCartHandler = (itemId) => {
    dispatchCartAction({ type: "REMOVE_ITEM", payload: { itemId } });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR_CART" });
  };

  const getCartTotalHandler = () => {
    return cartState.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const contextValue = {
    items: cartState.items,
    addItemToCart: addItemToCartHandler,
    updateItemQuantity: updateItemQuantityHandler,
    removeItemFromCart: removeItemFromCartHandler,
    clearCart: clearCartHandler,
    getCartTotal: getCartTotalHandler,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
