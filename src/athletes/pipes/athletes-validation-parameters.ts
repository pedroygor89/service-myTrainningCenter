import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

export class athletesValidationParameters implements PipeTransform {

  transform(value: any, metadata: ArgumentMetadata) {
    if (!value && metadata.data !== 'email' && metadata.data !== '_id') {
      throw new BadRequestException(
        `This request can't be enpty. We need parameter: ${metadata.data} `,
      );
    }
    // Validate if the value is a valid ObjectId
    if (metadata.data === '_id' && value && !Types.ObjectId.isValid(value)) {
      throw new BadRequestException('You put an invalid ID. Please provide a valid ID');
    }
   if(!Types.ObjectId.isValid(value) && value && metadata.data === 'email') {
      throw new BadRequestException('You put an invalid Email. Please provide a valid Email');
  }
    return value;
  }
}
