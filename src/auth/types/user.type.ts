import { ApiProperty } from '@nestjs/swagger';

export class UserType {
  @ApiProperty({ example: 'dev.sleez@gmail.com' })
  email: string;

  @ApiProperty({ example: 'Kingsley' })
  firstName: string;
}
