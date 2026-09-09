import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum GuestCheckStatus {
  OPENED = 'OPENED',
  CLOSED = 'CLOSED',
}

@Entity('guest-check')
export class GuestCheck {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  status: GuestCheckStatus;
}