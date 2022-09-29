import { MainTopicsDto } from "../dto/bdl.model";
import { HttpClient } from "./client";

export class BDLClient extends HttpClient {

    private readonly BASE_URL = 'https://bdl.stat.gov.pl';
    private readonly MAIN_TOPICS = `${this.BASE_URL}/api/v1/subjects`;

    public async getMainTopics(): Promise<MainTopicsDto> {

        const response = await this.sendGet(this.MAIN_TOPICS, { lang: "pl", format: "json" }) as MainTopicsDto;

        console.log(response);
        return response;
    }
}

