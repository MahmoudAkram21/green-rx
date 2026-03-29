import {SurgicalHistoryCreateManyInput, SurgicalHistoryUpdateInput } from "../../generated/client/models";
import { prisma } from "../lib/prisma";

class SurgicalHistoryRepository {
async getSurgicalHistoriesByPatientId(patientId: number) {

return await prisma.surgicalHistory.findMany({
    where: { patientId },
    orderBy: { createdAt: 'desc' },
    include: { organ: true },
  });
}

async createSurgicalHistory(data: SurgicalHistoryCreateManyInput[]) {
return await prisma.surgicalHistory.createManyAndReturn({ data, select: { id: true } });
}

async updateSurgicalHistory(id: number, data: SurgicalHistoryUpdateInput) {
  return prisma.surgicalHistory.update({
    where : {id} , 
    data
  })
}

async deleteSurgicalHistory(id: number) {
  return prisma.surgicalHistory.delete({
    where : {id}
  })
}


}
export default new SurgicalHistoryRepository();