import { SurgicalHistoryCreateManyInput, SurgicalHistoryUpdateInput } from "../../generated/client/models";
import surgicalHistoryRepository from "../repositories/surgicalHistory.reposiory";

class SurgicalHistoryService {


    async createSurgicalHistory(data: SurgicalHistoryCreateManyInput[]) {
        return surgicalHistoryRepository.createSurgicalHistory(data);
    }

    async updateSurgicalHistory(id: number, data: SurgicalHistoryUpdateInput) {
        return surgicalHistoryRepository.updateSurgicalHistory(id, data);
    }

    async deleteSurgicalHistory(id: number) {
        return surgicalHistoryRepository.deleteSurgicalHistory(id);
    }
}

export default new SurgicalHistoryService();