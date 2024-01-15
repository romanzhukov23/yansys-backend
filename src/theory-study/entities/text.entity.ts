import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'texts', synchronize: false })
export class Text {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;
}
