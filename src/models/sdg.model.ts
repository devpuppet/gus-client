import { DomesticRatingDto } from "../dto/sdg.model";
import { propertiesToArray } from "../utils/array-utils";

export class DomesticRatingModel {
    constructor(private readonly dto: DomesticRatingDto) {}

    public getAllNames(): string[] {
        const allNames: string[] = [];
        const subRatings = propertiesToArray(this.dto);
        subRatings.forEach(subRating => {
            subRating.forEach(code => {
                const names = propertiesToArray(code);
                names.forEach(name => {
                    name.forEach(name => {
                        allNames.push(name.nazwa);
                    });
                })
            });
        });

        return allNames;
    }
}