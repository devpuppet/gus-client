export abstract class HttpClient {
    public async sendGet(url: string, options: HttpOptions) {
        try {
            const response = await fetch(this.buildFullUrl(url, options.searchParams), {
                method: HttpMethod.GET,
                headers: options.headers
            });

            if (!response.ok) {
                throw new Error(`Error occured.\nURL: ${response.url}\nStatus: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();

            return result;
        } catch(error) {
            if (error instanceof Error) {
                throw new Error(`Error message: ${error.message}`);
            } else {
                throw new Error(`Unexpected error: ${error}`);
            }
        }
    }

    private buildFullUrl(url: string, searchParams?: SearchParams) {
        const fullUrl: URL = new URL(url);

        for (const param in searchParams) {
            fullUrl.searchParams.append(param, searchParams[param]);
        }

        return fullUrl;
    }
}

export interface HttpOptions {
    searchParams?: SearchParams;
    headers?: { [header: string] : string }
}

interface SearchParams {
    [param: string]: string
}

enum HttpMethod {
    GET = 'GET',
    POST = 'POST'
}