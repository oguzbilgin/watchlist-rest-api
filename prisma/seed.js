import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const userId = "2bc2b7e9-7e31-463b-82ae-fd8a3309800e";

const movies = [
  {
    title: "Inception",
    overview: "A skilled thief who steals secrets through dream-sharing technology is given a chance to erase his criminal past.",
    releaseYear: 2010,
    genres: ["Sci-Fi", "Drama", "Thriller"],
    runtime: 152,
    posterUrl: "https://www.example.com/inception.jpg",
    createdBy: userId
  },
  {
    title: "The Matrix",
    overview: "A computer hacker learns the truth about reality and his role in the war against its controllers.",
    releaseYear: 1999,
    genres: ["Sci-Fi", "Action"],
    runtime: 136,
    posterUrl: "https://www.example.com/matrix.jpg",
    createdBy: userId
  },
  {
    title: "Interstellar",
    overview: "A team of explorers travel through a wormhole in space to ensure humanity’s survival.",
    releaseYear: 2014,
    genres: ["Sci-Fi", "Adventure", "Drama"],
    runtime: 169,
    posterUrl: "https://www.example.com/interstellar.jpg",
    createdBy: userId
  },
  {
    title: "The Dark Knight",
    overview: "Batman faces the Joker, a criminal mastermind who plunges Gotham into chaos.",
    releaseYear: 2008,
    genres: ["Action", "Crime", "Drama"],
    runtime: 152,
    posterUrl: "https://www.example.com/dark-knight.jpg",
    createdBy: userId
  },
  {
    title: "Fight Club",
    overview: "An insomniac office worker forms an underground fight club that spirals out of control.",
    releaseYear: 1999,
    genres: ["Drama", "Thriller"],
    runtime: 139,
    posterUrl: "https://www.example.com/fight-club.jpg",
    createdBy: userId
  },
  {
    title: "Forrest Gump",
    overview: "The story of a man with a low IQ who influences historical events through his kindness.",
    releaseYear: 1994,
    genres: ["Drama", "Romance"],
    runtime: 142,
    posterUrl: "https://www.example.com/forrest-gump.jpg",
    createdBy: userId
  },
  {
    title: "Pulp Fiction",
    overview: "The lives of criminals intertwine through a series of violent and darkly humorous events.",
    releaseYear: 1994,
    genres: ["Crime", "Drama"],
    runtime: 154,
    posterUrl: "https://www.example.com/pulp-fiction.jpg",
    createdBy: userId
  },
  {
    title: "Gladiator",
    overview: "A betrayed Roman general seeks revenge against the corrupt emperor who murdered his family.",
    releaseYear: 2000,
    genres: ["Action", "Drama", "Adventure"],
    runtime: 155,
    posterUrl: "https://www.example.com/gladiator.jpg",
    createdBy: userId
  },
  {
    title: "The Shawshank Redemption",
    overview: "Two imprisoned men bond over years, finding redemption through acts of decency.",
    releaseYear: 1994,
    genres: ["Drama"],
    runtime: 142,
    posterUrl: "https://www.example.com/shawshank.jpg",
    createdBy: userId
  },
  {
    title: "The Godfather",
    overview: "The aging patriarch of a crime dynasty transfers control to his reluctant son.",
    releaseYear: 1972,
    genres: ["Crime", "Drama"],
    runtime: 175,
    posterUrl: "https://www.example.com/godfather.jpg",
    createdBy: userId
  },
  {
    title: "Parasite",
    overview: "A poor family schemes to infiltrate a wealthy household with unexpected consequences.",
    releaseYear: 2019,
    genres: ["Thriller", "Drama"],
    runtime: 132,
    posterUrl: "https://www.example.com/parasite.jpg",
    createdBy: userId
  },
  {
    title: "Whiplash",
    overview: "A young drummer enrolls in a cutthroat music conservatory led by a ruthless instructor.",
    releaseYear: 2014,
    genres: ["Drama", "Music"],
    runtime: 106,
    posterUrl: "https://www.example.com/whiplash.jpg",
    createdBy: userId
  },
  {
    title: "The Social Network",
    overview: "The story of Facebook’s founding and the lawsuits that followed.",
    releaseYear: 2010,
    genres: ["Drama", "Biography"],
    runtime: 120,
    posterUrl: "https://www.example.com/social-network.jpg",
    createdBy: userId
  },
  {
    title: "Joker",
    overview: "A failed comedian descends into madness and becomes a symbol of chaos.",
    releaseYear: 2019,
    genres: ["Crime", "Drama", "Thriller"],
    runtime: 122,
    posterUrl: "https://www.example.com/joker.jpg",
    createdBy: userId
  },
  {
    title: "The Prestige",
    overview: "Two rival magicians engage in a bitter battle to create the ultimate illusion.",
    releaseYear: 2006,
    genres: ["Drama", "Mystery", "Sci-Fi"],
    runtime: 130,
    posterUrl: "https://www.example.com/prestige.jpg",
    createdBy: userId
  },
  {
    title: "Avengers: Endgame",
    overview: "The Avengers assemble once more to undo the devastation caused by Thanos.",
    releaseYear: 2019,
    genres: ["Action", "Adventure", "Sci-Fi"],
    runtime: 181,
    posterUrl: "https://www.example.com/endgame.jpg",
    createdBy: userId
  },
  {
    title: "Titanic",
    overview: "A love story unfolds aboard the ill-fated RMS Titanic.",
    releaseYear: 1997,
    genres: ["Drama", "Romance"],
    runtime: 195,
    posterUrl: "https://www.example.com/titanic.jpg",
    createdBy: userId
  },
  {
    title: "Mad Max: Fury Road",
    overview: "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler.",
    releaseYear: 2015,
    genres: ["Action", "Adventure", "Sci-Fi"],
    runtime: 120,
    posterUrl: "https://www.example.com/mad-max.jpg",
    createdBy: userId
  },
  {
    title: "Django Unchained",
    overview: "A freed slave teams up with a bounty hunter to rescue his wife.",
    releaseYear: 2012,
    genres: ["Drama", "Western"],
    runtime: 165,
    posterUrl: "https://www.example.com/django.jpg",
    createdBy: userId
  },
  {
    title: "Blade Runner 2049",
    overview: "A young blade runner uncovers a long-buried secret that could plunge society into chaos.",
    releaseYear: 2017,
    genres: ["Sci-Fi", "Drama", "Mystery"],
    runtime: 164,
    posterUrl: "https://www.example.com/blade-runner-2049.jpg",
    createdBy: userId
  }
];

const main = async () => {
  console.log("Seeding movies...");

  for (const movie of movies) {
    await prisma.movie.create({
      data: movie,
    });
    console.log(`Created movie: ${movie.title}`);
  }
  console.log("Seeding completed");
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
})