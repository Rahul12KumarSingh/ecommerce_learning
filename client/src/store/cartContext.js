import { createContext, useEffect, useState } from "react"

export const cartContext = createContext({
      totalPrice: 0,
      discountedPrice: 0,
      cartItem: [],
      addtoCart: () => { },
      removefromCart: () => { }
});


function CartContextProvider({ children }) {
      const [cartItem, setCartItem] = useState([]);
      const [totalPrice, setTotalPrice] = useState(0);
      const [discountedPrice, setDiscountedPrice] = useState(0);

      useEffect(() => {
            const fetchCartDataFromLocalStorage = () => {
                  const storedCart = localStorage.getItem("cart");

                  if (storedCart) {
                        const parsedCart = JSON.parse(storedCart);

                        setCartItem(parsedCart?.cartItem || []);
                        setTotalPrice(parsedCart?.totalPrice || 0);
                        setDiscountedPrice(parsedCart?.discountedPrice || 0);
                  }
                  else {
                        setCartItem([]);
                        setTotalPrice(0);
                        setDiscountedPrice(0);
                  }
            };

            fetchCartDataFromLocalStorage();
      }, []);


      const addtoCart = async (newItem) => {
            setTotalPrice((prev) => prev + newItem.price);

            //giving the 10% discount on the item price....
            setDiscountedPrice((prev) => prev + (newItem.price * 0.9));

            //Check if the item already exists in the cart..
            setCartItem((prev) => [...prev, newItem]);

            //Save the updated cart to local storage..
            localStorage.setItem("cart", JSON.stringify({
                  cartItem: [...cartItem, newItem],
                  totalPrice: totalPrice + newItem.price,
                  discountedPrice: discountedPrice + (newItem.price * 0.9)
            }));
      }

      const removefromCart = (index) => {
            const removedItem = cartItem[index];

           
            const updatedCart = [...cartItem];
            updatedCart.splice(index, 1);

          
            const updatedTotal = totalPrice - removedItem.price;
            const updatedDiscounted = discountedPrice - (removedItem.price * 0.9);

            setCartItem(updatedCart);
            setTotalPrice(updatedTotal);
            setDiscountedPrice(updatedDiscounted);

            localStorage.setItem("cart", JSON.stringify({
                  cartItem: updatedCart,
                  totalPrice: updatedTotal,
                  discountedPrice: updatedDiscounted
            }));
      }

      const value = {
            totalPrice,
            discountedPrice,
            cartItem,
            addtoCart,
            removefromCart,
      }

      return (
            <cartContext.Provider value={value}>
                  {children}
            </cartContext.Provider>
      );
};


export default CartContextProvider;
