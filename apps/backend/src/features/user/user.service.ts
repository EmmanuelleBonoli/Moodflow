import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../db/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  assertIsOwner(currentUser: User, resourceOwnerId: string): void {
    if (currentUser.id !== resourceOwnerId) {
      throw new UnauthorizedException(
        "Vous n'êtes pas autorisé à modifier cette ressource.",
      );
    }
  }
}
