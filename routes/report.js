import express from 'express';

const reportRouter = express.Router();

reportRouter.get('/all', (req, res) => { })
reportRouter.post('/report', (req, res) => { })
reportRouter.post('/change', (req, res) => { })


export default reportRouter;