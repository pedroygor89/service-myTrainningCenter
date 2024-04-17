import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';

export class athletesValidationParameters implements PipeTransform {

  transform(value: any, metadata: ArgumentMetadata) {
    if (!value && metadata.data === 'email') {
      throw new BadRequestException(
        `This request can't be enpty. We need parameter: ${metadata.data} `,
      );
    }
    return value;
  }
}
