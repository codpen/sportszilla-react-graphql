/* eslint-disable */
import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import Event from '../models/event.model';
import NewSportEvent from '../inputs/NewSportEvent.input';
import UpdateEvent from '../inputs/UpdateEvent.input';

@Resolver()
export default class EventResolver {
  @Query(() => Event)
  async getOneEvent(@Arg('ID') id: number) {
    try {
      return Event.findOne({ where: { ID: id } });
    } catch (err) {
      console.error(err);
    }
  }

  // @Query(() => Event)
  // async getAllEvents(){
  //   try {
  //    return Event.findAll()
  //   } catch (error) {
  //     console.error(error)
  // }

  @Mutation(() => Event)
  async newEvent(@Arg('eventData') eventData: NewSportEvent) {
    try {
      const result = await Event.create(eventData);
      return result;
    } catch (err) {
      console.error(err);
    }
  }

  @Mutation(() => Event)
  async updateEvent(@Arg('ID') id: number, @Arg('eventData') eventData: UpdateEvent) {
    try {
      const event = await Event.findOne({ where: { ID: id } });
      if (event !== null) {
        return event.update(eventData);
      }
    } catch (error) {
      console.error(error);
    }
  }

  @Mutation(() => Boolean)
  async deleteEvent(@Arg('ID') id: number) {
    try {
      const event = await Event.findOne({ where: { ID: id } });
      if (!event) throw new Error('Event not found!');
      await event.destroy();
      return true;
    } catch (err) {
      console.error(err);
    }
  }
}
