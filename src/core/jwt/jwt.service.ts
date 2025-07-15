import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { Request } from 'express';
import { getJwtOptions, getToken, jwtTokenTypeEnum } from 'src/common/config/jwt-config/jwt.secrets';

@Injectable()
export class JwtSubService {
    constructor(
        private readonly jwtService : JwtService,
        private readonly configService : ConfigService,
    ){}

    async getAccessToken(user : User){
        const { id, role } = user;
        const token = await getToken(
            this.jwtService,
            {id, role},
            this.configService
        );
        return token;
    }
    async getRefreshToken(user : User){
        const { id, role } = user;
        const token = await getToken(
            this.jwtService,
            {id,role},
            this.configService,jwtTokenTypeEnum.REFRESH
        );
        return token;
    }
    async getVerfyToken(req : Request,data : {email:string,code:number}){
        const {ip,agent} = req['device']
        const token = await getToken(
            this.jwtService,
            {...data,ip,agent},
            this.configService,jwtTokenTypeEnum.VERIFY
        );
        return token;
    }
}
