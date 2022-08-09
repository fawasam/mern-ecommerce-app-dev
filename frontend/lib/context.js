import { createContext, useContext, useState } from "react";

const ShopContext = createContext();

export const StateContext = ({ children }) => {
  //Add our data for the state

  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [qty, setQty] = useState(1);

  const increaseQty = () => {
    setQty((prev) => prev + 1);
  };

  const decreaseQty = () => {
    setQty((prev) => {
      if (prev - 1 < 1) return 1;
      return prev - 1;
    });
  };

  const onAdd = (product, quantity) => {
    //totla price
    setTotalPrice((prev) => prev + product.price * quantity);
    //increase quantity
    setTotal((prev) => prev + quantity);
    //check product already exists in the cart
    const existItem = cartItems.find((item) => item.slug === product.slug);
    if (existItem) {
      setCartItems(
        cartItems.map((item) =>
          item.slug === product.slug
            ? { ...existItem, quantity: existItem.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: quantity }]);
    }
  };

  //remove product

  const onRemove = (product) => {
    //totla price
    setTotalPrice((prev) => prev - product.price);
    //decreaseQty quantity
    setTotal((prev) => prev - 1);
    const existItem = cartItems.find((item) => item.slug === product.slug);
    if (existItem.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.slug !== product.slug));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.slug === product.slug
            ? { ...existItem, quantity: existItem.quantity - 1 }
            : item
        )
      );
    }
  };
  return (
    <ShopContext.Provider
      value={{
        qty,
        increaseQty,
        decreaseQty,
        setShowCart,
        showCart,
        cartItems,
        onAdd,
        total,
        onRemove,
        totalPrice,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useStateContext = () => useContext(ShopContext);
