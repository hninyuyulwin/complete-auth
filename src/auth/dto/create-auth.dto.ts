import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator"

export class CreateAuthDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email : string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(3,20, {message:"Password lenght between 3 to 20."})
    hashedPassword : string
}