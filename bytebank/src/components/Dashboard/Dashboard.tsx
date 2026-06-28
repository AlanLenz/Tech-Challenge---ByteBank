import { Transfer } from "@/types/transfer";
import { FinancialOverview } from "./FinancialOverview";
import { IncomeExpenseChart } from "./Charts/IncomeExpenseChart";
import { ExpenseCategoryChart } from "./Charts/ExpenseCategoryChart";

interface DashboardProps {
  transfers: Transfer[];
}

export function Dashboard({ transfers }: DashboardProps) {
  return (
    <section className="space-y-6">
      <FinancialOverview transfers={transfers} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <IncomeExpenseChart transfers={transfers} />
        <ExpenseCategoryChart/>
      </div>
    </section>
  );
}