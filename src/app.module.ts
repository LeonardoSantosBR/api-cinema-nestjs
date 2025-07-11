import { Module } from '@nestjs/common';
import { CinemasModule } from './modules/cinemas/cinemas.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { MoviesModule } from './modules/movies/movies.module';
import { SessionsModule } from './modules/sessions/sessions.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    CinemasModule,
    RoomsModule,
    MoviesModule,
    SessionsModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
