import {createContext , useEffect} from "react"

export const productContext = createContext({
       cartItem : [] ,
       addtoCart : ()=>{} ,
       removefromCart : ()=>{} 
})

function productContextProvider({children}){
        const[cartItem , setCartItem] = useState([]) ;

        const addtoCart = async(newItem)=>{
             setCartItem([...prev , newItem ]);
        }

        const removefromCart = ()=>{
             
        }

        const value = {
              cartItem ,
              addtoCart ,
              removefromCart ,
        }

        return (
              <authContext.Provider>
                  {children}
              </authContext.Provider>
        ) ;
        
};

