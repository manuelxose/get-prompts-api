import passport from "passport";

export class PassportAdapter {
  constructor() {
    this.initialize();
  }

  private initialize() {
    passport.serializeUser((user, done) => {
      done(null, user);
    });

    passport.deserializeUser((user: any, done) => {
      done(null, user);
    });
  }
}
