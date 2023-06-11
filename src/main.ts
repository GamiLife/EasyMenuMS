import { ValidationPipe } from "@nestjs/common";
import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ResponseInterceptor } from "./core/interceptors";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "./core/guards";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix("easymenu/api/v1");

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
    })
  );

  app.useGlobalInterceptors(new ResponseInterceptor(app.get(Reflector)));
  app.useGlobalGuards(new AuthGuard(app.get(JwtService), app.get(Reflector)))

  await app.listen(4200);
}
bootstrap();
