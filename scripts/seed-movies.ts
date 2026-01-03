/**
 * Seed Sample Movies Script
 * 
 * This script adds sample movies to the database for testing.
 * 
 * Usage:
 *   node scripts/seed-movies.js
 * 
 * Or with ts-node:
 *   npx ts-node scripts/seed-movies.ts
 */

import mongoose from 'mongoose';
import Movie from'../models/Movie';
import dbConnect from '../lib/db';

const sampleMovies = [
  {
    title: "The Midnight Protocol",
    description: "In a world where data is the only currency, a rogue hacker discovers a secret that could collapse the global economy.",
    media: {
      thumbnail: "/movie-poster-cyberpunk.jpg",
      backdrop: "/cinematic-cyberpunk-cityscape.jpg",
    },
    video: {
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      provider: "local"
    },
    genre: "Sci-Fi",
    year: 2024,
    duration: 8100, // 2h 15m
    rating: "PG-13",
  },
  {
    title: "Shadow of the Peak",
    description: "An experienced climber must survive a treacherous mountain range after a rescue mission goes horribly wrong.",
    media: {
      thumbnail: "/movie-poster-mountain-climber.jpg",
      backdrop: "/snowy-mountain-cinematic.jpg",
    },
    video: {
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      provider: "local"
    },
    genre: "Action",
    year: 2023,
    duration: 7080, // 1h 58m
    rating: "R",
  },
  {
    title: "Echoes of Tomorrow",
    description: "A brilliant scientist discovers a way to communicate with her future self, but the messages reveal a dark timeline.",
    media: {
      thumbnail: "/placeholder.svg?height=450&width=300&query=sci-fi",
      backdrop: "/placeholder.svg?height=1080&width=1920&query=futuristic+city",
    },
    video: {
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      provider: "local"
    },
    genre: "Sci-Fi",
    year: 2024,
    duration: 7800, // 2h 10m
    rating: "PG-13",
  },
  {
    title: "The Last Guardian",
    description: "In a post-apocalyptic world, a lone warrior must protect the last source of clean water from ruthless raiders.",
    media: {
      thumbnail: "/placeholder.svg?height=450&width=300&query=warrior",
      backdrop: "/placeholder.svg?height=1080&width=1920&query=desert+wasteland",
    },
    video: {
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      provider: "local"
    },
    genre: "Action",
    year: 2024,
    duration: 7500, // 2h 5m
    rating: "R",
  },
  {
    title: "Chrono Paradox",
    description: "A time traveler gets stuck in a loop, reliving the same day while trying to prevent a catastrophic event.",
    media: {
      thumbnail: "/placeholder.svg?height=450&width=300&query=time+travel",
      backdrop: "/placeholder.svg?height=1080&width=1920&query=time+portal",
    },
    video: {
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      provider: "local"
    },
    genre: "Sci-Fi",
    year: 2023,
    duration: 6900, // 1h 55m
    rating: "PG-13",
  },
];

async function seedMovies() {
  try {
    console.log('🎬 Seeding movies...');
    
    // Connect to database
    await dbConnect();
    console.log('✅ Connected to MongoDB');

    // Check if movies already exist
    const existingMovies = await Movie.countDocuments();
    
    if (existingMovies > 0) {
      console.log(`⚠️  Database already has ${existingMovies} movie(s)`);
      console.log('Skipping seed to avoid duplicates');
      console.log('');
      console.log('To re-seed, first clear the movies collection:');
      console.log('  mongosh');
      console.log('  use streamflix');
      console.log('  db.movies.deleteMany({})');
      process.exit(0);
    }

    // Insert sample movies
    const movies = await Movie.insertMany(sampleMovies);

    console.log(`✅ Successfully seeded ${movies.length} movies!`);
    console.log('');
    movies.forEach((movie, index) => {
      console.log(`${index + 1}. ${movie.title} (${movie.year}) - ${movie.genre}`);
    });
    console.log('');
    console.log('You can now view these movies at: http://localhost:3000');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding movies:', error);
    process.exit(1);
  }
}

// Run the seed function
seedMovies();
