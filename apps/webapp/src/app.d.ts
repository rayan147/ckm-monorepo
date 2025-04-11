// See https://kit.svelte.dev/docs/types#app

import type { Auth, Session, User } from '@ckm/db';

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      user?: User & { auth?: Partial<Auth[]> };
      token?: string;
      session?: Session;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
