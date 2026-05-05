type User = { displayName: string | null; email: string | null; uid: string };

let _currentUser: User | null = {
  displayName: 'Usuário',
  email: 'usuario@example.com',
  uid: 'mock-uid',
};

export const setMockUser = (user: User | null) => {
  _currentUser = user;
};

export const onAuthStateChanged = (
  _auth: unknown,
  callback: (user: User | null) => void
) => {
  callback(_currentUser);
  return () => {};
};

export const signInWithEmailAndPassword = async () => ({ user: _currentUser });
export const createUserWithEmailAndPassword = async () => ({ user: _currentUser });
export const updateProfile = async () => {};
export const signOut = async () => {};
export const getAuth = () => ({});
