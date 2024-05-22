
import React, { createContext, useState } from 'react';

// contexto global
const SuccessContext = createContext()

const SuccessProvider= ({ children }) => {
  const [loadSuccess, setLoadSuccess] = useState(false)
  
  return(
    <SuccessContext.Provider value={{ loadSuccess, setLoadSuccess }}>
      {children}
    </SuccessContext.Provider>
  )
}

export { SuccessContext, SuccessProvider }