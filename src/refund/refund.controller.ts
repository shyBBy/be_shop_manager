import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {RefundService} from './refund.service';
import {RefundCreateDto} from "./dto/create-refund.dto";
import {JwtAuthGuard} from "../guards/jwt-auth.guard";
import {UserEntity} from "../user/entities/user.entity";
import {UserObj} from "../decorators/user-object.decorator";
import {RefundUpdateDto} from "./dto/update-refund.dto";

@Controller('refund')
export class RefundController {
    constructor(private readonly refundService: RefundService) {
    }


    @Post('/create')
    create(@Body() createRefundDto: RefundCreateDto) {
        return this.refundService.create(createRefundDto);
    }

    @Post('/update/:uuid')
    @UseGuards(JwtAuthGuard)
    updateRefund(
        @Param('uuid') uuid: string,
        @Body() updateRefundDto: RefundUpdateDto,
        @UserObj() user: UserEntity
    ) {
        return this.refundService.updateRefundData(updateRefundDto, user, uuid)
    }

    @Get('/:uuid')
    getOneById(@Param('uuid') uuid: string) {
        return this.refundService.getOneByUuid(uuid);
    }
}
