import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';
import * as bcrypt from "bcrypt"
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private configService: ConfigService) { }
  async create(createUserDto: CreateUserDto) {
    const existUser = await this.prisma.user.findUnique({ where: { email: createUserDto.email } })
    if (existUser) throw new ConflictException("Foydaluvchi allaqachon mavjud!")

    const round = this.configService.get<number>('BCRYPT_SALT_ROUNDS')
    const hashPasword = await bcrypt.hash(createUserDto.password, round || 10)
    const createUser = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        name: createUserDto.name,
        password: hashPasword,
      }
    })
    const createProfile = await this.prisma.profile.create({
      data: {
        userId: createUser.id
      }
    })
    const createChat = await this.prisma.chat.create({
      data: {
        fromId: createUser.id,
      }
    })
    const createContact = await this.prisma.contact.create({
      data: {
        email: createUser.email,
        userId: createUser.id,
      }
    })
    return {
      success: true,
      message: "foydalanuvchi muvaffaqiyatli qushildi",
      data: {
        user: {
          id: createUser.id,
          name: createUser.name,
          email: createUser.email,
          profile: {
            userId: createProfile.userId,
          },
          contact: {
            userId: createContact.userId,
            phone: createContact.phone,
            instagram: createContact.instagram,
            telegram: createContact.telegram
          },
          chat: {
            id: createChat.id,
            fromId: createChat.fromId
          }

        }
      }
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
