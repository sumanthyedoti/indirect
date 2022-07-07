import { PassportStatic } from 'passport'
import bcrypt from 'bcrypt'
import { Strategy as LocalStrategy } from 'passport-local'

import userModel from '../components/user/user-model'

declare global {
  namespace Express {
    interface User {
      id: number
      email: string
    }
  }
}

export default (passport: PassportStatic) => {
  passport.serializeUser((user, done) => {
    done(user.id)
  })

  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await userModel.getUser(id)
      if (!user) return done(null, false)
      done(null, user)
    } catch (err) {
      done(err)
    }
  })

  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      async (username, password, done) => {
        try {
          const user = await userModel.getUserByEmail(username)
          if (!user) {
            return done(null, false, { message: 'Login Failed' })
          }
          const authenticated = await bcrypt.compare(
            password,
            user.password_hash
          )
          if (!authenticated) {
            done(null, false, { message: 'Email/password does not match' })
          }
          done(null, user) // authenticated user
        } catch (err) {
          done(err)
        }
      }
    )
  )
}
