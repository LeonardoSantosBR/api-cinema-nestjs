import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { health } from 'src/swagger/decorators/health';

@ApiTags('health')
@Controller('health')
export class HealthRouter {
  
  @health()
  async health() {
    return {
      status: 'ok',
      service: 'api-cinema',
      timestamp: new Date().toISOString(),
    };
  }
}
