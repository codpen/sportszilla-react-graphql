import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import Event from '../models/event.model';
import NewSportEvent from '../inputs/NewSportEvent.input';
import UpdateEvent from '../inputs/UpdateEvent.input';

@Resolver()
export default class EventResolver {
  @Query(() => Event)
  async getOneEvent(@Arg('ID') id: number ) {
    try {
      return Event.findOne({ where: { 'ID': id } });  
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
     let event = await Event.findOne({ where: { 'ID': id } });
      if (event !== null) {
      return event.update(eventData)}
    } catch (error) {
      console.error(error)
    }
  }

  //   @Mutation(() => Event)
  //   async updateEvent(@Arg('id') id: number, @Arg('eventData') eventData: UpdateEvent) {
  //     try {
  //       const event = await Event.findOne({ where: { 'id': id } });
  //       if (!event) throw new Error('Event not found!');
  //       return event.update(eventData);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }

  //   @Mutation(() => Boolean)
  //   async deleteUser(@Arg('id') id: number) {
  //     try {
  //       const user = await User.findOne({ where: { 'id': id } });
  //       if (!user) throw new Error('User not found!');
  //       await user.destroy();
  //       return true;
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }
}
