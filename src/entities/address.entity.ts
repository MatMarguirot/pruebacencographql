import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Field, Int, ObjectType } from "@nestjs/graphql";

@Entity({name: 'address'})
@ObjectType()
export class Address {
    @PrimaryGeneratedColumn()
    @Field((type) => Int)
    id: number;

    @Column({length: 50})
    @Field()
    street: string;

    @Column()
    @Field()
    number: number;

    @OneToMany(() => User, (user) => user.address, {nullable: true})
    @Field((type) => [User])
    users: User[]; 
}