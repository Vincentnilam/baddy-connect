import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { UserRole } from "../enums/roles.enum";
import { ROLES_KEY } from "../decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
    
    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        console.log('Roles:', requiredRoles);
        if (!requiredRoles) return true;
        
        const request = context.switchToHttp().getRequest();
        console.log('request:', request);
        const user = request.user;
        console.log('User:', user);

        return requiredRoles.some((role) => user.role?.includes(role));
    }
    
}