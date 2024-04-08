import { Injectable, Logger } from '@nestjs/common';
import { CreatePlayerDto } from './dto/createPlayer.dto';
import { Player } from './interfaces/player.interface';
import { randomUUID } from 'crypto';

@Injectable()
export class PlayersService {
  private players: Player[] = [];
  private readonly logger = new Logger(PlayersService.name);

  async createPlayer(createPlayerDto: CreatePlayerDto): Promise<string> {
    this.logger.log(`createPlayerDto: ${JSON.stringify({ createPlayerDto })}`);
    return 'This action adds a new player';

    await this.create(createPlayerDto);
  }

  private create(createPlayerDto: CreatePlayerDto) {
    const { name, email, phone } = createPlayerDto;
    const player = {
      _id: randomUUID(),
      name,
      email,
      phone,
      ranking: 1,
      positionRanking: 1,
      urlPhotoPlayer: 'www.google.com',
      category: 'Profissional',
    };
    this.logger.log(`player: ${JSON.stringify(player)}`);
    this.players.push(player);

    // async findAll() {
    //     return 'This action returns all players';
    // }

    // async findOne(id: string) {
    //     return `This action returns a #${id} player`;
    // }

    // async update(id: string) {
    //     return `This action updates a #${id} player`;
    // }

    // async remove(id: string) {
    //     return `This action removes a #${id} player`;
    // }
  }
}
