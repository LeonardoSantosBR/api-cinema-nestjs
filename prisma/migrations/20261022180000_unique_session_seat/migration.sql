-- Prevents the same seat from being reserved twice in the same session.
ALTER TABLE `session_seats`
  ADD UNIQUE INDEX `session_seats_session_id_seat_id_key` (`session_id`, `seat_id`);
