import type { ComponentType } from "react";
import type { Transfer } from "@/types/transfer";

declare module "mfe_dashboard/Dashboard" {
    interface DashboardProps {
        transfers: Transfer[];
    }
    const Dashboard: ComponentType<DashboardProps>;
    export default Dashboard;
}