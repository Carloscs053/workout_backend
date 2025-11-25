// const { v4: uuid } = require('uuid');

let generaId

(async () => {
    const { v4 } = await import('uudi')

    generaId = v4
})()

class Tarea {
    
    id = '';
    desc = '';
    completadoEn = null;

    constructor( desc ) {

        this.id = generaId;
        this.desc = desc;
        this.completadoEn = null;

    }

}



module.exports = Tarea;
