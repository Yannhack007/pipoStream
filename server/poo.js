function addClassToCours(etiq, classe) {
    const fs = require('fs');
    const rawData = fs.readFileSync('fichier.json');
    const data = JSON.parse(rawData);
  
    data[etiq].id_class = classe;
  
    const modifiedData = JSON.stringify(data, null, 4);
    fs.writeFileSync('fichier.json', modifiedData);
  }
  
  function removeClassToCours(etiq, classe) {
    const fs = require('fs');
    const rawData = fs.readFileSync('fichier.json');
    const data = JSON.parse(rawData);
  
    const index = data[etiq].class.indexOf(classe);
    if (index > -1) {
      data[etiq].class.splice(index, 1);
    }
  
    const modifiedData = JSON.stringify(data, null, 4);
    fs.writeFileSync('fichier.json', modifiedData);
  }
  
  function setDescription(etiq, description) {
    const fs = require('fs');
    const rawData = fs.readFileSync('fichier.json');
    const data = JSON.parse(rawData);
  
    data[etiq].description = description;
  
    const modifiedData = JSON.stringify(data, null, 4);
    fs.writeFileSync('fichier.json', modifiedData);
  }

  functionGetCoursByIdclass(id_class){
    const fs = require('fs');
    const rawData = fs.readFileSync('fichier.json');
    const data = JSON.parse(rawData);

    var tab =[];
    tab.push(data[etiq.substring(0,2)+"00"]);
    tab.push(data[etiq.substring(0,3)+"0"]);
        const modifiedData = JSON.stringify(data, null, 4);
    fs.writeFileSync('fichier.json', modifiedData);
    return tab;
  
  }
  
  export { addClassToCours, removeClassToCours, setDescription };
  