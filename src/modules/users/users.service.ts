import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';
import * as bcrypt from "bcrypt"
import { ConfigService } from '@nestjs/config';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private configService: ConfigService) { }
  async create(createUserDto: CreateUserDto) {
    const existUser = await this.prisma.user.findUnique({ where: { email: createUserDto.email } })
    if (existUser) throw new ConflictException("Foydaluvchi allaqachon mavjud!")

    const round = this.configService.get<string>('BCRYPT_SALT_ROUNDS')
    const hashPasword = await bcrypt.hash(createUserDto.password, round ? parseInt(round) : 10)
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
          profile: {
            id: createProfile.id,
            userId: createProfile.userId,
          },
          contact: {
            userId: createContact.userId,
            email: createContact.email,
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

  async findAll() {
    const information = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        regionId: true,
        role: true,
        profile: {
          select: {
            id: true,
            avatar: true,
            userId: true,
            bio: true
          }
        }
      }
    })
    return {
      success: true,
      data: information
    }
  }

  async findOne(id: string) {
    const existUser = await this.prisma.user.findUnique({ where: { id } })
    if (!existUser) throw new NotFoundException("user not found!!")

    const { password, ...safeUser } = existUser

    return {
      success: true,
      data: safeUser
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const existUser = await this.prisma.user.findUnique({ where: { id } });
    const isEmail = await this.prisma.user.findUnique({ where: { email: updateUserDto.email } })
    if (isEmail) throw new ConflictException("bu email allaqachon mavjud")
    if (!existUser) throw new NotFoundException("User not found!");


    let data: any = { ...updateUserDto };
    if (updateUserDto.password) {
      const round = this.configService.get<string>('BCRYPT_SALT_ROUNDS');
      data.password = await bcrypt.hash(updateUserDto.password, round ? parseInt(round) : 10);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data,
    });

    const { password, ...safeUser } = updatedUser;

    return {
      success: true,
      message: "User muvaffaqiyatli yangilandi",
      data: safeUser,
    };
  }
  async findByEmail() {

  }
  async remove(id: string) {
    const existUser = await this.prisma.user.findUnique({ where: { id } });

    if (!existUser) throw new NotFoundException("User not found!");

    await this.prisma.user.delete({ where: { id } });

    return {
      success: true,
      message: `User #${id} muvvafaqiyatli uchirildi`
    };
  }
}
