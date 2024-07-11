import { Field, InputType, Int } from "@nestjs/graphql";
import { Address } from "src/entities/address.entity";
import { Phone } from "src/entities/phone.entity";
import { User } from "src/entities/user.entity";

// basicamente dto
@InputType()
export class CreateAddressInput{
    @Field()
    street: string;
    
    @Field()
    number: number;
    
    @Field(() => [Int], {nullable: true})
    user_ids?: [number];
}