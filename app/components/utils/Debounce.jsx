import { useEffect, useState } from "react";


export default function useDebounce(value,delay){
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(()=>{
    const handler = setTimeout(()=> setDebouncedValue(value), delay);
    return ()=> clearTimeout(handler); 
  },[value,delay]);

  return debouncedValue;
}




// Js Version

// function Debounce(fun, delay) {
//    let timerId;

//    return function(...args) {
//       setTimeout(timerId);
//       timerId = setTimeout(()=> fun.apply(this,args),delay);
//    }
// }


