// seeds/seed.ts
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AppModule } from './src/app.module';
import { Problem, ProblemDocument } from './src/problems/schemas/problem-schema';
import { sampleProblems } from 'seeds/problems';
import { TestCase, TestCaseDocument } from 'src/executer/schemas/test_cases.schema';
import { sampleTestCases } from 'seeds/testcases';

async function bootstrap() {
  // 1. Create an *application-context* (no HTTP server)
  const app = await NestFactory.createApplicationContext(AppModule);

  // 2. Resolve the model from the DI container
  const problemModel = app.get<Model<ProblemDocument>>(
    getModelToken(Problem.name),
  );
  const testCaseModel = app.get<Model<TestCaseDocument>>(
    getModelToken(TestCase.name),
  );

  // 3. Insert your dummy data (or upsert / clear first — your choice)
  await problemModel.deleteMany({});
  await problemModel.insertMany(sampleProblems);

  await testCaseModel.deleteMany({});
  await testCaseModel.insertMany(sampleTestCases);

  console.log('✔️  Seed completed');

  // 4. Properly shut down the connection
  await app.close();
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
