import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "contact_info" })
export class ContactInfo {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", nullable: true })
  phone: string | null;

  @Column({ type: "varchar", nullable: true })
  email: string | null;

  @Column({ type: "varchar", nullable: true })
  supportEmail: string | null;

  @Column({ type: "text", nullable: true })
  address: string | null;

  @Column({ type: "varchar", nullable: true })
  city: string | null;

  @Column({ type: "varchar", nullable: true })
  workingHours: string | null;

  @Column({ type: "varchar", nullable: true })
  facebookUrl: string | null;

  @Column({ type: "varchar", nullable: true })
  instagramUrl: string | null;

  @Column({ type: "varchar", nullable: true })
  twitterUrl: string | null;

  @Column({ type: "text", nullable: true })
  description: string | null;
}
