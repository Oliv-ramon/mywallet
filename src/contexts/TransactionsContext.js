import { createContext, useContext, useState } from "react";
import api from "../services/api";
import AuthContext from "./AuthContext";

const TransactionsContext = createContext();

export function TransactionsProvider({ children }) {
  const { auth } = useContext(AuthContext);
  const [transactions, setTransactions] = useState();
  
  async function handleLoadTransactions() {
    const { data } = await api.getTransactions(auth?.token);
    setTransactions(data);
  }

  return (
    <TransactionsContext.Provider value={{  handleLoadTransactions, transactions }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export default TransactionsContext;