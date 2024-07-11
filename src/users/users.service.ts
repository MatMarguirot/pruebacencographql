import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){}

    async getUserById(id: number){
        if(!id) throw new BadRequestException('No se ha ingresado id');
        const user = await this.userRepository.findOne({where: {id}});
        if(!user) {
            console.log('Usuario no encontrado');
            throw new NotFoundException('No se ha encontrado al usuario');
        }
        return user;
    }
    async getAllUsers(){
        return await this.userRepository.find().catch((e) => {
            console.log(e);
            throw new NotFoundException
        });
    }
    async getUserByRut(rut: string){
        if(!rut) throw new BadRequestException();
        return await this.userRepository.findOne({where: {rut}});
    }
    async getUsersById(ids: number[]){
        if(!ids.length || ids.length === 0) throw new BadRequestException('No se ha enviado ids');
        return await this.userRepository.find({where: {id: In(ids)}}).catch((e) => console.log(e));
        try{
        }catch(e){
            console.log(e);
            return null;
        }
    }

    async createUser(user: User){
        try{
            // const newUser = await this.userRepository.create(user);
            return await this.userRepository.save(user);
        }catch(e){
            console.log(e);
            return null;
        }
    }
}
