import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const blobUrl = searchParams.get('url');

  if (!blobUrl) {
    return new NextResponse('URL do arquivo não informada', { status: 400 });
  }

  // 1. INJETE SUA CHAVE AQUI (Exatamente a mesma string que você colou no upload):
  const token = process.env.BLOB_READ_WRITE_TOKEN || "vercel_blob_rw_AgztAIVSjDMwKZ1J_wvw9aqOOqNsG1Kcc8JteKrVVpPMSDj";

  if (!token || token.startsWith("COLE_")) {
    console.error("❌ ERRO NO PROXY: Credencial BLOB_READ_WRITE_TOKEN ausente em /api/receipt");
    return new NextResponse('Token de autenticação do storage ausente', { status: 500 });
  }

  try {
    // 2. O servidor Linux apresenta a credencial para destravar o arquivo privado na Vercel
    const response = await fetch(blobUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error(`❌ A Vercel recusou a entrega do arquivo. Status: ${response.status} ${response.statusText}`);
      return new NextResponse('Falha ao autorizar download na Vercel', { status: response.status });
    }

    const blobData = await response.blob();

    // 3. Repassa os bytes puros do PDF/Imagem diretamente para a tela do usuário
    return new NextResponse(blobData, {
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/octet-stream',
        'Cache-Control': 'private, max-age=3600',
      },
    });

  } catch (error) {
    console.error("❌ Erro interno no Proxy de Recibo:", error);
    return new NextResponse('Erro ao carregar o arquivo protegido', { status: 500 });
  }
}