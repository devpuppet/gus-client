import { BDLClient } from "../clients/bdl.client";
import { MainTopicsDto } from "../dto/bdl.model";
import { Component } from "./component";
import { TopicItem } from "./main-topic-item";

export class MainTopicList extends Component<HTMLDivElement, HTMLUListElement> {
    private mainTopicsDto$: Promise<MainTopicsDto>;

    constructor(bdlClient: BDLClient) {
        super('main-topics', 'app', 'main-topics-list');

        // this.mainTopicsDto = {"totalRecords":33,"page":0,"pageSize":10,"links":{"first":"https://bdl.stat.gov.pl/api/v1/subjects?page=0&page-size=10","self":"https://bdl.stat.gov.pl/api/v1/subjects?page=0&page-size=10","next":"https://bdl.stat.gov.pl/api/v1/subjects?page=1&page-size=10","last":"https://bdl.stat.gov.pl/api/v1/subjects?page=3&page-size=10"},"results":[{"id":"K15","name":"PRICES","hasVariables":false,"children":["G186","G187","G188","G189","G405"],"levels":[3]},{"id":"K43","name":"FINANCES OF ENTERPRISES (QUARTERLY DATA)","hasVariables":false,"children":["G418","G576"],"levels":[3]},{"id":"K27","name":"PUBLIC FINANCE","hasVariables":false,"children":["G195","G197","G199","G201","G423","G425","G497","G569","G612"],"levels":[3,5,6]},{"id":"K47","name":"EUROPEAN FUNDS (HALF YEAR DATA)","hasVariables":false,"children":["G556","G580","G586","G587","G588","G589","G590","G608","G624"],"levels":[3,5,6]},{"id":"K11","name":"HOUSING ECONOMY AND MUNICIPAL INFRASTRUCTURE","hasVariables":false,"children":["G57","G59","G231","G233","G236","G335","G402","G562","G619","G621","G630"],"levels":[3,4,5,6]},{"id":"K44","name":"SOCIAL ECONOMY","hasVariables":false,"children":["G446","G568","G629"],"levels":[3]},{"id":"K16","name":"TRADE AND CATERING","hasVariables":false,"children":["G64","G65","G66","G67","G190","G566"],"levels":[3,6,7]},{"id":"K28","name":"INVESTMENTS AND FIXED ASSETS","hasVariables":false,"children":["G277","G278","G438","G539","G567"],"levels":[3,4,5]},{"id":"K23","name":"CULTURE","hasVariables":false,"children":["G226","G227","G228","G229","G370","G533","G617"],"levels":[3,5,6,7]},{"id":"K24","name":"PHYSICAL EDUCATION, SPORT AND RECREATION","hasVariables":false,"children":["G334"],"levels":[3,4,5,6,7]}]};
        this.mainTopicsDto$ = bdlClient.getMainTopics();
        this.configure();
        this.renderContent();
    }

    override renderContent() {
        this.element.querySelector('h2')!.textContent = 'MAIN TOPICS';
        this.renderMainTopics();
    }

    override configure() {}

    private async renderMainTopics() {
        const list = document.getElementById("main-topics-list") as HTMLUListElement;
        const mainTopicsDto = await this.mainTopicsDto$;
        console.log("Response from component", mainTopicsDto);
        for (const result of mainTopicsDto.results) {
            new TopicItem(this.id!, result);
        }
    }
}