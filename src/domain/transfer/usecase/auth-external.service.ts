import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { IAuthenticationResponse } from 'src/domain/transfer/interface/auth-service.interface';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthExternalService {
  constructor(private readonly httpService: HttpService) {}

  async validateAuthentication(): Promise<boolean> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<IAuthenticationResponse>('http://localhost:3000/')
      );
 
      return response.data.authenticated;
    } catch (error) {
      throw new HttpException(
        'Authentication service unavailable',
        HttpStatus.SERVICE_UNAVAILABLE
      );
    }
  }
}