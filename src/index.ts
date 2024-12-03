import dotenv from 'dotenv';
import { ArbitragePlatform } from './platform';

dotenv.config();

const platform = new ArbitragePlatform();
platform.start().catch(console.error);