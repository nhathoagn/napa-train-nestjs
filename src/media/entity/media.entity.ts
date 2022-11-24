import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class Media extends BaseEntity {
  @PrimaryGeneratedColumn()
  key: string;

  @Column()
  name: string;

  @Column()
  file_name: string;

  @Column()
  mime_type: string;

  @Column()
  size: number;

  @CreateDateColumn()
  created_at: Date;
}
