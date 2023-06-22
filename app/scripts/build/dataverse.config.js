export const config = {
    slug: "recipesOS",
    name: "recipesOS",
    logo: "",
    website: "http://localhost:5173/",
    defaultFolderName: "recipesOS",
    description: "generate recipes and share them with the world ",
    models: [
        {
            isPublicDomain: false,
            schemaName: "post.graphql",
            encryptable: ["text", "images", "videos"], // strings within the schema and within the array represent fields that may be encrypted, while fields within the schema but not within the array represent fields that will definitely not be encrypted
        },
        {
            isPublicDomain: true,
            schemaName: "profile.graphql",
        },
    ],
    ceramicUrl: null, // leave null to use dataverse test Ceramic node. Set to {Your Ceramic node Url} for mainnet, should start with "https://".
};
