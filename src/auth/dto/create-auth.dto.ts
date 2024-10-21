import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator"

export class CreateAuthDto{
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email : string

    @IsString()
    @IsNotEmpty()
    @Length(3,20, {message:"Password lenght between 3 to 20."})
    hashedPassword : string
}