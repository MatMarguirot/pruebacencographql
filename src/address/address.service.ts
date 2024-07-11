import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/entities/address.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AddressService {
    constructor(@InjectRepository(Address) private readonly addressRepository: Repository<Address>){}

    async getAddressById(id: number){
        try{
            return await this.addressRepository.findOneBy({id});
        }catch(e){
            console.log(e);
            throw new NotFoundException('No se encontro direccion con id '+id);
        }
    }

    async createAddress(address: Address) {
        try{
            return await this.addressRepository.save(address);
        }catch(e){
            console.log(e);
            throw new HttpException('Error al crear usuario', HttpStatus.BAD_REQUEST);
        }
    }
}
