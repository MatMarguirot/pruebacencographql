import { Field, InputType, Int } from "@nestjs/graphql";
import { Address } from "src/entities/address.entity";
import { Phone } from "src/entities/phone.entity";
import { User } from "src/entities/user.entity";

// basicamente dto
@InputType()
export class CreatePhoneInput{
    @Field()
    prefix: string;
    
    @Field()
    number: string;
    
    @Field((type) => Int)
    user_id: number;
}