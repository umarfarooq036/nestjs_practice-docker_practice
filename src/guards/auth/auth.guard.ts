import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (authHeader && authHeader.startsWith('Bearer ')) {
      console.log('Authorization Header:', authHeader); // Log the authorization header for debugging
      const token = authHeader.split(' ')[1];
      console.log('Received Token:', token); // Log the received token for debugging
      // Here you would typically validate the token and check user permissions
      // For demonstration, we'll just check if the token is 'valid-token'
      return token === 'valid-token';
    }
    return false; // Deny access if no valid token is provided  
  }
}
