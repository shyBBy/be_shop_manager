import {HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {DataSource} from "typeorm";
import {RefundEntity} from "./entities/refund.entity";
import {MailerService} from "@nestjs-modules/mailer";
import {refundCreatedMailTemplate} from "../utils/refundCreatedMailTemplate";
import {v4 as uuid} from 'uuid';
import {createResponse} from "../utils/createResponse";
import {UserEntity} from "../user/entities/user.entity";
import {RefundUpdateDto} from "./dto/update-refund.dto";
import {refundUpdateSuccessMailTemplate} from "../utils/refundUpdateSuccessMailTemplate";
import {refundUpdateRejectMailTemplate} from "../utils/refundUpdateRejectMailTemplate";
import {RefundCreateDto} from "./dto/create-refund.dto";
import {GetListOfAllRefundsResponse} from "../../types/refund/refund";


@Injectable()
export class RefundService {
    constructor(
        private dataSource: DataSource,
        private readonly mailerService: MailerService
    ) {
    }


    async create(refundCreateDto: RefundCreateDto) {
        const {email, receiptOrInvoiceNumber, productCode, productTitle, reason, description, orderId} = refundCreateDto

        const isExistRefund = await RefundEntity.findOneBy({orderId})
        if (isExistRefund) {
            throw new HttpException(
                {
                    message: `Zwrot dotyczący zamówienia nr: ${orderId} został zgłoszony.`,
                    isSuccess: false,
                },
                HttpStatus.BAD_REQUEST,
            );
        }

        try {
            const refund = new RefundEntity();
            const date = new Date()
            const currentDate = date.getUTCFullYear() + '/' + (date.getMonth() + 1) + '/' + (date.getUTCDate())
            const refundUuid = uuid();
            refund.email = email;
            refund.orderId = orderId;
            refund.receiptOrInvoiceNumber = receiptOrInvoiceNumber;
            refund.productTitle = productTitle;
            refund.productCode = productCode;
            refund.reason = reason;
            refund.createdAt = currentDate;
            refund.updatedAt = currentDate;
            refund.status = 'Nowe';
            refund.uuid = refundUuid;
            refund.description = description;
            await refund.save();
            await this.mailerService.sendMail({
                to: `${email}`,
                subject: 'Potwierdzenie złożenia reklamacji produktu',
                text: 'Potwierdzenie złożenia reklamacji produktu',
                html: refundCreatedMailTemplate(refundCreateDto, refundUuid),
            })
            return createResponse(true, `Pomyślnie utworzono zwrot, sprawdź skrzynkę pocztową: ${email}`, 200)
        } catch (e) {
            console.log('error z service', e)
            throw new HttpException(
                {
                    message: `Coś poszło nie tak, spróbuj później.`,
                    isSuccess: false,
                },
                HttpStatus.NOT_FOUND,
            );
        }

    }

    async getOneByUuid(uuid: string): Promise<RefundEntity | null> {
        return await RefundEntity.findOneBy({uuid})
    }

    async updateRefundData(refundUpdateDto: RefundUpdateDto, user: UserEntity, uuid: string) {
        try {
            const refund = await RefundEntity.findOneBy({uuid})
            const date = new Date()
            const currentDate = date.getUTCFullYear() + '/' + (date.getMonth() + 1) + '/' + (date.getUTCDate())
            await RefundEntity.update(uuid, {
                ...refundUpdateDto,
                updatedAt: currentDate
            })

            if (refundUpdateDto.status === 'Zwrot zaakceptowany') {
                await this.mailerService.sendMail({
                    to: `${refund.email}`,
                    subject: 'Zaakceptowaliśmy Twóje żądanie zwrotu!',
                    text: 'Zaakceptowaliśmy Twóje żądanie zwrotu!',
                    html: refundUpdateSuccessMailTemplate(refundUpdateDto),
                })
                return createResponse(true, `Pomyślnie zaaktualizowano zgłoszenie zwrotu - Zwrot towaru został zaakceptowany`, 200)
            } else if (refundUpdateDto.status === 'Zwrot odrzucony') {
                await this.mailerService.sendMail({
                    to: `${refund.email}`,
                    subject: 'Zwrot towaru został odrzucony!',
                    text: 'Zwrot towaru został odrzucony!',
                    html: refundUpdateRejectMailTemplate(refundUpdateDto),
                })
                return createResponse(true, `Pomyślnie zaaktualizowano zgłoszenie zwrotu - Zwrot towaru został odrzucony!`, 200)
            } else {
                return createResponse(true, `Pomyślnie zaaktualizowano zgłoszenie zwrotu - brak decyzji o zwrocie.`, 200)
            }
        } catch (e) {
            console.log(e)
        }

    }

    async sendEmailToClient(refundUuid: string, emailContentDto: RefundUpdateDto) {
        const {emailContent} = emailContentDto

        const refund = await RefundEntity.findOneBy({uuid: refundUuid})
        if (!refund) {
            //obsłużyć błąd
        }
        try {
            const date = new Date()
            refund.updatedAt = date.getUTCFullYear() + '/' + (date.getMonth() + 1) + '/' + (date.getUTCDate())
            await refund.save()
            await this.mailerService.sendMail({
                to: `${refund.email}`,
                subject: 'Otrzymales wiadomość dotycząca zwrotu towaru',
                text: 'Sprawdz wiadomość do zwrotu z bigsewciu',
                html: `${emailContent}`
            })
        } catch (e) {
            console.log(e)
        }
    }

    async getAllRefunds(userId: string): Promise<GetListOfAllRefundsResponse> {

        try {
            const refunds = await RefundEntity.find({
                order: {id: 'DESC'}, // Sortowanie wyników po numerze ID w odwrotnej kolejności (największe ID na samej górze)
            });
            return refunds
        } catch (e) {
            throw new HttpException(
                {
                    message: `Cos poszlo nie tak, spróbuj raz jeszcze.`,
                    isSuccess: false,
                },
                HttpStatus.BAD_REQUEST,
            );
        }

    }


    async removeOneByUuid(uuid: string, userId) {
        const refund = await RefundEntity.findOneBy({uuid})

        if (!refund) {
            throw new NotFoundException(`Zwrot o takim uuid: ${uuid} nie istnieje`);
        }

        await refund.remove();
    }

}
