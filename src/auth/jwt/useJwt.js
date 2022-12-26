import useJwt from '@core/auth/jwt/useJwt'
import axios from '@axios'
import jwtDefaultConfig from './jwtDefaultConfig'

const { jwt } = useJwt(axios, jwtDefaultConfig)
export default jwt
