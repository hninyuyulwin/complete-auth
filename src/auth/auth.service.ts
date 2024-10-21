import { hash } from 'crypto';
import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
// import {jwtSecret} from "../utils/constants"

@Injectable()
export class AuthService {
    constructor(
        private prisma : PrismaService, 
        private jwt : JwtService
    ){}

    async signup(data : CreateAuthDto){
        const {email, hashedPassword} = data

        const foundUser = await this.prisma.user.findUnique({where:{email}});
        
        if(foundUser) throw new BadRequestException("E-mail already exists!")
        
        const hashedpassword =  await this.hashPassword(hashedPassword);

        await this.prisma.user.create({data:{
            email : email, hashedPassword : hashedpassword
        }});

        return {
            message : "Signup Was Success!"
        }
    }

    async login(data : CreateAuthDto,req : Request,res : Response){
        const {email, hashedPassword} = data;
        const foundUser = await this.prisma.user.findUnique({where:{email}});
        
        if(!foundUser) throw new BadRequestException("User not found!")
        
        const isMatch = await this.comparePasswords({
            password : hashedPassword, 
            hash : foundUser.hashedPassword
        })
        // const isMatch = await bcrypt.compare(hashedPassword, foundUser.hashedPassword)
        if (!isMatch) {
            throw new BadRequestException("Wrong Password!")
        }
        const token = await this.singToken({id:foundUser.id, email:foundUser.email})
        if (!token) {
            throw new ForbiddenException("Token not found!")
        }
        res.cookie('token', token)
        // sign jwt and return to the user

        return res.send({message : "Loggedin Success!"});
    }

    async signout(req : Request, res: Response){
        res.clearCookie('token')
        return res.send({message : 'Logged Out Success'})
    }

    async hashPassword(password){
        const saltOrRounds = 10;
        return await bcrypt.hash(password, saltOrRounds);
    }

    async comparePasswords(args : {password : string, hash : string}){
        return await bcrypt.compare(args.password, args.hash);
    }

    async singToken(args : {id:string, email:string}){
        const payload = args
        return this.jwt.signAsync(payload, {secret:"password123"})
    }
}

