import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { User } from '../../users/entities/user.entity';
import { Category } from './category.entity';

@Entity()
export class Post {
  @ApiProperty({ description: 'Unique identifier of the post' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Title of the post' })
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ApiProperty({ description: 'Main content/body of the post', nullable: true })
  @Column({ type: 'text', nullable: true })
  content: string;

  // @Column({})
  // authorId: number;

  @ApiProperty({
    description: 'URL of the cover image for the post',
    nullable: true,
  })
  @Column({ type: 'varchar', length: 800, name: 'cover_image', nullable: true })
  coverImage: string;

  @ApiProperty({ description: 'Short summary of the post', nullable: true })
  @Column({ type: 'varchar', length: 255, name: 'summary', nullable: true })
  summary: string;

  @ApiProperty({ description: 'Indicates whether the post is a draft' })
  @Column({ type: 'boolean', default: true, name: 'is_draft' })
  isDraft: boolean;

  @ApiProperty({ description: 'Date and time when the post was created' })
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ApiProperty({ description: 'Date and time when the post was last updated' })
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ApiProperty({ description: 'User who authored the post', type: () => User })
  @ManyToOne(() => User, (user) => user.posts, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ApiProperty({
    description: 'Categories associated with this post',
    type: () => Category,
    isArray: true,
  })
  @ManyToMany(() => Category, (category) => category.posts)
  @JoinTable({
    name: 'posts_categories',
    joinColumn: { name: 'post_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' },
  })
  categories: Category[];
}
