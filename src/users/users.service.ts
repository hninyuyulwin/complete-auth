import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma : PrismaService){}

    async getUserById(id : string){
        return this.prisma.user.findUnique({where:{id:id}})
    }

    async getAllUser(){
        return this.prisma.user.findMany({select:{id:true, email : true}})
    }
}
