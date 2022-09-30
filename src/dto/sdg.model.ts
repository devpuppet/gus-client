export interface DomesticRatingsDto {
    krajowe: DomesticRatingDto[];
}

export interface DomesticRatingDto {
    [number: string]: RatingCodeDto[];
}

export interface RatingCodeDto {
    [code: string]: RatingNameDto[];
}

export interface RatingNameDto {
    nazwa: string
}