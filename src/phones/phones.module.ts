import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phone } from 'src/entities/phone.entity';
import { PhonesService } from './phones.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Phone]),
    ],
    providers: [PhonesService],
    exports: [PhonesService],
})
export class PhonesModule {}
