import { Module } from '@nestjs/common';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Pokemon.name,
        schema: PokemonSchema,
      }
    ])
  ],
  controllers: [PokemonController],
  providers: [PokemonService],
  exports: [MongooseModule]
})
export class PokemonModule { }
