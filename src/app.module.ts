import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserResolver } from './graphql/resolvers/UserResolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Phone } from './entities/phone.entity';
import { Address } from './entities/address.entity';
import { UsersModule } from './users/users.module';
import { AddressModule } from './address/address.module';
import { AddressService } from './address/address.service';
import { PhonesService } from './phones/phones.service';
import { PhonesModule } from './phones/phones.module';
import { UsersService } from './users/users.service';
import { PhoneResolver } from './graphql/resolvers/PhoneResolver';
import { AddressResolver } from './graphql/resolvers/AddressResolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: 'src/schema.gql'
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      username: 'root',
      password: 'admin123',
      host: 'localhost',
      port:  3306,
      database: 'test',
      entities: [
        User,
        Phone,
        Address,
      ],
      // synchronize: true
    }),
    UsersModule,
    PhonesModule,
    AddressModule
  ],
  controllers: [],
  // por mientras
  providers: [UserResolver, PhoneResolver, AddressResolver],
})
export class AppModule {}

// schema first o code-first?