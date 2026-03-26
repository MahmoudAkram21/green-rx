import { prisma } from '../lib/prisma';

type ListOptions = {
  search?: string;
  isActive?: boolean;
};

export class ExcipientsRepository {
  async list(options: ListOptions = {}) {
    const where: any = {};

    if (options.search) {
      where.name = { contains: options.search, mode: 'insensitive' };
    }

    if (typeof options.isActive === 'boolean') {
      where.isActive = options.isActive;
    }

    return prisma.excipient.findMany({
      where,
      orderBy: { name: 'asc' },
    });
  }

  async findById(id: number) {
    return prisma.excipient.findUnique({ where: { id } });
  }

  async findByName(name: string) {
    return prisma.excipient.findFirst({
      where: { name: { equals: name, mode: 'insensitive' } },
      select: { id: true, name: true },
    });
  }

  async create(data: { name: string; description?: string | null; isActive?: boolean }) {
    return prisma.excipient.create({ data });
  }

  async update(id: number, data: { name?: string; description?: string | null; isActive?: boolean }) {
    return prisma.excipient.update({
      where: { id },
      data,
    });
  }
}

export const excipientsRepository = new ExcipientsRepository();
