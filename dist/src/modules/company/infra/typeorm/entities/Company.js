"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
let Company = class Company {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('increment'),
    __metadata("design:type", Number)
], Company.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Company.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Company.prototype, "cnpj", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Company.prototype, "email", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Company.prototype, "codCampaign", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Company.prototype, "webhook_status", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Company.prototype, "webhook_response", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Company.prototype, "logo", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Company.prototype, "address", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Company.prototype, "website", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Company.prototype, "activity", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Company.prototype, "ddd", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Company.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Company.prototype, "updated_at", void 0);
Company = __decorate([
    typeorm_1.Entity('companies')
], Company);
exports.default = Company;
