import { Component } from './component';

export class About extends Component<HTMLDivElement, HTMLDivElement> {

    constructor(host: HTMLDivElement) {
        super('about-template', host);
        this.element.innerHTML = 'ABOUT!';
    }

    configure(): void {}
    renderContent(): void {}

}