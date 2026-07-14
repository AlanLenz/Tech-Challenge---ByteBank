import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Transfer } from '@/types/transfer';
import { transferService } from '@/services/transfers';

interface TransfersState {
  list: Transfer[];
  loading: boolean;
  error: string | null;
}

const initialState: TransfersState = {
  list: [],
  loading: false,
  error: null,
};

// Action Assíncrona para buscar dados da sua API do Next.js
export const fetchTransfers = createAsyncThunk(
  'transfers/fetch',
  async (_, { rejectWithValue }) => {
    try {
      // Como o onAuthStateChanged já confirmou o usuário lá no painel,
      // essa chamada agora vai levar os cabeçalhos de autenticação perfeitamente!
      const data = await transferService.getAll();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Erro ao buscar transações');
    }
  }
);

export const updateTransfer = createAsyncThunk(
  'transfers/update',
  async ({ id, transfer }: { id: string | number; transfer: Transfer }, { rejectWithValue }) => {
    try {
      await transferService.update(id, transfer);
      return { id, transfer };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Erro ao atualizar transação');
    }
  }
);

// Action Assíncrona para deletar
export const deleteTransfer = createAsyncThunk(
  'transfers/delete',
  async (id: string | number, { rejectWithValue }) => {
    try {
      await transferService.delete(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Erro ao deletar transação');
    }
  }
);

const transfersSlice = createSlice({
  name: 'transfers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransfers.pending, (state) => { state.loading = true; })
      .addCase(fetchTransfers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(deleteTransfer.fulfilled, (state, action) => {
        state.list = state.list.filter(t => t.id !== action.payload);
      })
      .addCase(updateTransfer.fulfilled, (state, action) => {
        const index = state.list.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload.transfer;
        }
      });
  },

});

export default transfersSlice.reducer;