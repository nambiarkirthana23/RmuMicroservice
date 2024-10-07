// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ExpressAdapter } from '@nestjs/platform-express';
// import * as express from 'express';
// import { ValidationPipe } from '@nestjs/common';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// // import * as dotenv from 'dotenv';
// //import { config } from 'dotenv'

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   const config = new DocumentBuilder()
//     .setTitle('Cats example')
//     .setDescription('The cats API description')
//     .setVersion('1.0')
//     .addTag('cats')
//     .build();
    
//   const document = SwaggerModule.createDocument(app, config);
//   SwaggerModule.setup('api', app, document);

//   // await app.listen(3000);
//   // dotenv.config();
//   // config();
//   //console.log('Loaded Environment Variables:', process.env);
//   // const server = express();
//   // const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
//   // await app.init();

//   // app.useGlobalPipes(new ValidationPipe());
//   // await app.init();
//   // return server;
// }

// bootstrap()
//   // .then((server) => {
//   //   server.listen(3000, () =>
//   //     console.log('Gateway is running on http://localhost:3000'),
//   //   );
//   // })
//   // .catch((err) => console.error('Gateway initialization failed', err));
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
async function bootstrap() {
  const expressApp = express();
  dotenv.config();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));

  // Enable global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Rmu')
    .setDescription('The Rmu Server API description')
    .setVersion('1.0')
    .addTag('rmu')
    .build();
   
  const document = SwaggerModule.createDocument(app, config);

  // Serve Swagger UI at /api
  SwaggerModule.setup('api', app, document);

  // Your other middleware and route configurations go here

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

bootstrap();
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ExpressAdapter } from '@nestjs/platform-express';
// import * as express from 'express';
// import { ValidationPipe } from '@nestjs/common';
// // import * as dotenv from 'dotenv';
// //import { config } from 'dotenv'

// async function bootstrap() {
//   // dotenv.config();
//   // config();
//   //console.log('Loaded Environment Variables:', process.env);
//   const server = express();
//   const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
//   await app.init();

//   app.useGlobalPipes(new ValidationPipe());
//   await app.init();
//   return server;
// }

// bootstrap()
//   .then((server) => {
//     server.listen(3000, () =>
//       console.log('Gateway is running on http://localhost:3000'),
//     );
//   })
//   .catch((err) => console.error('Gateway initialization failed', err));