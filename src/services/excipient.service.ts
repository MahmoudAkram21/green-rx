import { excipientsRepository } from '../repositories/excipients.repository';

export class ExcipientService {
  async listForPatients(search?: string) {
    return excipientsRepository.list({
      search,
      isActive: true,
    });
  }

  async listForAdmin(search?: string, includeInactive = false) {
    return excipientsRepository.list({
      search,
      isActive: includeInactive ? undefined : true,
    });
  }

  async getByIdForPatients(id: number) {
    const excipient = await excipientsRepository.findById(id);
    if (!excipient || !excipient.isActive) return null;
    return excipient;
  }

  async getByIdForAdmin(id: number) {
    return excipientsRepository.findById(id);
  }

  async create(data: { name: string; description?: string; isActive?: boolean }) {
    const existing = await excipientsRepository.findByName(data.name.trim());
    if (existing) {
      const error: any = new Error('Excipient with this name already exists');
      error.statusCode = 409;
      throw error;
    }
    return excipientsRepository.create({
      name: data.name.trim(),
      description: data.description?.trim() || undefined,
      isActive: data.isActive ?? true,
    });
  }

  async update(id: number, data: { name?: string; description?: string; isActive?: boolean }) {
    const current = await excipientsRepository.findById(id);
    if (!current) {
      const error: any = new Error('Excipient not found');
      error.statusCode = 404;
      throw error;
    }

    if (data.name && data.name.trim().toLowerCase() !== current.name.trim().toLowerCase()) {
      const duplicate = await excipientsRepository.findByName(data.name.trim());
      if (duplicate && duplicate.id !== id) {
        const error: any = new Error('Excipient with this name already exists');
        error.statusCode = 409;
        throw error;
      }
    }

    return excipientsRepository.update(id, {
      ...(data.name !== undefined && { name: data.name.trim() }),
      ...(data.description !== undefined && { description: data.description?.trim() || null }),
      ...(data.isActive !== undefined && { isActive: data.isActive }),
    });
  }

  async softDelete(id: number) {
    const current = await excipientsRepository.findById(id);
    if (!current) {
      const error: any = new Error('Excipient not found');
      error.statusCode = 404;
      throw error;
    }
    return excipientsRepository.update(id, { isActive: false });
  }
}

export const excipientService = new ExcipientService();
