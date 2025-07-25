    import express from 'express';
    import dotenv from 'dotenv';
    import connectDB from './config/db.js';
    import cors from 'cors';
    import morgan from 'morgan';


    // Routes
    import authRoutes from './routes/authRoutes.js';
    import postRoutes from './routes/postRoutes.js';
    import commentRoutes from './routes/commentRoutes.js';
    // (add postRoutes, userRoutes, commentRoutes as needed)

    dotenv.config();
    connectDB();

    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(morgan('dev'));
    app.use('/api/posts', postRoutes);
    app.use('/api/comments', commentRoutes);

    // API Routes
    app.use('/api/auth', authRoutes);
    // Add other routes...

    app.get('/', (req, res) => res.send('API is running...'));

    const PORT = process.env.PORT || 38808; //it means error lol
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
