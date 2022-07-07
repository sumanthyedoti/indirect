import { PassportStatic } from 'passport'
import bcrypt from 'bcrypt'
import { Strategy as LocalStrategy } from 'passport-local'

import userModel from '../components/user/user-model'
import { logger } from '../config'

declare global {
  namespace Express {
    interface User {
      id: number
      email: string
      fullname: string
    }
  }
}

export default (passport: PassportStatic) => {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      async (username, password, done) => {
        console.log('use')

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
          // user authenticated
          done(null, {
            id: user.id,
            email: user.email,
            fullname: user.fullname,
          })
        } catch (err) {
          logger.error(err)
          done(err)
        }
      }
    )
  )

  passport.serializeUser((user, done) => {
    console.log('serializeUser')
    done(null, user.id)
  })

  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await userModel.getUser(id)
      if (!user) return done(null, false)
      done(null, user)
    } catch (err) {
      logger.error(err)
      done(err)
    }
  })
}
