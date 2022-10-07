import { DomesticRatingDto } from "../dto/sdg.model";
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
        const subRatings = Object.keys(this.rating).map(key => key);
        subRatings.forEach(subRating => {
            this.rating[subRating].forEach(code => {
                const codes = Object.keys(code).map(key => key);
                codes.forEach(x => {
                    code[x].forEach(name => {
                        new SubRatingItem(this.element, name.nazwa);
                    });
                })
            });
        });
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