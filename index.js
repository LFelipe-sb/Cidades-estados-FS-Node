import  {promises as fs} from 'fs';
import readline from 'readline';

function unionStatesCities(){
    fs.readFile('Estados.json', 'utf-8').then((allStates) => {
        JSON.parse(allStates).map((eachState) => {
            fs.writeFile(eachState.Sigla + '.json', '').then(() => {
                fs.readFile('Cidades.json').then((allCities) => {
                    let cities = [];
                    JSON.parse(allCities).map((eachCity) => {
                        if(eachCity.Estado == eachState.ID){
                            cities.push({
                                ID: eachCity.ID,
                                Nome: eachCity.Nome,
                                Estado: eachCity.Estado
                            });
                        }
                    });     
                    fs.readFile(eachState.Sigla + '.json').then(() => {
                        fs.writeFile(eachState.Sigla + '.json', JSON.stringify(cities)); //Sobrescrevendo o arquivo.
                    }).catch(err => {
                        console.log(err);
                    });
                }).catch(err => {
                    console.log(err);
                });
            });
        });
    }).catch(err => {
        console.log(err);
    });
}

function countCities(){
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Informe o UF do estado desejado: ', (uf) => {
        fs.readFile(uf + '.json').then((cityState) => {
            const data = JSON.parse(cityState);
            console.log(data.length);
        }).catch(err => {
            console.log(err);
        });
        rl.close();
    });
}

unionStatesCities();
countCities();