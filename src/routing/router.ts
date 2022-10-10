import { views } from "./views";

export class Router {
    private readonly routerOutlet = document.getElementById('app')! as HTMLDivElement;
    private readonly routes: Route = {};
    private readonly templates: Template = {};

    constructor() {
        this.configureRouter();
    }

    private configureRouter(): void {
        for (const view of views) {
            this.addTemplate(view.name, view.renderView);
            this.addRoute(view.route, view.name);
        }

        window.addEventListener('load', this.route.bind(this));
        window.addEventListener('hashchange', this.route.bind(this));
    }
    
    private addRoute(path: string, template: string | (() => void) ): void {
        if (typeof template === 'function') {
            this.routes[path] = template;
        }
        else if (typeof template === 'string') {
            this.routes[path] = this.templates[template];
        } else {
            throw new Error(`Unknown path = ${path} and templayte = ${template}`);
        }
    };
    
    private addTemplate(name: string, templateFunction: (() => void)): void {
        this.templates[name] = templateFunction;
    }
    
    private resolveRoute(route: string) {
        try {
            return this.routes[route];
        } catch (e) {
            throw new Error(`Route ${route} not found!`);
        }
    }
    
    private route() {
        let url = window.location.hash.slice(1) || '/';
        let resolvedRoute = this.resolveRoute(url);
    
        this.clearView();
        resolvedRoute();
    }

    private clearView() {
        this.routerOutlet.textContent = '';
    }
    
}

export interface Route {
    [route: string]: () => void
}

export interface Template {
    [template: string]: () => void
}