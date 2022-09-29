export abstract class Component<H extends HTMLElement, E extends HTMLElement> {
    private readonly template: HTMLTemplateElement;
    private readonly host: H;
    protected readonly element: E;
    protected readonly id?: string;
    
    constructor(templateId: string, hostId: string, elementId?: string) {
        this.template = document.getElementById(templateId) as HTMLTemplateElement;
        this.host = document.getElementById(hostId) as H;

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

    abstract configure(): void;
    abstract renderContent(): void;
}