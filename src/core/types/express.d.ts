import * as express from "express";

declare global {
  namespace Express {
    interface User {
      id: string;
      role?: string;
    }
  }
}
