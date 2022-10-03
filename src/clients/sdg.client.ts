import { DomesticRatingsDto } from "../dto/sdg.model";
import { HttpClient, HttpOptions } from "./client";

export class SDGClient extends HttpClient {

    private readonly BASE_URL = 'https://api.github.com/repos/statisticspoland/sdg-indicators-pl/contents';
    private readonly DOMESTIC_RATES = `${this.BASE_URL}/api/v1/krajowe/lista.json`;


    public async getDomesticRatings(): Promise<DomesticRatingsDto> {
        const options: HttpOptions = { 
            headers: { 
                Accept: 'application/vnd.github.v3.raw'
            }};
        const response = await this.sendGet(this.DOMESTIC_RATES, options);

        return response;
    }
}