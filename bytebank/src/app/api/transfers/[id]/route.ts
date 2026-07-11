import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { verifyAuth } from '@/lib/firebase-admin';

// 1. A tipagem do params agora recebe uma Promise
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await verifyAuth(request);
    const body = await request.json();
    const { description, amount, date, type, categories_id, receipt_url } = body;

    // 2. Extraímos o ID aguardando a Promise!
    const { id } = await params;

    const query = `
      UPDATE transfers 
      SET description = $1, amount = $2, date = $3, type = $4, categories_id = $5, receipt_url = $6 
      WHERE id = $7 AND user_id = $8 
      RETURNING *;
    `;
    const values = [description, amount, date, type, categories_id || null, receipt_url || null, id, user.uid];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) return NextResponse.json({ error: 'Não encontrada' }, { status: 404 });
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar' }, { status: 500 });
  }
}

// 1. Atualizamos a tipagem aqui também
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await verifyAuth(request);
    
    // 2. Extraímos o ID aguardando a Promise
    const { id } = await params;
    
    const query = 'DELETE FROM transfers WHERE id = $1 AND user_id = $2 RETURNING *';
    const result = await pool.query(query, [id, user.uid]);

    if (result.rows.length === 0) return NextResponse.json({ error: 'Não encontrada' }, { status: 404 });
    return NextResponse.json({ message: 'Deletado com sucesso' });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao deletar' }, { status: 500 });
  }
}