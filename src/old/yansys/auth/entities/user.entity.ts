import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users', synchronize: false })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  lasttestdate: string;

  @Column({ nullable: true })
  score: number;

  @Column('text', { nullable: true })
  questans: string[];
}
