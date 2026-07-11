import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

// 1. Movemos a inicialização para dentro de uma função
function getFirebaseAdminApp() {
  // Se o Firebase ainda não foi inicializado...
  if (!getApps().length) {
    // Se a variável não existir (como no build do Docker), abortamos graciosamente
    if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
      console.warn("Aviso: FIREBASE_SERVICE_ACCOUNT não encontrado. Pulando inicialização.");
      return null;
    }

    try {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
      initializeApp({
        credential: cert(serviceAccount),
      });
    } catch (error) {
      console.error("Erro ao ler credenciais do Firebase:", error);
      return null;
    }
  }
  return getApps()[0];
}

// 2. A validação real que as suas rotas chamam
export async function verifyAuth(request: Request) {
  // A mágica acontece aqui: O Firebase só tenta ligar quando a rota recebe um "fetch"!
  getFirebaseAdminApp();
  
  const adminAuth = getAuth();
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Unauthorized');
  }

  const token = authHeader.split(' ')[1];
  const decodedToken = await adminAuth.verifyIdToken(token);
  
  return {
    uid: decodedToken.uid,
    email: decodedToken.email,
  };
}