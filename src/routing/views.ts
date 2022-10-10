import { SDGClient } from "../clients/sdg.client";
import { About } from "../components/about";
import { DomesticRatingsList } from "../components/domestic-ratings-list";

export interface View {
    name: string;
    route: string;
    renderView: () => void;
}

const home: View = {
    name: 'home',
    route: '/',
    renderView: () => {
        const sdgClient = new SDGClient();
    
        new DomesticRatingsList(sdgClient);
    }
}

const about: View = {
    name: 'about',
    route: '/about',
    renderView: () => {
        new About(document.getElementById('app')! as HTMLDivElement);
    }
}

export const views = [home, about];