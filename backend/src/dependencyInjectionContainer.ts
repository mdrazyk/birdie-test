import { PrismaClient } from '@prisma/client';
import { recipientRepositoryFactory } from './recipient/recipient.repository';
import { recipientServiceFactory } from './recipient/recipient.service';

export const dependencyInjectionContainerFactory = () => {
  const database = new PrismaClient();
  const recipientsRepository = recipientRepositoryFactory(database);
  const recipientService = recipientServiceFactory({ recipientsRepository });

  return {
    recipientService,
  };
}
