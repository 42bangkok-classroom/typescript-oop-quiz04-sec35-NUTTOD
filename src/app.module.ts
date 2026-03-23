import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService, UserService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
