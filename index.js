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
                    Name: eachCity.Nome,
                    State: eachCity.Estado,
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

async function countNames(uf){
    let names = [];
    const cityState = JSON.parse(await fs.readFile(uf + '.json'));
    
    names = Promise.all(
        cityState.map((eachCity) => {
            const obj = {
                stateName: uf,
                cityName: eachCity.Name,
                sizeName: eachCity.Name.length
            }
            return obj;
        })
    );

    let teste = await names;
    return teste;
}

async function topFiveMoreCities(){
    console.log('-------> Estados com mais cidades <--------');
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

async function topFiveLessCities(){
    console.log('-------> Estados com menos cidades <---------');
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

async function biggestName(){
    console.log('-------> Cidades com maior nome <---------');
    const allStates = JSON.parse(await fs.readFile('Estados.json'));
    allStates.map(async({Sigla}) => {
        const item = await countNames(Sigla);  
        item.sort((a, b) => b.sizeName - a.sizeName);         
        console.log(item[0]);
    })
}

async function lessName(){
    console.log('-------> Cidades com menor nome <---------');
    const allStates = JSON.parse(await fs.readFile('Estados.json'));
    allStates.map(async({Sigla}) => {
        const item = await countNames(Sigla);  
        item.sort((a, b) => a.sizeName - b.sizeName);        
        console.log(item[0]);
    })
}

async function biggestNameAllCities(){
    console.log('-------> Maior nome de todas as cidades <---------');
    const allCities = JSON.parse(await fs.readFile('Cidades.json'));
    allCities.sort((a, b) => a.Nome.length - b.Nome.length);
    console.log(allCities);
}

async function lessNameAllCities(){
    console.log('-------> Menor nome de todas as cidades <---------');
    const allCities = JSON.parse(await fs.readFile('Cidades.json'));
    allCities.sort((a, b) => b.Nome.length - a.Nome.length);
    console.log(allCities[0]);
}

    unionStatesCities();
    countCities('SP');
    topFiveMoreCities();
    topFiveLessCities();
    countNames('SP');
    biggestName();
    lessName();
    biggestNameAllCities();
    lessNameAllCities();