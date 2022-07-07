import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcrypt'

import { getUserByEmail } from '../components/user/user-model'

function initialize(passport) {
  passport.use(
    new LocalStrategy(
      {
        emailField: 'email',
        passwordField: 'password',
      },
      async (email: string, password: string, done) => {
        const user = await getUserByEmail(email)
        console.log(password, done)
      }
    )
  )
}
