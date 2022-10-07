import { DomesticRatingDto } from "../dto/sdg.model";
import { DomesticRatingModel } from "../models/sdg.model";
import { Component } from "./component";

export class RatingsItem extends Component<HTMLUListElement, HTMLLIElement> {
    private readonly rating: DomesticRatingDto;

    constructor(hostId: string, rating: DomesticRatingDto) {
        super('ratings-item', hostId);
        this.rating = rating;

        this.configure();
        this.renderContent();
    }

    configure(): void {}

    renderContent(): void {
        const domesticRatingModel = new DomesticRatingModel(this.rating);
        domesticRatingModel.getAllNames().forEach(name => new SubRatingItem(this.element, name));
    }
}

export class SubRatingItem extends Component<HTMLLIElement, HTMLLIElement> {

    constructor(hostElement: HTMLLIElement, private readonly name: string) {
        super('ratings-item', hostElement);

        this.configure();
        this.renderContent();
    }

    configure(): void {}

    renderContent(): void {
        this.element.textContent = this.name;
    }
}