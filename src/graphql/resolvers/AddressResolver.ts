import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { User } from "src/entities/user.entity";
import { CreateUserInput } from "../input-types/CreateUserInput";
import { PhonesService } from "src/phones/phones.service";
import { Phone } from "src/entities/phone.entity";
import { CreatePhoneInput } from "../input-types/CreatePhoneInput";
import { UsersService } from "src/users/users.service";
import { AddressService } from "src/address/address.service";
import { Address } from "src/entities/address.entity";
import { CreateAddressInput } from "../input-types/CreateAddressInput";

@Resolver((of) => Address)
export class AddressResolver {
    constructor(
        private readonly addressService: AddressService,
        private readonly userService: UsersService,
    ){}

    @Query((returns) => Address, {nullable: true}) 
    async getAddressById(@Args('id', { type: () => Int }) id: number) { 
        return this.addressService.getAddressById(id);
    };

    @Mutation(returns => Address)
    async createAddress(
        @Args('createAddressData') createAddressInput: CreateAddressInput,
    ){
        const {user_ids, ...createAddressData} = createAddressInput;
        
        const users = user_ids ? await this.userService.getUsersById(user_ids) : null;
        // if(!users) return null;


        const newAddress = {...createAddressData, users} as Address;
        return await this.addressService.createAddress(newAddress);
        // return newAddress;

    }

}