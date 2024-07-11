import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Phone } from 'src/entities/phone.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PhonesService {
    constructor(@InjectRepository(Phone) private readonly phoneRepository: Repository<Phone>){}

    async getPhoneById(id: number){
        try{
            if(!id) throw new BadRequestException('No se ha ingresado id de telefono');
            return await this.phoneRepository.findOne({where: {id}});
        }catch(e){
            console.log(e);
            throw new NotFoundException('No se encuentra el telefono');
        }
    }

    async getPhoneByNumber(prefix: string, number: string){
        try{
            if(!prefix || !number) throw new BadRequestException('No se ha ingresado telefono');
            return await this.phoneRepository.findOne({where: {prefix, number}});
        }catch(e){
            console.log(e);
            throw new NotFoundException('No se encuentra el telefono');
        }
    }

    async createPhone(phone: Phone) {
        try{
            // const newPhone = await this.phoneRepository.create(phone);
            return await this.phoneRepository.save(phone);
        }catch(e){
            console.log(e);
            throw new InternalServerErrorException('Problema para crear telefono');
        }
    }
}
