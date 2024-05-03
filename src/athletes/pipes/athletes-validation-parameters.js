"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.athletesValidationParameters = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("mongoose");
var athletesValidationParameters = /** @class */ (function () {
    function athletesValidationParameters() {
    }
    athletesValidationParameters.prototype.transform = function (value, metadata) {
        if (!value && metadata.data !== 'email' && metadata.data !== '_id') {
            throw new common_1.BadRequestException("This request can't be enpty. We need parameter: ".concat(metadata.data, " "));
        }
        // Validate if the value is a valid ObjectId
        if (metadata.data === '_id' && value && !mongoose_1.Types.ObjectId.isValid(value)) {
            throw new common_1.BadRequestException('You put an invalid ID. Please provide a valid ID');
        }
        if (!mongoose_1.Types.ObjectId.isValid(value) && value && metadata.data === 'email') {
            throw new common_1.BadRequestException('You put an invalid Email. Please provide a valid Email');
        }
        return value;
    };
    return athletesValidationParameters;
}());
exports.athletesValidationParameters = athletesValidationParameters;
