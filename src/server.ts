import express from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors';
import { protect } from './modules/auth';
import { createNewUser, signIn } from './handlers/user';

const app = express();

app.use(morgan('dev'));
app.use(cors({
  origin: 'http://localhost:5173'
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  console.log('hello from server');
  res.status(200)
  res.json({ message: 'Hello from server' })
})

app.use('/api', protect, router)

app.post('/user', createNewUser)
app.post('/signin', signIn)

app.use((err, req, res, next) => {
  console.log(err)
  if (err.type === 'auth') {
    res.status(401).json({ message: 'Unauthorized' })
  } else if (err.type === 'input') {
    res.status(400).json({ message: 'Invalid Input' })
  } else {
    res.status(500).json({ message: 'Internal Server Error' })
  }
})


export default app