import { apiFetch } from './api';
import type { Transfer } from '@/types/transfer';

export const authService = {
    syncUser: async () => {
        // Se 'window' é undefined, significa que quem está rodando o código é o robô da Vercel no build!
        if (typeof window === "undefined") return;

        return await apiFetch('/sync-user', { method: 'POST' });
    }
};

export const transferService = {

    // GET: Load transfers (optionally limited)
    getAll: async (limit?: number): Promise<Transfer[]> => {
        // If a limit is passed, attach it to the URL. Otherwise, fetch normally.
        const endpoint = limit ? `/transfers?limit=${limit}` : '/transfers';

        const data = await apiFetch(endpoint);
        return Array.isArray(data) ? data : data.transfers || [];
    },

    // POST: Create a new transfer
    create: async (transfer: Omit<Transfer, 'id'>) => {
        return apiFetch('/transfers', {
            method: 'POST',
            body: JSON.stringify(transfer),
        });
    },

    // PUT: Update an existing transfer
    update: async (id: string | number, transfer: Partial<Transfer>) => {
        return apiFetch(`/transfers/${id}`, {
            method: 'PUT',
            body: JSON.stringify(transfer),
        });
    },

    // DELETE: Exclude a transfer
    delete: async (id: string | number) => {
        return apiFetch(`/transfers/${id}`, {
            method: 'DELETE',
        });
    }
};