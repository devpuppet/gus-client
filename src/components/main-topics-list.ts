import { BDLClient } from "../clients/bdl.client";
import { MainTopicsDto } from "../dto/bdl.model";
import { Component } from "./component";
import { TopicItem } from "./main-topic-item";

export class MainTopicList extends Component<HTMLDivElement, HTMLUListElement> {
    private mainTopicsDto$: Promise<MainTopicsDto>;

    constructor(bdlClient: BDLClient) {
        super('main-topics', 'app', 'main-topics-list');

        this.mainTopicsDto$ = bdlClient.getMainTopics();
        this.configure();
        this.renderContent();
    }

    override renderContent() {
        this.element.querySelector('h2')!.textContent = 'Main topics';
        this.renderMainTopics();
    }

    override configure() {}

    private async renderMainTopics() {
        const mainTopicsDto = await this.mainTopicsDto$;
        for (const result of mainTopicsDto.results) {
            new TopicItem(this.id!, result);
        }
    }
}