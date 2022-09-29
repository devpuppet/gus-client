export class BDLClient {

    public async sendGet() {
        const response = await fetch('https://bdl.stat.gov.pl/api/v1/data/by-variable/3643?format=jsonapi&year=2000&year=2010', {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        });

        console.log(response);
    }
}