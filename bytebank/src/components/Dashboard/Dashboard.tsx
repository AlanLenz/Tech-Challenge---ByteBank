"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchTransfers } from "@/store/transfersSlice";
import { IncomeExpenseChart } from "./Charts/IncomeExpenseChart";
import { ExpenseCategoryChart } from "./Charts/ExpenseCategoryChart";
import { auth } from "@/lib/firebase"; // 1. Importe o auth do Firebase

export function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const transfers = useSelector((state: RootState) => state.transfers.list);

  useEffect(() => {
    // 2. O observador aguarda o Firebase confirmar a sessão!
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // AGORA SIM! O usuário foi confirmado e o token está no ponto.
        // Podemos mandar o Redux buscar as transações sem medo de 401!
        dispatch(fetchTransfers());
      }
    });

    // 3. Limpa o observador se o componente for desmontado
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <section className="flex flex-col gap-6">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <IncomeExpenseChart/> 
        <ExpenseCategoryChart /> 
      </div>
    </section>
  );
}