import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Field, Int, ObjectType } from "@nestjs/graphql";

@Entity({ name: 'phone' })
@ObjectType()
export class Phone {
    @PrimaryGeneratedColumn()
    @Field((type) => Int)
    id: number;

    @Column({length: 3})
    @Field()
    prefix: string;

    @Column({ length: 9, unique: true})
    @Field()
    number: string;

    @OneToOne(() => User, (user) => user.phone, {cascade: ['insert', 'update']}) //, {cascade: true})
    @JoinColumn({name: 'user_id'})
    @Field((type) => User,{nullable: true})
    user?: User;
}