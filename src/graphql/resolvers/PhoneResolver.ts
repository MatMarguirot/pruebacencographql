import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { User } from "src/entities/user.entity";
import { CreateUserInput } from "../input-types/CreateUserInput";
import { PhonesService } from "src/phones/phones.service";
import { Phone } from "src/entities/phone.entity";
import { CreatePhoneInput } from "../input-types/CreatePhoneInput";
import { UsersService } from "src/users/users.service";
import { ConflictException } from "@nestjs/common";

@Resolver((of) => Phone)
export class PhoneResolver {
    constructor(
        private readonly phoneService: PhonesService,
        private readonly userService: UsersService,

    ){}

    @Query((returns) => Phone, {nullable: true}) 
    async getPhoneById(@Args('id', { type: () => Int }) id: number) { 
        return this.phoneService.getPhoneById(id);
    };

    @Mutation(returns => Phone)
    async createPhone(
        @Args('createPhoneData') createPhoneData: CreatePhoneInput,
    ){
        const {prefix, number, user_id} = createPhoneData;

        // verificar si telefono existe
        const phoneExists = await this.phoneService.getPhoneByNumber(prefix, number) ? true : false;
        
        if(phoneExists) throw new ConflictException('Telefono ya existe'); 

        const user = await this.userService.getUserById(user_id);

        // verifica si usuario tiene telefono
        if(user.phone) throw new ConflictException('Ya existe un usuario con ese telefono');

        // retorna null si no encuentra relaciones
        const newPhone = {prefix, number, user} as Phone;
        console.log('New Phone:');
        console.log(newPhone);
        try{
            return await this.phoneService.createPhone(newPhone);
        }catch(e){
            console.log(e);
            throw e;
        }
        // return newPhone;

    }

}