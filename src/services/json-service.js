export default class JsonService {
    _apiBase = 'ListOfTrees.json';
    async getResponse() {
        let res = await fetch(`${this._apiBase}`);
        // if(!res.ok){
        //     throw new Error('Aaaaa!!!')
        // }
        res = await res.json(); 
        res = Object.values(res);        
        return res;  
    }
    getTrees = async () => {
        const res = await this.getResponse();
        return res.map(this._transformTree);
    }
    _transformTree = (tree) =>{       
        return {
            name: tree.type,
            age: tree.age,
            height: tree.treeHeight,
            geoposition: [tree.latitude, tree.longitude],
            image: tree.image,
            date: tree.additionDate
        }
    }
}