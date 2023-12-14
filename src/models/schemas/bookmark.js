import mongoose, { Schema } from 'mongoose';

const bookmarkSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  travelPlace: {
    type: Schema.Types.ObjectId,
    ref: 'TravelPlace',
  },
});

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);
export default Bookmark;
