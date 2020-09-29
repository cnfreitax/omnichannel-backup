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
exports.ContainerType = void 0;
const typeorm_1 = require("typeorm");
var ContainerType;
(function (ContainerType) {
    ContainerType["GREETING"] = "greeting";
    ContainerType["CHAT"] = "chat";
    ContainerType["MENU"] = "menu";
    ContainerType["MESSAGE"] = "message";
    ContainerType["MEDIA"] = "media";
    ContainerType["API"] = "api";
    ContainerType["SURVEY"] = "survey";
    ContainerType["END_SERVICE"] = "end_service";
    ContainerType["END_CHATBOT"] = "end_chatbot";
})(ContainerType = exports.ContainerType || (exports.ContainerType = {}));
let Containers = class Containers {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Containers.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Containers.prototype, "from", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Containers.prototype, "to", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Containers.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({
        type: 'enum',
        name: 'type',
        enum: ContainerType,
        default: ContainerType.GREETING,
    }),
    __metadata("design:type", String)
], Containers.prototype, "type", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Containers.prototype, "company_id", void 0);
__decorate([
    typeorm_1.Column({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], Containers.prototype, "content", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], Containers.prototype, "expects_input", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Containers.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Containers.prototype, "updated_at", void 0);
Containers = __decorate([
    typeorm_1.Entity('containers')
], Containers);
exports.default = Containers;
