import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  if (!filename || !request.body) {
    return NextResponse.json({ error: 'Nome de arquivo e corpo são obrigatórios' }, { status: 400 });
  }

  // 1. Busca o token no Linux (se configurado no docker-compose) ou usa a string direta:
  const token = process.env.BLOB_READ_WRITE_TOKEN || "vercel_blob_rw_AgztAIVSjDMwKZ1J_wvw9aqOOqNsG1Kcc8JteKrVVpPMSDj";

  if (!token || token.startsWith("COLE_SEU")) {
    console.error("❌ ERRO GRAVE: A variável BLOB_READ_WRITE_TOKEN não foi encontrada!");
    return NextResponse.json({ error: 'Credenciais da Vercel ausentes no servidor' }, { status: 500 });
  }

  try {
    // 2. Faz o put() forçando a entrega da chave na mão da Vercel
    const blob = await put(filename, request.body, { 
      access: 'private',
      token: token, // <-- Garante a autenticação mesmo dentro do Docker!
    });

    console.log("✅ Upload realizado com sucesso no Vercel Blob:", blob.url);
    return NextResponse.json(blob);

  } catch (error) {
    // 3. Se a Vercel rejeitar (ex: arquivo grande, token inválido, timeout), estampa no console:
    console.error("❌ Erro detalhado da Vercel no put():", error);
    return NextResponse.json({ error: 'Falha na comunicação com o Vercel Blob' }, { status: 500 });
  }
}