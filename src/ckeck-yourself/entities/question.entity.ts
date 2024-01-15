import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'questions', synchronize: false })
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { array: true })
  questions: string[];

  @Column()
  answer1: number;

  @Column('text', { array: true })
  variants1: string[];

  @Column()
  answer2: number;

  @Column('text', { array: true })
  variants2: string[];

  @Column('int', { array: true })
  answer3: number[];

  @Column('text', { array: true })
  variants3: string[];

  @Column()
  answer4: string;

  @Column()
  answer5: string;

  @Column()
  answer6: string;
}
