import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { verifyAuth } from '@/lib/firebase-admin';

export async function GET(request: Request) {
  try {
    const user = await verifyAuth(request);
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');

    let queryText = 'SELECT * FROM transfers WHERE user_id = $1 ORDER BY id DESC';
    const queryParams: any[] = [user.uid];

    if (limit && !isNaN(Number(limit))) {
      queryText += ' LIMIT $2';
      queryParams.push(Number(limit));
    }

    const result = await pool.query(queryText, queryParams);
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: 'Não autorizado ou erro no banco' }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await verifyAuth(request);
    const body = await request.json();
    const { description, amount, date, type, categories_id, receipt_url } = body;

    const query = `
      INSERT INTO transfers (user_id, description, amount, date, type, categories_id, receipt_url) 
      VALUES ($1, $2, $3, $4, $5, $6, $7) 
      RETURNING *;
    `;
    const values = [user.uid, description, amount, date, type, categories_id || null, receipt_url || null];
    const result = await pool.query(query, values);

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    // 👇 ADICIONE ESTA LINHA:
    console.error("🔥 ERRO FATAL NO POST /transfers:", error);
    return NextResponse.json({ error: 'Erro ao criar transação' }, { status: 500 });
  }
}