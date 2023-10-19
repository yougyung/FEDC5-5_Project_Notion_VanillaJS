export const MOCK_DOC_DATA = {
  id: 1,
  title: "Lany - Alonica",
  content: `# LANY - Alonica
### Alonica by LANY was written by Paul Jason Klein, Jake Goss, Aodhan King & Mike Crossey.

lyrics:

i’m falling out of love with you, LA
running out of reasons I should stay
i’m overwhelmed, I’m over it, it’s too cold here anyway
i’m falling out of love with you, LA

**back to alonica**, where the sun is out all the time
my favorite beach is there and the sand it stretches for miles
*sing la di di da* and slowly dance until the morning comes
i feel most at home when I’m **back in alonica**

darling, I have finally settled in
the water’s perfect for a midnight swim
it’s paradise, the stars and I are catching up like old friends
***my heart is learning how to love again***

**back to alonica**, where the sun is out all the time
my favorite beach is there and the sand it stretches for miles
*sing la di di da* and slowly dance until the morning comes
***i feel most at home when I’m back in alonica***

made up of a **thousand colors**, everything is in its place
i don’t know the last time there were tears like this upon my face
***every artist falls in wonder, even Michelangelo***
if god is really out there somewhere, this must be his other home

**back to alonica**, where the sun is out all the time
my favorite beach is there and the sand it stretches for miles
sing la di di da and slowly dance until the morning comes
i feel most at home when **I’m back in alonica**`,
  documents: [
    {
      id: "number",
      title: "string",
      createdAt: "string",
      updatedAt: "string",
    },
  ],
  createdAt: "string",
  updatedAt: "string",
};

export const MOCK_DOS_TREE_DATA = [
  {
    id: 1, // Document id
    title: "노션을 만들자", // Document title
    documents: [
      {
        id: 2,
        title: "블라블라",
        documents: [
          {
            id: 3,
            title: "함냐함냐",
            documents: [],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "hello!",
    documents: [],
  },
];
