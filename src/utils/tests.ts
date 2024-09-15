import { execSync } from 'child_process';
// eslint-disable-next-line import/no-extraneous-dependencies
import axiosInstance from 'axios';

import { startServer, stopServer } from '@/server';
import prisma from '@/lib/prisma/client';
import envs from '@/lib/envs';

export const beforeEachTest = async () => {
  execSync(`export DATABASE_URL=${envs.DATABASE_URL} && npx prisma migrate reset --force`);
  await startServer();
};

export const afterEachTest = async () => {
  await prisma.$disconnect();
  await stopServer();
};

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;
axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.validateStatus = () => true;

export const axios = axiosInstance;
