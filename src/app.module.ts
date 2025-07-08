import { Module } from '@nestjs/common';
import { CinemasModule } from './modules/cinemas/cinemas.module';

@Module({
  imports: [CinemasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
