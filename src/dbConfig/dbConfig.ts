import mongoose from 'mongoose';

async function connectDB() {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        });
        connection.on('error', (error) => {
            console.log('MongoDB connection error. Please make sure MngoDB is running. '+error);
            process.exit();
        })
    } catch(error) {
        console.log('Something went wrong!');
        console.log(error);
    }
}

export { connectDB };