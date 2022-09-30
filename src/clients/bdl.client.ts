import { MainTopicsDto } from "../dto/bdl.model";
import { HttpClient, HttpOptions } from "./client";

export class BDLClient extends HttpClient {

    private readonly BASE_URL = 'https://bdl.stat.gov.pl';
    private readonly MAIN_TOPICS = `${this.BASE_URL}/api/v1/subjects`;

    public async getMainTopics(): Promise<MainTopicsDto> {
        const options: HttpOptions = { 
            searchParams: { 
                lang: "pl",
                format: "json" }, 
            headers: { 
                Accept: 'application/json'}
        };
        const response = await this.sendGet(this.MAIN_TOPICS, options) as MainTopicsDto;

        console.log(response);
        return response;
    }
}

