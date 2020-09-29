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
let Chatline = class Chatline {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Chatline.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Chatline.prototype, "company_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Chatline.prototype, "customer_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Chatline.prototype, "attendant_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Chatline.prototype, "is_attended", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Chatline.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Chatline.prototype, "updated_at", void 0);
Chatline = __decorate([
    typeorm_1.Entity('chatline')
], Chatline);
exports.default = Chatline;
