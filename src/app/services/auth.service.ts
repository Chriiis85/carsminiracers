import { inject, Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import {
  AuthProvider,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  UserCredential,
} from 'firebase/auth';
export interface Credential {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);
  readonly authState$ = authState(this.auth); 
  
 // Método para registrar a un nuevo usuario
 signUpWithEmailAndPwd(credential: Credential): Promise<UserCredential> {
  return createUserWithEmailAndPassword(
    this.auth,
    credential.email,
    credential.password
  );
}

// Método para iniciar sesión un usuario
async loginWithEmailAndPwd(credential: Credential): Promise<UserCredential> {
  return signInWithEmailAndPassword(
    this.auth,
    credential.email,
    credential.password
  );
}

async logOut(): Promise<void> {
  return this.auth.signOut();
}

async loginWithGoogle(): Promise<UserCredential> {
  const provider = new GoogleAuthProvider();
  return this.callPopUp(provider);
}

async callPopUp(provider: AuthProvider): Promise<UserCredential> {
  try {
    const result = await signInWithPopup(this.auth, provider);
    return result;
  } catch (error: any) {
    console.error('Error en el login con Google:', error);
    throw error;
  }
}
}
