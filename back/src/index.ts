import { app } from './server';
import { PORT } from './config/envs';
import { AppDataSource } from './config/data-source';

AppDataSource.initialize()
.then(res=>{
    console.log("Coneccion realizada con exito");
    
    app.listen(PORT,()=>{
        console.log(`Server listening on port:${PORT}` );
        
    })
})