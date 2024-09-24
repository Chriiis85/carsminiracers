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
import { sendEmailVerification } from 'firebase/auth';

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
    this.sendEmailVerification();
  }

  // Método para iniciar sesión un usuario
  async loginWithEmailAndPwd(credential: Credential): Promise<UserCredential> {
    return signInWithEmailAndPassword(
      this.auth,
      credential.email,
      credential.password
    );
  }

  // Método para iniciar sesión con Google
  async loginWithGoogle(): Promise<UserCredential> {
    this.sendEmailVerification();
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

  // Enviar verificación de correo electrónico
  async sendEmailVerification() {
    const user = await this.auth.currentUser;
    if (user) {
      return sendEmailVerification(user);
    }
    throw new Error('No hay usuario autenticado');
  }

  // Comprobar si el correo ha sido verificado
  async isEmailVerified(): Promise<boolean> {
    const user = await this.auth.currentUser;
    return user?.emailVerified || false;
  }

  // Cerrar sesión
  async logout() {
    return this.auth.signOut();
  }
}
