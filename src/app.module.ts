import { Module } from '@nestjs/common';
import { AthletesModule } from './athletes/athletes.module';
import { MongooseModule } from "@nestjs/mongoose";
import { CategoriesModule } from './categories/categories.module';

//DB Conection

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://applicationAuth:RMtilkbQselI6Aw8@mytranningcenter.dsyay0i.mongodb.net/mytranningCenter'),
    AthletesModule,
    CategoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
