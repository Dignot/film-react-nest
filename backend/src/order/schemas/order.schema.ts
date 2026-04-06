import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class Ticket {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  film: string;

  @Prop({ required: true })
  session: string;

  @Prop({ required: true })
  daytime: string;

  @Prop({ required: true })
  day: string;

  @Prop({ required: true })
  time: string;

  @Prop({ required: true })
  row: number;

  @Prop({ required: true })
  seat: number;

  @Prop({ required: true })
  price: number;

  @Prop({ type: [String], default: [] })
  taken: string[];
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ type: [TicketSchema], default: [] })
  tickets: Ticket[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
