import { SDGClient } from "../clients/sdg.client";
import { DomesticRatingDto, DomesticRatingsDto } from "../dto/sdg.model";
import { CollapsableList } from "./collapsable-list";
import { Component } from "./component";
import { RatingsItem } from "./domestic-ratings-item";

export class DomesticRatingsList extends Component<HTMLDivElement, HTMLUListElement> {
    private domesticRatingsDto$: Promise<DomesticRatingsDto>;

    constructor(sdgClient: SDGClient) {
        super('ratings', document.getElementById('app') as HTMLDivElement, 'ratings-section');

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
        for (let i = 0; i < domesticRatingsDto.krajowe.length; i++) {
            new RatingsSection(this.element, `SECTION ${i + 1}.`, domesticRatingsDto.krajowe[i]);
        }
    }
}

export class RatingsSection extends CollapsableList {

    constructor(host: HTMLElement, title: string, ratingDto: DomesticRatingDto) {
        super(host);
        this.setTitle(title);
        this.setItemsList([new RatingsItem(this.collapsableList, ratingDto)]);
    }
}