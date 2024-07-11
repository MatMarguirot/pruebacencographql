import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
// import { User } from "../models/User";
import { User } from "src/entities/user.entity";
import { CreateUserInput } from "../input-types/CreateUserInput";
import { UsersService } from "src/users/users.service";
import { PhonesService } from "src/phones/phones.service";
import { AddressService } from "src/address/address.service";
import { BadRequestException, ConflictException, NotFoundException } from "@nestjs/common";
import { Phone } from "src/entities/phone.entity";

@Resolver((of) => User)
export class UserResolver {
    constructor(
        private readonly userService: UsersService,
        private readonly phoneService: PhonesService,
        private readonly addressService: AddressService,
    ){}

    @Query((returns) => User, {nullable: true}) 
    async getUserById(@Args('id', { type: () => Int }) id: number) { 
        return this.userService.getUserById(id).catch((e) => {throw e});
    };

    @Query((returns) => User, {nullable: true}) 
    async getUserByRut(@Args('rut', { type: () => String }) rut: string) { 
        return this.userService.getUserByRut(rut).catch((e) => {throw e});
    };

    @Query((returns) => [User], {nullable: true}) 
    async getAllUsers() { 
        return this.userService.getAllUsers();
    };
    
    @Mutation(returns => User)
    async createUser(
        @Args('createUserData') createUserData: CreateUserInput,
    ){
        const {phone_id, address_id, ...userData} = createUserData;

        // revisar si usuario existe
        const existingUser = await this.userService.getUserByRut(userData.rut);
        if(existingUser) throw new ConflictException('Ya existe usuario con este rut');
        
        // // si vienen ids, obtener entidades
        // const phone = phone_id ? await this.phoneService.getPhoneById(phone_id) : undefined;
        // const address = address_id ? await this.addressService.getAddressById(address_id) : undefined;
        // if(!phone || !address) throw new BadRequestException(); 

        // const newUser = {...userData, phone, address} as User;
        const newUser = {...userData} as User;
        console.log(newUser);
        return await this.userService.createUser(newUser).catch((e) => {
            console.log(e);
            throw e;
        });
        try{
        }catch(e){
            console.log(e);
            throw e;
        }
        // return newUser;

    }

    // @ResolveField((returns) => Phone, {nullable: true, name: 'phone'})
    // async getPhone
}