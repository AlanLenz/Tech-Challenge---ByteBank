import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { verifyAuth } from '@/lib/firebase-admin';

export async function POST(request: Request) {
  try {
    const user = await verifyAuth(request);
    const email = user.email || 'no-email@provided.com'; 

    const query = `
      INSERT INTO accounts (id, email, balance) 
      VALUES ($1, $2, 0) 
      ON CONFLICT (id) DO NOTHING;
    `;
    await pool.query(query, [user.uid, email]);
    
    return NextResponse.json({ message: 'User synced successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao sincronizar' }, { status: 500 });
  }
}