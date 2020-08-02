import  {promises as fs} from 'fs';

async function unionStatesCities(){
    const allStates = JSON.parse(await fs.readFile('Estados.json', 'utf-8'));
    allStates.map(async(eachState) => {
        fs.writeFile(eachState.Sigla + '.json', '');
        const allCities = JSON.parse(await fs.readFile('Cidades.json'));
        let cities = [];
        allCities.map((eachCity) => {
            if(eachCity.Estado == eachState.ID){
                cities.push({
                    ID: eachCity.ID,
                    Nome: eachCity.Nome,
                    Estado: eachCity.Estado
                });
            }
        });     
        fs.readFile(eachState.Sigla + '.json');
        fs.writeFile(eachState.Sigla + '.json', JSON.stringify(cities)); //Sobrescrevendo o arquivo. 
    });
}

async function countCities(uf){
    const cityState = JSON.parse(await fs.readFile(uf + '.json'));
    return cityState.length;
}

async function topFiveMoreCities(){
    let totalCitiesForState = [];
    const allStates = JSON.parse(await fs.readFile('Estados.json'));

    totalCitiesForState = Promise.all(
        allStates.map(async({Sigla}) => {
            const obj = {
                UF: Sigla,
                totalCities: await countCities(Sigla)
            };
            return obj;
        })
    );

    let topFive = await totalCitiesForState;
    topFive.sort((a, b) => a.totalCities - b.totalCities);
    for(let i = 0; i < 5; i++){
        console.log(topFive[i]);
    }
}

async function topFiveLessCities(){
    let totalCitiesForState = [];
    const allStates = JSON.parse(await fs.readFile('Estados.json'));

    totalCitiesForState = Promise.all(
        allStates.map(async({Sigla}) => {
            const obj = {
                UF: Sigla,
                totalCities: await countCities(Sigla)
            };
            return obj;
        })
    );

    let topFive = await totalCitiesForState;
    topFive.sort((a, b) => b.totalCities - a.totalCities);
    for(let i = 0; i < 5; i++){
        console.log(topFive[i]);
    }
}

unionStatesCities();
countCities('SP');
topFiveMoreCities();
topFiveLessCities();