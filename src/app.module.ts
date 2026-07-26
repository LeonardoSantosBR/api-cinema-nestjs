import { Module } from '@nestjs/common';
import { CinemasModule } from './modules/cinemas/cinemas.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { MoviesModule } from './modules/movies/movies.module';
import { SessionsModule } from './modules/sessions/sessions.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SessionSeatsModule } from './modules/session-seats/session-seats.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthGuard } from './modules/auth/auth.guard';
import { AdminsModule } from './modules/admins/admins.module';

@Module({
  imports: [
    CinemasModule,
    RoomsModule,
    MoviesModule,
    SessionsModule,
    ScheduleModule.forRoot(),
    SessionSeatsModule,
    UsersModule,
    AuthModule,
    AdminsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
