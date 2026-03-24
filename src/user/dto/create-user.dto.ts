import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString({message : "firstname should not be empty"})
    firstName: string;

    @IsNotEmpty()
    @IsString({message : "lastName should not be empty"})
    lastName: string;

    @IsString()
    email: string;

    @IsString()
    username: string;
}