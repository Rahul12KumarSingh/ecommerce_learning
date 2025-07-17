import { createContext, useEffect, useState } from "react"

export const cartContext = createContext({
      totalPrice: 0,
      cartItem: [],
      addtoCart: () => { },
      removefromCart: () => { } ,
      emptyCart: () => { }
});


function CartContextProvider({ children }){
      
      const [cartItem, setCartItem] = useState([]);
      const [totalPrice, setTotalPrice] = useState(0);

      useEffect(() => {
            const fetchCartDataFromLocalStorage = () => {
                  const storedCart = localStorage.getItem("cart");

                  if (storedCart) {
                        const parsedCart = JSON.parse(storedCart);

                        setCartItem(parsedCart?.cartItem || []);
                        setTotalPrice(parsedCart?.totalPrice || 0);
                  }
                  else {
                        setCartItem([]);
                        setTotalPrice(0);
                  }
            };

            fetchCartDataFromLocalStorage();
      }, []);


      const addtoCart = async (newItem) => {
            setTotalPrice((prev) => prev + newItem.price);

            //Check if the item already exists in the cart..
            setCartItem((prev) => [...prev, newItem]);

            //Save the updated cart to local storage..
            localStorage.setItem("cart", JSON.stringify({
                  cartItem: [...cartItem, newItem],
                  totalPrice: totalPrice + newItem.price,
            }));
      }

      const removefromCart = (index) => {
            const removedItem = cartItem[index];

           
            const updatedCart = [...cartItem];
            updatedCart.splice(index, 1);

          
            const updatedTotal = totalPrice - removedItem.price;
           
            setCartItem(updatedCart);
            setTotalPrice(updatedTotal);
           
            localStorage.setItem("cart", JSON.stringify({
                  cartItem: updatedCart,
                  totalPrice: updatedTotal,
            }));
      }

      const emptyCart = () => {
            setCartItem([]);
            setTotalPrice(0);

            localStorage.removeItem("cart");
      }

      const value = {
            totalPrice,
            cartItem,
            addtoCart,
            removefromCart,
            emptyCart
      }

      return (
            <cartContext.Provider value={value}>
                  {children}
            </cartContext.Provider>
      );
};


export default CartContextProvider;
