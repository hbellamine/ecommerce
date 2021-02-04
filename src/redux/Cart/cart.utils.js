export const existingCartItem = ({ prevCartItems, nextCartItem }) => {
  //check if the product added is already in the cart
  return prevCartItems.find(
    (cartItem) => cartItem.documentID === nextCartItem.documentID
  );
};

export const handleAddToCart = ({ prevCartItems, nextCartItem }) => {
  const quantityIncrement = 1;
  const cartItemExists = existingCartItem({ prevCartItems, nextCartItem }); //will return a true or false

  if (cartItemExists) {
    return prevCartItems.map((cartItem) =>
      cartItem.documentID == nextCartItem.documentID
        ? {
            ...cartItem,
            quantity: cartItem.quantity + quantityIncrement,
          }
        : cartItem
    );
  }
  return [
    ...prevCartItems,
    {
      ...nextCartItem,
      quantity: quantityIncrement,
    },
  ];
};

export const handleRemoveCartItem = ({ prevCartItems, cartItemToRemove }) => {
  return prevCartItems.filter(
    (item) => item.documentID !== cartItemToRemove.documentID
  );
};

export const handleReduceCartItem = ({ prevCartItems, cartItemToReduce }) => {
  const existingCartItem = prevCartItems.find(
    (cartItem) => cartItem.documentID === cartItemToReduce.documentID
  );

  // if there is only product and the user wants to reduce the quantity we need to remove the product from the cart
  if (existingCartItem.quantity === 1) {
    return prevCartItems.filter(
      (cartItem) => cartItem.documentID !== existingCartItem.documentID
    );
  }

  return prevCartItems.map((cartItem) =>
    cartItem.documentID === existingCartItem.documentID
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};
