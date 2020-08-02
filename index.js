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
    const totalCities = cityState.length;
    console.log(`O Estado de ${uf.toUpperCase()} possuí ${totalCities} cidade(s).`);
    return totalCities;
}

unionStatesCities();
countCities('SP');