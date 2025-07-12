import { Module } from '@nestjs/common';
import { CinemasModule } from './modules/cinemas/cinemas.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { MoviesModule } from './modules/movies/movies.module';
import { SessionsModule } from './modules/sessions/sessions.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SessionSeatsModule } from './modules/session-seats/session-seats.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    CinemasModule,
    RoomsModule,
    MoviesModule,
    SessionsModule,
    ScheduleModule.forRoot(),
    SessionSeatsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
