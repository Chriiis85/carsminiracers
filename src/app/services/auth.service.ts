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
    const provider = new GoogleAuthProvider();
    return this.callPopUp(provider);
  }

  // Método para registrar sesión con Google
  async signWithGoogle(): Promise<UserCredential> {
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

  // Método para enviar el email de restablecimiento de contraseña
  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
      console.log('Correo de restablecimiento de contraseña enviado');
    } catch (error) {
      console.error('Error al enviar el correo de restablecimiento:', error);
      throw error;
    }
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

  // Obtener el nombre del usuario autenticado
  getUserName(): string | null {
    const user = this.auth.currentUser;
    return user ? user.displayName : null;
  }
}
