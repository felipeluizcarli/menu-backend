import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';


import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGuestCheckDto } from './dto/create-guest-check';
import { GuestCheck, GuestCheckStatus } from './guest-checks.entity';
import { Spot } from '../spots/spot.entity';



@Injectable()
export class GuestChecksService {
  constructor(
    @InjectRepository(GuestCheck)
    private readonly guestCheckRepository: Repository<GuestCheck>,

    @InjectRepository(Spot)
    private readonly spotRepository: Repository<Spot>,
  ) {}

  async create(dto: CreateGuestCheckDto): Promise<GuestCheck> {
    // Regra 1: nao se abre mesa comanda em mesa inexistent
    const spot = await this.spotRepository.findOneBy({
      id: dto.spotId,
      active: true,
    });

    if (!spot) {
      throw new NotAcceptableException(
        'Nao foi encotrada uma mesa ativa com este ID',
      );
    }

    // regra 2 = Nao se abre comanda em mesa com comanda aberta
    const opned = await this.guestCheckRepository.exists({
      where: {
        spot: { id: dto.spotId },
        status: GuestCheckStatus.OPENED,
      },
    });

    if (opned) {
      throw new ConflictException('A mesa ja possui uma comanda aberta');
    }

    // Se chegar aqui, deu boa... Grava registro
    const guestCheck = this.guestCheckRepository.create({
      spot,
      status: GuestCheckStatus.OPENED,
    });

    return this.guestCheckRepository.save(guestCheck);
  }

   async findOne(id: string): Promise<GuestCheck> {
      const guestCheck = await this.guestCheckRepository.findOneBy({ id });

      if (!guestCheck) {
        throw new NotFoundException('Comanda não encontrada!');
      }
  
      return guestCheck;
    }
  

  async close(id: string): Promise<GuestCheck> {
    const guestCheck = await this.findOne(id);

    //regra 1= So posso fechar uma comanda aberta
    if (guestCheck.status !== GuestCheckStatus.CLOSED) {
      throw new BadRequestException(
        'A comanda ja esta fechada')
      )};

    //regra 2= nao posso fechar uma comanda com pedidos que nao foram entregues
    //TO_DO: Implementar isto depois (divida tecnica)

    // Se chegar aqui, deu boa
    
    guestCheck.status = GuestCheckStatus.CLOSED;

    return this.guestCheckRepository.save(guestCheck);

    }

    findOpendBySpotId(spotId: string): Promise<GuestCheck | null > {
      return this.guestCheckRepository.findOne({
        where: {
          spot: { id: spotId },
          status: GuestCheckStatus.OPENED,
        },
        relations: ['spot'],
      });
    }  

    async findOrCreateOpened(spotId: string): Promise<GuestCheck> {
      const opned = await this.findOpendBySpotId(spotId);



      //Fluxo do SIM
    if (opened){
      return opened;
    }

    //Fluxo do NAO
    return this.create({ spotId });


  }
}