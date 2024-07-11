import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "./address.entity";
import { Phone } from "./phone.entity";
import { Field, Int, ObjectType } from "@nestjs/graphql";

@Entity({name: 'user'})
@ObjectType()
export class User {
    @Field((type) => Int)
    @PrimaryGeneratedColumn()
    id: number;
    
    @Field()
    @Column({unique: true, nullable: false})
    rut: string;
    
    @Field()
    @Column({length: 20, nullable: false})
    first_name: string;
    
    @Field()
    @Column({length: 20, nullable: false})
    last_name: string;

    @ManyToOne(() => Address, (address) => address.users, {nullable: true, eager: true, cascade: true})
    @JoinColumn({name: 'address_id'})
    @Field( (type) => Address, {nullable: true})
    address: Address;
    
    // cascade no funciona, pero en address si
    @OneToOne(() => Phone, (phone) => phone.user, {nullable: true, eager: true, cascade: true})//['remove', 'update']}) 
    @JoinColumn({name: 'phone_id'})
    @Field( (type) => Phone, {nullable: true})
    phone?: Phone

}