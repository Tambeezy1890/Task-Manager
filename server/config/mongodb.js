import { PORT , DB_URI, NODE_ENV} from "./env.js" 
import mongoose from 'mongoose'

const connectToDataBase = async()=>{
    const connect = await mongoose.connect(DB_URI);
    if(connect){
        console.log(`Connected successfully in ${NODE_ENV}`)
    }
}
export default connectToDataBase