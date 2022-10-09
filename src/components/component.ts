export abstract class Component<H extends HTMLElement, E extends HTMLElement> {
    private readonly template: HTMLTemplateElement;
    protected readonly element: E;
    protected readonly id?: string;
    
    constructor(templateId: string, private readonly host: H, elementId?: string) {
        this.template = document.getElementById(templateId) as HTMLTemplateElement;

        const node = document.importNode(this.template.content, true);
        this.element = node.firstElementChild as E;

        if (elementId) {
            this.id = elementId;
            this.element.id = elementId;
        }

        this.attach();
    }

    private attach() {
        this.host.insertAdjacentElement('beforeend', this.element);
    }

    public getInnerHtml() {
        return this.element.innerHTML;
    }

    abstract configure(): void;
    abstract renderContent(): void;
}