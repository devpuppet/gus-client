import { MainTopicResultDto } from "../dto/bdl.model";
import { Component } from "./component";

export class TopicItem extends Component<HTMLUListElement, HTMLLIElement> {
    private readonly topic: MainTopicResultDto;

    constructor(hostId: string, topic: MainTopicResultDto) {
        super('main-topic-item', hostId);
        this.topic = topic;

        this.configure();
        this.renderContent();
    }

    configure(): void {}

    renderContent(): void {
        this.element.querySelector('p')!.textContent = this.topic.name;
    }

}