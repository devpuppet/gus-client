import { SDGClient } from "../clients/sdg.client";
import { DomesticRatingsDto } from "../dto/sdg.model";
import { Component } from "./component";
import { RatingsItem } from "./domestic-ratings-item";

export class DomesticRatingsList extends Component<HTMLDivElement, HTMLUListElement> {
    private domesticRatingsDto$: Promise<DomesticRatingsDto>;
    private domesticRatingsListId = 'ratings-list';

    constructor(sdgClient: SDGClient) {
        super('ratings', 'app', 'ratings-section');

        this.domesticRatingsDto$ = sdgClient.getDomesticRatings();
        this.configure();
        this.renderContent();
    }

    override renderContent() {
        this.element.querySelector('h2')!.textContent = 'Domestic ratings';
        this.renderDomesticRatings();
    }

    override configure() {}

    private async renderDomesticRatings() {
        const domesticRatingsDto = await this.domesticRatingsDto$;
        for (const rating of domesticRatingsDto.krajowe) {
            new RatingsItem(this.domesticRatingsListId, rating);
        }
    }
}