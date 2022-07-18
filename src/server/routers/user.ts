import { prisma } from '../../db/prisma';
import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { createRouter } from '../createRouter';


const defaultUserSelect = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  phone: true,
  github: true,
  location: true,
});

export const userRouter = createRouter().query('getAllUsers', {
  async resolve() {
    const users = await prisma.user.findMany();
    return users;
  },
});
