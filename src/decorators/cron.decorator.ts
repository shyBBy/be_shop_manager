import { SetMetadata } from '@nestjs/common';

export const Cron = () => SetMetadata('cron', '*/1 * * * *');

