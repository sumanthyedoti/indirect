import { PassportStatic } from 'passport'
import bcrypt from 'bcrypt'
import { Strategy as LocalStrategy } from 'passport-local'
// import {Strategy as GoogleStrategy} from 'passport-google-oauth20'

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

const localStratery = new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await userModel.getUserByEmail(email)
      if (!user) {
        return done(null, false, { message: 'Login Failed' })
      }
      const authenticated = await bcrypt.compare(password, user.password_hash)
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

const initializer = (passport: PassportStatic) => {
  passport.use(localStratery)

  passport.serializeUser((user, done) => {
    done(null, user.id) // stores in sessions
  })

  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await userModel.getUser(id)
      if (!user) return done(null, false)
      done(null, user) // attaches user data to req, req.user
    } catch (err) {
      logger.error(err)
      done(err)
    }
  })
}

export default initializer
