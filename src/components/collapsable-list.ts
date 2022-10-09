import { Component } from "./component";

export class CollapsableList extends Component<HTMLElement, HTMLUListElement> {
    private title: string | undefined;
    private itemsList: Array<Component<HTMLElement, HTMLElement>> = [];
    protected collapsableList = this.element.querySelector('ul')! as HTMLUListElement;;

    constructor(host: HTMLElement) {
        super('collapsable-template', host);

        this.configure();
        this.renderContent();
    }

    setTitle(title: string) {
        this.title = title;
        this.element.insertAdjacentText('afterbegin', this.title);
    }

    setItemsList(itemsList: Array<Component<HTMLElement, HTMLElement>>) {
        this.itemsList = itemsList;
    }

    configure(): void {
        this.configureCollapse();
        this.element.addEventListener('click', this.handleClick.bind(this));
    }

    renderContent(): void {}

    configureCollapse() {
        const collapsableList = this.element.querySelector('ul')! as HTMLUListElement;

        for (const item of this.itemsList) {
            const toggle = document.createElement('li');
            toggle.innerHTML = item.getInnerHtml();
            collapsableList.insertAdjacentElement('beforeend', toggle);
        }
    }

    handleClick() {
        const collapsableList = this.element.querySelector('ul')! as HTMLUListElement;

        if (collapsableList.classList.contains('show')) {
            collapsableList.classList.remove('show');
        } else {
            collapsableList.classList.add('show');
        }
    }

}