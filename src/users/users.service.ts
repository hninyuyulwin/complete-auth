import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma : PrismaService){}

    async getUserById(id : string, req:Request){
        const user = this.prisma.user.findUnique({where:{id:id}})
        const decoded = req.user as {id:string, email:string}
        return user;
    }

    async getAllUser(){
        return this.prisma.user.findMany({select:{id:true, email : true}})
    }
}
