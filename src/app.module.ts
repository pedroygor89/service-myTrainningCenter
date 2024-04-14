import { Module } from '@nestjs/common';
import { AthletesModule } from './athletes/athletes.module';
import { MongooseModule } from "@nestjs/mongoose";

//DB Conection

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://applicationAuth:RMtilkbQselI6Aw8@mytranningcenter.dsyay0i.mongodb.net/',
    {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false}),
    AthletesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
