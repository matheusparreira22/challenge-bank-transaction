import { IsEmail, IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({
        example: 'John Doe',
        description: 'The full name of the user',
    })
    @IsNotEmpty()
    fullName: string;

    @ApiProperty({
        example: 'john.doe@example.com',
        description: 'The email address of the user',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: 'StrongP@ssw0rd',
        description: 'The user password',
        minLength: 8,
    })
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({
        example: '12345678900',
        description: 'CPF number (Brazilian individual taxpayer registry identification)',
        minLength: 11,
        maxLength: 11,
    })
    @IsString()
    cpf: string;

    @ApiProperty({
        example: false,
        description: 'Indicates if the user is a shopkeeper',
        default: false,
    })
    @IsBoolean()
    @IsOptional()
    isLojist?: boolean;
}
