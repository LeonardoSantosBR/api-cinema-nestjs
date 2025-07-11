import { PartialType } from '@nestjs/mapped-types';
import { CreateSessionSeatDto } from './create-session-seat.dto';

export class UpdateSessionSeatDto extends PartialType(CreateSessionSeatDto) {}
