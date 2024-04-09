import { Module } from '@nestjs/common';
import { AthletesModule } from './athletes/athletes.module';

@Module({
  imports: [AthletesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
