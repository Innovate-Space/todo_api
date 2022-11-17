import { Controller, Put, UseGuards } from '@nestjs/common';
//import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessJwtAuthGuard } from 'src/auth/decorator/access.decorator';

@ApiTags('profile')
@Controller('user')
export class UserController {
  @ApiBearerAuth('access-token')
  @UseGuards(AccessJwtAuthGuard)
  @Put('edit')
  editProfile() {
    return 'Edit me';
  }
}
