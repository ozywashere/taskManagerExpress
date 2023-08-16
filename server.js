import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import connectDB from './connectDB.js';
import taskRouter from './routes/taskRouter.js';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import notFoundMiddleware from './middleware/notFoundMiddleware.js';
dotenv.config({ path: './.env' });
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
//routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/api/v1/tasks', taskRouter);



//middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
connectDB();
