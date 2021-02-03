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
