import { Module } from '@nestjs/common';
import { CinemasModule } from './modules/cinemas/cinemas.module';
import { RoomsModule } from './modules/rooms/rooms.module';

@Module({
  imports: [CinemasModule, RoomsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
