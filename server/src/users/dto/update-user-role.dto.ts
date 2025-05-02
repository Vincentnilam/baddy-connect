import { UserRole } from "../../common/enums/roles.enum";
import { IsEnum } from "class-validator";

export class UpdateUserRoleDto {

    @IsEnum(UserRole)
    role: UserRole;
}