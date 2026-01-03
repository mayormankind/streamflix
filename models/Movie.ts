//Movie.ts
import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IMovie extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  genre: string;
  year: number;
  rating: string;
  duration: number; // in seconds
  
  media: {
    thumbnail: string;
    backdrop: string;
  };

  video: {
    url: string;
    provider: 'local' | 'cloudinary' | 's3';
  };

  createdAt: Date;
  updatedAt: Date;
}

const MovieSchema = new Schema<IMovie>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    genre: {
      type: String,
      required: [true, 'Genre is required'],
      index: true,
      trim: true,
    },
    year: {
      type: Number,
      required: [true, 'Year is required'],
      min: [1900, 'Year must be after 1900'],
      max: [2100, 'Year must be before 2100'],
      index: true,
    },
    rating: {
      type: String,
      required: [true, 'Rating is required'], // e.g., PG-13, R
      trim: true,
    },
    duration: {
      type: Number,
      required: [true, 'Duration (in seconds) is required'],
      min: [1, 'Duration must be at least 1 second'],
    },
    media: {
      thumbnail: {
        type: String,
        required: [true, 'Thumbnail URL is required'],
        trim: true,
      },
      backdrop: {
        type: String,
        required: [true, 'Backdrop URL is required'],
        trim: true,
      },
    },
    video: {
      url: {
        type: String,
        required: [true, 'Video URL is required'],
        trim: true,
      },
      provider: {
        type: String,
        enum: ['local', 'cloudinary', 's3'],
        default: 'local',
      },
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for search
MovieSchema.index({ title: 'text', description: 'text', genre: 'text' });

const Movie: Model<IMovie> =
  mongoose.models.Movie || mongoose.model<IMovie>('Movie', MovieSchema);

export default Movie;