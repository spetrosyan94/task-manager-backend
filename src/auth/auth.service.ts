import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Метод для аутентификации пользователя
  async signIn(login: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(login);

    // Проверка, существует ли пользователь
    if (!user) throw new NotFoundException('Пользователь не найден');

    // Проверка пароля
    const correct = await bcrypt.compare(password, user.password);
    if (!correct) throw new UnauthorizedException('Не верный пароль');

    const payload = { id: user.id, supervisor: user.supervisor };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
