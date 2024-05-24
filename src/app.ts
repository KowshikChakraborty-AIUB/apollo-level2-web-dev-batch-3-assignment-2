import express, { Request, Response } from 'express';
import { ProductRoutes } from './modules/Product/product.route';
const app = express()

//parsers
app.use(express.json());

app.use('/api/products', ProductRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Products and Orders Api Creation')
})

export default app;