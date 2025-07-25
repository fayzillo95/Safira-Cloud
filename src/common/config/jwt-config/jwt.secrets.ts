import { ConfigService } from "@nestjs/config"
import { JwtService, JwtSignOptions } from "@nestjs/jwt"
import { Role } from "@prisma/client"

// alias type
export type jwtTokenType = "ACCESS" | "REFRESH" | "VERIFY"

// payload  interface 
export interface JwtPayload {
    id: string,
    role: Role
}
export interface JwtVerfyPayload{
    email : string,
    code : number,
    ip : string,
    agent: string
}
// token type alias enum
export enum jwtTokenTypeEnum {

    ACCESS = "ACCESS",
    REFRESH = "REFRESH",
    VERIFY = "VERIFY"
}

//  secret and  ecpiresin 
export const getJwtOptions = (config: ConfigService, type: jwtTokenType = jwtTokenTypeEnum.ACCESS) => {
    const options: JwtSignOptions = {
        secret: config.get<string>(`JWT_${type.toLocaleUpperCase()}_SECRET`),
        expiresIn: config.get<string>(`JWT_${type.toLocaleUpperCase()}_EXPIRES_IN`)
    }
    return options
}

// token generate function
export const getToken = async (
    jwtService: JwtService,
    payload: JwtPayload | JwtVerfyPayload,
    config: ConfigService,
    type: jwtTokenType = jwtTokenTypeEnum.ACCESS
) => {
    const token = await jwtService.signAsync(payload, getJwtOptions(config, type))
    return token
}

export const decodeToken = async <T>(
    jwtService: JwtService,
    token: string,
    config: ConfigService,
    type: jwtTokenType = jwtTokenTypeEnum.ACCESS
) => {
    // @ts-ignore
    const result : T = await jwtService.verifyAsync<T>(token, {secret:getJwtOptions(config, type).secret})
    return result
}