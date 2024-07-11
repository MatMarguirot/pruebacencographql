import { Field, InputType, Int } from "@nestjs/graphql";
import { Address } from "src/entities/address.entity";
import { Phone } from "src/entities/phone.entity";

// basicamente dto
@InputType()
export class CreateUserInput{
    @Field()
    first_name: string;

    @Field()
    last_name: string;

    @Field()
    rut: string;
    
    @Field((type) => Int, {nullable: true})
    phone_id?: number;

    @Field((type) => Int, {nullable: true}) // cast a int?
    address_id?: number;
}