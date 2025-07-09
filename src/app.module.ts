import { Module } from '@nestjs/common';
import { CinemasModule } from './modules/cinemas/cinemas.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { MoviesModule } from './modules/movies/movies.module';

@Module({
  imports: [CinemasModule, RoomsModule, MoviesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
